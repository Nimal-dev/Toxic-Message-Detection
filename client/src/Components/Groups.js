import React, { useEffect, useState } from "react";
import Side from "./Side";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';

function Groups() {
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  const [groupname, setGroupname] = useState("");
  const [groupmember, setGroupmember] = useState([]);
  const [memberList, setMemberList] = useState([userdata.id]);
  const Navigate = useNavigate();

  const saveGroups = () => {
    let params = {
      group_name: groupname,
      group_member: JSON.stringify(memberList),
      admin: userdata.id
    };
    fetch("http://127.0.0.1:8000/savegroups", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((response) => {
      response.json().then((data) => {
        window.location.reload();
      });
    });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/memberselect", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        let mem_ar = data.filter((elem) => {
          return elem.id !== userdata.id && elem.first_name !== "";
        });
        setGroupmember(mem_ar);
      });
    });
  }, []);

  const handleGroupClick = (data) => {
    Navigate('/chat', { state: { id: data.id, groupname: data.group_name } });
  };

  return (
    <>
      <Header />
      <section class="newsfeed">
        <div class="container-fluid" id="wrapper">
          <div class="row newsfeed-size">
            <div class="col-md-12 newsfeed-right-side">

              <div class="row newsfeed-right-side-content mt-3">
                <Side onGroupClick={handleGroupClick} />
                <div class="col-lg-9 col-md-8 col-sm-12">
                  <div class="mb-3">
                    <div class="btn-group d-flex flex-column flex-sm-row top-links-fg">
                      <a href="index.html" class="btn btn-quick-links mr-3 ql-active">
                        <img src="assets/images/icons/theme/group-white.png" class="mr-2" alt="quick links icon" />
                        <span class="fs-8"> Groups</span>
                      </a>
                      <a href="watch.html" class="btn btn-quick-links" data-toggle="modal" data-target="#newConversation">
                        <img src="assets/images/icons/theme/create.png" class="mr-2" alt="quick links icon" />
                        <span class="fs-8">Create</span>
                      </a>
                    </div>
                  </div>
                  <div class="jumbotron groups-banner">
                    <div class="container group-banner-content">
                      <h1 class="jumbotron-heading mt-auto">
                        <img src="assets/images/icons/theme/group-white.png" class="mr-3" alt="Welcome to groups" /> Groups
                      </h1>
                      <p>Get latest active from your groups.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="newConversation" tabindex="-1" role="dialog" aria-labelledby="newConversationLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header new-msg-header">
                <h5 class="modal-title" id="newConversationLabel">
                  Create Group
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body new-msg-body">
                <form action="" method="" class="new-msg-form">
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Group name:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                      placeholder="Enter group name..."
                      value={groupname}
                      onChange={(e) => setGroupname(e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Select members:</label>
                    <div class="checkbox-list">
                      {groupmember.map((member) => (
                        <div key={member.id} class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={member.id}
                            onChange={(e) =>
                              setMemberList((prev) => [...prev, member.id])
                            }
                          />
                          <label
                            class="form-check-label"
                            style={{
                              position: "relative",
                              cursor: "pointer",
                              paddingLeft: "25px",
                              marginRight: "20px",
                            }}
                          >
                            {member.first_name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer new-msg-footer">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  onClick={saveGroups}
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>


    //   <div class="newsfeed">
    //   <div class="container-fluid" id="wrapper">
    //     <div class="row newsfeed-size">
    //       <div class="col-md-12 newsfeed-right-side">
    //         <Header />
    //         <div class="row newsfeed-right-side-content mt-3">
    //           <Side onGroupClick={handleGroupClick} />
    //           <div class="col-lg-9 col-md-8 col-sm-12">
    //             <div class="mb-3">
    //               <div class="btn-group d-flex flex-column flex-sm-row top-links-fg">
    //                 <a href="index.html" class="btn btn-quick-links mr-3 ql-active">
    //                   <img src="assets/images/icons/theme/group-white.png" class="mr-2" alt="quick links icon" />
    //                   <span class="fs-8"> Groups</span>
    //                 </a>
    //                 <a href="watch.html" class="btn btn-quick-links" data-toggle="modal" data-target="#newConversation">
    //                   <img src="assets/images/icons/theme/create.png" class="mr-2" alt="quick links icon" />
    //                   <span class="fs-8">Create</span>
    //                 </a>
    //               </div>
    //             </div>
    //             <div class="jumbotron groups-banner">
    //               <div class="container group-banner-content">
    //                 <h1 class="jumbotron-heading mt-auto">
    //                   <img src="assets/images/icons/theme/group-white.png" class="mr-3" alt="Welcome to groups" /> Groups
    //                 </h1>
    //                 <p>Get latest active from your groups.</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div class="modal fade" id="newConversation" tabindex="-1" role="dialog" aria-labelledby="newConversationLabel" aria-hidden="true">
    //     <div class="modal-dialog modal-dialog-centered" role="document">
    //       <div class="modal-content">
    //         <div class="modal-header new-msg-header">
    //           <h5 class="modal-title" id="newConversationLabel">
    //             Create Group
    //           </h5>
    //           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //             <span aria-hidden="true">&times;</span>
    //           </button>
    //         </div>
    //         <div class="modal-body new-msg-body">
    //           <form action="" method="" class="new-msg-form">
    //             <div class="form-group">
    //               <label for="recipient-name" class="col-form-label">
    //                 Group name:
    //               </label>
    //               <input
    //                 type="text"
    //                 class="form-control"
    //                 id="recipient-name"
    //                 placeholder="Enter group name..."
    //                 value={groupname}
    //                 onChange={(e) => setGroupname(e.target.value)}
    //               />
    //             </div>
    //             <div class="form-group">
    //               <label class="col-form-label">Select members:</label>
    //               <div class="checkbox-list">
    //                 {groupmember.map((member) => (
    //                   <div key={member.id} class="form-check">
    //                     <input
    //                       class="form-check-input"
    //                       type="checkbox"
    //                       value={member.id}
    //                       onChange={(e) =>
    //                         setMemberList((prev) => [...prev, member.id])
    //                       }
    //                     />
    //                     <label
    //                       class="form-check-label"
    //                       style={{
    //                         position: "relative",
    //                         cursor: "pointer",
    //                         paddingLeft: "25px",
    //                         marginRight: "20px",
    //                       }}
    //                     >
    //                       {member.first_name}
    //                     </label>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           </form>
    //         </div>
    //         <div class="modal-footer new-msg-footer">
    //           <button
    //             type="button"
    //             class="btn btn-primary btn-sm"
    //             onClick={saveGroups}
    //           >
    //             Create Group
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>



  );
}

export default Groups;
