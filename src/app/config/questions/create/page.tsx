import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import CreateNewQuestion from "@/components/Questions/create"

export const metadata: Metadata = {
    title: "Uzer Pass | Configuration | Questions | Add New",
}

const CreateNew = () => {
  return (
    <DefaultLayout>
      <CreateNewQuestion />
    </DefaultLayout>
  )
}

export default CreateNew
