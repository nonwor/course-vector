import React from "react";
import { useState, useEffect } from "react";
import './result.css';

const Result=({data})=>{

    const[filterSource, setFilterSource]=useState('');
    const[orderRating, setOrderRating]=useState('');
    const[orderLength, setOrderLength]=useState('');

    const[selectedItems, setFocusItems]=useState([]);

    const handleDropdownChange = event => {
        setFilterSource(event.target.value);
    };

    const handleDropdownChangeRating = event =>{
        setOrderRating(event.target.value);
    }

    const handleDropdownChangeLength = event =>{
        setOrderLength(event.target.value);
    }

    const handleCheckboxChange = (event, item)=>{
        
        if(event.target.checked){
           
            setFocusItems([...selectedItems, item])

        } else {
            
            setFocusItems(selectedItems.filter(checkedItem=>checkedItem.cos_sim!==item.cos_sim))
        }
    }
    //We will need to use useEffect to load data from local storage. 
    
    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setFocusItems(JSON.parse(storedItems));
            // console.log(selectedItems);
        }
        // console.log(selectedItems);
        //
        const oldData = localStorage.getItem('data');
        if(oldData){
            data=JSON.parse(oldData)
        }
        
    }, []);

    const saveItems=()=>{
        //We will save this to local storage
        // console.log("items to save", selectedItems);
        localStorage.setItem('items', JSON.stringify(selectedItems));
    }

    if(data.length > 1){
        // console.log(data)
        localStorage.setItem('data', data)

        const categories = [...new Set(data.map(item => item.source))];

        let cos_sim = []
        let unique_items = []

        for(let i of data){
            
            if (!cos_sim.includes(i.cos_sim)){
                let searchStr = i.title.replace(/ /g, '+');
                let hours = 0 
                if(i.duration_min){
                    hours= (i.duration_min/60).toFixed(1)
                }
                // 3 new attribute to ensure that things are not null
                i['search'] = searchStr;
                i['hours'] = hours;
                let rating = 0;
                if(i.rating){
                    rating = i.rating
                }
                i['rating_notnull']=rating;

                unique_items.push(i);
                cos_sim.push(i.cos_sim);
            }
        }

        localStorage.setItem('data',  JSON.stringify(unique_items))

        let filteredItems = [];

        if (filterSource === ""){
            filteredItems = unique_items
        } else {
            filteredItems = unique_items.filter(
                item=>item.source === filterSource
            );
        }
        //ordered by rating and time
        if(orderRating==="0"){
            //Do high to low
            filteredItems = filteredItems.sort((a,b)=>b.rating_notnull-a.rating_notnull);
        }

        if(orderRating ==="1"){
            //do low to high
            filteredItems = filteredItems.sort((a,b)=>a.rating_notnull-b.rating_notnull);
        }

        if(orderLength==="0"){
            //Do high to low
            filteredItems = filteredItems.sort((a,b)=>b.hours-a.hours);
        }

        if(orderLength ==="1"){
            //do low to high
            filteredItems = filteredItems.sort((a,b)=>a.hours-b.hours);
        }
        
        return(
            <div>
                <div className="filters">Select Filters:
                    <select value={filterSource} onChange={handleDropdownChange}>
                        <option value="">All Providers</option>
                        {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    {/* This is for sorting rating */}
                    <select value={orderRating} onChange={handleDropdownChangeRating}>
                        <option value="">Raiting: Default</option>
                        <option value="0">Rating: High-Low</option>
                        <option value="1">Rating: Low-High</option>
                    </select>

                    {/* This is for sorting rating */}
                    <select value={orderLength} onChange={handleDropdownChangeLength}>
                        <option value="">Length: Default</option>
                        <option value="0">Length: High-Low</option>
                        <option value="1">Length: Low-High</option>
                    </select>

                </div>
                <div className="scroll-container">
                    {filteredItems.map(item => (
                        <div key={item.cos_sim} className="courseItem">
                            
                            {/* We try to populat items if it's already been checked */}
                            <input
                            className="checkbox"
                            type="checkbox"
                            checked={selectedItems.some(checkedItem => checkedItem.cos_sim == item.cos_sim)}
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
                
                <button className="button-17" onClick={saveItems}>Save</button>
            </div>
        )
    } else {
        return(
            <div> No data yet
        </div>
        )
    }

}

export default Result;