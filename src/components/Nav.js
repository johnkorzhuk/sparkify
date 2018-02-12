import React from "react"
import styled from "styled-components"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { Avatar, Menu, Dropdown } from "antd"

const Container = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-left: 10px;
`

const StyledAvatar = styled(Avatar)`
  margin-left: 15px;
  cursor: pointer;
`

const Nav = ({
  photoURL,
  onLogin,
  onLogout,
  authenticated,
  authedRoute,
  pathname,
}) => {
  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === "logout") onLogout()
      }}
    >
      <Menu.Item>
        <Link to="/profile/giveaways">Giveaways</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/profile/history">History</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/faq">Faq</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  )
  if (authedRoute || (pathname !== "/" && authenticated)) {
    return (
      <Container>
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <StyledAvatar src={photoURL} />
        </Dropdown>
      </Container>
    )
  } else {
    return (
      <Container>
        <Link to="/faq">
          <StyledButton>faq</StyledButton>
        </Link>
        <Link to="/register">
          <StyledButton onClick={() => onLogin("register")}>join</StyledButton>
        </Link>
        <StyledButton onClick={() => onLogin("login")}>login</StyledButton>
      </Container>
    )
  }
}

export default Nav
