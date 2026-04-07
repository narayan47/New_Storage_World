import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import axios from "axios";
import ProgressCircle from "./progressCircle";
import { transformValueTypes } from "framer-motion";
import useSmoothProgress from "./smoothProgress";

function Footer({ current, files, star ,update ,ffupdate,user}) {
  const [color, setColor] = useState("currentColor");
  const [col, setCol] = useState("orange");
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [name, setName] = useState("");
  const [file,setFiles]=useState();
  const [error, setError] = useState("");
  const [showFilemodal,setShowFileModal]=useState(false);
  const [loading,setLoading]=useState(false);
  const location=useLocation();
  const [progress,setProgress]=useState();
  const smoothProgress = useSmoothProgress(progress);
  let path=location.pathname;
  let ownpath=location.pathname;
  const arr=["/home","/files","/star","/User_dashboard"];
  if(arr.includes(path))
  {
    path="/files"
  }
  const close = () => {
    setShowCreateMenu(false);
    setShowFolderModal(false);
    setShowFileModal(false);
    setCol("orange");
    setColor("currentColor");
    setError("");
    setName("");
  };

  const Create = async() => {
    try{

    if (name === "") {
      setError("Empty Folder Not Created So Give Name");
      return;
    }
    close();
    setLoading(true)
    ownpath=`${ownpath}/${name}`
   await axios.post(`${process.env.REACT_APP_API_URL}/api/folder/files`,{name:name,path:path,ownpath:ownpath},{withCredentials:true},{
      onUploadProgress: (e) => {
       if (!e.total) return;

          let percent = Math.round((e.loaded * 100) / e.total);

          if (percent >= 95) percent = 99;

          setProgress(percent);
      }})
    .then(res=>{
      setProgress(100);
    })
    .catch(err=>{
      setProgress(0)
      alert(err.response.data.message)})
  }
  catch(err)
  {
    console.log(err.message)
  }
  finally
  {
    setTimeout(() => {
        setLoading(false);
        setProgress(0);
         alert(`Folder "${name}" created! ✅`);
         if (typeof ffupdate === "function") {
          ffupdate(); 
        }
      }, 500);
    
  }
    
  };

  const FileUpd= async() => {
    try
    {
    if (file === null) {
      setError("Empty file Not upload So select file");
      return;
    }
    close()
    setLoading(true)
    const formData= new FormData();
  formData.append("file",file);
  formData.append("inherit",path)
    await  axios.post(`${process.env.REACT_APP_API_URL}/api/files/create`,formData,{withCredentials:true},{
      onUploadProgress: (e) => {
       if (!e.total) return;

          let percent = Math.round((e.loaded * 100) / e.total);

          if (percent >= 95) percent = 99;

          setProgress(percent);
      }})
     .then(res=>{
      setProgress(100);
      alert(`file "${res.data}" uploaded! ✅`);
      if (typeof update === "function") {
          update(Date.now()); 
        }
    })
     .catch(err=>{
      setProgress(0)
      alert("Have some problem in File Uploading")}) 
  }
  catch(err)
  {
    console.log(err.message)
  }
  finally{
    setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
  }
  };

  const CreateFolder = () => {
    setShowFolderModal(true);
    setCol("blue");
    setColor("orange");
    setShowCreateMenu(false);
  };

  const fileUpload=()=>{
     setShowFolderModal(false);
    setCol("blue");
    setColor("orange");
    setShowCreateMenu(false);
    setShowFileModal(true);
  }

  const CreateShow = () => {
    setShowCreateMenu(true);
    setCol((prev) => (prev === "orange" ? "blue" : "orange"));
    setColor((prev) =>
      prev === "currentColor" ? "orange" : "currentColor"
    );
  };

  




  return (
    <>

    {/* Upload/Create in progress */}
    {
      loading &&
      <ProgressCircle percent={smoothProgress} />
    }


      {/* Create Menu */}
      {showCreateMenu && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/80">
          <div className="bg-blue-400 p-6 rounded-lg shadow-xl">
            <div className="flex gap-10">
              <button onClick={CreateFolder}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="orange"
                  className="bi bi-folder-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
                  <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5" />
                </svg>
              </button>
              <button onClick={fileUpload}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="orange"
                  className="bi bi-file-earmark-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0" />
                </svg>
              </button>
              <button onClick={close} className="flex h-20 hover:text-white">
                X
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/80">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex gap-3">
              <input
                type="text"
                className="border border-black rounded px-2 py-1 mt-3 w-full h-12"
                placeholder="Enter Folder Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />
              <button
                onClick={Create}
                className="bg-blue-400 rounded h-11 mt-3 px-3"
              >
                Create
              </button>
              <button
                onClick={close}
                className="flex h-20 hover:text-red-400"
              >
                X
              </button>
            </div>
            {error && (
              <p className="text-red-400 flex my-3 justify-center">{error}</p>
            )}
          </div>
        </div>
      )}
      {/* Upload file */}
      {
          showFilemodal && (
             <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/80">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex gap-3">
              <input
                type="file"
                className="border border-black rounded px-2 py-1 mt-3 w-full h-12"
                onChange={(e) => {
                  setFiles(e.target.files[0])
                  setError("");
                }}
              />
              <button
                onClick={FileUpd}
                className="bg-blue-400 rounded h-11 mt-3 px-3"
              >
                Upload
              </button>
              <button
                onClick={close}
                className="flex h-20 hover:text-red-400"
              >
                X
              </button>
            </div>
            {error && (
              <p className="text-red-400 flex my-3 justify-center">{error}</p>
            )}
          </div>
        </div>
          )
      }

      {/* Footer Navbar */}
      <nav className="shadow-md bg-white fixed bottom-0 w-full flex flex-wrap p-2 gap-10 justify-center items-center">
        <div className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-t from-black/20 to-transparent"></div>
       {/* Home */}
        {current ? (
          <Link to={"/home"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill={col}
              className="bi bi-house-fill "
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
            </svg>
          </Link>
        ) : (
          <Link to={"/home"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-house "
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
          </Link>
        )}

        {/* Create Button */}
        <button onClick={CreateShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill={color}
            className="bi bi-plus-square "
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>

        {/* Star */}
        {star ? (
          <Link to={"/star"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill={col}
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </Link>
        ) : (
          <Link to={"/star"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-star"
              viewBox="0 0 16 16"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>
          </Link>
        )}

        {/* Files */}
        {files ? (
          <Link to={"/files"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill={col}
              className="bi bi-folder-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" />
            </svg>
          </Link>
        ) : (
          <Link to={"/files"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-folder2"
              viewBox="0 0 16 16"
            >
              <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5z" />
            </svg>
          </Link>
        )}
         {/* User */}
        {user ? (
          <Link to={"/User_dashboard"}>
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="Yellow" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
          </Link>
        ) : (
          <Link to={"/User_dashboard"}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
          </Link>
        )}
      </nav>
    </>
  );
}

export default Footer;
