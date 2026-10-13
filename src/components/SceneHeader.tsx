import type { ReactNode } from 'react'

interface SceneHeaderProps {
  kicker: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export function SceneHeader({ kicker, title, subtitle, children }: SceneHeaderProps) {
  return (
    <header style={{ marginBottom: 8 }}>
      <p className="scene-kicker handwriting">{kicker}</p>
      <h1 className="scene-title">{title}</h1>
      {subtitle && <p className="scene-subtitle">{subtitle}</p>}
      {children}
    </header>
  )
}
