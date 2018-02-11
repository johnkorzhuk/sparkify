import React from "react"
import styled from "styled-components"

import { Container } from "./styled"

const FooterContainer = styled.footer`
  height: 200px;
  background-color: gray;
  margin-top: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Footer = () => {
  return (
    <FooterContainer>
      <Container>Footer Content</Container>
    </FooterContainer>
  )
}

export default Footer
