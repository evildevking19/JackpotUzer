import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import CreateNewResultsRegist from "@/components/ResultsRegist/create"

export const metadata: Metadata = {
    title: "Uzer Pass | Results | Regist | Add New",
}

const CreateNew = () => {
  return (
    <DefaultLayout>
      <CreateNewResultsRegist />
    </DefaultLayout>
  )
}

export default CreateNew