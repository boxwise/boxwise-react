import React from "react"
// import boxtributeSmall from "../assets/images/boxtribute_small.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLaptop } from "@fortawesome/free-solid-svg-icons"
import boxtributeFavicon from "../assets/images/favicon-32x32-boxtribute.png"

function Header(props: HeaderProps) {
  const campsDropdown = props.isLoggedIn ? "MyCampsDropdown" : null
  return (
    <div className="w-screen flex p-2 bg-white shadow-md align-baseline">
      <a href="/" className="flex-1">
        <img src={boxtributeFavicon} alt="Logo" />
      </a>
      <div className="p-1">{campsDropdown}</div>
      <div className="flex-1 p-1">
        <FontAwesomeIcon
          style={{ fontSize: "1.5em" }}
          icon={faLaptop}
          className="float-right"
        />
      </div>
    </div>
  )
}

export default Header

interface HeaderProps {
  isLoggedIn: boolean
}
