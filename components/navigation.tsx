"use client"

import { Home, Map, BookOpen, MessageSquareHeart, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Track & Plan",
      href: "/track-plan",
      icon: <Map className="h-5 w-5" />,
    },
    {
      name: "Learn Space",
      href: "/learn-space",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Curriculum Hub",
      href: "/curriculum-hub",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Language",
      href: "/mind-boost",
      icon: <MessageSquareHeart className="h-5 w-5" />,
    },
    {
      name: "Next Step",
      href: "/next-step",
      icon: <MessageSquareHeart className="h-5 w-5" />,
    },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-4 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 ${
                isActive(item.href) ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 py-3 px-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-100 p-1 rounded-full">
            <MessageSquareHeart className="h-5 w-5 text-blue-600" />
          </div>
          <span className="font-medium text-blue-700">Dr. AIVA</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 ${
                isActive(item.href) ? "text-blue-600 font-medium" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 p-2 rounded-md ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
