import React, { useState } from "react"
// import boxtributeSmall from "../assets/images/boxtribute_small.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLaptop } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Dropdown, Message } from "semantic-ui-react"
import boxtributeFavicon from "../assets/images/favicon-32x32-boxtribute.png"
import "semantic-ui-css/semantic.min.css"
import "../styles/Header.scss"

const ALL_CAMPS_QUERY = gql`
  query orgBases($org_id: Int = 2) {
    orgBases(org_id: $org_id) {
      id
      organisation_id
      name
    }
  }
`

function Header(props: HeaderProps) {
  const [selectedBase, setSelectedBase] = useState()

  const onBaseChange = (event, data) => {
    if (data) {
      setSelectedBase(data.value)
    }
  }

  const getBaseDropDown = (error, loading, data) => {
    if (!props.isLoggedIn) return null
    if (error) {
      return (
        <Dropdown fluid selection text="All bases">
          <Dropdown.Menu>
            <Message error header="Error" content="Fetching bases" />
          </Dropdown.Menu>
        </Dropdown>
      )
    }
    if (loading) {
      return (
        <Dropdown fluid selection text="All bases" className="icon">
          <Dropdown.Menu>
            <Message header="Loading..." />
          </Dropdown.Menu>
        </Dropdown>
      )
    }

    if (!selectedBase && data.orgBases.length > 1) {
      setSelectedBase(data.orgBases[0].id) // defaultValue doesn't want to work on Dropdown
    }
    return (
      <Dropdown
        fluid
        selection
        multiple={false}
        search={false}
        options={data.orgBases.map((base) => {
          return {
            key: base.id,
            value: base.id,
            text: base.name,
          }
        })}
        onChange={onBaseChange}
        value={selectedBase}
      />
    )
  }

  const { error, loading, data } = useQuery(ALL_CAMPS_QUERY)
  const campsDropdown = getBaseDropDown(error, loading, data)

  return (
    <div className="w-screen flex p-1 bg-white shadow-md align-baseline">
      <a href="/" className="flex-1 p-1">
        <img src={boxtributeFavicon} alt="Logo" className="p-1" />
      </a>
      <div className="p-1">{campsDropdown}</div>
      <div className="flex-1 p-3 desktopAppLink">
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
