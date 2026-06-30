'use client'
import { useSidebar } from './SidebarProvider'

export default function Sidebar() {
  const { isOpen, close } = useSidebar()

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div className="sidebar-backdrop" onClick={close} />
      )}

      {/* Sliding panel */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/dashboard">Dashboard</a>
        </nav>
      </aside>
    </>
  )
}