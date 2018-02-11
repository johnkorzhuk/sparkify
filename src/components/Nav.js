import React from "react"
import styled from "styled-components"
import { Button } from "antd"
import { Link } from "react-router-dom"

const Container = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-left: 10px;
`

const Nav = ({ photoURL, onLogin, onLogout, authenticated }) => {
  if (!authenticated) {
    return (
      <Container>
        <Link to="/register">
          <StyledButton onClick={() => onLogin("register")}>Join</StyledButton>
        </Link>
        <Link to="/login">
          <StyledButton onClick={() => onLogin("login")}>Login</StyledButton>
        </Link>
      </Container>
    )
  } else {
    return (
      <Container>
        <Button onClick={onLogout}>Sign Out</Button>
      </Container>
    )
  }
}

export default Nav
