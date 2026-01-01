import { NextRequest, NextResponse } from 'next/server';

// AI Response Generator with emotional intelligence
const getCompassionateResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Emotion detection and response mapping
  const emotionResponses: Record<string, string[]> = {
    stress: [
      "I understand you're feeling stressed. Let's take a deep breath together. Remember, you're stronger than you think.",
      "Stress is a normal part of life, but you don't have to face it alone. I'm here to help you find peace.",
      "It's okay to feel overwhelmed sometimes. Let's break this down into smaller, manageable steps.",
    ],
    sad: [
      "I'm here for you during this difficult time. Your feelings are valid and important.",
      "It's okay to feel sad. Sometimes we need to feel our emotions fully before we can heal.",
      "Remember that sadness is temporary, and brighter days are coming. You've overcome challenges before.",
    ],
    alone: [
      "You're never truly alone. I'm here for you, and there are many people who care about you.",
      "Loneliness can be challenging, but reaching out is a brave first step. I'm proud of you.",
      "Connection is important. Let's talk about ways to build meaningful relationships.",
    ],
    doubt: [
      "You have so much value and potential. Don't underestimate yourself.",
      "Self-doubt is common, but it doesn't define your worth. You are capable and deserving.",
      "I believe in you, even when you don't believe in yourself. Let's work through this together.",
    ],
    happy: [
      "That's wonderful! I'm so glad you're feeling positive. Let's celebrate this moment!",
      "Your happiness is contagious! Keep spreading that positive energy.",
      "This is beautiful to hear. You deserve all the good things coming your way.",
    ],
    sleep: [
      "Getting good rest is crucial for mental health. Have you been sleeping well?",
      "If you're having trouble sleeping, let's talk about healthy sleep habits and relaxation techniques.",
      "Rest is not laziness; it's self-care. Make sure you're taking care of yourself.",
    ],
    motivation: [
      "You have the power within you to achieve your goals. Let's break them down into actionable steps.",
      "When motivation is low, remember why you started. Your goals are worth pursuing.",
      "Energy comes and goes, and that's perfectly normal. Be gentle with yourself.",
    ],
    relationship: [
      "Relationships are the foundation of our wellbeing. Communication is key.",
      "It's important to surround yourself with people who uplift and support you.",
      "Healthy relationships require effort from both sides. You deserve to be valued.",
    ],
  };

  for (const [emotion, responses] of Object.entries(emotionResponses)) {
    if (lowerMessage.includes(emotion)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  const defaultResponses = [
    "Thank you for sharing that with me. I'm here to listen and support you.",
    "That sounds important. Can you tell me more about what you're experiencing?",
    "I appreciate your trust in sharing this. Let's explore this together.",
    "You're doing great by reaching out. How can I help you further?",
    "Your wellbeing matters. Let's work through this together, one step at a time.",
    "I'm listening. Please continue, and know that you're safe here.",
    "That takes courage to share. I'm proud of you for opening up.",
    "Let's focus on what you can control and find solutions together.",
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate compassionate response
    const response = getCompassionateResponse(message);

    // Simulate thinking time for realistic feel
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

    return NextResponse.json(
      {
        success: true,
        response,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Message API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Auriona Message API is operational',
      status: 'ready',
    },
    { status: 200 }
  );
}
