"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  label?: string
}

export function CustomDropdown({ options, value, onChange, label }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const selectedOption = options.find((option) => option.value === value) || options[0]

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>}
      <div
        className="flex items-center justify-between w-full bg-[#18191c] border border-[#2b2d31] hover:border-[rgb(72,138,182)] rounded-md py-2 px-3 text-white cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-[#18191c] border border-[#2b2d31] rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-[#2b2d31] ${
                option.value === value ? "bg-[#2b2d31] text-[rgb(72,138,182)]" : "text-white"
              }`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
