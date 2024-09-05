"use client"
import React, {useState} from "react"
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
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
  } from "@mui/material"
import { Search } from "@mui/icons-material"
import Pagination from "../Pagination"
import { useTheme } from "@mui/material"

function createData(
    createdDate: string,
    event: string,
    championship: string,
    potValue: string,
    status: string,
    endedDate: string
) {
    return { createdDate, event, championship, potValue, status, endedDate }
}

const rows = [
    createData("21/05/2024", "Flamengo X Goiás", "Campeonato Brasileiro", "R$ 16.000,00", "Ativo", "30/05/2024"),
    createData("21/05/2024", "Flamengo X Goiás", "Campeonato Brasileiro", "R$ 16.000,00", "Encerrado", "21/04/2024"),
    createData("21/05/2024", "Flamengo X Goiás", "Campeonato Brasileiro", "R$ 16.000,00", "Encerrado", "19/04/2024"),
    createData("21/05/2024", "Flamengo X Goiás", "Campeonato Brasileiro", "R$ 16.000,00", "Ativo", "30/05/2024"),
    createData("21/05/2024", "Flamengo X Goiás", "Campeonato Brasileiro", "R$ 16.000,00", "Ativo", "30/05/2024"),
    createData("21/05/2024", "Flamengo X Goiás", "Campeonato Brasileiro", "R$ 16.000,00", "Ativo", "30/05/2024")
]

const RegistComponent: React.FC = () => {
    const theme = useTheme()
    const [typeJackpot, setTypeJackpot] = useState('')
    const [tableData, setTableData] = useState(rows)

    const handleChange = (index: any, data: any, isActive: Boolean) => {
        setTableData(data.map((item: any, i: any) => 
            index === i ? {...item, isActive} : item
        ))
    }

    const deleteItem = (index: any, data: any) => {
        setTableData(data.filter((item: any, i: any) => 
            index !== i
        ))
    }

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" gap={3} width="50%">
                    <FormControl variant="filled" className="w-[50%]">
                        <InputLabel id="demo-simple-select-filled-label">Tipos de JackPot</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={typeJackpot}
                            onChange={(e) => setTypeJackpot(e.target.value)}
                        >
                            <MenuItem value={1}>Ativos</MenuItem>
                            <MenuItem value={2}>Twenty</MenuItem>
                            <MenuItem value={3}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        size="medium"
                        variant="filled"
                        placeholder="Pesquisar..."
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
                    href="/regist/create"
                    className="text-white rounded-[9999px] text-[16px] px-[50px] py-[5px] flex items-center"
                    style={{ backgroundColor: theme.palette.primary.main }}
                >
                    Novo JackPot
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
                            <TableCell>Data de Criação</TableCell>
                            <TableCell align="center">Evento/Local Controlado</TableCell>
                            <TableCell align="center">Campeonato</TableCell>
                            <TableCell align="center">Valor atual do pote</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Data de encerramento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.createdDate}</TableCell>
                            <TableCell align="center">{row.event}</TableCell>
                            <TableCell align="center">{row.championship}</TableCell>
                            <TableCell align="center">{row.potValue}</TableCell>
                            <TableCell align="center" style={{ color: row.status === "Ativo" ? theme.palette.primary.main : theme.palette.error.main }}>{row.status}</TableCell>
                            <TableCell align="center" style={{ color: row.status === "Ativo" ? theme.palette.primary.main : theme.palette.error.main }}>{row.endedDate}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Box>
            <Box display="flex" justifyContent="end" marginTop={5}>
                <Pagination />
            </Box>
        </Box>
    )
}

export default RegistComponent