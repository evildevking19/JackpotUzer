"use client"
import React, {useState} from "react"
import Link from "next/link"
import {
    Box,
    Button,
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
import { Search, FilterAlt, FilterAltOutlined, Menu } from "@mui/icons-material"
import Pagination from "../Pagination"
import { useTheme } from "@mui/material"

function createData(
    championTime: string,
    bettorsNum: string,
    raisedAmount: string,
    potValue: string,
    status: string,
    endedDate: string
) {
    return { championTime, bettorsNum, raisedAmount, potValue, status, endedDate }
}

const rows = [
    createData("Brasileirão 2024 / Flamengo", "2.000", "R$ 35.000,00", "R$ 25.000,00", "Ativo", "30/05/2024"),
    createData("Brasileirão 2024 / Flamengo", "2.000", "R$ 35.000,00", "R$ 25.000,00", "Ativo", "30/05/2024"),
    createData("Brasileirão 2024 / Flamengo", "2.000", "R$ 35.000,00", "R$ 25.000,00", "Ativo", "30/05/2024"),
    createData("Brasileirão 2024 / Flamengo", "2.000", "R$ 35.000,00", "R$ 25.000,00", "Ativo", "30/05/2024"),
    createData("Brasileirão 2024 / Flamengo", "2.000", "R$ 35.000,00", "R$ 25.000,00", "Ativo", "30/05/2024"),
    createData("Brasileirão 2024 / Flamengo", "2.000", "R$ 35.000,00", "R$ 25.000,00", "Ativo", "30/05/2024")
]

const RealiCardComponent: React.FC = () => {
    const theme = useTheme()
    const [typeJackpot, setTypeJackpot] = useState('')
    const [tableData, setTableData] = useState(rows)

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column">
                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" columnGap={5} alignItems="center" width="100%">
                    <FormControl variant="filled" className="w-full">
                        <InputLabel id="demo-simple-select-filled-label">Tipos de Evento</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            // value={age}
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" className="w-full">
                        <InputLabel id="demo-simple-select-filled-label">Tipos de Evento</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            // value={age}
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        size="medium"
                        variant="filled"
                        placeholder="Pesquisar"
                        className="w-full"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                        />
                    <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
                        <Button onClick={() => console.log("asdfadf")}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FilterAltOutlined color="primary" />
                                <span className="underline" style={{ color: theme.palette.primary.main }}>Filtros</span>
                            </Box>
                        </Button>
                    </Box>
                </Box>
                <TextField
                    size="medium"
                    variant="filled"
                    placeholder="Pesquisar"
                    className="w-[45%] !mt-5"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                    />
            </Box>
            <Box maxHeight="500px" overflow='auto' marginTop={3}>
                <Table stickyHeader>
                    <TableHead sx={{
                        '& th': {
                            fontWeight: 700
                        }
                    }}>
                        <TableRow>
                            <TableCell>Campeonato/Time</TableCell>
                            <TableCell align="center">Apostadores</TableCell>
                            <TableCell align="center">Valor arrecadado</TableCell>
                            <TableCell align="center">Saldo do Pote</TableCell>
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
                            <TableCell component="th" scope="row">
                                <Link href={'/realicard/detail'} className="hover:text-green-300 duration-300">
                                    {row.championTime}
                                </Link>
                            </TableCell>
                            <TableCell align="center">{row.bettorsNum}</TableCell>
                            <TableCell align="center">{row.raisedAmount}</TableCell>
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

export default RealiCardComponent