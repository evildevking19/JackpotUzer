import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import ResultsWinnersDetailUserComponent from "@/components/ResultsWinners/user"

export const metadata: Metadata = {
    title: "Uzer Pass | Results | Winners | Detail | User",
}

const ResultsWinnersDetailUser = () => {
  return (
    <DefaultLayout>
      <ResultsWinnersDetailUserComponent />
    </DefaultLayout>
  )
}

export default ResultsWinnersDetailUser