import React from 'react'

function Header() {
  return (
    <nav id="navbar-main" class="navbar navbar-expand-lg shadow-sm sticky-top" >
      <div class="w-100 justify-content-md-center">
        <ul class="nav navbar-nav enable-mobile px-2">
          {/* <li class="nav-item">
                    <h1>TOXIC MESSAGE DETECTION</h1>
                  </li> */}
          <li class="nav-item w-100 py-2"></li>
          <li class="nav-item"></li>
        </ul>
        <ul class="navbar-nav mr-5 flex-row" id="main_menu">
          <a class="navbar-brand nav-item mr-lg-5" href="index.html">
            <h4 className="text-primary">Toxic Message Detection</h4>
          </a>
          <li class="nav-item s-nav nav-icon dropdown">
            <a
              href="settings.html"
              data-toggle="dropdown"
              data-placement="bottom"
              data-title="Settings"
              class="nav-link settings-link rm-drop-mobile drop-w-tooltip"
              id="settings-dropdown"
            >
              <img
                src="assets/images/icons/navbar/settings.png"
                class="nav-settings"
                alt="navbar icon"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-right settings-dropdown shadow-sm"
              aria-labelledby="settings-dropdown"
            >
              <a class="dropdown-item logout-btn" onClick={() => { localStorage.clear(); window.location.href = '/' }}>
                <img
                  src="assets/images/icons/navbar/logout.png"
                  alt="Navbar icon"
                />
                Log Out
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>


  )
}

export default Header
