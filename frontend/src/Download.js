import axios from "axios";
 function useDownload(){
   const downloadFiles= async(file)=>
    { const res = await axios.get(`/api/download/files/${file._id}`, {
    responseType: "blob"
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
return {downloadFiles}
}


export default useDownload