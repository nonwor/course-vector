import React from "react";
import {useState, useEffect} from "react";
import Result from "../resultComponent/result";
import './input.css';
import { useNavigate } from 'react-router-dom';
import LoadingIcon from '../LoadingIcon.js';

//Get Icons
import Linkedin from "../icons/linkedinIcons";
import Github from "../icons/githubIcon";

import axios from 'axios';

const UserInput =()=>{

    const[userInput, setUserInput] = useState('');
    const[data, setData] = useState({});
    const[loading, setLoading] = useState(false);

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
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/${userInput}`);
                setData(response.data);
                console.log("Done from Server!");
                setLoading(false)
                
            } catch (error) {
              console.error(error);
              setLoading(false)
            }
          };
      
        fetchData();
        
    }

    const handleChange=(e)=>{
        setUserInput(e.target.value);
    }

    return(
        <div className="userInput">
            <h3 className="mainpagetitle">Online Course Recommender using Word2Vec</h3>
            <div className="info-search">
                <div className="academicSupport">
                <label>
                    Summary and Reference:
                </label>
                    
                    <p className="paragraphSupport">This project utilize word embeddings to discover courses relevant to job titles or areas of interest. Word embeddings offer flexible context-based searching, eliminating the need for lexicons or word matching.</p>
                    <a href="/pdf/team143report.pdf" target="_blank" rel="noopener noreferrer">
                        Academic Paper
                    </a>
                    <a className="poster" href="/pdf/team143poster.pdf" target="_blank" rel="noopener noreferrer">
                        Poster Presentation
                    </a>
                </div>
            
                <form className="inputform" onSubmit={captureAndSend}>
                    <label>
                        Career/Area of Interest: 
                    </label>
                    <input
                        type="text"
                        className="inputfield"
                        value={userInput}
                        onChange={handleChange}
                        />
                    <button type="submit" className="button-17">
                        {loading? <LoadingIcon />: 'Search'}
                    </button>
                    <button onClick={handleButtonClick} className="button-17" id="gotosave">Go to Saved</button>
                </form>

                <div className="about">
                    <label>
                        About:
                    </label>
                    
                    <ul>
                        <li>Created by: Sataporn Worasilpchai</li>
                        <li className="icons">{<Linkedin/>}{<Github/>}</li>
                    </ul>
                    
                </div>
                
            </div>
           
            <div>
                <Result data={data}/>
            </div>
        </div>
    )
}

export default UserInput;