import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import CreateNewAward from "@/components/Awards/create"

export const metadata: Metadata = {
    title: "Uzer Pass | Configuration | Awards | Add New",
}

const CreateNew = () => {
  return (
    <DefaultLayout>
      <CreateNewAward />
    </DefaultLayout>
  )
}

export default CreateNew
