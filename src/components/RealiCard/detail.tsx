"use client"
import React, {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Box,
    TextField,
    InputAdornment,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
  } from "@mui/material"
import { Search } from "@mui/icons-material"
import {useTheme} from "@mui/material"

function createData(
    bettor: string,
    bettorAvatar: string,
    codJackpot: number,
    jackpots: number,
    awardedQuestions: string,
    raisedAmount: string,
) {
    return { bettor, bettorAvatar, codJackpot, jackpots, awardedQuestions, raisedAmount }
}
  
const rows = [
    createData('Jenny Wilson', '/images/user/user-01.png', 15230, 1, '2', 'R$ 8,00'),
    createData('Cameron Williamson', '/images/user/user-02.png', 15230, 1, '3', 'R$ 12,00'),
    createData('Esther Howard', '/images/user/user-03.png', 15230, 1, '-', 'R$ 0,00'),
    createData('Jerome Bell', '/images/user/user-04.png', 15230, 1, '-', 'R$ 0,00'),
    createData('Dianne Russell', '/images/user/user-05.png', 15230, 1, '3', 'R$ 8,00'),
    createData('Devon Lane', '/images/user/user-06.png', 15230, 1, '5', 'R$ 20,00'),
    createData('Robert Fox', '/images/user/user-07.png', 15230, 1, '5', 'R$ 20,00'),
    createData('Jenny Wilson', '/images/user/user-08.png', 15230, 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-09.png', 15230, 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-10.png', 15230, 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-11.png', 15230, 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-12.png', 15230, 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-13.png', 15230, 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-14.png', 15230, 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-15.png', 15230, 1, '2', 'R$ 8,00'),
]

const RealiCardDetailComponent: React.FC = () => {
    const theme = useTheme()

    return (
        <Box display="flex" flexDirection="column" width="100%" paddingX={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" flexDirection="column" gap={2}>
                    <p className="text-[18px]">Brasileirão 2024 / Flamengo</p>
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
                <Box display="flex" gap={10}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <p className="text-[14px]">Data criação</p>
                        <p className="text-[18px] font-bold">21/05/2024</p>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <p className="text-[14px]">Status</p>
                        <p className="text-[18px] font-bold" style={{ color: theme.palette.primary.main }}>ATIVO</p>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <p className="text-[14px]">Encerramento</p>
                        <p className="text-[18px] font-bold">21/06/2024</p>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" gap={5} marginTop={2}>
                <Box maxHeight="600px" overflow='auto' width="80%">
                    <Table stickyHeader>
                        <TableHead sx={{
                            '& th': {
                                fontWeight: 700
                            }
                        }}>
                            <TableRow>
                                <TableCell>Apostadores (22.000)</TableCell>
                                <TableCell align="center">COD. JackPot</TableCell>
                                <TableCell align="center">JackPots</TableCell>
                                <TableCell align="center">Perg. Premiada</TableCell>
                                <TableCell align="center">Valor arrecadado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link href={'/realicard/detail/user'} className="hover:text-green-300 duration-500">
                                        <Box display="flex" alignItems="center" gap={3}>
                                            <Image width={40} height={40} alt="" src={row.bettorAvatar} />
                                            {row.bettor}
                                        </Box>
                                    </Link>
                                </TableCell>
                                <TableCell align="center">{row.codJackpot}</TableCell>
                                <TableCell align="center">{row.jackpots}</TableCell>
                                <TableCell align="center">{row.awardedQuestions}</TableCell>
                                <TableCell align="center">{row.raisedAmount}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Box>
                <Box display="grid" gridTemplateRows="1fr 1fr 1fr 1fr" rowGap={4} width="20%">
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" rowGap={3} bgcolor='white' boxShadow={3} borderRadius={5}>
                        <p className="text-[14px]">Valor Pote atual</p>
                        <p className="text-[18px] font-bold" style={{ color: theme.palette.primary.main }}>R$ 25.000,00</p>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" rowGap={3} bgcolor='white' boxShadow={3} borderRadius={5}>
                        <p className="text-[14px]">Valor Arrecadado</p>
                        <p className="text-[18px] font-bold" style={{ color: theme.palette.primary.main }}>R$ 35.000,00</p>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" rowGap={3} bgcolor='white' boxShadow={3} borderRadius={5}>
                        <p className="text-[14px]">Cards comercializados</p>
                        <p className="text-[18px] font-bold" style={{ color: theme.palette.primary.main }}>Nº: 22.000</p>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" rowGap={3} bgcolor='white' boxShadow={3} borderRadius={5}>
                        <p className="text-[14px]">Total de Cards</p>
                        <p className="text-[18px] font-bold" style={{ color: theme.palette.primary.main }}>Nº: 60.000</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RealiCardDetailComponent