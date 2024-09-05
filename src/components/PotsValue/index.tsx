"use client"
import React, {useState, useEffect} from "react"
import Link from "next/link"
import {
    Box,
    TextField,
    InputAdornment,
    Switch,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
  } from "@mui/material"
import { Search, Edit, DeleteForeverOutlined } from "@mui/icons-material"
import Pagination from "../Pagination"
import Loader from "../common/Loader"
import axios from "axios"
import { useTheme } from "@mui/material"

const PotsValueComponent: React.FC = () => {
    const theme = useTheme()
    const [tableData, setTableData] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get("/pot/fetchAll")
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
                    <TextField
                        size="medium"
                        variant="filled"
                        placeholder="Pesquisar"
                        className="left-5 w-[25%]"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Link
                        href="/config/potsvalue/create"
                        className="text-white rounded-[9999px] text-[16px] px-[50px] py-[5px] flex items-center"
                        style={{ backgroundColor: theme.palette.primary.main }}
                    >
                        Novo Pote
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
                                <TableCell>Time do Pote</TableCell>
                                <TableCell align="center">Campeonato</TableCell>
                                <TableCell align="center">Valor inicial</TableCell>
                                <TableCell align="center">Saldo atual</TableCell>
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
                                <TableCell component="th" scope="row">{row["teamName"]}</TableCell>
                                <TableCell align="center">{row["championName"]}</TableCell>
                                <TableCell align="center">{row["initValue"]}</TableCell>
                                <TableCell align="center">{row["curValue"]}</TableCell>
                                <TableCell>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Switch checked={row["status"]} />
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
                                        <Link href={{ pathname: '/config/potsvalue/edit', query: { id: row["id"] } }} className="text-green-dark">
                                            <Edit />
                                        </Link>
                                        <button className="text-red-dark" onClick={(e) => console.log(e)}>
                                            <DeleteForeverOutlined />
                                        </button>
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

export default PotsValueComponent