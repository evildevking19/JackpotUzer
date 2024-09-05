"use client"
import React, {useState, useEffect} from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Loader from "../common/Loader"
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Switch
} from "@mui/material"
import { getTodayPt } from "@/helper"
import axios from "axios"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const categories = [
    { value: "1", name: "JOGO" },
    { value: "2", name: "RODATA" },
    { value: "3", name: "CAMPEONATO" }
]

const CreateNewAward: React.FC = () => {
    const searchParams = useSearchParams()
    const awardId = searchParams.get("id")
    const router = useRouter()
    const [imageData, setImageData] = useState('')
    const [imageMimeType, setImageMimeType] = useState('')
    const [category, setCategory] = useState("1")
    const [description, setDescription] = useState('')
    const [code, setCode] = useState('')
    const [status, setStatus] = useState("LIVRE")
    const [isActive, setActive] = useState(true)
    const [createDate, setCreateDate] = useState(getTodayPt())
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
        if (awardId !== null) {
            setLoading(true)
            axios.get(`/award/getAward?id=${awardId}`)
                .then((res) => {
                    const data = res.data
                    setDescription(data.description)
                    categories.forEach((cat, i) => cat.name === data.category ? setCategory(cat.value) : "1")
                    setCode(data.code)
                    setStatus(data.status)
                    setImageData(data.bannerURL)
                    setImageMimeType(data.bannerMimeType)
                    setCreateDate(data.createDate)
                    setActive(data.active)
                    setLoading(false)
                })
                .catch((err) => console.log(err))
        }
    }, [awardId])

    const add = () => {
        if (description === "" && code === "" && imageData === "") {
            toastr.error("Você deve preencher todos os formulários.")
        } else {
            setLoading(true)
            let categoryName = "JOGO"
            categories.forEach((cat, i) => {
                if (cat.value === category)
                    categoryName = cat.name
            })
            axios.post('/award/create', {
                description,
                category: categoryName,
                code,
                bannerURL: imageData,
                bannerMimeType: imageMimeType,
                status,
                active: isActive,
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
        let categoryName = "JOGO"
        categories.forEach((cat, i) => {
            if (cat.value === category)
                categoryName = cat.name
        })
        axios.put('/award/update', {
            id: awardId,
            description,
            category: categoryName,
            code,
            bannerURL: imageData,
            bannerMimeType: imageMimeType,
            status,
            active: isActive,
            createDate
        }).then((res) => {
            setLoading(false)
            toastr.success("Atualizado com sucesso!")
            router.back()
        }).catch((err) => toastr.error(err))
    }

    return (
        <Box position="relative">
            <Box display="flex" flexDirection="column">
                <Box display="flex" width="100%">
                    <Box display="flex" flexDirection="column" width="50%">
                        <p className="ml-5 text-[20px]">Cadastro de Prêmios</p>
                        <FormControl variant="filled" className="left-5 w-[90%] !mt-15">
                            <InputLabel id="demo-simple-select-filled-label">CATEGORIA DO PRÊMIO</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {
                                    categories.map((cat, i) => 
                                        <MenuItem key={i} value={cat.value}>{cat.name}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            size="medium"
                            variant="filled"
                            label="DESCRIÇÃO DO PRÊMIO"
                            placeholder="Ex.: Moto"
                            className="left-5 w-[90%] !mt-5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            size="medium"
                            variant="filled"
                            label="COD. IDENTIFICAÇÃO DO PRÉMIO"
                            placeholder="Ex.: Chassi 000000000000"
                            className="left-5 w-[90%] !mt-5"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button className="relative mt-10 ml-5 h-auto w-[90%]" onClick={() => inputRef.current?.click()}>
                            {
                                imageData === '' && <span className="absolute left-[50%] translate-x-[-50%] top-5">Insira um Banner</span>
                            }
                            <Image
                                width={0}
                                height={0}
                                alt=""
                                src={imageData === '' ? '/images/placeholder/pic_placeholder_light.svg' : imageData}
                                priority
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'fill',
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
                        awardId !== null &&
                            <Box display="grid" gridTemplateColumns='1fr 1fr 1fr' width="50%">
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <p>Data criação</p>
                                    <p className="text-[20px] font-bold">{createDate}</p>
                                </Box>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <p>Ativo/Inativo</p>
                                    <Switch checked={isActive} onChange={e => setActive(e.target.checked)} />
                                </Box>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <p>Status</p>
                                    <p className="text-[20px] font-bold">{status}</p>
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
                        onClick={e => awardId === null ? add() : update()}
                    >
                        { awardId === null ? "Cadastrar Premio" : "Salvar alterações" }
                    </Button>
                </Box>
            </Box>
            {
                isLoading && <Loader />
            }
        </Box>
    )
}

export default CreateNewAward