import * as THREE from "three"

export interface FacialExpression {
  name: string
  morphTargets: {
    [key: string]: number
  }
  duration: number
}

export interface FacialAnimationConfig {
  expressions: Map<string, FacialExpression>
  blinkRate: number
  eyeTrackingEnabled: boolean
  jawMovementScale: number
  eyebrowMovementScale: number
}

export class FacialAnimationSystem {
  private config: FacialAnimationConfig
  private currentExpression: string = "neutral"
  private blinkTimer: number = 0
  private lastBlinkTime: number = Date.now()
  private isBlinking: boolean = false
  private eyebrowPosition: number = 0
  private jawPosition: number = 0

  constructor(config: Partial<FacialAnimationConfig> = {}) {
    this.config = {
      expressions: new Map(),
      blinkRate: 5000, // milliseconds between blinks
      eyeTrackingEnabled: true,
      jawMovementScale: 1.0,
      eyebrowMovementScale: 1.0,
      ...config,
    }

    this.initializeExpressions()
  }

  private initializeExpressions() {
    const expressions: Record<string, FacialExpression> = {
      neutral: {
        name: "Neutral",
        morphTargets: {
          eyeOpen: 1.0,
          mouthSmile: 0,
          eyebrowUp: 0,
          eyebrowDown: 0,
          pupilDilation: 0.5,
        },
        duration: 1000,
      },
      happy: {
        name: "Happy",
        morphTargets: {
          eyeOpen: 0.95,
          mouthSmile: 1.0,
          eyebrowUp: 0.3,
          eyebrowDown: 0,
          pupilDilation: 0.6,
          cheekRaise: 0.8,
        },
        duration: 800,
      },
      sad: {
        name: "Sad",
        morphTargets: {
          eyeOpen: 0.6,
          mouthSmile: -0.8,
          eyebrowUp: 0,
          eyebrowDown: 0.7,
          pupilDilation: 0.4,
          cheekRaise: 0,
        },
        duration: 800,
      },
      concerned: {
        name: "Concerned",
        morphTargets: {
          eyeOpen: 0.9,
          mouthSmile: -0.3,
          eyebrowUp: 0.5,
          eyebrowDown: 0.2,
          pupilDilation: 0.55,
          cheekRaise: 0.3,
        },
        duration: 800,
      },
      listening: {
        name: "Listening",
        morphTargets: {
          eyeOpen: 1.0,
          mouthSmile: 0.1,
          eyebrowUp: 0.2,
          eyebrowDown: 0,
          pupilDilation: 0.6,
          cheekRaise: 0.2,
        },
        duration: 600,
      },
      surprised: {
        name: "Surprised",
        morphTargets: {
          eyeOpen: 1.0,
          mouthSmile: 0.5,
          eyebrowUp: 1.0,
          eyebrowDown: 0,
          pupilDilation: 1.0,
          cheekRaise: 0.4,
        },
        duration: 600,
      },
      compassionate: {
        name: "Compassionate",
        morphTargets: {
          eyeOpen: 0.95,
          mouthSmile: 0.4,
          eyebrowUp: 0.2,
          eyebrowDown: 0.15,
          pupilDilation: 0.65,
          cheekRaise: 0.5,
        },
        duration: 1200,
      },
      thinking: {
        name: "Thinking",
        morphTargets: {
          eyeOpen: 0.85,
          mouthSmile: 0,
          eyebrowUp: 0,
          eyebrowDown: 0.3,
          pupilDilation: 0.55,
          cheekRaise: 0,
        },
        duration: 800,
      },
    }

    for (const [key, expr] of Object.entries(expressions)) {
      this.config.expressions.set(key, expr)
    }
  }

  public setExpression(expressionName: string): boolean {
    if (this.config.expressions.has(expressionName)) {
      this.currentExpression = expressionName
      return true
    }
    return false
  }

  public getExpression(expressionName: string): FacialExpression | undefined {
    return this.config.expressions.get(expressionName)
  }

  public getCurrentExpression(): string {
    return this.currentExpression
  }

  // Real-time facial animation based on audio/speaking
  public updateSpeakingAnimation(audioLevel: number): {
    jawOpen: number
    mouthScale: number
    lipsRound: number
  } {
    const jawOpen = Math.max(0, Math.min(1, audioLevel)) * this.config.jawMovementScale
    const mouthScale = 0.8 + jawOpen * 0.4
    const lipsRound = jawOpen * 0.6

    return {
      jawOpen,
      mouthScale,
      lipsRound,
    }
  }

  // Eye tracking - look towards a point
  public updateEyeTracking(targetX: number, targetY: number): {
    eyeRotationX: number
    eyeRotationY: number
    pupilScale: number
  } {
    // Normalize input to [-1, 1]
    const x = Math.max(-1, Math.min(1, targetX))
    const y = Math.max(-1, Math.min(1, targetY))

    // Eye rotation limits
    const maxEyeRotation = 0.3 // radians

    return {
      eyeRotationX: y * maxEyeRotation,
      eyeRotationY: x * maxEyeRotation,
      pupilScale: 0.8 + Math.abs(x + y) * 0.2,
    }
  }

  // Blinking animation
  public updateBlinking(): {
    eyeOpenLeft: number
    eyeOpenRight: number
    shouldBlink: boolean
  } {
    const now = Date.now()
    const timeSinceBlink = now - this.lastBlinkTime

    // Check if it's time to blink
    if (timeSinceBlink > this.config.blinkRate) {
      this.isBlinking = true
      this.lastBlinkTime = now
      this.blinkTimer = 0
    }

    let eyeOpen = 1.0
    const blinkDuration = 150 // milliseconds

    if (this.isBlinking) {
      this.blinkTimer += 16 // Approximate 60fps
      const blinkProgress = this.blinkTimer / blinkDuration

      if (blinkProgress >= 1) {
        this.isBlinking = false
        eyeOpen = 1.0
      } else if (blinkProgress < 0.5) {
        // Closing
        eyeOpen = 1.0 - blinkProgress * 2
      } else {
        // Opening
        eyeOpen = (blinkProgress - 0.5) * 2
      }
    }

    // Add natural variation
    const variation = Math.sin(timeSinceBlink * 0.001) * 0.05
    eyeOpen = Math.max(0, Math.min(1, eyeOpen + variation))

    return {
      eyeOpenLeft: eyeOpen,
      eyeOpenRight: eyeOpen,
      shouldBlink: this.isBlinking,
    }
  }

  // Micro-expressions during conversation
  public getMicroExpression(emotionalIntensity: number = 0.5): Partial<FacialExpression> {
    const intensity = Math.max(0, Math.min(1, emotionalIntensity))

    return {
      morphTargets: {
        eyebrowUp: intensity * 0.1,
        eyebrowDown: 0,
        mouthSmile: intensity * 0.2,
        pupilDilation: 0.5 + intensity * 0.1,
      },
    }
  }

  // Synchronize with speech - phoneme-based animation
  public getSpeechAnimation(phoneme: string, intensity: number = 1.0): {
    jawOpenAmount: number
    lipRoundness: number
    tonguePush: number
  } {
    const phonemeAnimations: Record<string, { jaw: number; lips: number; tongue: number }> = {
      // Vowels
      a: { jaw: 0.8, lips: 0.2, tongue: 0.3 },
      e: { jaw: 0.6, lips: 0.1, tongue: 0.2 },
      i: { jaw: 0.4, lips: 0.3, tongue: 0.4 },
      o: { jaw: 0.9, lips: 0.7, tongue: 0.1 },
      u: { jaw: 0.7, lips: 0.8, tongue: 0.2 },

      // Consonants
      m: { jaw: 0.2, lips: 1.0, tongue: 0.3 },
      b: { jaw: 0.3, lips: 1.0, tongue: 0.2 },
      p: { jaw: 0.3, lips: 1.0, tongue: 0.2 },
      f: { jaw: 0.3, lips: 0.6, tongue: 0.4 },
      v: { jaw: 0.3, lips: 0.6, tongue: 0.4 },
      t: { jaw: 0.4, lips: 0.2, tongue: 0.9 },
      d: { jaw: 0.4, lips: 0.1, tongue: 0.9 },
      n: { jaw: 0.4, lips: 0.1, tongue: 0.7 },
      s: { jaw: 0.2, lips: 0.3, tongue: 0.8 },
      z: { jaw: 0.2, lips: 0.3, tongue: 0.8 },
      th: { jaw: 0.3, lips: 0.2, tongue: 0.9 },
      sh: { jaw: 0.3, lips: 0.4, tongue: 0.6 },
      ch: { jaw: 0.5, lips: 0.3, tongue: 0.7 },
      l: { jaw: 0.3, lips: 0.1, tongue: 0.9 },
      r: { jaw: 0.4, lips: 0.2, tongue: 0.8 },
      k: { jaw: 0.4, lips: 0.0, tongue: 0.7 },
      g: { jaw: 0.4, lips: 0.0, tongue: 0.7 },
    }

    const anim = phonemeAnimations[phoneme] || { jaw: 0.3, lips: 0.3, tongue: 0.3 }

    return {
      jawOpenAmount: anim.jaw * intensity,
      lipRoundness: anim.lips * intensity,
      tonguePush: anim.tongue * intensity,
    }
  }

  // Generate random natural movements
  public getNaturalIdleMovement(
    elapsedTime: number
  ): {
    headTilt: number
    eyebrowFlicker: number
    subtleBlink: number
    mouthTwitch: number
  } {
    return {
      headTilt: Math.sin(elapsedTime * 0.3) * 0.05,
      eyebrowFlicker: Math.sin(elapsedTime * 0.7 + 1.2) * 0.03,
      subtleBlink: Math.sin(elapsedTime * 2.1) > 0.98 ? 0.1 : 0,
      mouthTwitch: Math.sin(elapsedTime * 1.3) * 0.02,
    }
  }

  // Emotional state based on context
  public getEmotionalExpression(
    context: "listening" | "concerned" | "supportive" | "thinking" | "celebrating"
  ): string {
    const emotionalMap: Record<string, string> = {
      listening: "listening",
      concerned: "concerned",
      supportive: "compassionate",
      thinking: "thinking",
      celebrating: "happy",
    }

    return emotionalMap[context] || "neutral"
  }
}

// Export for use in components
export const facialAnimationSystem = new FacialAnimationSystem()
