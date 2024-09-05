import React, {ChangeEvent} from "react"
import { FormControlLabel, Checkbox } from "@mui/material"
import { useTheme } from "@mui/material"

interface CheckButtonProps {
    label: string,
    value: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckButton = ({ label, value, onChange }: CheckButtonProps) => {
    const theme = useTheme()
    return (
        <FormControlLabel
            control={<Checkbox checked={value} onChange={onChange} />}
            label={label}
            className={`flex w-full border-2 rounded-[10px]`}
            style={{
                borderColor: value ? theme.palette.primary.main : 'inherit',
                backgroundColor: value ? theme.palette.primary.light : 'white'
            }}
        />
    )
}

export default CheckButton