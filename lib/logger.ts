/**
 * Advanced logging and monitoring service
 * Supports structured logging, error tracking, and analytics
 */

interface LogContext {
  userId?: string
  sessionId?: string
  endpoint?: string
  method?: string
  ip?: string
  userAgent?: string
  [key: string]: unknown
}

interface LogEntry {
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  message: string
  context?: LogContext
  error?: {
    name: string
    message: string
    stack?: string
  }
  duration?: number
  statusCode?: number
}

class Logger {
  private logs: LogEntry[] = []
  private isDevelopment = process.env.NODE_ENV === 'development'

  /**
   * Log info level message
   */
  info(message: string, context?: LogContext) {
    this.log('INFO', message, context)
  }

  /**
   * Log warning level message
   */
  warn(message: string, context?: LogContext) {
    this.log('WARN', message, context)
  }

  /**
   * Log error level message
   */
  error(message: string, error?: Error, context?: LogContext) {
    this.log('ERROR', message, context, error)
  }

  /**
   * Log debug level message (only in development)
   */
  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      this.log('DEBUG', message, context)
    }
  }

  /**
   * Log performance metrics
   */
  logPerformance(
    endpoint: string,
    duration: number,
    statusCode: number,
    context?: LogContext
  ) {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: statusCode >= 400 ? 'WARN' : 'INFO',
      message: `API Request: ${endpoint}`,
      context: {
        endpoint,
        ...context,
      },
      duration,
      statusCode,
    }

    this.logs.push(logEntry)

    // Log slow requests
    if (duration > 5000) {
      console.warn(`⚠️ Slow request detected: ${endpoint} took ${duration}ms`)
    }
  }

  /**
   * Get all logs
   */
  getLogs(filter?: { level?: string; limit?: number }) {
    let logs = [...this.logs]

    if (filter?.level) {
      logs = logs.filter((log) => log.level === filter.level)
    }

    if (filter?.limit) {
      logs = logs.slice(-filter.limit)
    }

    return logs
  }

  /**
   * Clear logs
   */
  clearLogs() {
    this.logs = []
  }

  /**
   * Export logs to file (in production, would send to external service)
   */
  async exportLogs() {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalLogs: this.logs.length,
      logs: this.logs,
    }

    if (process.env.NODE_ENV === 'production') {
      // Send to external monitoring service (e.g., Sentry, DataDog)
      // await sendToMonitoringService(exportData)
    }

    return exportData
  }

  /**
   * Private log method
   */
  private log(level: LogEntry['level'], message: string, context?: LogContext, error?: Error) {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && { context }),
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: this.isDevelopment ? error.stack : undefined,
        },
      }),
    }

    this.logs.push(logEntry)

    // Console output with colors
    const colors = {
      INFO: '\x1b[36m',    // Cyan
      WARN: '\x1b[33m',    // Yellow
      ERROR: '\x1b[31m',   // Red
      DEBUG: '\x1b[35m',   // Magenta
      reset: '\x1b[0m',
    }

    const color = colors[level] || colors.reset
    console.log(
      `${color}[${logEntry.timestamp}] ${level}${colors.reset} ${message}`,
      context ? JSON.stringify(context) : ''
    )

    if (error) {
      console.error(`${colors.ERROR}Stack: ${error.stack}${colors.reset}`)
    }
  }
}

// Global logger instance
export const logger = new Logger()

/**
 * Request performance tracking decorator
 */
export function trackPerformance(
  endpoint: string,
  userId?: string
) {
  return async (fn: () => Promise<Response>) => {
    const startTime = Date.now()

    try {
      const response = await fn()
      const duration = Date.now() - startTime

      logger.logPerformance(endpoint, duration, response.status, {
        userId,
      })

      return response
    } catch (error) {
      const duration = Date.now() - startTime
      logger.error(`${endpoint} failed`, error as Error, {
        userId,
        duration,
      })
      throw error
    }
  }
}

/**
 * Analytics event tracker
 */
export class AnalyticsTracker {
  private events: Array<{
    timestamp: string
    userId?: string
    eventType: string
    data: Record<string, unknown>
  }> = []

  /**
   * Track an event
   */
  trackEvent(
    eventType: string,
    userId?: string,
    data?: Record<string, unknown>
  ) {
    this.events.push({
      timestamp: new Date().toISOString(),
      userId,
      eventType,
      data: data || {},
    })

    logger.debug(`Analytics event: ${eventType}`, {
      userId,
      eventType,
    })
  }

  /**
   * Get events for a user
   */
  getUserEvents(userId: string) {
    return this.events.filter((event) => event.userId === userId)
  }

  /**
   * Get event statistics
   */
  getStatistics() {
    const stats: Record<string, number> = {}

    for (const event of this.events) {
      stats[event.eventType] = (stats[event.eventType] || 0) + 1
    }

    return {
      totalEvents: this.events.length,
      uniqueUsers: new Set(this.events.map((e) => e.userId)).size,
      eventStats: stats,
    }
  }
}

export const analytics = new AnalyticsTracker()
