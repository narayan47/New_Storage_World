import { useEffect, useState } from "react";
import React from "react";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import ProgressCircle from "../progressCircle";
import useSmoothProgress from "../smoothProgress";
function Files()
{
    const [folder,setFolder]=useState([])
    const [fupdate,setFupdate]=useState();
    const [progress,setProgress]=useState()
    const location=useLocation();
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/folder/files`, {params: {
    path: "/files"}
  },{withCredentials:true})
    .then(res => {
    if (Array.isArray(res.data)) {
      setFolder(res.data);
    } else if (Array.isArray(res.data.files)) {
      setFolder(res.data.files);
    } else if (Array.isArray(res.data.data)) {
      setFolder(res.data.data);
    } else {
      setFolder([]);
    }
  })
    .catch(err=>{
      if(err.response?.status === 401){
  navigate("/login");
}
    })
    },[fupdate])
    
   const Fdelete = async (id, ownpath) => {
  let fakeProgress;

  try {
    setLoading(true);
    setProgress(10);

    // fake progress animation
    fakeProgress = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p));
    }, 200);

    await axios.post(`${process.env.REACT_APP_API_URL}/api/folder/delete`, { id, ownpath },{withCredentials:true});

    setProgress(100);
    setFupdate(Date.now());
  } catch (err) {
    alert(err.message);
    setProgress(0);
  } finally {
    clearInterval(fakeProgress);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 500);
  }
};


    const FolderClicked=(title)=>{
        navigate(`/files/${title}`)
    }
    
    const ffupdate = () => {
    setFupdate(Date.now())
}

      if(folder.length<=0 )
        {
              return(
        <>
       {loading && <ProgressCircle percent={progress}/>}
         <div className="flex shadow py-5 my-5 mx-2 px-3">
  <div className="flex justify-center w-full">
    <h2 className="text-center text-lg font-semibold ">
   Folder Are Not Created!
    </h2>
  </div>
</div>
<Home paths={location.pathname} />
        <Footer files={true} ffupdate={ffupdate} update={ffupdate} />
        </>
    );
        }
      return(<>
       {folder.length>0 && (
            <div className="flex shadow py-5 my-5 mx-2 px-3">
                <div className="flex ">
                    <table>
                        <tbody>
                    {
                        folder.map((item)=>{
                          return  <tr className="flex py-2" key={item._id}>
                                <td onClick={e=>FolderClicked(item.title)}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="yellow" class="bi bi-folder-fill" viewBox="0 0 16 16">
  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
</svg>
</td>
<td className="flex mx-2 " onClick={e=>FolderClicked(item.title)}><button>{item.title}</button></td>

<td className="flex ml-2">
  <button onClick={()=>Fdelete(item._id,item.ownpath)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
         fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
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

        
      )}
     
         <Home paths={location.pathname}/>

      <Footer files={true} ffupdate={()=>setFupdate(Date.now())} update={()=>setFupdate(Date.now())} />
      </>
      );
      }
   
export default Files;
