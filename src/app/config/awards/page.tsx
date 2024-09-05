import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import AwardsComponent from "@/components/Awards"

export const metadata: Metadata = {
    title: "Uzer Pass | Configuration | Awards",
}

const Awards = () => {
  return (
    <DefaultLayout>
      <AwardsComponent />
    </DefaultLayout>
  )
}

export default Awards
