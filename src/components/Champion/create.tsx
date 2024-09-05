"use client"
import React, {useState, useEffect} from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
    Box,
    Button,
    TextField,
    Switch
  } from "@mui/material"
import Loader from "../common/Loader"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/pt-br"
import dayjs from "dayjs"
import { DeleteForeverOutlined } from "@mui/icons-material"
import { convertDayObjToDateString, getTodayPt } from "@/helper"
import axios from "axios"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const CreateNewChampion: React.FC = () => {
    const searchParams = useSearchParams()
    const championId = searchParams.get("id")
    const router = useRouter()
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [createDate, setCreateDate] = useState(getTodayPt())
    const [imageData, setImageData] = useState('')
    const [imageMimeType, setImageMimeType] = useState('')
    const [status, setStatus] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const inputRef: React.RefObject<HTMLInputElement> = React.createRef()

    const readFileDataAsBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
    
            reader.onload = (event) => {
                resolve(event.target?.result)
            }
    
            reader.onerror = (err) => {
                reject(err)
            }
    
            reader.readAsDataURL(file)
        })
    }

    useEffect(() => {
        if (championId !== null) {
            setLoading(true)
            axios.get(`/champion/getChampion?id=${championId}`)
                .then((res) => {
                    const data = res.data
                    setName(data.name)
                    setStatus(data.status)
                    setImageData(data.bannerURL)
                    setImageMimeType(data.bannerMimeType)
                    setStartDate(data.startDate)
                    setEndDate(data.endDate)
                    setCreateDate(data.createDate)
                    setLoading(false)
                })
                .catch((err) => console.log(err))
        }
    }, [championId])

    const add = () => {
        if (name === "" && imageData === "" && startDate === "" && endDate === "") {
            toastr.error("Você deve preencher todos os formulários.")
        } else {
            setLoading(true)
            axios.post('/champion/create', {
                name,
                startDate,
                endDate,
                bannerURL: imageData,
                bannerMimeType: imageMimeType,
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

    const update = () => {
        setLoading(true)
        axios.put('/champion/update', {
            id: championId,
            name,
            startDate,
            endDate,
            bannerURL: imageData,
            bannerMimeType: imageMimeType,
            status,
            createDate
        }).then((res) => {
            setLoading(false)
            toastr.success("Atualizado com sucesso!")
            router.back()
        }).catch((err) => toastr.error(err))
    }

    const deleteChampion = () => {
        setLoading(true)
        axios.delete('/champion/delete?id='+championId)
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
                    <Box display="flex" flexDirection="column" width="60%">
                        <p className="ml-5 text-[20px]">Cadastro de Campeonato</p>
                        <TextField
                            size="medium"
                            variant="filled"
                            label="NOME DO CAMPEONATO"
                            placeholder="Ex.: Campeonato Brasileiro 2024"
                            className="left-5 w-[90%] !mt-15"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Box display="flex" gap={5} width="90%" marginLeft={2} marginTop={5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DatePicker
                                    label="DATA INICIO"
                                    slotProps={{ textField: { variant: 'filled' } }}
                                    sx={{ width: "50%" }}
                                    value={startDate === "" ? null : dayjs(startDate)}
                                    onChange={(value, _) => setStartDate(convertDayObjToDateString(value))}
                                />
                                <DatePicker
                                    label="DATA FIM"
                                    slotProps={{ textField: { variant: 'filled' } }}
                                    sx={{ width: "50%" }}
                                    value={endDate === "" ? null : dayjs(endDate)}
                                    onChange={(value, _) => setEndDate(convertDayObjToDateString(value))}
                                />
                            </LocalizationProvider>
                        </Box>
                        <button className="relative mt-10 ml-5 h-auto w-[90%]" onClick={() => inputRef.current?.click()}>
                            {
                                imageData === '' && <span className="absolute left-[50%] translate-x-[-50%] top-5 w-full">Insira um Banner</span>
                            }
                            <Image
                                width={0}
                                height={0}
                                alt=""
                                src={imageData === '' ? '/images/placeholder/pic_placeholder_dark.svg' : imageData}
                                priority
                                style={{
                                    width: '100%',
                                    objectFit: 'contain',
                                    borderRadius: 10
                                }}
                            />
                        </button>
                        <input
                            ref={inputRef}
                            type="file"
                            accept=".jpg,.png,.jpeg"
                            hidden
                            onChange={async (e) => {
                                if (!inputRef.current?.files) return
                                let file = inputRef.current?.files[0]
                                if (file) {
                                    await readFileDataAsBase64(file)
                                        .then((res) => {
                                            setImageData(String(res))
                                            setImageMimeType(file.type)
                                        })
                                        .catch((error) => console.log(error))
                                }
                            }}
                        />
                    </Box>
                    {
                        championId !== null &&
                            <Box display="grid" gridTemplateColumns='1fr 1fr 1fr' width="40%">
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <p>Data criação</p>
                                    <p className="text-[20px] font-bold">{createDate}</p>
                                </Box>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <p>Ativo/Inativo</p>
                                    <Switch checked={status} onChange={(e) => setStatus(e.target.checked)}/>
                                </Box>
                                <Box display="flex" justifyContent="center" alignItems="flex-start">
                                    <button className="text-red-dark h-auto flex gap-1" onClick={deleteChampion}>
                                        <DeleteForeverOutlined />
                                        <span className="underline">Excluir</span>
                                    </button>
                                </Box>
                            </Box>
                    }
                </Box>
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
                        onClick={() => championId === null ? add() : update()}
                    >
                        { championId === null ? 'Cadastrar Campeonato' : 'Salvar alterações' }
                    </Button>
                </Box>
            </Box>
            {
                isLoading && <Loader />
            }
        </Box>
    )
}

export default CreateNewChampion