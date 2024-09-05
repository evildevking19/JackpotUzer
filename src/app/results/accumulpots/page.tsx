import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import AccumulPotsComponent from "@/components/AccumulPots"

export const metadata: Metadata = {
    title: "Uzer Pass | Accumulated Pots",
}

const ResultsWinners = () => {
  return (
    <DefaultLayout>
      <AccumulPotsComponent />
    </DefaultLayout>
  )
}

export default ResultsWinners
