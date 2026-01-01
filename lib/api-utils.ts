/**
 * Advanced API utilities for better error handling and response management
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger, analytics } from '@/lib/logger'

/**
 * Safe API handler wrapper
 * Handles errors, logging, and performance tracking
 */
export async function apiHandler(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: {
    method: string
    endpoint: string
    requireAuth?: boolean
    rateLimit?: { maxRequests: number; windowMs: number }
  }
) {
  return async (request: NextRequest) => {
    const startTime = Date.now()
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    let statusCode = 500

    try {
      const response = await handler(request)
      statusCode = response.status

      // Log successful request
      const duration = Date.now() - startTime
      logger.logPerformance(options.endpoint, duration, statusCode, {
        method: options.method,
        ip,
      })

      // Track analytics
      analytics.trackEvent('api_request', undefined, {
        endpoint: options.endpoint,
        method: options.method,
        statusCode,
        duration,
      })

      return response
    } catch (error) {
      statusCode = error instanceof Error && 'statusCode' in error ? (error as any).statusCode : 500

      const duration = Date.now() - startTime
      logger.error(`${options.endpoint} error`, error as Error, {
        method: options.method,
        statusCode,
        duration,
        ip,
      })

      // Return standardized error response
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : 'Internal server error',
          timestamp: new Date().toISOString(),
          endpoint: options.endpoint,
        },
        { status: statusCode }
      )
    }
  }
}

/**
 * Validation error class
 */
export class ValidationError extends Error {
  statusCode = 400

  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Authorization error class
 */
export class AuthorizationError extends Error {
  statusCode = 401

  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'AuthorizationError'
  }
}

/**
 * Not found error class
 */
export class NotFoundError extends Error {
  statusCode = 404

  constructor(message: string = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
  }
}

/**
 * Conflict error class
 */
export class ConflictError extends Error {
  statusCode = 409

  constructor(message: string = 'Conflict') {
    super(message)
    this.name = 'ConflictError'
  }
}

/**
 * Rate limit error class
 */
export class RateLimitError extends Error {
  statusCode = 429

  constructor(message: string = 'Too many requests') {
    super(message)
    this.name = 'RateLimitError'
  }
}

/**
 * Validate request body
 */
export async function validateBody<T>(
  request: NextRequest,
  schema: {
    [K in keyof T]: {
      required?: boolean
      type?: string
      minLength?: number
      maxLength?: number
      pattern?: RegExp
      custom?: (value: any) => boolean | Promise<boolean>
    }
  }
): Promise<T> {
  try {
    const body = await request.json()

    for (const [key, rule] of Object.entries(schema)) {
      const rules = rule as any
      const value = body[key]

      if (rules.required && (value === undefined || value === null || value === '')) {
        throw new ValidationError(`${key} is required`)
      }

      if (value !== undefined && value !== null) {
        if (rules.type && typeof value !== rules.type) {
          throw new ValidationError(`${key} must be of type ${rules.type}`)
        }

        if (rules.type === 'string') {
          if (rules.minLength && value.length < rules.minLength) {
            throw new ValidationError(`${key} must be at least ${rules.minLength} characters`)
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            throw new ValidationError(`${key} must be at most ${rules.maxLength} characters`)
          }
          if (rules.pattern && !rules.pattern.test(value)) {
            throw new ValidationError(`${key} format is invalid`)
          }
        }

        if (rules.custom) {
          const isValid = await rules.custom(value)
          if (!isValid) {
            throw new ValidationError(`${key} validation failed`)
          }
        }
      }
    }

    return body
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error
    }
    throw new ValidationError('Invalid request body')
  }
}

/**
 * Paginate results
 */
export function paginate<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 20
): {
  items: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
} {
  const total = items.length
  const pages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    items: items.slice(start, end),
    pagination: {
      page,
      pageSize,
      total,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
    },
  }
}

/**
 * Sort items
 */
export function sort<T>(
  items: T[],
  sortBy: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]

    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Filter items by predicate
 */
export function filter<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate)
}

/**
 * Safe JSON stringify
 */
export function safeStringify(obj: unknown, space?: number): string {
  try {
    return JSON.stringify(obj, null, space)
  } catch {
    return '[Circular]'
  }
}
