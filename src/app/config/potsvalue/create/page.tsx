import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import CreateNewPots from "@/components/PotsValue/create"

export const metadata: Metadata = {
    title: "Uzer Pass | Configuration | PotsValue | Add New",
}

const CreateNew = () => {
  return (
    <DefaultLayout>
      <CreateNewPots />
    </DefaultLayout>
  )
}

export default CreateNew
