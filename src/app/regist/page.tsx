import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import RegistComponent from "@/components/Registration"

export const metadata: Metadata = {
    title: "Uzer Pass | Registration Jackpot",
}

const Regist = () => {
  return (
    <DefaultLayout>
      <RegistComponent />
    </DefaultLayout>
  )
}

export default Regist
