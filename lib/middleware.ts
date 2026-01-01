/**
 * Advanced middleware for request handling, validation, and security
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Rate limiting middleware
 * Prevents API abuse with configurable limits per endpoint
 */
export async function rateLimit(
  request: NextRequest,
  options: { maxRequests: number; windowMs: number } = { maxRequests: 100, windowMs: 60000 }
) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()

  const record = rateLimitStore.get(ip)

  if (record && now < record.resetTime) {
    if (record.count >= options.maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
    record.count++
  } else {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + options.windowMs,
    })
  }

  return null
}

/**
 * Authentication middleware
 * Validates user session and returns user info
 */
export async function requireAuth(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return session
}

/**
 * Request validation middleware
 * Validates request body against schema
 */
export async function validateRequest(
  request: NextRequest,
  schema: Record<string, { required: boolean; type: string; min?: number; max?: number }>
) {
  try {
    const body = await request.json()

    for (const [key, rules] of Object.entries(schema)) {
      if (rules.required && !(key in body)) {
        return {
          valid: false,
          error: `Field '${key}' is required`,
        }
      }

      if (key in body) {
        const value = body[key]
        if (typeof value !== rules.type) {
          return {
            valid: false,
            error: `Field '${key}' must be of type ${rules.type}`,
          }
        }

        if (rules.type === 'string') {
          if (rules.min && value.length < rules.min) {
            return {
              valid: false,
              error: `Field '${key}' must be at least ${rules.min} characters`,
            }
          }
          if (rules.max && value.length > rules.max) {
            return {
              valid: false,
              error: `Field '${key}' must be at most ${rules.max} characters`,
            }
          }
        }
      }
    }

    return {
      valid: true,
      data: body,
    }
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid JSON in request body',
    }
  }
}

/**
 * CORS middleware
 * Handles CORS headers
 */
export function corsHeaders(request: NextRequest) {
  const headers = new Headers(request.headers)
  const origin = request.headers.get('origin') || '*'

  const response = new NextResponse(null)
  response.headers.set('Access-Control-Allow-Origin', origin)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')

  return response
}

/**
 * Security headers middleware
 * Adds security headers to response
 */
export function securityHeaders(response: NextResponse) {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  return response
}

/**
 * Error response helper
 * Standardizes error responses
 */
export function errorResponse(
  error: unknown,
  statusCode: number = 500,
  context: string = 'Error'
) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  
  console.error(`[${context}] ${errorMessage}`)

  return NextResponse.json(
    {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      context,
    },
    { status: statusCode }
  )
}

/**
 * Success response helper
 * Standardizes success responses
 */
export function successResponse<T>(
  data: T,
  statusCode: number = 200,
  meta?: Record<string, unknown>
) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(meta && { meta }),
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  )
}
