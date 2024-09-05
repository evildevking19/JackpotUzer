import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import ResultsWinnersDetailComponent from "@/components/ResultsWinners/detail"

export const metadata: Metadata = {
    title: "Uzer Pass | Results | Winners | Detail",
}

const ResultsWinnersDetail = () => {
  return (
    <DefaultLayout>
      <ResultsWinnersDetailComponent />
    </DefaultLayout>
  )
}

export default ResultsWinnersDetail
