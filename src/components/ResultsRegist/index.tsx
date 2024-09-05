"use client"
import React, {useState} from "react"
import Link from "next/link"
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
  } from "@mui/material"
import { Search, FilterAlt, FilterAltOutlined } from "@mui/icons-material"
import Pagination from "../Pagination"
import { useTheme } from "@mui/material"

function createData(
    event: string,
    endDate: string,
    registDate: string,
    releaseDate: string,
    status: string
) {
    return { event, endDate, registDate, releaseDate, status }
}

const rows = [
    createData("Flamengo X Goiás", "20/05/2024", "21/05/2024", "21/05/2024", "Lançado"),
    createData("Flamengo X Goiás", "20/05/2024", "-", "-", "Aguardando apuração"),
    createData("Flamengo X Goiás", "20/05/2024", "-", "-", "Aguardando apuração"),
    createData("Flamengo X Goiás", "20/05/2024", "-", "-", "Aguardando apuração"),
    createData("Flamengo X Goiás", "20/05/2024", "21/05/2024", "21/05/2024", "Lançado"),
    createData("Flamengo X Goiás", "20/05/2024", "21/05/2024", "21/05/2024", "Lançado"),
]

const ResultsRegistComponent: React.FC = () => {
    const theme = useTheme()
    const [tableData, setTableData] = useState(rows)

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" justifyContent="space-between">
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
                <Box display="flex" alignItems="center" gap={5}>
                    <Button onClick={() => console.log("asdfadf")}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <FilterAltOutlined color="primary" />
                            <span className="underline text-[14px]" style={{ color: theme.palette.primary.main }}>Filtros</span>
                        </Box>
                    </Button>
                    <Link
                        href="/results/regist/create"
                        className="text-white rounded-[9999px] text-[16px] px-[50px] py-[15px] flex items-center"
                        style={{ backgroundColor: theme.palette.primary.main }}
                    >
                        Novo Resultado
                    </Link>
                </Box>
            </Box>
            <Box maxHeight="500px" overflow='auto' marginTop={5}>
                <Table stickyHeader>
                    <TableHead sx={{
                        '& th': {
                            fontWeight: 700
                        }
                    }}>
                        <TableRow>
                            <TableCell>Evento/Local Controlado</TableCell>
                            <TableCell align="center">Data final do evento</TableCell>
                            <TableCell align="center">Cadastro</TableCell>
                            <TableCell align="center">Apurado/Lançado</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.event}</TableCell>
                            <TableCell align="center">{row.endDate}</TableCell>
                            <TableCell align="center">{row.registDate}</TableCell>
                            <TableCell align="center">{row.releaseDate}</TableCell>
                            <TableCell align="center" style={{ color: row.status === "Lançado" ? theme.palette.primary.main : theme.palette.error.main }}>{row.status}</TableCell>
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

export default ResultsRegistComponent