import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import ResultsRegistComponent from "@/components/ResultsRegist"

export const metadata: Metadata = {
    title: "Uzer Pass | Results | Regist",
}

const ResultsRegist = () => {
  return (
    <DefaultLayout>
      <ResultsRegistComponent />
    </DefaultLayout>
  )
}

export default ResultsRegist