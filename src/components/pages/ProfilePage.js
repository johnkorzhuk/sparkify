import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import styled from "styled-components"

import { Container as DefaultContainer } from "../styled"
import ProfileNav from "../profile/Nav"
import ProfileGiveaways from "../../containers/ProfileGiveaways"

const Container = DefaultContainer.extend`
  max-width: 1000px;
  height: 500px;
  display: flex;
`

const NavContainer = styled.div`
  width: 25%;
`

const ContentContain = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 5%;
`

class ProfilePage extends Component {
  componentDidMount() {
    const { location, history } = this.props

    if (location.pathname === "/profile") {
      history.replace("/profile/settings")
    }
  }

  render() {
    const { profileGiveaways } = this.props
    const renderProfileGiveaways = Object.keys(profileGiveaways).length > 0

    return (
      <Container>
        <NavContainer>
          <ProfileNav />
        </NavContainer>
        <ContentContain>
          <Route
            path="/profile/history"
            render={props =>
              renderProfileGiveaways ? (
                <ProfileGiveaways
                  {...props}
                  profileGiveaways={profileGiveaways}
                />
              ) : (
                "loading..."
              )
            }
          />
          <Route
            path="/profile/giveaways"
            render={props =>
              renderProfileGiveaways ? (
                <ProfileGiveaways
                  {...props}
                  profileGiveaways={profileGiveaways}
                />
              ) : (
                "loading..."
              )
            }
          />
        </ContentContain>
      </Container>
    )
  }
}

export default ProfilePage
