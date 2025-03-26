'use client'

import { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  
  const randomMessages = [
    "helo",
    "hmm, idk",
    "me is sigma",
    "uhh...",
    "idk what to say tbh",
    "erm this kinda.. idk what to say"
  ];
  
  const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  
  const codeSnippet = `loadstring(game:HttpGet("https://alternativelol.vercel.app/api/script/full"))()`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] font-['Roboto',sans-serif] relative overflow-hidden p-4">
      {/* Animated glow */}
      <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[rgb(72,138,182)] opacity-20 blur-[100px] animate-pulse-slow"></div>
      
      {/* Main content card - now full width with max-width constraint */}
      <div className="relative z-10 w-full max-w-4xl">
        <div 
          className="rounded-xl border-2 border-[rgb(60,60,60)] bg-[rgba(30,30,30,0.75)] backdrop-blur-sm p-6 md:p-8 relative overflow-hidden"
          style={{
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
          }}
        >
          {/* Noise overlay with adjusted transparency */}
          <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">web not available</h1>
            
            <p className="text-gray-300 mb-6">
              main reason why this thing is on because i hate github :33
            </p>
            
            {/* Code Block with blue background and copy button */}
            <div className="bg-[#141414] rounded-md border border-[#282828] mb-6 overflow-hidden">
              <div className="flex justify-between items-center px-4 py-2 bg-[#191919] border-b border-[#282828]">
                <span className="text-xs text-gray-300">hello :3</span>
                <button 
                  onClick={copyToClipboard}
                  className="text-xs bg-[#191919] hover:bg-[#ffffff] text-white px-3 py-1 rounded transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm text-[#ffffff] font-mono">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
            
            <p className="text-sm text-[rgb(72,138,182)] italic">
              {randomMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}