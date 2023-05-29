import React from "react";
import {useState, useEffect} from "react";
import Result from "../resultComponent/result";
import './input.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const UserInput =()=>{

    const[userInput, setUserInput] = useState('');
    const[data, setData] = useState({});

    useEffect(() => {
       
        const oldData = localStorage.getItem('data');
        if(oldData){
            setData(JSON.parse(oldData))
        }
        
    }, []);

    const history = useNavigate ();

    const handleButtonClick =()=>{
        history('/save');
    }

    const captureAndSend=(e)=>{
        e.preventDefault();
        console.log(userInput);

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/${userInput}`);
                setData(response.data);
                console.log("Done from Server!");
                
            } catch (error) {
              console.error(error);
            }
          };
      
        fetchData();
        
    }

    const handleChange=(e)=>{
        setUserInput(e.target.value);
    }

    return(
        <div className="userInput">
            <h3>Online Course Recommender using Word2Vec</h3>
            <div className="academicSupport">
                Summary and Reference:
                <p>The goal of this project is to use word embeddings, to find courses related to job title.</p>
                <a href="/pdf/team143report.pdf" target="_blank" rel="noopener noreferrer">
                    Academic Paper
                </a>
                <a href="/pdf/team143poster.pdf" target="_blank" rel="noopener noreferrer">
                    Poster Presentation
                </a>
            </div>
            
            <form onSubmit={captureAndSend}>
                <label>
                    Career:
                    <input
                    type="text"
                    name="career"
                    value={userInput}
                    onChange={handleChange}
                    />
                </label>
                <button type="submit">GO!</button>
                <button onClick={handleButtonClick}>Go to Save</button>
            </form>
            <div> Result field
                <Result data={data}/>
            </div>
        </div>
    )
}

export default UserInput;