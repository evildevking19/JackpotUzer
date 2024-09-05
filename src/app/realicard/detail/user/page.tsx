import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import RealiCardDetailUserComponent from "@/components/RealiCard/user"

export const metadata: Metadata = {
    title: "Uzer Pass | Realize Card | Detail | User",
}

const RealiCardDetailUser = () => {
  return (
    <DefaultLayout>
      <RealiCardDetailUserComponent />
    </DefaultLayout>
  )
}

export default RealiCardDetailUser
