import React, { ReactNode } from "react"
import { useTheme } from "@mui/material"

const PageLink = ({ children, active }: { children: ReactNode; active: Boolean }) => {

    const theme = useTheme()
    return (
        <div 
            className={`w-[30px] h-[30px] flex items-center justify-center cursor-pointer rounded-[9999px] transition-all duration-500 ${active ? `text-white` : 'hover:!bg-[#d8f7f2]'}`}
            style={{
                backgroundColor: active ? theme.palette.primary.main : 'inherit'
            }}
        >
            {children}
        </div>
    )
}

export default PageLink