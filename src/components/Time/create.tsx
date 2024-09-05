"use client"
import React, {useState, useEffect} from "react"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import {
    Box,
    Button,
    TextField
  } from "@mui/material"
import Loader from "../common/Loader"
import { DeleteForeverOutlined } from "@mui/icons-material"
import { getTodayPt } from "@/helper"
import axios from "axios"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const CreateNewTime: React.FC = () => {
    const searchParams = useSearchParams()
    const teamId = searchParams.get("id")
    const router = useRouter()
    const [name, setName] = useState('')
    const [createDate, setCreateDate] = useState(getTodayPt())
    const [imageData, setImageData] = useState('')
    const [imageMimeType, setImageMimeType] = useState('')
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
        if (teamId !== null) {
            setLoading(true)
            axios.get(`/team/getTeam?id=${teamId}`)
                .then((res) => {
                    const data = res.data
                    setName(data.name)
                    setImageData(data.bannerURL)
                    setImageMimeType(data.bannerMimeType)
                    setCreateDate(data.createDate)
                    setLoading(false)
                })
                .catch((err) => console.log(err))
        }
    }, [teamId])

    const add = () => {
        if (name === "" && imageData === "") {
            toastr.error("Você deve preencher todos os formulários.")
        } else {
            setLoading(true)
            axios.post('/team/create', {
                name,
                bannerURL: imageData,
                bannerMimeType: imageMimeType,
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
        axios.put('/team/update', {
            id: teamId,
            name,
            bannerURL: imageData,
            bannerMimeType: imageMimeType,
            createDate
        }).then((res) => {
            setLoading(false)
            toastr.success("Atualizado com sucesso!")
            router.back()
        }).catch((err) => toastr.error(err))
    }

    const deleteTeam = () => {
        setLoading(true)
        axios.delete('/team/delete?id='+teamId)
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
                        <p className="ml-5 text-[20px]">Cadastro de Time</p>
                        <TextField
                            size="medium"
                            variant="filled"
                            label="NOME DO TIME"
                            placeholder="Ex.: São Paulo"
                            className="left-5 w-[70%] !mt-15"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className="relative mt-10 ml-5 h-auto w-[70%]" onClick={() => inputRef.current?.click()}>
                            {
                                imageData === '' && <span className="absolute left-[50%] translate-x-[-50%] top-5">Insira um Banner</span>
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
                        teamId !== null &&
                            <Box display="grid" gridTemplateColumns='1fr 1fr 1fr' width="50%">
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <p>Data criação</p>
                                    <p className="text-[20px] font-bold">{createDate}</p>
                                </Box>
                                <Box display="flex" flexDirection="column" alignItems="center"></Box>
                                <Box display="flex" justifyContent="center" alignItems="flex-start">
                                    <button className="text-red-dark h-auto flex gap-1" onClick={deleteTeam}>
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
                        onClick={() => teamId === null ? add() : update()}
                    >
                        { teamId === null ? 'Cadastrar Time' : 'Salvar alterações' }
                    </Button>
                </Box>
            </Box>
            {
                isLoading && <Loader />
            }
        </Box>
    )
}

export default CreateNewTime