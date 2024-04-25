import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    // Proceed with the API call
    let param = {
      username: email,
      password: password
    };

    fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      body: JSON.stringify(param),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          localStorage.setItem('userdata', JSON.stringify(data.user))
          navigate('/groups');
        } else {
          console.log("Error!", "Something went wrong!", "error");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        console.log("Error!", "Something went wrong!", "error");
      });
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row ht-100v flex-row-reverse no-gutters">
          <div className="col-md-6 d-flex justify-content-center align-items-center p-5">
            <div className="signup-form">
              <div className="auth-logo text-center mb-5">
                <div className="row">
                  <div className="col-md-10">
                    <p>Toxic Message Detection</p>
                  </div>
                </div>
              </div>
              <form action="" method="">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name=""
                        placeholder="Email Address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name=""
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <a href="forgot-password.html">Don't have an account?</a>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Link to={"/registration"}>
                        <button type="button" className="btn btn-primary sign-up">
                          Register
                        </button>
                      </Link>{" "}
                    </div>
                  </div>
                  <div className="col-md-6 text-right">
                    <div className="form-group">
                      <button type="button" className="btn btn-primary sign-up" onClick={() => login()}>
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 auth-bg-image d-flex justify-content-center align-items-center p-0">
            <div className="auth-left-content mt-5 mb-5 text-center">
              <div className="text-white mt-5 mb-5">
                <h2 className="create-account mb-3">Welcome to </h2>
                <h3>Toxic Message Detection</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade fingerprint-modal" id="fingerprintModal" tabIndex="-1" role="dialog" aria-labelledby="fingerprintModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3 className="text-muted display-5">Place your Finger on the Device Now</h3>
                <img src="assets/images/icons/auth-fingerprint.png" alt="Fingerprint" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
