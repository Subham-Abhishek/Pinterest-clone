import axios from 'axios'
import styles from "./Profile.module.css"
import React, { useEffect, useRef, useState } from 'react'
import Modal from '@mui/material/Modal';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "650px",
    height:"400px",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    background:"white",
    display:"flex",
    justifyContent:"space-evenly",
    alignItems:"center"
  };
  


export  function Profile() {

    //
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const input1Ref=useRef()
  const input2Ref=useRef()
  const handleChange=(e)=>{
      setFile(e.target.files[0])
  }

//
  const [formData,setformData]=useState({})
    const [user,setUser]=useState({})
    const scrollHeight=useRef()
    // const [url,setUrl]=useState("")
    const [file,setFile]=useState("")
    let id=`6153fba22323761dcf3913f8`
    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   
    async function handleSubmit(){
        const data = new FormData()
        data.append("file",file)
        data.append("upload_preset","pinterest-clone")
        data.append("cloud_name","masai101")
        fetch("	https://api.cloudinary.com/v1_1/masai101/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           console.log(data.url,"data url file")
           const payload={
            user_id:user._id,
            photo_url:data.url,
            goodquality_url:data.url,
            description:input2Ref?.current?.textContent?.length>input1Ref?.current?.textContent.length?input2Ref?.current?.textContent:input1Ref?.current?.textContent,
            tags:["userposts"]
        }

            axios.post("http://localhost:8000/posts",payload,{
                headers: {
                  Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNTgyZDcyYjEwZTFiNTZjZmZmNmE2ZCIsInVzZXJuYW1lIjoic2h1YmhhbSIsIm5hbWUiOiJzaHViaGFtIGFiaGkiLCJlbWFpbCI6InNodWJoYW1AMTIzIiwicGFzc3dvcmQiOiIkMmEkMDgkeGtDaDVsZ0tVU3Avai5jb1ZDeURHT2JndHdvak82U0xQV28vN2xnSWJSd2RzM0pBc09iLkMiLCJwcm9maWxlX3Bob3RvX3VybCI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS84MzA1NTY5OD92PTQiLCJiaW8iOiJGcm9udGVuZCBkZXZlbG9wZXIifSwiaWF0IjoxNjMzMjUxNjQwfQ.tFP9t5Mt4tNcJ_vgZ8kJUUOmqLukovpAfVmZ8tgUz58"
                }
              })
           .then((res)=>{
               console.log(res.data)
               alert("posted succesfully")
               handleClose(!open)
           })
           .catch((error)=>{
               console.log(error.message)
           })
        })   
        .catch(err=>{
            console.log('err:', err)
            
        })  
    }
    async function getData(){
        try {
          let {data}=await axios.get(`http://localhost:8000/users/${id}`)
          setUser(data.data)

        } catch (error) {
            console.log(error)
        }
    }
    
    // console.log(scrollHeight.current,"scrollHeight")
    // console.log(user)
    return (
        <div className={styles.mainDiv} >

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <div className={styles.fileUpload} >
           
            <div >
            <input type="file" accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp" aria-hidden="true"  style={{cursor: "pointer",height: "100%",opacity: 0, position: "absolute", width: "100%", left: "0px",top: "0px", fontSize: "0px"}} onChange={handleChange}/>
            
            <div  className={styles.caption}>
            <div> <img src="upArraow.svg" alt="" /> </div>
            <div> <p>Drag and drop or click to upload</p> </div>
            </div>
            </div>
            <div className={styles.caption1}>Recommendation:use high-quality .jpg files smaller than 10mb</div>
          </div>
           <div>
           <div><p className={styles.textArea} contentEditable="true" ref={input1Ref} >
          </p></div>
          <div style={{display:"flex",justifyContent:"flex-start"}} >
            <img src={user.profile_photo_url} alt="https://images.unsplash.com/profile-1553882437332-2aaadee4ff49?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128" width="50px" height="50px" style={{borderRadius:"50%"}}/>
            <p style={{marginLeft:"20px",fontWeight:"600",fontSize:"15px"}}>{user.name}</p>
          </div>
          <div>
            <p className={`${styles.textArea} ${styles.textArea2}`} contentEditable="true" ref={input2Ref} >
            </p>
          </div>
           <button  onClick={handleSubmit}className={styles.submitBtn}>Submit</button>
           </div>
        </div>
      </Modal>






            <div className={styles.imageDiv}>
                <img src={user.profile_photo_url} alt="" />
            </div>
            <div><h2 className={styles.name}>{user.name}</h2></div>
            <div><p><span>{user.email} .</span> <span>{user.bio}</span></p></div>
            <div style={{"fontWeight":user?.userFollowedPeople?.length&&"bold"}}>{user?.userFollowedPeople?.length} following</div>
            <div className={styles.icons }>
                <div>
                     <img src="edit.svg" alt="" />  
                    <img src="share.svg" alt="" /> 
                </div>
               
                <div>
                    <img src="adjust.svg" alt="" />
                    <button style={{border:"none",background:"none"}} onClick={()=>setOpen(!open)}>
                        
                        <img src="plus.svg" alt="" /> </button>
                </div>
            </div>
           
        </div>
    )
}
