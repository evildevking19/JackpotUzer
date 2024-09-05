"use client"
import React, {useState} from "react"
import Link from "next/link"
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Switch
  } from "@mui/material"
import { Search, FilterAlt, FilterAltOutlined } from "@mui/icons-material"
import Pagination from "../Pagination"
import { useTheme } from "@mui/material"

const AccumulPotsComponent: React.FC = () => {
    const theme = useTheme()
    const [tableData, setTableData] = useState([
        {
            event: "Flamengo X Goiás",
            createdDate: "31/05/2024",
            accumulValue: "R$ 60.000,00",
            isActive: true
        },
        {
            event: "Flamengo X Goiás",
            createdDate: "31/05/2024",
            accumulValue: "R$ 60.000,00",
            isActive: true
        },
        {
            event: "Flamengo X Goiás",
            createdDate: "31/05/2024",
            accumulValue: "R$ 60.000,00",
            isActive: true
        }
    ])

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" gap={5} width="40%">
                    <FormControl variant="filled" className="w-[50%]">
                        <InputLabel id="demo-simple-select-filled-label">Tipos de JackPots</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            // value={age}
                            // onChange={handleChange}
                        >
                            <MenuItem value={1}>Evento/Local Controlado</MenuItem>
                            <MenuItem value={2}>Evento/Local Controlado</MenuItem>
                            <MenuItem value={3}>Evento/Local Controlado</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        size="medium"
                        variant="filled"
                        placeholder="Pesquisar"
                        className="w-[50%]"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                            )
                        }}
                        />
                </Box>
                <Box display="flex" alignItems="center" gap={5}>
                    <Button onClick={() => console.log("asdfadf")}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <FilterAltOutlined color="primary" />
                            <span className="underline text-[14px]" style={{ color: theme.palette.primary.main }}>Filtros</span>
                        </Box>
                    </Button>
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
                            <TableCell align="center">Data de criação</TableCell>
                            <TableCell align="center">Valor acumulado</TableCell>
                            <TableCell align="center">Ativo/Inativo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.event}</TableCell>
                            <TableCell align="center">{row.createdDate}</TableCell>
                            <TableCell align="center">{row.accumulValue}</TableCell>
                            <TableCell>
                                <Box display="flex" justifyContent="center">
                                    <Switch checked={row.isActive} />
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
    )
}

export default AccumulPotsComponent