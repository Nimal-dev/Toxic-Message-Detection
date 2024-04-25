import React, { useEffect, useState } from 'react'

function Side({ onGroupClick }) {

    const [groups,setGroups] = useState([])

    const userdata = JSON.parse(localStorage.getItem('userdata'))

    
    useEffect(() => {
        let param = {
            userid:userdata.id
        }
        fetch("http://127.0.0.1:8000/findusersgroups", {
          method: "post",
          body:JSON.stringify(param),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((res) => {
          res.json().then((data) => {
            console.log(data);
            setGroups(data.usergroups)
          });
        });
      }, []); 


  return (
    <div class="col-md-2 newsfeed-left-side sticky-top shadow-sm" id="sidebar-wrapper">
    <div class="card newsfeed-user-card h-100">
        <ul class="list-group list-group-flush newsfeed-left-sidebar">
            <li class="list-group-item">
                <h6>Home</h6>
            </li>
           {
            groups.map((data)=>{
              return(
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a  style={{cursor:'pointer'}} class="sidebar-item" onClick={() => onGroupClick(data)}><img src="assets/images/icons/left-sidebar/message.png" alt="message"/> {data.group_name}</a>
                
            </li> 
              )
            })
           }
        </ul>
    </div>
</div>
  )
}

export default Side
