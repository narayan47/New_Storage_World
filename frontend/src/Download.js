import axios from "axios";
import { useState } from "react";

import useSmoothProgress from "./smoothProgress";
 function useDownload(){
    const [progress,setProgress]=useState();
    const [loadingdownload,setLoading]=useState(false)
    const smoothProgressdownload=useSmoothProgress(progress);

   const downloadFiles= async(file)=>
    { 
          try{
            setLoading(true)
        const res = await axios.get(`/api/download/files/${file._id}`, {
    responseType: "blob",
    onDownloadProgress:(e) => {
       if (!e.total) return;

          let percent = Math.round((e.loaded * 100) / e.total);

          if (percent >= 95) percent = 99;

          setProgress(percent);
      }
  });

  const blobUrl = window.URL.createObjectURL(res.data);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = file.title;

  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(blobUrl);
   }
    catch(err)
    {
      console.log("have error in download")
    }
    finally{
      setTimeout(() => {
    setLoading(false);
    setProgress(0);
  }, 300);
      
    }
}
return {
  smoothProgressdownload,
  loadingdownload,
  downloadFiles
}
}


export default useDownload