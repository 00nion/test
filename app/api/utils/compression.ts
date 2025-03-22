import zlib from "zlib"
import { promisify } from "util"

const gzipPromise = promisify(zlib.gzip)
const gunzipPromise = promisify(zlib.gunzip)

// Function to compress a string
export async function compressString(input: string): Promise<Buffer> {
  return await gzipPromise(Buffer.from(input, "utf-8"))
}

// Function to decompress a buffer to a string
export async function decompressBuffer(input: Buffer): Promise<string> {
  const decompressed = await gunzipPromise(input)
  return decompressed.toString("utf-8")
}

// Function to chunk a large string into smaller pieces
export function chunkString(str: string, size: number): string[] {
  const chunks = []
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.substring(i, i + size))
  }
  return chunks
}

// Function to encode a string as base64
export function encodeBase64(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64")
}

// Function to decode a base64 string
export function decodeBase64(base64: string): string {
  return Buffer.from(base64, "base64").toString("utf-8")
}

