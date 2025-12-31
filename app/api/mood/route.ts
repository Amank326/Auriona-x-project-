import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// Get mood entries for a user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const moodEntries = await prisma.moodEntry.findMany({
      where: {
        userId: session.user.id,
        createdAt: { gte: startDate },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Calculate average mood
    const average =
      moodEntries.length > 0
        ? moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length
        : 0

    return NextResponse.json({
      moodEntries,
      average: Math.round(average * 10) / 10,
      count: moodEntries.length,
    })
  } catch (error) {
    console.error('Get mood entries error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create new mood entry
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { mood, note } = await request.json()

    if (!mood || mood < 1 || mood > 10) {
      return NextResponse.json(
        { error: 'Mood must be between 1 and 10' },
        { status: 400 }
      )
    }

    const moodEntry = await prisma.moodEntry.create({
      data: {
        userId: session.user.id,
        mood,
        note,
      },
    })

    // Check for mood tracking achievement
    const moodCount = await prisma.moodEntry.count({
      where: { userId: session.user.id },
    })

    if (moodCount === 7) {
      await prisma.achievement.create({
        data: {
          userId: session.user.id,
          title: 'Week Warrior',
          description: 'Tracked mood for 7 days',
          icon: '📊',
        },
      })
    } else if (moodCount === 30) {
      await prisma.achievement.create({
        data: {
          userId: session.user.id,
          title: 'Monthly Mindful',
          description: 'Tracked mood for 30 days',
          icon: '🎯',
        },
      })
    }

    return NextResponse.json({ moodEntry }, { status: 201 })
  } catch (error) {
    console.error('Create mood entry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
