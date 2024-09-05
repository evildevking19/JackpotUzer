"use client"
import React, {useState} from "react"
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material"
import { DeleteForeverOutlined } from "@mui/icons-material"

interface QuestionItemProps {
    index: number,
    item: any,
    onUpdate: (index: number, key: string, value: any) => void,
    onDelete: (index: number) => void
}

const QuestionItem = ({ index, item, onUpdate, onDelete }: QuestionItemProps) => {
    const questionString = item.qString
    const questionType = item.qType === "Objetiva" ? "1" : "2"
    const quantityType = item.quantity === "Unico" ? "1" : "2"
    const objOptions = JSON.parse(item.objOptions)
    const subjSingleValue = item.subjSingleValue
    const subjDoubleValues = item.subjDoubleValue.split(",")

    return (
        <Box width="100%" marginBottom={2} paddingX={3} paddingY={3} bgcolor="white" boxShadow={3} borderRadius={3}>
            <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="space-between">
                    <span>Pergunta {index+1}</span>
                    <button className="text-red-dark" onClick={(e) => onDelete(index)}>
                        <DeleteForeverOutlined />
                    </button>
                </Box>
                <TextField
                    size="medium"
                    variant="filled"
                    label="DIGITE A PERGUNTA"
                    placeholder="Ex.: Placar"
                    className="w-full !mt-5"
                    value={questionString}
                    onChange={e => onUpdate(index, "qString", e.target.value)}
                />
                <FormControl variant="filled" className="w-full !mt-3">
                    <InputLabel id="demo-simple-select-filled-label">TIPO DE PERGUNTA</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={questionType}
                        onChange={(e) => onUpdate(index, "qType", e.target.value === "1" ? "Objetiva" : "Subjetiva")}
                    >
                        <MenuItem value="1">Objetiva</MenuItem>
                        <MenuItem value="2">Subjetiva</MenuItem>
                    </Select>
                </FormControl>
                {
                    questionType === '1' ?
                        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" columnGap={2} rowGap={1} justifyContent="center" marginLeft="10px" marginTop={3} >
                            {
                                objOptions.map((opt: any, i: number) => 
                                    <TextField
                                        key={i}
                                        type="text"
                                        placeholder={i%2 === 0 ? "Ex: Vermelho" : "Ex: 00 a 00"}
                                        inputProps={{ maxLength: 10 }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                paddingY: "10px"
                                            }
                                        }}
                                        value={opt.value}
                                        onChange={e => {
                                            objOptions[i].value = e.target.value
                                            onUpdate(index, "objOptions", JSON.stringify(objOptions))
                                        }}
                                    />
                                )
                            }
                        </Box>
                    : (
                        <Box display="flex" flexDirection="column" width="100%">
                            <FormControl variant="filled" className="w-[80%] !mt-3">
                                <InputLabel id="demo-simple-select-filled-label">QUANTIDADE DE CAMPOS</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={quantityType}
                                    onChange={(e) => onUpdate(index, "quantity", e.target.value === "1" ? "Unico" : "Duplo")}
                                >
                                    <MenuItem value="1">Unico</MenuItem>
                                    <MenuItem value="2">Duplo</MenuItem>
                                </Select>
                            </FormControl>
                            {
                                quantityType === "1" ?
                                    <TextField
                                            size="medium"
                                            variant="filled"
                                            label="Marcar o primeiro gol"
                                            placeholder="Ex: 3"
                                            className="w-[40%] !mt-5"
                                            value={subjSingleValue}
                                            onChange={(e) => onUpdate(index, "subjSingleValue", e.target.value)}
                                        />
                                :
                                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" columnGap={3} marginTop={2} width="80%">
                                    <TextField
                                        size="medium"
                                        variant="filled"
                                        label="Mandante"
                                        placeholder="Ex: 02"
                                        className="w-full"
                                        value={subjDoubleValues[0]}
                                        onChange={(e) => onUpdate(index, 'subjDoubleValue', e.target.value + "," + subjDoubleValues[1] + "," + subjDoubleValues[2])}
                                    />
                                    <TextField
                                        size="medium"
                                        variant="filled"
                                        label="CARACTERE"
                                        placeholder="Ex.: X, ou"
                                        className="w-full"
                                        value={subjDoubleValues[1]}
                                        onChange={(e) => onUpdate(index, 'subjDoubleValue', subjDoubleValues[0] + "," + e.target.value + "," + subjDoubleValues[2])}
                                    />
                                    <TextField
                                        size="medium"
                                        variant="filled"
                                        label="Visitante"
                                        placeholder="Ex: 03"
                                        className="w-full"
                                        value={subjDoubleValues[2]}
                                        onChange={(e) => onUpdate(index, 'subjDoubleValue', subjDoubleValues[0] + "," + subjDoubleValues[1] + "," + e.target.value)}
                                    />
                                </Box>
                            }
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default QuestionItem