const { default: axios } = require("axios")
let data =require("../../dbPhotos.json")
const postPosts=()=>{
    for(let i=0;i<data.length;i++){
        data[i].email = `${data[i].user.username}@gmail.com`
        // console.log(data[i])
        data[i].photo_url=data[i].urls.regular
        data[i].goodquality_url=data[i].urls.full
        data[i].description=data[i].description||data[i].alt_description
        data[i].website=data[i].user.portfolio_url
        let tags=[]
        for(let j=0; j<data[i].tags.length; j++){
            
            for(let key in data[i].tags[j]){
                if(key=="type"||key=="title"){
                    tags.push(data[i].tags[j][key])
                }
            }
        }
        data[i].tags=tags
        axios.post("http://localhost:8000/posts",data[i])
    }
}

module.exports =postPosts;