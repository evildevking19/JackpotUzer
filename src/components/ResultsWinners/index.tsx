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
    event: string,
    bronze: number,
    prata: number,
    ouro: number,
    total: number,
    totalBalance: string,
    endDate: string
) {
    return { event, bronze, prata, ouro, total, totalBalance, endDate }
}
  
const rows = [
    createData('Flamengo X Goiás', 50, 10, 0, 62, 'R$ 60.000,00', '30/05/2024'),
    createData('Flamengo X Goiás', 50, 10, 0, 62, 'R$ 60.000,00', '30/05/2024'),
    createData('Flamengo X Goiás', 0, 0, 2, 2, 'R$ 60.000,00', '30/05/2024'),
    createData('Flamengo X Goiás', 50, 10, 0, 62, 'R$ 60.000,00', '30/05/2024'),
    createData('Flamengo X Goiás', 0, 0, 1, 1, 'R$ 60.000,00', '30/05/2024'),
    createData('Flamengo X Goiás', 50, 10, 0, 62, 'R$ 60.000,00', '30/05/2024'),
]

const ResultsWinnersComponent: React.FC = () => {
    const theme = useTheme()
    const [typeJackpot, setTypeJackpot] = useState('')

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Box display="flex" gap={3} width="50%">
                    <FormControl variant="filled" className="w-full">
                        <InputLabel id="demo-simple-select-filled-label">Tipos de JackPots</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={typeJackpot}
                            onChange={(e) => setTypeJackpot(e.target.value)}
                        >
                            <MenuItem value={1}>Valor do Pote</MenuItem>
                            <MenuItem value={2}>Valor do Pote</MenuItem>
                            <MenuItem value={3}>Valor do Pote</MenuItem>
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
                </Box>
                <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
                    <Button onClick={() => console.log("asdfadf")}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <FilterAltOutlined color="primary" />
                            <span className="underline" style={{ color: theme.palette.primary.main }}>Filtros</span>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <Box marginTop={5}>
                <Box maxHeight="600px" overflow='auto'>
                    <Table stickyHeader>
                        <TableHead sx={{
                            '& th': {
                                fontWeight: 700
                            }
                        }}>
                            <TableRow>
                                <TableCell>Evento/Local Controlado</TableCell>
                                <TableCell align="right">Bronze</TableCell>
                                <TableCell align="right">Prata</TableCell>
                                <TableCell align="right">Ouro</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="center">Valor Total</TableCell>
                                <TableCell align="center">Encerramento</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link href={'/results/winners/detail'} className="hover:text-green-300 duration-500">
                                        {row.event}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">{row.bronze}</TableCell>
                                <TableCell align="right">{row.prata}</TableCell>
                                <TableCell align="right">{row.ouro}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                                <TableCell align="center">{row.totalBalance}</TableCell>
                                <TableCell align="center">{row.endDate}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
            <Box display="flex" justifyContent="end" marginTop={5}>
                <Pagination />
            </Box>
        </Box>
    )
}

export default ResultsWinnersComponent