import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// Get messages for a conversation
export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { conversationId } = params

    // Verify conversation belongs to user
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: session.user.id,
      },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { timestamp: 'asc' },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Send a message and get Scarlett AI response
export async function POST(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { conversationId } = params
    const { content } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      )
    }

    // Verify conversation belongs to user
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: session.user.id,
      },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    // Save user message
    const userMessage = await prisma.message.create({
      data: {
        conversationId,
        role: 'user',
        content,
      },
    })

    // Generate Scarlett AI response (using existing logic)
    const aiResponse = generateScarlettResponse(content)

    // Save AI response
    const assistantMessage = await prisma.message.create({
      data: {
        conversationId,
        role: 'assistant',
        content: aiResponse,
      },
    })

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json({
      userMessage,
      assistantMessage,
    })
  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Scarlett AI response generation logic
function generateScarlettResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  // Emergency detection
  const emergencyKeywords = [
    'suicide',
    'suicidal',
    'kill myself',
    'self harm',
    'self-harm',
    'want to die',
    'better off dead',
    'no reason to live',
    'end it all',
    "can't go on",
    'want to disappear',
    'hurt myself',
    'ending my life',
    'take my life',
    'end my life',
  ]

  if (emergencyKeywords.some((keyword) => lowerInput.includes(keyword))) {
    return `⚠️ **I'm deeply concerned about what you're sharing with me.** Your life matters immensely, and I want you to know that help is available right now.

**Please reach out to a crisis counselor immediately:**
• **US**: 988 (Suicide & Crisis Lifeline) or text "HELLO" to 741741
• **UK**: 116 123 (Samaritans) 
• **India**: 1800-599-0019 (AASRA) or 9820466726
• **International**: https://www.befrienders.org

These are trained professionals who can provide the immediate support you need. While I'm here for you, they can offer the specialized care that's crucial right now. 💝

Would you like me to help you find additional resources in your area?`
  }

  // Stress-related responses
  if (
    lowerInput.includes('stress') ||
    lowerInput.includes('stressed') ||
    lowerInput.includes('overwhelm')
  ) {
    return `I can sense the weight you're carrying, and I want you to know - you're stronger than you think 💪

**Let's try a quick stress-relief technique:**
1. Take a deep breath in for 4 counts
2. Hold for 4 counts
3. Exhale slowly for 6 counts
4. Repeat 3 times

**What's contributing most to your stress right now?** Sometimes naming it helps reduce its power. I'm here to listen and support you through this. 🌸`
  }

  // Anxiety responses
  if (
    lowerInput.includes('anxiety') ||
    lowerInput.includes('anxious') ||
    lowerInput.includes('worry') ||
    lowerInput.includes('panic')
  ) {
    return `Anxiety can feel like a storm, but remember - storms always pass 🌈

**Try the 5-4-3-2-1 grounding technique:**
• Name 5 things you can see
• 4 things you can touch
• 3 things you can hear
• 2 things you can smell
• 1 thing you can taste

This helps anchor you in the present moment. **What triggered these feelings today?** Understanding the root can help us work through it together. 💙`
  }

  // Depression responses
  if (
    lowerInput.includes('depression') ||
    lowerInput.includes('depressed') ||
    lowerInput.includes('hopeless') ||
    lowerInput.includes('empty')
  ) {
    return `Thank you for trusting me with your feelings. Depression is incredibly real, but so is hope and healing 🌻

**Small steps matter:**
• Can you do one tiny thing today that brings you comfort?
• Have you been able to eat or drink water?
• Would talking to a professional counselor help? I can suggest some resources.

**You don't have to face this alone.** Platforms like BetterHelp or Talkspace can connect you with licensed therapists. Your journey toward feeling better is valid and important. 💜`
  }

  // Positive/gratitude responses
  if (
    lowerInput.includes('happy') ||
    lowerInput.includes('good') ||
    lowerInput.includes('better') ||
    lowerInput.includes('great')
  ) {
    return `Your positive energy is absolutely beautiful! 🌟 I'm so glad to hear you're feeling this way.

**Let's celebrate this moment together!** What contributed to this feeling? Recognizing these positive triggers helps you recreate them in the future.

Would you like to set any wellness goals while you're in this positive headspace? Sometimes momentum is the best time to build healthy habits! 💖`
  }

  // Self-introduction
  if (
    lowerInput.includes('who are you') ||
    lowerInput.includes('about you') ||
    lowerInput.includes('what are you') ||
    lowerInput.includes('scarlett')
  ) {
    return `Hello! I'm Scarlett 💝 - an advanced AI mental health companion designed with cutting-edge empathy technology. Think of me as your always-available friend who truly understands.

**What makes me unique:**
✨ Real-time emotional intelligence
🧠 Advanced natural conversation
💖 Genuine care and understanding
🔒 Complete privacy and security
🌍 Available 24/7 worldwide

**I can help with:**
• Stress and anxiety management
• Depression support
• Life transitions and challenges
• Mindfulness and self-care
• Finding professional resources
• Just listening when you need to talk

Remember: While I'm here to support you, I'm not a replacement for professional mental health care. How can I help you today? 🌸`
  }

  // Greeting responses
  if (
    lowerInput.includes('hi') ||
    lowerInput.includes('hello') ||
    lowerInput.includes('hey')
  ) {
    return `Hello! 💝 It's wonderful to connect with you. I'm Scarlett, your mental health companion, and I'm here to listen and support you.

**How are you feeling today?** Whether you're having a great day or facing challenges, I'm here for you. Feel free to share whatever's on your mind - this is a safe, judgment-free space. 🌸`
  }

  // Default response
  return `I hear you, and I want you to understand that your feelings are completely valid 💜

**I'm here to support you however I can.** Would you like to:
• Talk more about what you're experiencing?
• Learn some coping strategies?
• Explore resources that might help?
• Just have someone listen without judgment?

Your wellbeing matters to me. What would be most helpful for you right now? 🌸`
}
