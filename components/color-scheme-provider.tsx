'use client'

import { useEffect } from 'react'
import { useContent } from '@/lib/content-context'
import { colorSchemes, type ColorScheme } from '@/lib/content-types'

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const { siteContent } = useContent()
  const scheme = siteContent.colorScheme || 'default'

  useEffect(() => {
    const colors = colorSchemes[scheme as ColorScheme] || colorSchemes.default
    
    // Update CSS custom properties
    const root = document.documentElement
    root.style.setProperty('--primary', colors.primary)
    root.style.setProperty('--ring', colors.primary)
    root.style.setProperty('--chart-1', colors.primary)
    root.style.setProperty('--accent', colors.accent)
    root.style.setProperty('--destructive', colors.accent)
    root.style.setProperty('--chart-2', colors.accent)
    root.style.setProperty('--background', colors.background)
    
    // Update secondary/muted based on background hue
    const bgMatch = colors.background.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/)
    if (bgMatch) {
      const [, , chroma, hue] = bgMatch
      root.style.setProperty('--secondary', `oklch(0.95 ${chroma} ${hue})`)
      root.style.setProperty('--muted', `oklch(0.92 ${chroma} ${hue})`)
      root.style.setProperty('--border', `oklch(0.88 ${chroma} ${hue})`)
      root.style.setProperty('--input', `oklch(0.95 ${chroma} ${hue})`)
    }
  }, [scheme])

  return <>{children}</>
}
