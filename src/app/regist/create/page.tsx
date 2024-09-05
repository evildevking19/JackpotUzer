import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import CreateNewRegist from "@/components/Registration/create"

export const metadata: Metadata = {
    title: "Uzer Pass | Registration Jackpot | Add New",
}

const CreateNew = () => {
  return (
    <DefaultLayout>
      <CreateNewRegist />
    </DefaultLayout>
  )
}

export default CreateNew
