import { Button,Box,Chip,} from '@mui/material'
import Result from './Result';
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import '../assets/Quiz.css'
import { decode } from 'html-entities';
export default function Quiz(){
    const [data,setData] = useState([])
    const [checkAnswer,setCheckAnswer] = useState(false)
    const [checkError,setCheckError] = useState(false)
    const {REACT_APP_DOMAIN_NAME} = process.env
    useEffect(()=>{ 
        axios.get(`${REACT_APP_DOMAIN_NAME}/api.php?amount=5`)
        .then(response=>{
            let data = response.data.results;
            data.forEach(eachData=>{
                eachData.options = []
                eachData.incorrect_answers.map(incorrectOption=>{
                    let allOptions = {
                        option:incorrectOption,
                        isClicked:false,
                    }
                    eachData.options.push(allOptions);
                })
                eachData.options.push({
                    option:eachData.correct_answer,
                    isClicked:false,
                });
                eachData.options.sort(() => Math.random() - 0.5)
            })
      console.log(data);
    
    setData(data);
    })
    .catch((error)=>{
        setCheckError(true);
    })
    },[])

    function handleUserAnswer(options,clickedOption){
            options.map((eachOption)=>{
                return eachOption.isClicked = false;
            })
        clickedOption.isClicked = !clickedOption.isClicked;
        setData([...data]);

    }

    function handleCheckAnswer(){
        setCheckAnswer(true);
    }

    return(
        <div className='mainDiv'>

           {!checkAnswer && !checkError && <Box sx = {{border:'1px solid black',padding:'10px'}}>
                {data.map((questionOption) =>{
                    const {question,options} = questionOption;
                    return(
                        <div>
                            <h3>{decode(question)}</h3>
                            {
                                options.map((eachOption)=>{
                                            return(
                                                <div>
                                                    <Chip label={decode(eachOption.option)} variant="outlined" onClick = {()=>handleUserAnswer(options,eachOption)} color = {eachOption.isClicked ? 'success' : 'primary'}  sx = {{marginBottom:'10px'}}   />
                                                </div>
                                            )
                                        })
                            }
                            
                        </div>
                    )              
                })
                }
                
                
                <hr/>
                <Button variant="contained" sx = {{padding:'10px',borderRadius:'15px',maxWidth:'max-content',float:'right'}} onClick = {handleCheckAnswer}>Check Answer</Button>
            </Box>} 
            {checkError && <h1>THERE IS SOME ERROR WHILE VIEWING THE PAGE</h1>}
            
            {checkAnswer && <Result data = {data} />}
           

        </div>
    )

}
