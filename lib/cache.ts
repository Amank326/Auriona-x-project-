/**
 * Advanced caching system with TTL support
 * Optimizes performance by reducing database queries
 */

interface CacheEntry<T> {
  data: T
  expiresAt: number
  hits: number
  lastAccessed: number
}

export class CacheManager<T = unknown> {
  private cache = new Map<string, CacheEntry<T>>()
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
  }

  /**
   * Get cached value
   */
  get(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      this.stats.misses++
      return null
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      this.stats.evictions++
      return null
    }

    // Update access stats
    entry.hits++
    entry.lastAccessed = Date.now()
    this.stats.hits++

    return entry.data
  }

  /**
   * Set cached value with TTL
   */
  set(key: string, data: T, ttlMs: number = 60000): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
      hits: 0,
      lastAccessed: Date.now(),
    })
  }

  /**
   * Delete cached value
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Check if key exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return false
    }
    return true
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const total = this.stats.hits + this.stats.misses
    const hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0

    return {
      ...this.stats,
      hitRate: hitRate.toFixed(2) + '%',
      size: this.cache.size,
    }
  }

  /**
   * Get all cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  /**
   * Cleanup expired entries
   */
  cleanup(): number {
    let cleaned = 0
    const now = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key)
        cleaned++
      }
    }

    return cleaned
  }
}

// Global cache instances
export const userCache = new CacheManager()
export const conversationCache = new CacheManager()
export const moodCache = new CacheManager()
export const goalCache = new CacheManager()
export const achievementCache = new CacheManager()

/**
 * Cache key generators
 */
export const cacheKeys = {
  user: (userId: string) => `user:${userId}`,
  userConversations: (userId: string) => `user:${userId}:conversations`,
  userGoals: (userId: string) => `user:${userId}:goals`,
  userMood: (userId: string, days: number) => `user:${userId}:mood:${days}`,
  userAchievements: (userId: string) => `user:${userId}:achievements`,
  conversation: (conversationId: string) => `conversation:${conversationId}`,
  conversationMessages: (conversationId: string) => `conversation:${conversationId}:messages`,
  goal: (goalId: string) => `goal:${goalId}`,
  stats: (userId: string) => `user:${userId}:stats`,
}

/**
 * Cache invalidation helpers
 */
export const invalidateCache = {
  userProfile: (userId: string) => {
    userCache.delete(cacheKeys.user(userId))
  },
  
  userConversations: (userId: string) => {
    conversationCache.delete(cacheKeys.userConversations(userId))
  },
  
  conversationMessages: (conversationId: string) => {
    conversationCache.delete(cacheKeys.conversationMessages(conversationId))
  },
  
  userGoals: (userId: string) => {
    goalCache.delete(cacheKeys.userGoals(userId))
  },
  
  userMood: (userId: string, days?: number) => {
    if (days) {
      moodCache.delete(cacheKeys.userMood(userId, days))
    } else {
      // Invalidate all mood cache for user
      for (let d = 7; d <= 90; d += 7) {
        moodCache.delete(cacheKeys.userMood(userId, d))
      }
    }
  },
  
  userAchievements: (userId: string) => {
    achievementCache.delete(cacheKeys.userAchievements(userId))
  },
  
  user: (userId: string) => {
    // Invalidate all user-related caches
    invalidateCache.userProfile(userId)
    invalidateCache.userConversations(userId)
    invalidateCache.userGoals(userId)
    invalidateCache.userMood(userId)
    invalidateCache.userAchievements(userId)
  },
}

/**
 * Periodic cleanup of expired cache entries
 */
export function startCacheCleanup(intervalMs: number = 3600000) {
  setInterval(() => {
    const cleaned =
      userCache.cleanup() +
      conversationCache.cleanup() +
      moodCache.cleanup() +
      goalCache.cleanup() +
      achievementCache.cleanup()

    if (cleaned > 0) {
      console.log(`🧹 Cache cleanup: Removed ${cleaned} expired entries`)
    }
  }, intervalMs)
}
