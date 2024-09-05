import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import CreateNewTime from "@/components/Time/create"

export const metadata: Metadata = {
    title: "Uzer Pass | Configuration | Time | Add New",
}

const CreateNew = () => {
  return (
    <DefaultLayout>
      <CreateNewTime />
    </DefaultLayout>
  )
}

export default CreateNew
