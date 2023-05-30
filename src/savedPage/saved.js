import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './save.css'


const Saved = () =>{

    const history = useNavigate();

    const handleButtonClick =()=>{
        history('/');
    }

    const[selectedItems, setFocusItems]=useState([]);
    
    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setFocusItems(JSON.parse(storedItems));
        }
        
    }, []);

    const handleCheckboxChange = (event, item)=>{
        
        if(event.target.checked){
            setFocusItems([...selectedItems, item])
        } else {
            setFocusItems(selectedItems.filter(checkedItem=>checkedItem.cos_sim!==item.cos_sim))
        }
    }

    const saveEdit=()=>{
        localStorage.setItem('items', JSON.stringify(selectedItems));
    }

    return(
        <div className="page">

            <div className="mainnav">                
                <h3 className="pagetitle">Saved Courses</h3>
                <button className="button-17" id="backtohome" onClick={handleButtonClick}>Go to Home</button>
            </div>
            <div className="scroll-container">
                {selectedItems.map(item => (
                        <div key={item.cos_sim} className="courseItem">
                            
                            {/* We try to populat items if it's already been checked */}
                            <input
                            className="checkbox"
                            type="checkbox"
                            checked={item}
                            onChange={event => handleCheckboxChange(event, item)}
                            />
                            <p className="title" 
                                title={item.description}>
                                {item.orig_title}
                            </p>
                            <p className="source">Source: {item.source}</p>
                            <p className="rating">Rating: {item.rating||"N/A"}</p>
                            <p className="hours">Length: {item.hours||"N/A"} hours</p>
                            <a href={`https://www.google.com/search?q=${item.search}+${item.source}`} target="_blank" className="buttonlink">Go to Course</a>  
                        </div>
                    ))}
            </div>
            
            <button onClick={saveEdit} className="button-17">Save Edit</button>
        </div>
    )
}

export default Saved;