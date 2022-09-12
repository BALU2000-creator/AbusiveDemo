import React from "react";
import { useState, useContext } from "react";
import { StoreContext } from "./Record";


export const Abusive =()=>{
    const [InputText, setInputText] = useState('');
    const [Text,setText] = useState('');
    const [Abuisve, setAbusive] = useState('');
    const [isInputInstant, setIsInputInstant] = useState(false);

    const { isRecorded } = useContext(StoreContext);

    if(isRecorded){
        setIsInputInstant(false)
    }

    const updateInputText =(InputText)=>{
        setInputText(InputText);
        setIsInputInstant(true);
        isRecorded = false;
    }

    const Fetchdata = (InputText) =>{
        console.log('boolll......',isRecorded,isInputInstant);
        const cars = {
            text : `${InputText}`,
            isRecorded : isRecorded,
            isInputInstant : isInputInstant
        }
        console.log(cars, InputText)
        fetch("http://127.0.0.1:5001/receiver", 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(cars)}).then(res=>{
                if(res.ok) {
                    return res.json()
                } else{
                    alert("something is wrong at app.py or in this function")
                }
            }
        ).then((jsonResponse) => {  
                if(Object.values(jsonResponse) == "Abusive") {
                    setAbusive("Abusive");
                }
                else {
                    setAbusive("No_abusive");
                }
            } 
        ).catch((err) => console.error(err)
    );
    }
    return(
        <div style={{columnGap: 100}}>
            <h1>Abusive Detection</h1>

            <div style={{columnGap: 100}}>
                <input onChange={(event) => updateInputText(event.target.value)}></input>
                <button onClick={() => Fetchdata(InputText)}>Submit</button>
            </div>
            <div>
                <h1>Content Type: {Abuisve}</h1>
            </div>

        </div>
    )
}