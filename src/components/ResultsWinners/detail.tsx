"use client"
import React, {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
  } from "@mui/material"
import { Search } from "@mui/icons-material"
import {useTheme} from "@mui/material"

function createData(
    winner: string,
    winnerAvatar: string,
    pot: string,
    jackpots: number,
    awardedQuestions: string,
    raisedAmount: string,
) {
    return { winner, winnerAvatar, pot, jackpots, awardedQuestions, raisedAmount }
}
  
const rows = [
    createData('Jenny Wilson', '/images/user/user-01.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
    createData('Cameron Williamson', '/images/user/user-02.png', '/images/icon/icon-bronze.svg', 1, '3', 'R$ 12,00'),
    createData('Esther Howard', '/images/user/user-03.png', '/images/icon/icon-bronze.svg', 1, '-', 'R$ 0,00'),
    createData('Jerome Bell', '/images/user/user-04.png', '/images/icon/icon-bronze.svg', 1, '-', 'R$ 0,00'),
    createData('Dianne Russell', '/images/user/user-05.png', '/images/icon/icon-bronze.svg', 1, '3', 'R$ 8,00'),
    createData('Devon Lane', '/images/user/user-06.png', '/images/icon/icon-bronze.svg', 1, '5', 'R$ 20,00'),
    createData('Robert Fox', '/images/user/user-07.png', '/images/icon/icon-bronze.svg', 1, '5', 'R$ 20,00'),
    createData('Jenny Wilson', '/images/user/user-08.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-09.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-10.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-11.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-12.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-13.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-14.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
    createData('Jenny Wilson', '/images/user/user-15.png', '/images/icon/icon-bronze.svg', 1, '2', 'R$ 8,00'),
]

const ResultsWinnersDetailComponent: React.FC = () => {
    const theme = useTheme()
    const [typePot, setTypePot] = useState('1')

    return (
        <Box display="flex" flexDirection="column" width="100%" paddingX={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" flexDirection="column" gap={2}>
                    <p className="text-[18px]">Ganhadores - Flamengo X Goiás</p>
                    <FormControl variant="filled" className="w-full">
                        <InputLabel id="demo-simple-select-filled-label">Tipos de Pote</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={typePot}
                            onChange={(e) => setTypePot(e.target.value)}
                        >
                            <MenuItem value={1}>Bronze</MenuItem>
                            <MenuItem value={2}>Prata</MenuItem>
                            <MenuItem value={3}>Ouro</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" columnGap={3} rowGap={1}>
                    <Box display="flex" gap={2}>
                        <p className="text-[14px]">Data criação:</p>
                        <p className="text-[18px] font-bold">21/05/2024</p>
                    </Box>
                    <Box display="flex" gap={2}>
                        <p className="text-[14px]">Encerrado:</p>
                        <p className="text-[18px] font-bold">21/06/2024</p>
                    </Box>
                    <Box display="flex" gap={2}>
                        <p className="text-[14px]">Total ganhadores:</p>
                        <p className="text-[18px] font-bold">52</p>
                    </Box>
                    <Box display="flex" gap={2}>
                        <p className="text-[14px]">Bronze:</p>
                        <p className="text-[18px] font-bold">40 ganhadores</p>
                    </Box>
                    <Box display="flex" gap={2}>
                        <p className="text-[14px]">Prata:</p>
                        <p className="text-[18px] font-bold">10 ganhadores</p>
                    </Box>
                    <Box display="flex" gap={2}>
                        <p className="text-[14px]">Ouro:</p>
                        <p className="text-[18px] font-bold">2 ganhadores</p>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" gap={5} marginTop={5}>
                <Box display="flex" flexDirection="column" position="relative" width="80%" borderRadius={3} boxShadow={3} paddingX={5} paddingY={2}>
                    <Image
                        width={50}
                        height={50}
                        alt=""
                        src={'/images/icon/icon-bronze.svg'}
                        className="absolute -top-7 -right-7"
                     />
                    <p className="font-extrabold">POTE BRONZE <span className="text-[13px]">- PRÊMIO 20% DO VALOR TOTAL</span></p>
                    <Box maxHeight="400px" overflow='auto' marginTop={3}>
                        <Table stickyHeader>
                            <TableHead sx={{
                                '& th': {
                                    fontWeight: 700
                                }
                            }}>
                                <TableRow>
                                    <TableCell>Ganhadores (40)</TableCell>
                                    <TableCell align="center">Pote</TableCell>
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
                                        <Link href={'/results/winners/detail/user'} className="hover:text-green-300 duration-500">
                                            <Box display="flex" alignItems="center" gap={3}>
                                                <Image width={40} height={40} alt="" src={row.winnerAvatar} />
                                                {row.winner}
                                            </Box>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="flex justify-center">
                                        <Image width={30} height={30} alt="" src={row.pot} />
                                    </TableCell>
                                    <TableCell align="center">{row.jackpots}</TableCell>
                                    <TableCell align="center">{row.awardedQuestions}</TableCell>
                                    <TableCell align="center">{row.raisedAmount}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Box>
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
            <Box display="flex" justifyContent="end">
                <Button
                    variant="contained"
                    style={{
                        width: '20%',
                        marginTop: '30px',
                        marginRight: '20px',
                        borderRadius: '9999px',
                        color: 'white',
                        padding: '10px 0px'
                    }}
                >
                    Imprimir
                </Button>
            </Box>
        </Box>
    )
}

export default ResultsWinnersDetailComponent