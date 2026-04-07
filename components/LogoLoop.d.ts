import type { CSSProperties, JSX, ReactNode } from "react"

type LogoLoopImageItem = {
  src: string
  alt?: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
  title?: string
  href?: string
  ariaLabel?: string
}

type LogoLoopNodeItem = {
  node: ReactNode
  href?: string
  ariaLabel?: string
  title?: string
}

export type LogoLoopItem = LogoLoopImageItem | LogoLoopNodeItem

export type LogoLoopProps = {
  logos: LogoLoopItem[]
  speed?: number
  direction?: "left" | "right" | "up" | "down"
  width?: number | string
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  hoverSpeed?: number
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  renderItem?: (item: LogoLoopItem, key: string | number) => ReactNode
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}

declare function LogoLoop(props: LogoLoopProps): JSX.Element

export default LogoLoop
