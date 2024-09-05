"use client"
import React, {useState, useEffect} from "react"
import useAsyncEffect from "use-async-effect"
import { useSearchParams, useRouter } from "next/navigation"
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    Switch
  } from "@mui/material"
import Loader from "../common/Loader"
import { DeleteForeverOutlined } from "@mui/icons-material"
import { getTodayPt, getFormattedCurrencyString } from "@/helper"
import axios from "axios"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useTheme } from "@mui/material"

const CreateNewPots: React.FC = () => {
    const searchParams = useSearchParams()
    const potId = searchParams.get("id")
    const router = useRouter()
    const theme = useTheme()
    const [championId, setChampionId] = useState('')
    const [championData, setChampionData] = useState([])
    const [teamId, setTeamId] = useState('')
    const [teamData, setTeamData] = useState([])
    const [initValue, setInitValue] = useState('')
    const [curValue, setCurValue] = useState(0)
    const [createDate, setCreateDate] = useState(getTodayPt())
    const [status, setStatus] = useState(true)
    const [isLoading, setLoading] = useState(false)

    const fetchChampions = async () => {
        let res = await axios.get('/champion/fetchAll')
        setChampionData(res.data)
        setChampionId(res.data[0].id)
    }

    const fetchTeams = async () => {
        let res = await axios.get('/team/fetchAll')
        setTeamData(res.data)
        setTeamId(res.data[0].id)
    }

    const getPotData = async (id: any) => {
        let potData = await axios.get('/pot/getPot?id='+id)
        setChampionId(potData.data["championId"])
        setTeamId(potData.data["teamId"])
        setInitValue(potData.data["initValue"])
        setCurValue(potData.data["curValue"])
        setCreateDate(potData.data["createDate"])
        setStatus(potData.data["status"])
    }

    useAsyncEffect(async () => {
        setLoading(true)
        await fetchChampions()
        await fetchTeams()
        if (potId !== null) {
            await getPotData(potId)
        }
        setLoading(false)
    }, [])

    const add = () => {
        if (initValue === "") {
            toastr.error("Você deve inserir um valor inicial para este pote.")
        } else {
            setLoading(true)
            axios.post('/pot/create', {
                championId,
                teamId,
                initValue,
                status,
                createDate
            })
                .then((res) => {
                    setLoading(false)
                    toastr.success("Registrado com sucesso!")
                    router.back()
                })
                .catch((err) => toastr.error(err))
        }
    }

    // const update = () => {
    //     setLoading(true)
    //     axios.put('/team/update', {
    //         id: teamId,
    //         championId,
    //         teamId,
    //         name,
    //         createDate
    //     }).then((res) => {
    //         setLoading(false)
    //         toastr.success("Atualizado com sucesso!")
    //         router.back()
    //     }).catch((err) => toastr.error(err))
    // }

    const deleteTeam = () => {
        setLoading(true)
        axios.delete('/pot/delete?id='+potId)
            .then((res) => {
                setLoading(false)
                toastr.success("Excluído com sucesso!")
                router.back()
            })
            .catch((err) => toastr.error(err))
    }

    return (
        <Box position="relative">
            <Box display="flex" flexDirection="column">
                <Box display="flex" width="100%">
                    <Box display="flex" flexDirection="column" width="50%">
                        <p className="ml-5 text-[20px]">Cadastro de Pote</p>
                        <FormControl variant="filled" className="left-5 w-[90%] !mt-15">
                            <InputLabel id="demo-simple-select-filled-label">TIME RESPONSÁVEL JACKPOT</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={teamId}
                                onChange={(e) => setTeamId(e.target.value)}
                            >
                            {
                                teamData.map((item, i) => 
                                    <MenuItem key={i} value={item["id"]}>{item["name"]}</MenuItem>
                                )
                            }
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" className="left-5 w-[90%] !mt-5">
                            <InputLabel id="demo-simple-select-filled-label">CAMPEONATO</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={championId}
                                onChange={(e) => setChampionId(e.target.value)}
                            >
                            {
                                championData.map((item, i) => 
                                    <MenuItem key={i} value={item["id"]}>{item["name"]}</MenuItem>
                                )
                            }
                            </Select>
                        </FormControl>
                        <Box display="flex" gap={3} width="90%" marginTop="20px" marginLeft="20px">
                            <TextField
                                size="medium"
                                variant="filled"
                                label="VALOR INCIAL DO POTE"
                                className="w-[50%]"
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            R$
                                        </InputAdornment>
                                    )
                                }}
                                value={initValue}
                                onChange={(e) => setInitValue(e.target.value)}
                            />
                        </Box>
                        {
                            potId !== null &&
                                <div className="flex flex-col items-center gap-5 bg-white shadow-card-10 rounded-[20px] py-10 w-[40%] ml-30 mt-10">
                                    <p>Valor Pote atual:</p>
                                    <p className="font-bold text-[20px]" style={{ color: theme.palette.primary.main }}>{getFormattedCurrencyString(curValue)}</p>
                                </div>
                        }
                    </Box>
                    {
                        potId !== null &&
                            <Box display="grid" gridTemplateColumns='1fr 1fr 1fr' width="50%">
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <p>Data criação</p>
                                    <p className="text-[20px] font-bold">{createDate}</p>
                                </Box>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <p>Ativo/Inativo</p>
                                    <Switch defaultChecked />
                                </Box>
                                <Box display="flex" justifyContent="center" alignItems="flex-start">
                                    <button className="text-red-dark h-auto flex gap-1" onClick={deleteTeam}>
                                        <DeleteForeverOutlined />
                                        <span className="underline">Excluir</span>
                                    </button>
                                </Box>
                            </Box>
                    }
                </Box>
                {
                    potId === null &&
                        <Box display="flex" justifyContent="end">
                            <Button
                                variant="contained"
                                style={{
                                    marginTop: '30px',
                                    marginRight: '20px',
                                    borderRadius: '9999px',
                                    color: 'white',
                                    padding: '10px 50px'
                                }}
                                onClick={add}
                            >
                                Cadastrar Pote
                            </Button>
                        </Box>
                }
            </Box>
            {
                isLoading && <Loader />
            }
        </Box>
    )
}

export default CreateNewPots