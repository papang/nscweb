'use client'
import { useSidebar } from './SidebarProvider'

export default function SidebarToggle() {
  const { toggle } = useSidebar()
  return (
    <button onClick={toggle} aria-label="Toggle menu">
      ☰
    </button>
  )
}