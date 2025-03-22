import crypto from "crypto"

// Class to manage the script secret with automatic rotation
class SecretManager {
  private currentSecret: string
  private previousSecret: string | null
  private rotationInterval: NodeJS.Timeout | null

  constructor() {
    // Initialize with a random secret
    this.currentSecret = this.generateRandomSecret()
    this.previousSecret = null
    this.rotationInterval = null

    // Start the rotation timer
    this.startRotation()
  }

  // Generate a cryptographically secure random secret
  private generateRandomSecret(): string {
    return "ALT_" + crypto.randomBytes(16).toString("hex")
  }

  // Start the automatic rotation
  private startRotation(): void {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval)
    }

    // Rotate the secret every 24 hours
    const ROTATION_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours

    this.rotationInterval = setInterval(() => {
      this.rotateSecret()
    }, ROTATION_INTERVAL)
  }

  // Rotate the secret
  private rotateSecret(): void {
    console.log("Rotating script secret...")
    this.previousSecret = this.currentSecret
    this.currentSecret = this.generateRandomSecret()
    console.log("Script secret rotated successfully")
  }

  // Get the current secret
  public getSecret(): string {
    return this.currentSecret
  }

  // Validate a signature against current or previous secret
  public validateSignature(data: string, signature: string): boolean {
    // Check against current secret
    const currentSignature = this.generateSignature(data, this.currentSecret)
    if (this.timingSafeEqual(currentSignature, signature)) {
      return true
    }

    // If that fails and we have a previous secret, check against that
    if (this.previousSecret) {
      const previousSignature = this.generateSignature(data, this.previousSecret)
      return this.timingSafeEqual(previousSignature, signature)
    }

    return false
  }

  // Generate a signature using the provided secret
  public generateSignature(data: string, secret: string = this.currentSecret): string {
    return crypto.createHmac("sha256", secret).update(data).digest("hex")
  }

  // Timing-safe comparison to prevent timing attacks
  private timingSafeEqual(a: string, b: string): boolean {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"))
  }

  // Clean up when the server shuts down
  public cleanup(): void {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval)
      this.rotationInterval = null
    }
  }
}

// Create a singleton instance
const secretManager = new SecretManager()

// Handle cleanup on server shutdown
if (typeof process !== "undefined") {
  process.on("SIGTERM", () => {
    secretManager.cleanup()
  })

  process.on("SIGINT", () => {
    secretManager.cleanup()
  })
}

export default secretManager

