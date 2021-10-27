import axios from 'axios'
import React, { useContext, useState } from 'react'
import { TokenContext } from '../context/TokenProvider'

export const EditProfile = () => {
    const {gUser,token} = useContext(TokenContext)
    const [name, setName] = useState(gUser.name)
    const [bio, setBio] = useState(gUser.bio)
    const [imgSrc, setImgSrc] = useState(gUser.profile_photo_url)
    const [file,setFile]=useState("")

    async function handleImage(file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "pinterest-clone");
        data.append("cloud_name", "masai101");
        fetch("	https://api.cloudinary.com/v1_1/masai101/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.url, "data url file");
            return data.url
            
            }).catch((err) => {
            console.log("err:", err);
          });
      }
      async function  handleSubmit(){
         const payload={
             profile_photo_url:await handleImage(file) || "",
             name:name,
             bio:bio,
             username:name
             }
           try {
            let data=await axios.patch(`https://pinterest-backend-server.herokuapp.com/users/${gUser._id}`,payload,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
             })
             console.log(data,"data from server for patch")
           } catch (error) {
               console.log(error,"error")
           }
      }

    return (
        <div>
            <img src={imgSrc} alt="Avatar" />
            <input type="file" name="photo" id="" accept="image/*" onChange={(e) => {
                setFile(e.target.files[0])
                setImgSrc(window.URL.createObjectURL(e.target.files[0]))
                }} />
            <input onChange={(e) => setName(e.target.value)} type="text" name="" id="" value={name} />
            <input onChange={(e) => setBio(e.target.value)} type="text" name="" id="" value={bio} />
            <button onClick={handleSubmit}>save</button>
        </div>
    )
}
