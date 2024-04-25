import React, { useEffect, useState } from "react";
import Header from "./Header";
import Side from "./Side";
import { useLocation } from "react-router-dom";

function Chat() {
  const location = useLocation();

  let groupid = location.state?.id;
  let groupname = location.state?.groupname;
  const [gid, setGid] = useState();
  const [gname, setGname] = useState();
  const [message, setmessage] = useState("");
  const [group, setGroup] = useState([]);
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    if (groupid) {
      // If groupid is available, set the group data and fetch messages
      const data = {
        id: groupid,
        group_name: groupname,
      };
      // setGroup(data);
      getMessage(data);
    }
  }, [groupid, groupname]);

  useEffect(() => {
    if (group) {
      // If groupid is available, set the group data and fetch messages
      const data = {
        id: group.id,
        group_name: group.group_name,
      };

      getMessage(data);
    }
  }, [group]);

  const save = () => {
    let param = {
      message: message,
      member: userdata.id,
      group: gid,
    };
    fetch("http://127.0.0.1:8000/saveuserchat", {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRefresh((prev) => prev + 1);
        let groupdata = {
          id: gid,
          group_name: gname,
        };
        getMessage(groupdata);
      });
  };

  const getMessage = (data) => {
    console.log("loadeddd", data);
    if (data.id != undefined) {
      setGid(data.id);
      setGname(data.group_name);

      setmessage("");
      setMessages([]);
      let param = {
        member: userdata.id,
        groupid: data.id,
      };
      fetch("http://127.0.0.1:8000/getuserchat", {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.group);
          console.log("count", data.group);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  };

  const handleGroupClick = (data) => {
    setGroup(data);
  };

  return (
    <div class="newsfeed">
    <div class="container-fluid" id="wrapper">
      <div class="row newsfeed-size">
        <div class="col-md-12 newsfeed-right-side">
          <Header />
          <div class="row newsfeed-right-side-content mt-3">
            <Side onGroupClick={handleGroupClick} />
            <div class="col-md-10 second-section" id="page-content-wrapper">
              <div class="col-md-8 col-xl-12 chat">
                <div
                  className="card"
                  style={{
                    height: "500px",
                    borderRadius: "15px !important",
                    backgroundColor: "rgba(0,0,0,0.4) !important",
                  }}
                >
                  <div
                    className="card-header msg_head"
                    style={{
                      borderRadius: "15px 15px 0 0 !important",
                      borderBottom: "0 !important",
                    }}
                  >
                    <div className="d-flex bd-highlight">
                      <div
                        className="user_info"
                        style={{
                          marginTop: "auto",
                          marginBottom: "auto",
                          marginLeft: "15px",
                        }}
                      >
                        <span>{group.group_name}</span>
                        <p>{messages?.length} Messages</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body msg_card_body"
                    style={{ overflowY: "auto" }}
                  >
                    {messages.map((msg) => {
                      return (
                        <div className="card-body msg_card_body">
                          {msg.is_sender == 0 ? (
                            msg.is_toxic == 0 ? (
                              <div className="d-flex justify-content-start mb-4">
                                <span
                                  style={{ color: "black", fontSize: 10 }}
                                >
                                  {msg.name}
                                </span>
                                <div className="msg_cotainer">
                                  <span style={{ color: "black" }}>
                                    {msg.message}
                                  </span>
                                </div>
                              </div>
                            ) :  msg.admin!=userdata.id?(
                              <div className="d-flex justify-content-start mb-4">
                                <span
                                  style={{ color: "black", fontSize: 10 }}
                                >
                                  {msg.name}
                                </span>
                                <div className="msg_cotainer">
                                  <span
                                    style={{
                                      color: "black",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    This Message has been removed because of
                                    toxicity
                                  </span>
                                </div>
                              </div>
                            ):(
                              <div className="d-flex justify-content-start mb-4">
                                <span
                                  style={{ color: "black", fontSize: 10 }}
                                >
                                  {msg.name}
                                </span>
                                <div className="msg_cotainer" style={{backgroundColor:'red'}}>
                                  <span
                                    style={{
                                      color: "white",
                                    }}
                                  >
                                    {msg.message}
                                  </span>
                                </div>
                              </div>
                            )
                          ) : msg.is_toxic == 0 ? (
                            <div className="d-flex justify-content-end mb-4">
                              <div className="msg_cotainer_send">
                                <span
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  {msg.message}
                                </span>
                              </div>
                              <span style={{ color: "black", fontSize: 10 }}>
                                You
                              </span>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-end mb-4">
                              <div className="msg_cotainer_send">
                                <span
                                  style={{
                                    color: "white",
                                    fontStyle: "italic",
                                  }}
                                >
                                  This Message has been removed because of
                                  toxicity
                                </span>
                              </div>
                              <span style={{ color: "black", fontSize: 10 }}>
                                You
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div
                      className="card-footer"
                      style={{
                        borderRadius: "0 0 15px 15px !important",
                        borderTop: "0 !important",
                      }}
                    >
                      <div className="input-group">
                        <div className="input-group-append">
                          <span
                            className="input-group-text attach_btn"
                            style={{
                              borderRadius: "15px 0 0 15px !important",
                              backgroundColor: "orange !important",
                              border: "0 !important",
                              color: "white !important",
                              cursor: "pointer",
                            }}
                          >
                            <i className="fas fa-paperclip"></i>
                          </span>
                        </div>
                        <textarea
                          name="message"
                          className="form-control type_msg"
                          onChange={(event) => setmessage(event.target.value)}
                          placeholder="Type your message..."
                          style={{
                            backgroundColor: "rgba(0,0,0,0.3) !important",
                            border: "0 !important",
                            color: "white !important",
                            height: "60px !important",
                            overflowY: "auto",
                          }}
                          value={message}
                        ></textarea>
                        <div
                          className="input-group-append"
                          onClick={() => save()}
                        >
                          <span
                            className="input-group-text send_btn"
                            style={{
                              borderRadius: "0 15px 15px 0 !important",
                              backgroundColor: "rgba(0,0,0,0.3) !important",
                              border: "0 !important",
                              color: "white !important",
                              cursor: "pointer",
                            }}
                          >
                            <i className="fas fa-location-arrow"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //{" "}
    <div
      class="modal fade"
      id="newConversation"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newConversationLabel"
      aria-hidden="true"
    >
      //{" "}
      <div class="modal-dialog" role="document">
        //{" "}
        <div class="modal-content">
          //{" "}
          <div class="modal-header new-msg-header">
            //{" "}
            <h5 class="modal-title" id="newConversationLabel">
              Start new conversation
            </h5>
            //{" "}
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              // <span aria-hidden="true">&times;</span>
              //{" "}
            </button>
            //{" "}
          </div>
          //{" "}
          <div class="modal-body new-msg-body">
            //{" "}
            <form action="" method="" class="new-msg-form">
              //{" "}
              <div class="form-group">
                //{" "}
                <label for="recipient-name" class="col-form-label">
                  Recipient:
                </label>
                //{" "}
                <input
                  type="text"
                  class="form-control search-input"
                  id="recipient-name"
                  placeholder="Add recipient..."
                />
                //{" "}
              </div>
              //{" "}
              <div class="form-group">
                //{" "}
                <label for="message-text" class="col-form-label">
                  Message:
                </label>
                //{" "}
                <textarea
                  class="form-control search-input"
                  rows="5"
                  id="message-text"
                  placeholder="Type a message..."
                ></textarea>
                //{" "}
              </div>
              //{" "}
            </form>
            //{" "}
          </div>
          //{" "}
          <div class="modal-footer new-msg-footer">
            //{" "}
            <button type="button" class="btn btn-primary btn-sm">
              Send message
            </button>
            //{" "}
          </div>
          //{" "}
        </div>
        //{" "}
      </div>
      //{" "}
    </div>
    //{" "}
  </div>

  );
}

export default Chat;
