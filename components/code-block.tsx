"use client"

import { useRef, useState } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = "lua", className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  // Highlight the code
  const highlightedCode = hljs.highlight(code, { language }).value

  const copyToClipboard = async () => {
    if (codeRef.current) {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy text: ", err)
      }
    }
  }

  return (
    <div className={`relative rounded-md overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#18191c] border-b border-[#2b2d31]">
        <span className="text-sm text-gray-400">{language}</span>
      </div>
      <div className="relative">
        <pre className="bg-[#18191c] p-4 overflow-x-auto max-h-[120px]">
          <code
            ref={codeRef}
            className={`language-${language} text-sm`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-md bg-[#2b2d31] bg-opacity-70 text-gray-400 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  )
}
