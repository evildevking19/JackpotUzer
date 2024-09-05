import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import RealiCardDetailComponent from "@/components/RealiCard/detail"

export const metadata: Metadata = {
    title: "Uzer Pass | Realize Card | Detail",
}

const RealiCardDetail = () => {
  return (
    <DefaultLayout>
      <RealiCardDetailComponent />
    </DefaultLayout>
  )
}

export default RealiCardDetail
