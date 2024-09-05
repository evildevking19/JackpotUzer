import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import ResultsWinnersComponent from "@/components/ResultsWinners"

export const metadata: Metadata = {
    title: "Uzer Pass | Results | Winners",
}

const ResultsWinners = () => {
  return (
    <DefaultLayout>
      <ResultsWinnersComponent />
    </DefaultLayout>
  )
}

export default ResultsWinners
