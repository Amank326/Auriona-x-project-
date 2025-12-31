import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// Get all goals for a user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const goals = await prisma.goal.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    const completedCount = goals.filter((g) => g.completed).length
    const averageProgress =
      goals.length > 0
        ? goals.reduce((sum, g) => sum + g.progress, 0) / goals.length
        : 0

    return NextResponse.json({
      goals,
      stats: {
        total: goals.length,
        completed: completedCount,
        inProgress: goals.length - completedCount,
        averageProgress: Math.round(averageProgress),
      },
    })
  } catch (error) {
    console.error('Get goals error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create new goal
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, description } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const goal = await prisma.goal.create({
      data: {
        userId: session.user.id,
        title,
        description,
      },
    })

    return NextResponse.json({ goal }, { status: 201 })
  } catch (error) {
    console.error('Create goal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update goal
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id, progress, completed } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Goal ID is required' },
        { status: 400 }
      )
    }

    // Verify goal belongs to user
    const existingGoal = await prisma.goal.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingGoal) {
      return NextResponse.json(
        { error: 'Goal not found' },
        { status: 404 }
      )
    }

    const goal = await prisma.goal.update({
      where: { id },
      data: {
        progress: progress !== undefined ? progress : undefined,
        completed: completed !== undefined ? completed : undefined,
      },
    })

    // Check for goal completion achievement
    if (completed && !existingGoal.completed) {
      const completedGoalsCount = await prisma.goal.count({
        where: {
          userId: session.user.id,
          completed: true,
        },
      })

      if (completedGoalsCount === 1) {
        await prisma.achievement.create({
          data: {
            userId: session.user.id,
            title: 'First Goal Achieved',
            description: 'Completed your first wellness goal',
            icon: '🎯',
          },
        })
      } else if (completedGoalsCount === 5) {
        await prisma.achievement.create({
          data: {
            userId: session.user.id,
            title: 'Goal Getter',
            description: 'Completed 5 wellness goals',
            icon: '🏆',
          },
        })
      }
    }

    return NextResponse.json({ goal })
  } catch (error) {
    console.error('Update goal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete goal
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Goal ID is required' },
        { status: 400 }
      )
    }

    // Verify goal belongs to user
    const goal = await prisma.goal.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!goal) {
      return NextResponse.json(
        { error: 'Goal not found' },
        { status: 404 }
      )
    }

    await prisma.goal.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete goal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
