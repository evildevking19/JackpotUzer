"use client"
import React, {useState, useEffect} from "react"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  InputAdornment
} from "@mui/material"
import { Search, GridView, FilterAlt, Menu } from "@mui/icons-material"
import { Gauge, gaugeClasses, LineChart } from '@mui/x-charts'
import { useTheme } from "@mui/material"

const settings = {
  width: 100,
  height: 100,
  innerRadius: "70%"
}

const uData = [200, 100, 450, 50, 150, 80, 350, 200, 280, 300, 480, 130]
const xLabels = [
  new Date(2024, 0, 1),
  new Date(2024, 1, 1),
  new Date(2024, 2, 1),
  new Date(2024, 3, 1),
  new Date(2024, 4, 1),
  new Date(2024, 5, 1),
  new Date(2024, 6, 1),
  new Date(2024, 7, 1),
  new Date(2024, 8, 1),
  new Date(2024, 9, 1),
  new Date(2024, 10, 1),
  new Date(2024, 11, 1)
]
const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const Dashboard: React.FC = () => {
  const theme = useTheme()
  const [age, setAge] = useState('')

  const handleChange = (e: SelectChangeEvent) => {
      setAge(e.target.value)
  }

  useEffect(() => {
    let gaugeRoots = document.querySelectorAll('.MuiGauge-root')
    gaugeRoots.forEach((g: any) => {
      g.style.flexGrow = 0
      let svg = g.querySelector("svg")
      let svg_html_string = svg.innerHTML
      svg_html_string += `<defs><linearGradient id="gradient"><stop offset="5%" stop-color="${theme.palette.secondary.light}" /><stop offset="95%" stop-color="${theme.palette.secondary.dark}" /></linearGradient></defs>`
      svg.innerHTML = svg_html_string
    })
  }, [])

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" width="100%">
          <FormControl variant="filled" className="w-[25%]">
              <InputLabel id="demo-simple-select-filled-label">Tipos de Evento</InputLabel>
              <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={age}
                  onChange={handleChange}
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
              className="left-5 w-[25%]"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
        </Box>
        <Box display="flex" alignItems="center">
          <Button onClick={() => console.log("asdfadf")}>
            <Box display="flex" alignItems="center" gap={1}>
              <FilterAlt color="primary" />
              <span className="underline" style={{ color: theme.palette.primary.main }}>Filtros</span>
            </Box>
          </Button>
          <Button sx={{ width: 'auto' }}>
            <GridView color="primary"/>
          </Button>
          <Button>
            <Menu />
          </Button>
        </Box>
      </Box>
      <Box display="flex" gap={5} marginTop={3}>
        <Box display="flex" flexDirection="column" width="40%">
          <Box display="flex" justifyContent="space-between" alignItems="center" padding={2} bgcolor="white" boxShadow={3} borderRadius={2}>
            <Box display="flex" flexDirection="column">
              <span className="font-bold text-[14px]">APOSTAS DO DIA</span>
              <span className="font-bold text-[25px]" style={{ color: theme.palette.primary.main }}>R$ 12.239,09</span>
              <span className="text-[12px]">59 INGRESSOS</span>
            </Box>
            <Gauge
              {...settings}
              value={70}
              cornerRadius="50%"
              sx={(theme) => ({
                [`svg`]: {
                  width: "auto !important"
                },
                [`& .${gaugeClasses.root}`]: {
                  flexGrow: 0
                },
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 15,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: 'url(#gradient)',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
              text={
                ({ value, valueMax }) => `${value}%`
              }
            />
          </Box>
          <Box display="flex" flexDirection="column" bgcolor="white" padding={2} marginTop={5} borderRadius={2} boxShadow={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" flexDirection="column">
                <span className="font-bold text-[14px]">TOTAL DE APOSTAS</span>
                <span className="font-bold text-[25px]" style={{ color: theme.palette.primary.main }}>R$ 192.239,09</span>
                <span className="text-[12px]">15.805 INGRESSOS</span>
              </Box>
              <Gauge
                {...settings}
                value={90}
                cornerRadius="50%"
                sx={(theme) => ({
                  [`svg`]: {
                    width: "auto !important"
                  },
                  [`& .${gaugeClasses.root}`]: {
                    flexGrow: 0
                  },
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 15,
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: 'url(#gradient)',
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                  },
                })}
                text={
                  ({ value, valueMax }) => `${value}%`
                }
              />
            </Box>
            <Box display="flex" alignItems="center" gap={5}>
              <Box display="flex" flexDirection="column" lineHeight={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span className="w-[8px] h-[8px] bg-[#002FA7] rounded-[9999px]"></span>
                  <span className="font-bold text-[11px]" style={{ 
                    background: `-webkit-linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent' 
                  }}>EMBAIXADOR</span>
                </Box>
                <Box display="flex" flexDirection="column" lineHeight={1.5} marginLeft={1}>
                  <span className="font-bold text-[11px]" style={{ color: theme.palette.primary.main }}>R$ 6.687,15</span>
                  <span className="font-bold text-[8px]">847 ingressos</span>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" lineHeight={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span className="w-[8px] h-[8px] bg-[#F0641A] rounded-[9999px]"></span>
                  <span className="font-bold text-[11px]" style={{ 
                    background: `-webkit-linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent' 
                  }}>CAMAROTE</span>
                </Box>
                <Box display="flex" flexDirection="column" lineHeight={1.5} marginLeft={1}>
                  <span className="font-bold text-[11px]" style={{ color: theme.palette.primary.main }}>R$ 6.687,15</span>
                  <span className="font-bold text-[8px]">847 ingressos</span>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" lineHeight={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span className="w-[8px] h-[8px] bg-[#39474F] rounded-[9999px]"></span>
                  <span className="font-bold text-[11px]" style={{ 
                    background: `-webkit-linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent' 
                  }}>PALCO</span>
                </Box>
                <Box display="flex" flexDirection="column" lineHeight={1.5} marginLeft={1}>
                  <span className="font-bold text-[11px]" style={{ color: theme.palette.primary.main }}>R$ 6.687,15</span>
                  <span className="font-bold text-[8px]">847 ingressos</span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" bgcolor="white" padding={2} marginTop={5} borderRadius={2} boxShadow={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" flexDirection="column">
                <span className="font-bold text-[14px]">APOSTAS ESPERADAS</span>
                <span className="font-bold text-[25px]" style={{ color: theme.palette.primary.main }}>80.589</span>
                <span className="text-[12px]">PESSOAS</span>
              </Box>
              <Gauge
                {...settings}
                value={95}
                cornerRadius="50%"
                sx={(theme) => ({
                  [`svg`]: {
                    width: "auto !important"
                  },
                  [`& .${gaugeClasses.root}`]: {
                    flexGrow: 0
                  },
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 15,
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: 'url(#gradient)',
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                  },
                })}
                text={
                  ({ value, valueMax }) => `${value}%`
                }
              />
            </Box>
            <Box display="flex" alignItems="center" gap={5}>
              <Box display="flex" flexDirection="column" lineHeight={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span className="w-[8px] h-[8px] bg-[#00A72F] rounded-[9999px]"></span>
                  <span className="font-bold text-[11px]" style={{ 
                    background: `-webkit-linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent' 
                  }}>PAGANTES</span>
                </Box>
                <Box display="flex" flexDirection="column" lineHeight={1.5} marginLeft={1}>
                  <span className="font-bold text-[11px]" style={{ color: theme.palette.primary.main }}>R$ 6.687,15</span>
                  <span className="font-bold text-[8px]">847 ingressos</span>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" lineHeight={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span className="w-[8px] h-[8px] bg-[#9E50EE] rounded-[9999px]"></span>
                  <span className="font-bold text-[11px]" style={{ 
                    background: `-webkit-linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent' 
                  }}>CORTESIAS</span>
                </Box>
                <Box display="flex" flexDirection="column" lineHeight={1.5} marginLeft={1}>
                  <span className="font-bold text-[11px]" style={{ color: theme.palette.primary.main }}>R$ 6.687,15</span>
                  <span className="font-bold text-[8px]">847 ingressos</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" width="60%">
          <Box display="flex" flexDirection="column" bgcolor="white" padding={2} borderRadius={2} boxShadow={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" flexDirection="column">
                <span className="font-bold text-[14px]">APOSTAS DA SEMANA</span>
                <span className="font-bold text-[25px]" style={{ color: theme.palette.primary.main }}>R$ 300.239,09</span>
                <span className="text-[12px]">15.805 INGRESSOS</span>
              </Box>
              <Gauge
                {...settings}
                value={55}
                cornerRadius="50%"
                sx={(theme) => ({
                  [`svg`]: {
                    width: "auto !important"
                  },
                  [`& .${gaugeClasses.root}`]: {
                    flexGrow: 0
                  },
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 15,
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: 'url(#gradient)',
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                  },
                })}
                text={
                  ({ value, valueMax }) => `${value}%`
                }
              />
            </Box>
            <Box display="flex" alignItems="center" gap={5}>
              <Box display="flex" flexDirection="column" lineHeight={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span className="w-[8px] h-[8px] bg-[#002FA7] rounded-[9999px]"></span>
                  <span className="font-bold text-[11px]" style={{ 
                    background: `-webkit-linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent' 
                  }}>EMBAIXADOR</span>
                </Box>
                <Box display="flex" flexDirection="column" lineHeight={1.5} marginLeft={1}>
                  <span className="font-bold text-[11px]" style={{ color: theme.palette.primary.main }}>R$ 6.687,15</span>
                  <span className="font-bold text-[8px]">847 ingressos</span>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" lineHeight={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span className="w-[8px] h-[8px] bg-[#F0641A] rounded-[9999px]"></span>
                  <span className="font-bold text-[11px]" style={{ 
                    background: `-webkit-linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent' 
                  }}>CAMAROTE</span>
                </Box>
                <Box display="flex" flexDirection="column" lineHeight={1.5} marginLeft={1}>
                  <span className="font-bold text-[11px]" style={{ color: theme.palette.primary.main }}>R$ 6.687,15</span>
                  <span className="font-bold text-[8px]">847 ingressos</span>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" lineHeight={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <span className="w-[8px] h-[8px] bg-[#39474F] rounded-[9999px]"></span>
                  <span className="font-bold text-[11px]" style={{ 
                    background: `-webkit-linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.light} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>PALCO</span>
                </Box>
                <Box display="flex" flexDirection="column" lineHeight={1.5} marginLeft={1}>
                  <span className="font-bold text-[11px]" style={{ color: theme.palette.primary.main }}>R$ 6.687,15</span>
                  <span className="font-bold text-[8px]">847 ingressos</span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" bgcolor="white" padding={2} marginTop={3} borderRadius={2} boxShadow={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" flexDirection="column">
                <span className="font-bold text-[14px]">APOSTAS DO MÊS</span>
                <span className="font-bold text-[25px]" style={{ color: theme.palette.primary.main }}>R$ 192.239,09</span>
                <span className="text-[12px]">15.805 INGRESSOS</span>
              </Box>
              <Gauge
                {...settings}
                value={90}
                cornerRadius="50%"
                sx={(theme) => ({
                  [`svg`]: {
                    width: "auto !important"
                  },
                  [`& .${gaugeClasses.root}`]: {
                    flexGrow: 0
                  },
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 15,
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: 'url(#gradient)',
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                  },
                })}
                text={
                  ({ value, valueMax }) => `${value}%`
                }
              />
            </Box>
            <LineChart
              height={250}
              series={[{ data: uData, area: true, showMark: false }]}
              xAxis={[{
                scaleType: 'time',
                data: xLabels,
                colorMap: {
                  type: 'continuous',
                  min: new Date(2024, 0, 1),
                  max: new Date(2024, 11, 31),
                  color: [theme.palette.secondary.dark, theme.palette.secondary.light],
                },
                valueFormatter: (value) => monthLabels[value.getMonth()],
              }]}
              yAxis={[{ colorMap: undefined }]}
              sx={{
                width: '100%',
                "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                  fontWeight: "bold",
                  fill: theme.palette.primary.main
                },
                // change bottom label styles
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                  fontWeight: "bold",
                  fill: theme.palette.primary.main
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
