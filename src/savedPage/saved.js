import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


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
        <div>
            Saved Item
            <button onClick={handleButtonClick}>Go to Home</button>
            {selectedItems.map(item => (
                    <div key={item.cos_sim} className="courseItem">
                        
                        {/* We try to populat items if it's already been checked */}
                        <input
                        type="checkbox"
                        checked={item}
                        onChange={event => handleCheckboxChange(event, item)}
                        />
                        <p className="title">{item.orig_title}</p>
                        <p className="source">Source: {item.source}</p>
                        <p className="rating">Rating: {item.rating||"N/A"}</p>
                        <p className="hours">Length: {item.hours||"N/A"} hours</p>
                        <a href={`https://www.google.com/search?q=${item.search}+${item.source}`} target="_blank" className="buttonlink">Go to Course</a>  
                    </div>
                ))}
            <button onClick={saveEdit}>Save Edit</button>
        </div>
    )
}

export default Saved;