"use client"
import React, {useState, useEffect} from "react"
import Link from "next/link"
import {
    Box,
    FormControl,
    InputLabel,
    TextField,
    Select,
    SelectChangeEvent,
    MenuItem,
    InputAdornment,
    Switch,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material"
import Loader from "../common/Loader"
import { Search, Edit } from "@mui/icons-material"
import Pagination from "../Pagination"
import { useTheme } from "@mui/material"
import axios from "axios"

const QuestionsComponent: React.FC = () => {
    const theme = useTheme()
    const [category, setCategory] = useState("1")
    const [tableData, setTableData] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get("/question/fetchAll")
            .then((res) => {
                setLoading(false)
                setTableData(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <Box position="relative">
            <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" gap={3} width="50%">
                        <FormControl variant="filled" className="w-[50%]">
                            <InputLabel id="demo-simple-select-filled-label">CATEGORIA</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value="1">VALOR DO POTE</MenuItem>
                                <MenuItem value="2">PRÊMIOS</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            size="medium"
                            variant="filled"
                            placeholder="Pesquisar"
                            className="left-5 w-[50%]"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Link
                        href="/config/questions/create"
                        className="text-white rounded-[9999px] text-[16px] px-[50px] py-[5px] flex items-center"
                        style={{ backgroundColor: theme.palette.primary.main }}
                    >
                        Nova Pergunta
                    </Link>
                </Box>
                <Box maxHeight="500px" overflow='auto' marginTop={3}>
                    <Table stickyHeader>
                        <TableHead sx={{
                            '& th': {
                                fontWeight: 700
                            }
                        }}>
                            <TableRow>
                                <TableCell>Titulo</TableCell>
                                <TableCell align="center">Categoria</TableCell>
                                <TableCell align="center">Data de cadastro</TableCell>
                                <TableCell align="center">Ativo/Inativo</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {tableData.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row["title"]}</TableCell>
                                <TableCell align="center">{row["category"]}</TableCell>
                                <TableCell align="center">{row["createDate"]}</TableCell>
                                <TableCell>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Switch checked={row["status"]} />
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
                                        <Link href={{ pathname: '/config/questions/detail', query: { id: row["id"] } }} className="text-green-dark">
                                            <Edit />
                                        </Link>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Box>
                <Box display="flex" justifyContent="end" marginTop={5}>
                    <Pagination />
                </Box>
            </Box>
            {
                isLoading && <Loader />
            }
        </Box>
    )
}

export default QuestionsComponent