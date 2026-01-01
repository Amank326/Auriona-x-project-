/**
 * WebSocket server for real-time messaging
 * Enables live chat with typing indicators and presence
 */

interface WebSocketClient {
  userId: string
  conversationId: string
  lastHeartbeat: number
  isAlive: boolean
}

interface WebSocketMessage {
  type: 'message' | 'typing' | 'presence' | 'heartbeat'
  conversationId: string
  userId: string
  content?: string
  timestamp: string
}

export class WebSocketManager {
  private clients = new Map<string, WebSocketClient>()
  private subscriptions = new Map<string, Set<string>>() // conversationId -> Set of userIds
  private messageQueue: WebSocketMessage[] = []
  private maxQueueSize = 1000

  /**
   * Register a new WebSocket client
   */
  registerClient(clientId: string, userId: string, conversationId: string): void {
    this.clients.set(clientId, {
      userId,
      conversationId,
      lastHeartbeat: Date.now(),
      isAlive: true,
    })

    // Subscribe to conversation
    if (!this.subscriptions.has(conversationId)) {
      this.subscriptions.set(conversationId, new Set())
    }
    this.subscriptions.get(conversationId)!.add(clientId)

    console.log(`✅ WebSocket client ${clientId} connected to ${conversationId}`)
  }

  /**
   * Unregister a WebSocket client
   */
  unregisterClient(clientId: string): void {
    const client = this.clients.get(clientId)
    if (client) {
      const subscribers = this.subscriptions.get(client.conversationId)
      if (subscribers) {
        subscribers.delete(clientId)
        if (subscribers.size === 0) {
          this.subscriptions.delete(client.conversationId)
        }
      }
    }
    this.clients.delete(clientId)
    console.log(`❌ WebSocket client ${clientId} disconnected`)
  }

  /**
   * Broadcast message to conversation subscribers
   */
  broadcastToConversation(
    conversationId: string,
    message: WebSocketMessage,
    excludeClientId?: string
  ): void {
    const subscribers = this.subscriptions.get(conversationId)
    if (!subscribers) return

    for (const clientId of subscribers) {
      if (excludeClientId && clientId === excludeClientId) continue

      // In a real implementation, send via WebSocket connection
      // For now, queue the message
      this.messageQueue.push({
        ...message,
        timestamp: new Date().toISOString(),
      })
    }

    // Maintain queue size
    if (this.messageQueue.length > this.maxQueueSize) {
      this.messageQueue.shift()
    }
  }

  /**
   * Send message to specific client
   */
  sendToClient(clientId: string, message: WebSocketMessage): void {
    const client = this.clients.get(clientId)
    if (client) {
      this.messageQueue.push({
        ...message,
        timestamp: new Date().toISOString(),
      })
    }
  }

  /**
   * Broadcast typing indicator
   */
  broadcastTyping(clientId: string, conversationId: string, isTyping: boolean): void {
    const client = this.clients.get(clientId)
    if (!client) return

    this.broadcastToConversation(
      conversationId,
      {
        type: 'typing',
        conversationId,
        userId: client.userId,
        content: isTyping ? 'is typing...' : 'stopped typing',
        timestamp: new Date().toISOString(),
      },
      clientId
    )
  }

  /**
   * Handle heartbeat
   */
  handleHeartbeat(clientId: string): void {
    const client = this.clients.get(clientId)
    if (client) {
      client.lastHeartbeat = Date.now()
      client.isAlive = true
    }
  }

  /**
   * Get active subscribers for conversation
   */
  getSubscriberCount(conversationId: string): number {
    return this.subscriptions.get(conversationId)?.size || 0
  }

  /**
   * Get all active clients
   */
  getActiveClients(): Map<string, WebSocketClient> {
    return new Map(this.clients)
  }

  /**
   * Get message queue (with optional filter)
   */
  getMessageQueue(conversationId?: string, limit?: number): WebSocketMessage[] {
    let messages = [...this.messageQueue]

    if (conversationId) {
      messages = messages.filter((m) => m.conversationId === conversationId)
    }

    if (limit) {
      messages = messages.slice(-limit)
    }

    return messages
  }

  /**
   * Check for stale connections
   */
  cleanupStaleConnections(timeoutMs: number = 60000): number {
    const now = Date.now()
    let cleaned = 0

    for (const [clientId, client] of this.clients.entries()) {
      if (now - client.lastHeartbeat > timeoutMs) {
        this.unregisterClient(clientId)
        cleaned++
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} stale WebSocket connections`)
    }

    return cleaned
  }

  /**
   * Get server statistics
   */
  getStatistics() {
    return {
      totalClients: this.clients.size,
      totalConversations: this.subscriptions.size,
      queuedMessages: this.messageQueue.length,
      clientsByConversation: Array.from(this.subscriptions.entries()).map(([convId, clients]) => ({
        conversationId: convId,
        clientCount: clients.size,
      })),
    }
  }

  /**
   * Clear all data (for testing/reset)
   */
  clear(): void {
    this.clients.clear()
    this.subscriptions.clear()
    this.messageQueue = []
  }
}

// Global WebSocket manager instance
export const wsManager = new WebSocketManager()

/**
 * Start WebSocket cleanup interval
 */
export function startWebSocketCleanup(intervalMs: number = 30000) {
  setInterval(() => {
    wsManager.cleanupStaleConnections()
  }, intervalMs)

  console.log('🚀 WebSocket cleanup scheduler started')
}
