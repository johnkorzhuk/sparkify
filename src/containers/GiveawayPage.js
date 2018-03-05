import React, { Component } from "react"
import { connect } from "react-redux"
import { Form } from "antd"
import { compose } from "redux"
import styled from "styled-components"

import firebase from "../services/firebase"
import { getGiveawayById } from "../store/giveaways/actions"
import { setGiveawayEditing } from "../store/user/actions"

import GiveawayPage from "../components/pages/Giveaway"

const Placeholder = styled.div`
  height: 100vh;
`

class GiveawayPageContainer extends Component {
  async componentDidMount() {
    const { giveaway, getGiveawayById, history, match } = this.props
    const { giveawayId } = match.params

    if (!giveaway) {
      if (giveawayId.length !== 6) {
        history.push("/404")
      }

      getGiveawayById(firebase, history, giveawayId)
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, giveaway } = this.props

    const changedGiveawayData = Object.entries(form.getFieldsValue()).reduce(
      (aggr, [key, value]) => {
        if (value) {
          if (key === "endDate") {
            if (Date.parse(giveaway.endDate) !== Date.parse(value)) {
              return {
                ...aggr,
                [key]: new Date(Date.parse(value)),
              }
            }
          } else if (giveaway[key] !== value) {
            return {
              ...aggr,
              [key]: value,
            }
          }
        }

        return aggr
      },
      {},
    )

    console.log(changedGiveawayData)
  }

  handleUpload = data => {
    setTimeout(() => {
      data.onSuccess()
    }, 50)
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  handleEdit = () => {
    const { setGiveawayEditing, giveaway } = this.props

    setGiveawayEditing(giveaway.id)
  }

  handleCancelEdit = () => {
    const { setGiveawayEditing } = this.props

    setGiveawayEditing(null)
  }

  render() {
    const { giveaway, form: { getFieldDecorator }, ...props } = this.props
    return giveaway ? (
      <GiveawayPage
        {...props}
        giveaway={giveaway}
        normFile={this.normFile}
        onUpload={this.handleUpload}
        onSubmit={this.handleSubmit}
        onEdit={this.handleEdit}
        onCancelEdit={this.handleCancelEdit}
        getFieldDecorator={getFieldDecorator}
      />
    ) : (
      <Placeholder />
    )
  }
}

const enhance = compose(
  Form.create(),
  connect(
    (state, { match }) => {
      const giveaway = state.giveaways.root.all[match.params.giveawayId]
      const isOwner = giveaway
        ? state.auth.user.uid === giveaway.createdBy.uid
        : false

      return {
        giveaway,
        isOwner,
        isEditing: isOwner && state.user.giveaways.editing === giveaway.id,
      }
    },
    { getGiveawayById, setGiveawayEditing },
  ),
)

export default enhance(GiveawayPageContainer)
