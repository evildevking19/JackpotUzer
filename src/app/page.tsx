import Dashboard from "@/components/Dashboard"
import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import React from "react"


export const metadata: Metadata = {
  title:
    "Uzer Pass | JackPot Dashboard",
  description: "JackPot Admin Dashboard",
}

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  )
}
