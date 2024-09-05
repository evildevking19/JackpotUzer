import { Box } from "@mui/material"
const Loader = () => {
  return (
    <Box className="flex h-full w-full items-center justify-center bg-white/70 dark:bg-dark absolute top-0 z-999">
      <Box className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></Box>
    </Box>
  )
}

export default Loader