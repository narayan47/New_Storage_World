import { useEffect, useState } from "react";
import react from "react";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import useDownload from "../Download.js";
import { useNavigate } from "react-router-dom";
function Star()
{
 const [files,setFiles]=useState([])
 const [temp,setTemp]=useState('')
 const {downloadFiles}=useDownload()
 const navigate=useNavigate()
 
 const location=useLocation()
 useEffect(()=>{
    axios.get("/api/star/files")
    .then(res => {
 
  
  if (Array.isArray(res.data)) {
    setFiles(res.data);
  } else if (Array.isArray(res.data.files)) {
    setFiles(res.data.files);
  } else {
    setFiles([]); // fallback
  }
})
    .catch(err=>{if(err.response.status==404){
            navigate("/login")
          }})
 },[temp])

  const Ddelete=(id)=>{
      axios.post("/api/home/files",{id:id})
      .then(res=>{
        alert(res.data.message);
        setTemp(Date.now())
      })
      .catch(err=>console.log("error",err.message))

    };
 const star=(id)=>{
      axios.post("/api/star/create",{id:id})
      .then(res=>setTemp(Date.now()))
      .catch(err=>console.log(err.message,"error"))
    };

      if(files.length>0)
      {
    return(
        <>
         <div className="flex shadow py-5 my-5 mx-2 px-3">
                <div className="flex ">
                    <table> 
                      <tbody>
        {
    files
    .map(item => (
                   <tr className="flex py-2" key={item._id}>
                                <td> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" 
     fill="green" className="bi bi-file-earmark-fill" 
     viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0z"/>
  <text x="8" y="12" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
    F
  </text>
</svg>
</td>
<td >{item.title}</td>
<td className="flex ml-20"><button onClick={()=>  star(item._id)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="orange" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg></button></td>
<td className="flex ml-2">
  <button onClick={()=>Ddelete(item._id)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
         fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
    </svg>
  </button>
  </td>
  <td className="flex ml-2">
    <button onClick={()=>{downloadFiles(item)}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-download" viewBox="0 0 16 16">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
  </svg>
    </button>
  </td>


                            </tr>
                
     ) )
    
                    }
                    </tbody>
                    </table>
                </div>

            </div>

        <Footer star={star} />
        </>
    );}
    else{
       return(
        <>
         <div className="flex shadow py-5 my-5 mx-2 px-3">
  <div className="flex justify-center w-full">
    <h2 className="text-center text-lg font-semibold ">
      No Favoret File Availebel!
    </h2>
  </div>
</div>
        <Footer star={star} />
        </>
    );
      
    }
    }

export default Star;
