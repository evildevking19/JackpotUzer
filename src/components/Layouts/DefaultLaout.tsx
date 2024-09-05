"use client"
import React, { useState, ReactNode } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { createTheme, ThemeProvider } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      main: "#05B59D",
      light: "#05B59D11",
    },
    secondary: {
      main: "#39474F",
      dark: "#421C6D",
      light: "#077167"
    },
    error: {
      main: "#A40000"
    },
    text: {
      disabled: "#D9D9D9"
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontSize: '18px'
    },
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#A40000"
        },
        track: {
          opacity: 0.8,
          backgroundColor: "#F96969"
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#39474F77',
          minHeight: 'auto',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '30px',
          paddingRight: '30px',
          fontWeight: '800'
        },
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: '4px'
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderColor: 'grey'
        }
      }
    }
  }
})

export default function DefaultLayout({
  children,
}: {
  children: ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      {/* <!-- ===== Page Wrapper Star ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Star ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Star ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Star ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Star ===== --> */}
          <main>
            <div className="max-w-screen my-20 mx-15 bg-white rounded-[10px] shadow-card-10 p-5">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </ThemeProvider>
  )
}
