/**
 * Advanced AI service with OpenAI integration and fallback logic
 * Provides intelligent responses with context awareness
 */

interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}

interface AIResponse {
  message: string
  confidence: number
  sentiment: 'positive' | 'neutral' | 'negative'
  requiresEscalation: boolean
  suggestions?: string[]
}

class AIService {
  private useOpenAI = !!process.env.OPENAI_API_KEY
  private conversationHistory: Map<string, AIMessage[]> = new Map()
  private emotionalKeywords = {
    crisis: ['suicide', 'kill myself', 'hurt', 'harm', 'danger', 'emergency'],
    stress: ['stressed', 'anxiety', 'panic', 'overwhelmed', 'pressure'],
    sadness: ['depressed', 'sad', 'hopeless', 'empty', 'worthless'],
    anger: ['angry', 'rage', 'furious', 'hate', 'frustrated'],
    sleep: ['insomnia', 'sleep', 'tired', 'exhausted', 'fatigue'],
  }

  /**
   * Get AI response for user message
   */
  async getResponse(
    userMessage: string,
    conversationId: string,
    userId: string
  ): Promise<AIResponse> {
    try {
      // Check for crisis keywords first
      const crisisCheck = this.checkForCrisis(userMessage)
      if (crisisCheck.requiresEscalation) {
        return crisisCheck
      }

      // Use OpenAI if available, otherwise fall back to advanced keyword matching
      if (this.useOpenAI) {
        return await this.getOpenAIResponse(userMessage, conversationId)
      } else {
        return this.getSmartResponse(userMessage, conversationId)
      }
    } catch (error) {
      console.error('AI Service Error:', error)
      return this.getSmartResponse(userMessage, conversationId)
    }
  }

  /**
   * Get response from OpenAI
   */
  private async getOpenAIResponse(
    userMessage: string,
    conversationId: string
  ): Promise<AIResponse> {
    const history = this.conversationHistory.get(conversationId) || []

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: `You are Scarlett, an empathetic AI mental health companion for Auriona platform. 
              You provide supportive, non-judgmental conversations about mental health, wellness, and personal growth.
              Be warm, understanding, and always prioritize user safety. If serious crisis is indicated, recommend professional help.
              Keep responses concise (2-3 sentences) and conversational.`,
            },
            ...history,
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 150,
          top_p: 0.9,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      const message = data.choices[0]?.message?.content || ''

      // Update conversation history
      history.push({ role: 'user', content: userMessage })
      history.push({ role: 'assistant', content: message })
      this.conversationHistory.set(conversationId, history.slice(-10)) // Keep last 10 messages

      return {
        message,
        confidence: 0.95,
        sentiment: this.analyzeSentiment(message),
        requiresEscalation: false,
      }
    } catch (error) {
      console.error('OpenAI API Error:', error)
      throw error
    }
  }

  /**
   * Get smart response using advanced pattern matching
   */
  private getSmartResponse(
    userMessage: string,
    conversationId: string
  ): AIResponse {
    const lowerMessage = userMessage.toLowerCase()
    const sentiment = this.analyzeSentiment(userMessage)

    // Context-aware responses
    const responses: Record<string, Record<string, string[]>> = {
      greeting: {
        positive: [
          "Hi there! I'm Scarlett, your AI mental health companion. How are you feeling today?",
          "Welcome! I'm here to listen and support you. What's on your mind?",
          "Hello! I'm glad to connect with you. How can I help you today?",
        ],
        neutral: [
          "Hey! Thanks for stopping by. How can I support you?",
          "Hi! I'm here to chat about whatever you're experiencing.",
          "Hello! What brings you here today?",
        ],
      },
      stress: {
        positive: [
          "It sounds like you're dealing with a lot. Remember, it's okay to take breaks and practice self-care.",
          "Stress is a normal part of life. Let's talk about what's making you feel this way.",
          "I hear you. Sometimes breaking tasks into smaller steps can help manage stress.",
        ],
        negative: [
          "That sounds really overwhelming. Have you considered talking to someone you trust?",
          "It's clear you're struggling. Remember, reaching out for help is a sign of strength.",
          "I'm concerned about what you're sharing. Professional support might really help.",
        ],
      },
      mood_check: {
        positive: [
          "That's wonderful to hear! What made your day special?",
          "I'm so glad you're feeling good! Keep nurturing that positive energy.",
          "That's great! Let's build on that positive momentum.",
        ],
        negative: [
          "Thank you for sharing. Would talking about what's bothering you help?",
          "I'm here to listen. What's contributing to how you're feeling?",
          "It's okay to have tough days. What can help you feel better?",
        ],
      },
      gratitude: {
        positive: [
          "You're welcome! I'm here whenever you need support.",
          "It's my pleasure to help. Keep taking care of yourself!",
          "Thank you for trusting me with your thoughts. That means a lot.",
        ],
        negative: [
          "Of course, I'm always here for you.",
          "No problem at all. That's what I'm here for.",
          "Anytime! Your well-being matters.",
        ],
      },
    }

    // Determine message category
    let category = 'neutral'
    let responseList = responses['mood_check']?.[sentiment] || []

    if (
      ['hi', 'hello', 'hey', 'greetings', 'start', 'begin'].some((word) =>
        lowerMessage.includes(word)
      )
    ) {
      category = 'greeting'
      responseList = responses['greeting']?.[sentiment] || []
    } else if (
      ['stress', 'anxiety', 'worried', 'overwhelmed', 'pressure'].some((word) =>
        lowerMessage.includes(word)
      )
    ) {
      category = 'stress'
      responseList = responses['stress']?.[sentiment] || []
    } else if (
      ['thanks', 'thank you', 'appreciate', 'grateful'].some((word) =>
        lowerMessage.includes(word)
      )
    ) {
      category = 'gratitude'
      responseList = responses['gratitude']?.[sentiment] || []
    } else if (
      ['feel', 'feeling', 'mood', 'how are', 'doing'].some((word) =>
        lowerMessage.includes(word)
      )
    ) {
      category = 'mood_check'
      responseList = responses['mood_check']?.[sentiment] || []
    }

    const message =
      responseList.length > 0
        ? responseList[Math.floor(Math.random() * responseList.length)]
        : this.getDefaultResponse(sentiment)

    return {
      message,
      confidence: 0.85,
      sentiment,
      requiresEscalation: false,
      suggestions: this.generateSuggestions(userMessage, sentiment),
    }
  }

  /**
   * Check for crisis indicators
   */
  private checkForCrisis(message: string): AIResponse {
    const lowerMessage = message.toLowerCase()

    for (const keyword of this.emotionalKeywords.crisis) {
      if (lowerMessage.includes(keyword)) {
        return {
          message: `I'm really concerned about what you've shared. Please reach out to a mental health professional or crisis service immediately:
          
🆘 **International Resources:**
• 988 Suicide & Crisis Lifeline (US): Call or text 988
• Crisis Text Line: Text HOME to 741741
• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

You matter, and help is available. I'm here to support, but professional guidance is crucial right now.`,
          confidence: 1.0,
          sentiment: 'negative',
          requiresEscalation: true,
        }
      }
    }

    return {
      message: '',
      confidence: 0,
      sentiment: 'neutral',
      requiresEscalation: false,
    }
  }

  /**
   * Analyze sentiment of message
   */
  private analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const lowerText = text.toLowerCase()

    const positiveWords = [
      'good',
      'great',
      'happy',
      'wonderful',
      'excellent',
      'better',
      'excited',
      'grateful',
      'blessed',
    ]
    const negativeWords = [
      'bad',
      'sad',
      'angry',
      'terrible',
      'awful',
      'depressed',
      'anxious',
      'worried',
      'scared',
    ]

    let sentiment = 'neutral'
    let positiveCount = 0
    let negativeCount = 0

    for (const word of positiveWords) {
      if (lowerText.includes(word)) positiveCount++
    }

    for (const word of negativeWords) {
      if (lowerText.includes(word)) negativeCount++
    }

    if (positiveCount > negativeCount) {
      sentiment = 'positive'
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative'
    }

    return sentiment as 'positive' | 'neutral' | 'negative'
  }

  /**
   * Generate follow-up suggestions
   */
  private generateSuggestions(
    message: string,
    sentiment: 'positive' | 'neutral' | 'negative'
  ): string[] {
    const suggestions: string[] = []

    if (sentiment === 'negative') {
      suggestions.push('Try journaling your feelings', 'Take a short break', 'Practice breathing exercises')
    } else if (sentiment === 'positive') {
      suggestions.push('Share your achievement', 'Build on this momentum', 'Celebrate your progress')
    } else {
      suggestions.push('Track your mood regularly', 'Set a personal goal', 'Explore resources')
    }

    return suggestions.slice(0, 2)
  }

  /**
   * Default response fallback
   */
  private getDefaultResponse(sentiment: 'positive' | 'neutral' | 'negative'): string {
    const defaults = {
      positive: "That's wonderful! I'm here to celebrate your progress with you. 🎉",
      neutral: "I appreciate you sharing that. Tell me more about how you're feeling.",
      negative: "I hear you. Remember, it's okay to have difficult moments. I'm here to listen.",
    }

    return defaults[sentiment]
  }
}

// Global AI service instance
export const aiService = new AIService()
