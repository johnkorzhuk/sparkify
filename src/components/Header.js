import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import Nav from "../containers/Nav"
import { Container } from "./styled"

const HeaderContainer = Container.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 80px;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  > h1 {
    margin: 0;
  }
`

const Logo = styled(Link)`
  background-color: gray;
  border-radius: 50%;
  border: 1px solid black;
  height: 30px;
  width: 30px;
  margin-right: 10px;
`

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo to="/" />
        <h1>Sparkify</h1>
      </LogoContainer>
      <Nav />
    </HeaderContainer>
  )
}

export default Header
