"use client"
import React, {useState, SyntheticEvent, useEffect} from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Tab
  } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { AddCircle } from '@mui/icons-material'
import Loader from "../common/Loader"
import { getTodayPt } from "@/helper"
import axios from "axios"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import QuestionItem from "./QuestionItem"
import {useTheme} from "@mui/material"

function templateQuestionItem(
    qString: string,
    qType: string,
    quantity: string,
    objOptions: string,
    subjDoubleValue: string,
    subjSingleValue: string
) {
    return { qString, qType, quantity, objOptions, subjDoubleValue, subjSingleValue }
}

const templateObjOptions = "[{\"value\":\"\",\"checked\":false},{\"value\":\"\",\"checked\":false},{\"value\":\"\",\"checked\":false},{\"value\":\"\",\"checked\":false},{\"value\":\"\",\"checked\":false},{\"value\":\"\",\"checked\":false}]"

const CreateNewQuestion: React.FC = () => {
    const searchParams = useSearchParams()
    const questionId = searchParams.get("id")
    const router = useRouter()
    const theme = useTheme()
    const [category, setCategory] = useState("1")
    const [title, setTitle] = useState("")
    const [potLevel, setPotLevel] = useState("-1")
    const [commonData, setCommonData] = useState<object[]>([])
    const [bronzeData, setBronzeData] = useState<object[]>([])
    const [prataData, setPrataData] = useState<object[]>([])
    const [ouroData, setOuroData] = useState<object[]>([])
    const [createDate, setCreateDate] = useState(getTodayPt())
    const [status, setStatus] = useState(true)
    const [isLoading, setLoading] = useState(false)

    const handleTabChange = (e: SyntheticEvent, newValue: string) => {
        setPotLevel(newValue)
    }

    useEffect(() => {
        if (questionId !== null) {
            setLoading(true)
            axios.get(`/question/getQuestion?id=${questionId}`)
                .then((res) => {
                    const data = res.data
                    setTitle(data.title)
                    setCategory(data.category === "VALOR DO POTE" ? "1" : "2")
                    setCreateDate(data.createDate)
                    setStatus(data.status)
                    setPotLevel(data.potLevel.toString())
                    switch (data.potLevel) {
                        case 1:
                            setBronzeData(data.items)
                            break;
                        case 2:
                            setPrataData(data.items)
                            break;
                        case 3:
                            setOuroData(data.items)
                            break;
                        case -1:
                            setCommonData(data.items)
                            break;
                        default: break;
                    }
                    setLoading(false)
                })
                .catch((err) => console.log(err))
        }
    }, [questionId])

    const addNewQuestion = () => {
        setLoading(true)
        axios.post('/question/create', {
            title,
            category: category === "1" ? "VALOR DO POTE" : "PREMIO",
            potLevel: parseInt(potLevel),
            items: potLevel === "-1" ? commonData : potLevel === "1" ? bronzeData : potLevel === "2" ? prataData : ouroData,
            createDate,
            status
        })
        .then(res => {
            setLoading(false)
            toastr.success("Registrado com sucesso!")
            router.back()
        })
        .catch(err => console.log(err))
    }

    const addQuestionItem = () => {
        if (category === "1") {
            setCommonData([...commonData, templateQuestionItem("", "Objetiva", "Unico", templateObjOptions, ",,", "")])
        } else {
            switch (potLevel) {
                case "1":
                    setBronzeData([...bronzeData, templateQuestionItem("", "Objetiva", "Unico", templateObjOptions, ",,", "")])
                    break
                case "2":
                    setPrataData([...prataData, templateQuestionItem("", "Objetiva", "Unico", templateObjOptions, ",,", "")])
                    break
                case "3":
                    setOuroData([...ouroData, templateQuestionItem("", "Objetiva", "Unico", templateObjOptions, ",,", "")])
                    break
                default: break
            }
        }
    }

    const deleteQuestionItem = (index: number) => {
        if (category === "1") {
            setCommonData(commonData.filter((_, i) => i !== index))
        } else {
            switch (potLevel) {
                case "1":
                    setBronzeData(bronzeData.filter((_, i) => i !== index))
                    break
                case "2":
                    setPrataData(prataData.filter((_, i) => i !== index))
                    break
                case "3":
                    setOuroData(ouroData.filter((_, i) => i !== index))
                    break
                default: break
            }
        }
    }

    const updateQuestionItem = (index: number, key: string, value: any) => {
        if (category === "1") {
            setCommonData(commonData.map((item, i) =>
                index === i ? {...item, [key]: value} : item
            ))
        } else {
            switch (potLevel) {
                case "1":
                    setBronzeData(bronzeData.map((item, i) =>
                        index === i ? {...item, [key]: value} : item
                    ))
                    break
                case "2":
                    setPrataData(prataData.map((item, i) =>
                        index === i ? {...item, [key]: value} : item
                    ))
                    break
                case "3":
                    setOuroData(ouroData.map((item, i) =>
                        index === i ? {...item, [key]: value} : item
                    ))
                    break
                default: break
            }
        }
    }

    return (
        <Box position="relative">
            <Box display="flex" flexDirection="column" width="100%">
                <p className="text-[18px]">Cadastro de Perguntas</p>
                <Box display="flex" gap={5} marginTop={5}>
                    <TextField
                        size="medium"
                        variant="filled"
                        label="DESCRIÇÃO DA PERGUNTA"
                        placeholder="Ex: Padrão Potes"
                        className="w-[40%]"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <FormControl variant="filled" className="w-[40%]">
                        <InputLabel id="demo-simple-select-filled-label">CATEGORIA</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={category}
                            onChange={(e) => {
                                if (e.target.value === "1")
                                    setPotLevel("-1")
                                else
                                    setPotLevel("1")
                                setCategory(e.target.value)
                            }}
                        >
                            <MenuItem value="1">VALOR DO POTE</MenuItem>
                            <MenuItem value="2">PRÊMIOS</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {
                    category === "1" ?
                        commonData.length ? 
                            <Box display="grid" gridTemplateColumns="1fr 1fr" columnGap={5} paddingY={3} paddingX={3}>
                                { commonData.map((item, i) => 
                                    <QuestionItem 
                                        key={i}
                                        index={i}
                                        item={item}
                                        onUpdate={updateQuestionItem}
                                        onDelete={deleteQuestionItem} />
                                )}
                            </Box>
                        :
                        <></>
                    :
                    <Box width="100%">
                        <TabContext value={potLevel}>
                            <Box>
                                <TabList
                                    onChange={handleTabChange}
                                    className="mt-5"
                                    style={{ minHeight: 'auto' }}
                                >
                                    <Tab
                                        icon={<Image width={30} height={30} src={'/images/icon/icon-bronze.svg'} alt="" />}
                                        iconPosition="end"
                                        label="POTE BRONZE"
                                        value="1"
                                    />
                                    <Tab
                                        icon={<Image width={30} height={30} src={'/images/icon/icon-silver.svg'} alt="" />}
                                        iconPosition="end" 
                                        label="POTE PRATA" 
                                        value="2"
                                    />
                                    <Tab
                                        icon={<Image width={30} height={30} src={'/images/icon/icon-gold.svg'} alt="" />}
                                        iconPosition="end" 
                                        label="POTE OURO" 
                                        value="3"
                                    />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Box display="flex" width="50%">
                                    {
                                        bronzeData.map((item, i) => 
                                            <QuestionItem
                                                key={i}
                                                index={i}
                                                item={item}
                                                onUpdate={updateQuestionItem}
                                                onDelete={deleteQuestionItem} />
                                        )
                                    }
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">
                                <Box display="flex" width="50%">
                                    {
                                        prataData.map((item, i) => 
                                            <QuestionItem
                                                key={i}
                                                index={i}
                                                item={item}
                                                onUpdate={updateQuestionItem}
                                                onDelete={deleteQuestionItem} />
                                        )
                                    }
                                </Box>
                            </TabPanel>
                            <TabPanel value="3">
                                <Box display="flex" width="50%">
                                    {
                                        ouroData.map((item, i) => 
                                            <QuestionItem
                                                key={i}
                                                index={i}
                                                item={item}
                                                onUpdate={updateQuestionItem}
                                                onDelete={deleteQuestionItem} />
                                        )
                                    }
                                </Box>
                            </TabPanel>
                        </TabContext>
                    </Box>
                }
                <Box display="flex" justifyContent="flex-end" width="50%" marginTop={3}>
                    <Button
                        variant="contained"
                        style={{
                            padding: "10px 50px",
                            borderRadius: "9999px",
                            color: 'white',
                            backgroundColor: theme.palette.secondary.main
                        }}
                        startIcon={<AddCircle />}
                        onClick={(e) => addQuestionItem()}>
                        Adicionar Pergunta
                    </Button>
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
                        onClick={addNewQuestion}
                    >
                        Cadastrar Pergunta
                    </Button>
                </Box>
            </Box>
            {
                isLoading && <Loader />
            }
        </Box>
    )
}

export default CreateNewQuestion