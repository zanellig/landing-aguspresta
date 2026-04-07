"use client"

import { useEffect, useRef } from "react"

interface CurvedTextProps {
  text: string
  speed?: number
  className?: string
  size?: number
}

export function CurvedText({
  text,
  speed = 0.3,
  className = "",
  size = 200,
}: CurvedTextProps) {
  const pathRef = useRef<SVGTextPathElement>(null)
  const animationRef = useRef<number | null>(null)
  const offsetRef = useRef(0)

  useEffect(() => {
    const animate = () => {
      offsetRef.current = (offsetRef.current + speed) % 100
      if (pathRef.current) {
        pathRef.current.setAttribute("startOffset", `${offsetRef.current}%`)
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed])

  const repeatedText = `${text} • `.repeat(8)

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <path
          id="circlePath"
          d={`M ${size / 2}, ${size / 2} m -${size * 0.4}, 0 a ${size * 0.4},${size * 0.4} 0 1,1 ${size * 0.8},0 a ${size * 0.4},${size * 0.4} 0 1,1 -${size * 0.8},0`}
          fill="none"
        />
      </defs>
      <text className="fill-current text-[11px] font-semibold tracking-[0.3em] uppercase">
        <textPath ref={pathRef} href="#circlePath" startOffset="0%">
          {repeatedText}
        </textPath>
      </text>
    </svg>
  )
}
