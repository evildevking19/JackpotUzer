import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import QuestionsComponent from "@/components/Questions"

export const metadata: Metadata = {
    title: "Uzer Pass | Configuration | Questions",
}

const Awards = () => {
  return (
    <DefaultLayout>
      <QuestionsComponent />
    </DefaultLayout>
  )
}

export default Awards
