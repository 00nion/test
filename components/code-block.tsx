"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({ code, language = "lua", showLineNumbers = false, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // For Lua syntax highlighting
  const renderLuaCode = () => {
    // Extract the version from the code
    const version = code.includes("lite") ? "lite" : "full"

    return (
      <code className="language-lua text-white">
        <span className="text-[#FF7B72]">loadstring</span>(<span className="text-[#A5D6FF]">game</span>:
        <span className="text-[#D2A8FF]">HttpGet</span>(
        <span className="text-[#79C0FF]">{`"https://alt-lol.vercel.app/api/script/${version}"`}</span>
        ))()
      </code>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-grow rounded-lg bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/60 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-zinc-700/60 overflow-x-auto h-10">
        <pre className="h-full flex items-center px-3 text-sm font-mono overflow-x-auto whitespace-nowrap">
          {language === "lua" ? renderLuaCode() : <code className="text-white">{code}</code>}
        </pre>
      </div>
      <button
        className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/60 hover:border-zinc-700/60 rounded-lg transition-colors"
        onClick={copyCode}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </button>
    </div>
  )
}

