"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from 'lucide-react'
import hljs from 'highlight.js/lib/core'
import lua from 'highlight.js/lib/languages/lua'
import 'highlight.js/styles/github-dark.css' // GitHub-like dark theme

// Register Lua language
hljs.registerLanguage('lua', lua)

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({ code, language = "lua", showLineNumbers = false, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState('')

  useEffect(() => {
    // Highlight the code when it changes
    const highlighted = hljs.highlight(code, { language }).value
    setHighlightedCode(highlighted)
  }, [code, language])

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="overflow-x-auto rounded-lg bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/60 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:border-zinc-700/60">
        <pre className="p-4 text-sm font-mono scrollbar-hide">
          <code 
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          ></code>
        </pre>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-zinc-400 hover:text-white bg-transparent opacity-0 group-hover:opacity-100 hover:bg-zinc-800/70 focus:bg-zinc-800/70 transition-all duration-200"
        onClick={copyCode}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  )
}