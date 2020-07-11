import React from "react"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <Link to="/org/abc">Org ABC</Link>
      <br />
      <Link to="/org/abc/base/base1">Org ABC, Base 1</Link>
      <br />
      <Link to="/org/abc/base/base1/pick-list">Org ABC, Base 1, pick list</Link>
      <br />
      <Link to="/pdf">Generate QR Codes</Link>
    </div>
  )
}

export default Home
