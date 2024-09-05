"use client"
import React, {useState} from "react"
import Image from "next/image"
import {
    Box,
    Tab,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import CheckButton from "../common/CheckButton"
import { Close } from "@mui/icons-material"
import {useTheme} from "@mui/material"

const ResultsWinnersDetailUserComponent: React.FC = () => {
    const theme = useTheme()
    const [tabIndex, setTabIndex] = useState('1')
    const [eventType, setEventType] = useState('1')
    const [options1, setOptions1] = useState([
        { label: "18 a 25", checked: true },
        { label: "26 a 33", checked: false },
        { label: "34 a 41", checked: false },
        { label: "42 a 49", checked: false },
        { label: "50 a 58", checked: false },
        { label: "60 a 80", checked: false }
    ])
    const [options2, setOptions2] = useState([
        { label: "00 seg a 15min", checked: true },
        { label: "16 min a 25 min", checked: false },
        { label: "26 min a 35 min", checked: false },
        { label: "36 min a 45 min", checked: false },
        { label: "nos acréscimos", checked: false },
        { label: "sem gol", checked: false }
    ])

    const handleOption1Changed = (index: any, data: any, checked: boolean) => {
        setOptions1(data.map((item: any, i: any) => 
            index === i ? {...item, checked} : item
        ))
    }
    const handleOption2Changed = (index: any, data: any, checked: boolean) => {
        setOptions2(data.map((item: any, i: any) => 
            index === i ? {...item, checked} : item
        ))
    }

    return (
        <Box display="flex" flexDirection="column" width="100%" paddingX={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" gap={3} alignItems="center">
                    <Image width={80} height={80} alt="" src={'/images/user/user-01.png'} />
                    <Box display="flex" flexDirection="column" gap={1}>
                        <p className="text-[22px] text-black">Jenny Wilson</p>
                        <p className="text-[16px]">COD.: 15230</p>
                    </Box>
                </Box>
                <Box display="flex" gap={5}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <p className="text-[14px]">GANHADORA</p>
                        <Box display="flex" gap={2} alignItems="center">
                            <p className="text-[18px] font-bold" style={{ color: theme.palette.primary.main }}>POTE BRONZE</p>
                            <Image width={40} height={40} alt="" src={'/images/icon/icon-bronze.svg'} />
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <p className="text-[14px]">Valor Arrecadado</p>
                        <p className="text-[18px] font-bold">R$ 8,00</p>
                    </Box>
                </Box>
            </Box>
            <TabContext value={tabIndex}>
                <Box>
                    <TabList
                        onChange={(e, nVal) => setTabIndex(nVal)}
                        className="mt-10"
                        style={{ minHeight: 'auto' }}
                    >
                        <Tab label="CARD1" value="1" />
                        <Tab label="CARD2" value="2" />
                        <Tab label="CARD3" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Box display="flex" flexDirection="column" width="100%">
                        <p>Respondido em 21/05/2024 </p>
                        <FormControl variant="filled" className="w-[30%] !mt-5">
                            <InputLabel id="demo-simple-select-filled-label">Evento/ Local Controlado</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                            >
                                <MenuItem value={1}>Flamengo X Goiás (24/05/2025)</MenuItem>
                                <MenuItem value={2}>Flamengo X Goiás (24/05/2025)</MenuItem>
                                <MenuItem value={3}>Flamengo X Goiás (24/05/2025)</MenuItem>
                            </Select>
                        </FormControl>
                        <Box display="flex" flexDirection="column" padding={3} marginTop={5} borderRadius={3} boxShadow={2} position="relative" width="70%">
                            <Image
                                width={50}
                                height={50}
                                alt=""
                                src={'/images/icon/icon-bronze.svg'}
                                className="absolute -top-5 -right-5"
                            />
                            <p className="font-extrabold text-black">POTE BRONZE <span className="text-[13px]">- PREMIO 20% DO VALOR TOTAL</span></p>
                            <Box display="flex" gap={5} marginTop={3}>
                                <Box display="flex" flexDirection="column" gap={1} width="40%">
                                    <p>Qual o Placar?</p>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <TextField
                                            size="medium"
                                            variant="filled"
                                            label="MANDANTE"
                                            value="02"
                                            className="w-[45%]"
                                        />
                                        <Close className="w-[10%]" />
                                        <TextField
                                            size="medium"
                                            variant="filled"
                                            label="VISITANTE"
                                            value="02"
                                            className="w-[45%]"
                                        />
                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="column" gap={1} width="60%">
                                    <p>Número da camisa a marcar o primeiro gol*</p>
                                    <TextField
                                        size="medium"
                                        variant="filled"
                                        label="CAMISA"
                                        value="02"
                                        className="w-[25%]"
                                    />
                                    <p className="text-[13px]">*De qualquer uma das equipes</p>
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" padding={3} marginTop={5} borderRadius={3} boxShadow={2} position="relative" width="70%">
                            <Image
                                width={50}
                                height={50}
                                alt=""
                                src={'/images/icon/icon-silver.svg'}
                                className="absolute -top-5 -right-5"
                            />
                            <p className="font-extrabold text-black">POTE PRATA <span className="text-[13px]">- PREMIO 60% DO VALOR TOTAL</span></p>
                            <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
                                <p>Qual a maior faixa etária presente na partida?</p>
                                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" columnGap={3} rowGap={1.5} width="70%" marginLeft={1}>
                                    {
                                        options1.map((item, i) => 
                                            <CheckButton key={i} label={item.label} value={item.checked} onChange={(e) => handleOption1Changed(i, options1, e.target.checked)} />
                                        )
                                    }
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
                                <p>1 º TEMPO - Em qual intervalo de tempo será marcado um Gol?</p>
                                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" columnGap={3} rowGap={1.5} width="70%" marginLeft={1}>
                                    {
                                        options2.map((item, i) => 
                                            <CheckButton key={i} label={item.label} value={item.checked} onChange={(e) => handleOption2Changed(i, options2, e.target.checked)} />
                                        )
                                    }
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
                                <p>2 º TEMPO - Em qual intervalo de tempo será marcado um Gol?</p>
                                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" columnGap={3} rowGap={1.5} width="70%" marginLeft={1}>
                                    {
                                        options2.map((item, i) => 
                                            <CheckButton key={i} label={item.label} value={item.checked} onChange={(e) => handleOption2Changed(i, options2, e.target.checked)} />
                                        )
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" padding={3} marginTop={5} borderRadius={3} boxShadow={2} position="relative" width="70%">
                            <Image
                                width={50}
                                height={50}
                                alt=""
                                src={'/images/icon/icon-gold.svg'}
                                className="absolute -top-5 -right-5"
                            />
                            <p className="font-extrabold text-black">POTE OURO <span className="text-[13px]">- PREMIO 100% DO VALOR TOTAL</span></p>
                            <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
                                <p>Qual o público presente?</p>
                                <TextField
                                    size="medium"
                                    variant="filled"
                                    label="PÚBLICO"
                                    value="02"
                                    className="w-[25%]"
                                />
                                <p className="text-[13px]">*Dado oficial publicado pelo Borderô de jogo.</p>
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    Item Two
                </TabPanel>
                <TabPanel value="3">
                    Item Three
                </TabPanel>
            </TabContext>
        </Box>
    )
}

export default ResultsWinnersDetailUserComponent