import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import CreateNewChampion from "@/components/Champion/create"

export const metadata: Metadata = {
    title: "Uzer Pass | ChampionShip | Add New",
}

const CreateNew = () => {
    return (
        <DefaultLayout>
            <CreateNewChampion />
        </DefaultLayout>
    )
}

export default CreateNew
