"use client"
import "@/css/montserrat.css"
import "@/css/style.css"
import React, { useEffect, useState } from "react"

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-dark">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)

  // const pathname = usePathname()

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {loading ? <Loader /> : children}
      </body>
    </html>
  )
}
