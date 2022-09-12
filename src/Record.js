import React, { useState, createContext } from "react";
import vmsg from "vmsg";
import { Abusive } from "./TextInput";

const recorder = new vmsg.Recorder({
    wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
  });

export const StoreContext = createContext();

export const Record = () => {
  const [isLoading, setIsLoading] =useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [Recordings, setRecordings] = useState([]);
  const [isRecorded, setIsRecorded] = useState(false);


  function forceDownload(blob, filename) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
    setIsRecorded(true);
  }

  const record = async () => {
    setIsLoading(true);
    setIsRecorded(false);

    if(isRecording){
      const blob = await recorder.stopRecording();
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, 'audio.mp3');
      setIsLoading(false);
      setIsRecording(false);
      setRecordings([URL.createObjectURL(blob)]);
      console.log('.shdfbshdb', URL.createObjectURL(blob), typeof URL.createObjectURL(blob));
    }
    else{
      try{
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        setIsLoading(false);
        setIsRecording(true);
      }catch(e){
        console.error(e);
        setIsLoading(false);
      }
    }
  }

  const mapper = () => {
    console.log(Recordings);
  }

  return (
    <StoreContext.Provider value={isRecorded}>
      <div>
        <h1>Recorder</h1>
        <button disabled={isLoading} onClick={record}>
          {isRecording ? "Stop" : "Record"}
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Recordings.map(url => (
            <li key={url}>
              <audio src={url} controls />
            </li>
          ))}
        </ul>
       <Abusive/>
      </div>
    </StoreContext.Provider>

  );
}

