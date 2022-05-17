import { Box,Button } from "@mui/material"
export default function StartQuiz(){
    return(
        <Box sx = {{textAlign:'center',marginTop:'280px'}} >
            <h1>Quizzical</h1>
            <h5>Some description if needed</h5>
            <Button variant="contained" href = '/quiz'>START QUIZ</Button>

        </Box>
    )
}