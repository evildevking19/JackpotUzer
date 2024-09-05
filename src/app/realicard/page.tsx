import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import RealiCardComponent from "@/components/RealiCard"

export const metadata: Metadata = {
    title: "Uzer Pass | Realize Card",
}

const RealiCard = () => {
  return (
    <DefaultLayout>
      <RealiCardComponent />
    </DefaultLayout>
  )
}

export default RealiCard
