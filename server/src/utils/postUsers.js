const { default: axios } = require("axios")
let data =require("../../dbPhotos.json")
const postUsers=()=>{
    for(let i=0;i<data.length;i++){
        data[i]=data[i].user
        // console.log(data[i])
        data[i].profile_photo_url=data[i].profile_image.large
        data[i].password="12345"
        data[i].email=`${data[i].username}@gmail.com`
        axios.post("http://localhost:8000/users",data[i])
    }
}

module.exports =postUsers;