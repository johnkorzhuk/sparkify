import React from "react"

import { Container } from "../styled"

const HomePage = ({ match }) => {
  console.log(match.path)
  return (
    <Container>
      <h2>Some cool text about Sparkify. Wow!</h2>
    </Container>
  )
}

export default HomePage
