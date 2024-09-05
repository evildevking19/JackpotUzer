import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import TimeListComponent from "@/components/Time"

export const metadata: Metadata = {
    title: "Uzer Pass | Configuration | Time",
}

const Time = () => {
  return (
    <DefaultLayout>
      <TimeListComponent />
    </DefaultLayout>
  )
}

export default Time
