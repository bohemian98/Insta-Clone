import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App' 
const Profile =()=>{

    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    console.log(state);
    //const [image,setImage] = useState("")
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           //console.log(result)
           setPics(result.mypost)
       })
    },[])
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey",
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                      <h6>40 Followers</h6>
                      <h6>40 Followers</h6>
                      <h6>40 Followers</h6>
                   </div>
                </div>

               </div>
           </div>
           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                       )
                   })
               }

           </div>
        </div>
    )
}

export default Profile;