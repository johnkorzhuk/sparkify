import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Button } from "antd"

const Container = styled.div`
  background-color: #ccc;
  padding: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const NavItemContainer = styled.nav``

const NavItem = styled.a`
  display: block;
  margin-top: 25px;
  font-size: 16px;
  color: black;

  &:first-child {
    margin-top: 0;
  }
`

const NavLinkItem = NavItem.withComponent(Link)

const SubmitGiveawaysButton = styled(({ to, ...props }) => (
  <Link to={to}>
    <Button icon="plus" type="primary" {...props}>
      Submit Giveaway
    </Button>
  </Link>
))`
  width: 100%;
`

const ProfileNav = ({ routes, onLogout }) => {
  return (
    <Container>
      <NavItemContainer>
        <NavLinkItem to="/profile/history">Giveaway History</NavLinkItem>
        <NavLinkItem to="/profile/giveaways">My Giveaways</NavLinkItem>
        <NavLinkItem to="/profile/settings">Settings</NavLinkItem>
        <NavItem onClick={onLogout}>Logout</NavItem>
      </NavItemContainer>
      <SubmitGiveawaysButton to="/submit" />
    </Container>
  )
}

export default ProfileNav
