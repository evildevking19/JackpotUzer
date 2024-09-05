import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import PotsValueComponent from "@/components/PotsValue"

export const metadata: Metadata = {
    title: "Uzer Pass | Configuration | Value of Pots",
}

const PotsValue = () => {
  return (
    <DefaultLayout>
      <PotsValueComponent />
    </DefaultLayout>
  )
}

export default PotsValue
