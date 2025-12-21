import react, { useEffect, useState } from "react";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Home({paths})
{
    const [current,setCurrent]=useState(false);
    const [files,setFiles]=useState({});
    const[temp,setTemp]=useState();
   const location=useLocation();
    const navigate=useNavigate();
    let start;
    useEffect(()=>{
      if(paths){
        start='/api/folder/path'
         axios.get(`${start}${paths}`)
        .then(res=>setFiles(res.data))
        .catch(err=>
          {if(err.response.status==401){
            navigate("/login")
          }})
      }
      else
      {
        axios.get("/api/home/files")
        .then(res=>setFiles(res.data))
        .catch(err=>
          {if(err.response.status==401){
            navigate("/login")
          }})
        }
    },[,temp,paths])

    const update=(path)=>{
        setTemp(path)
    }


    const priview=(url)=>{
      const a=document.createElement('a')
      a.href=url
      a.download=''
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    const star=(id)=>{
      axios.post("/api/star/create",{id:id})
      .then(res=>setTemp(res.data))
      .catch(err=>console.log(err.message,"error"))
    };
    const Ddelete=(id)=>{
      axios.post("/api/home/files",{id:id})
      .then(res=>{
        alert(res.data.message);
        setTemp(res.data.message)
      })
      .catch(err=>console.log("error",err.message))

    };
    useEffect(()=>{
        if (location.pathname.startsWith("/home")) {
        setCurrent(true);
}
    },[location.pathname]);


        if(files.length>0)
        {
              return(
        <>
                    <div className="flex shadow py-5 my-5 mx-2 px-3 justify-center">
                      <h1 className="text-green-400 text-lg uppercase"></h1>
                    </div>
            <div className="flex shadow py-5 my-5 mx-2 px-3">
                <div className="flex ">
                    <table>
                      <tbody>
                    {
                        files.map((item)=>{
                          return  <tr className="flex py-2" key={item._id}>
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
{!item.favorete?(
<td className="flex ml-20"><button onClick={()=>  star(item._id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
</svg></button></td>):(<td className="flex ml-20"><button onClick={()=> star(item._id)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="orange" class="bi bi-star-fill" viewBox="0 0 16 16">
   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
 </svg></button></td>)}
<td className="flex ml-2">
  <button onClick={()=>Ddelete(item._id)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
         fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
    </svg>
  </button>
</td>
 <td className="flex ml-2">
  <button onClick={()=>priview(item.path)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
</svg>
  </button>
</td>

                            </tr>
                        })
                    }
                    </tbody>
                    </table>
                </div>

            </div>
                    <Footer current={current} update={update} />
            </>
              );
        }
        else
        {
              return(
        <>
        <div className="flex shadow py-5 my-5 mx-2 px-3 justify-center">
                      
                    </div>
         <div className="flex shadow py-5 my-5 mx-2 px-3">
  <div className="flex justify-center w-full">
    <h2 className="text-center text-lg font-semibold ">
      Files Are Not Uploaded!
    </h2>
  </div>
</div>
        <Footer current={current} update={update}/>
        </>
    );
        }
    }     
export default Home;