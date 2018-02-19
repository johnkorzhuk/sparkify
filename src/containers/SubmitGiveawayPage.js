import React, { Component } from "react"
import { Form } from "antd"
import { compose } from "redux"
import { connect } from "react-redux"
import shortId from "short-id"

import firebase from "../services/firebase"

import GiveawaySubmitPage from "../components/pages/SubmitGiveaway"

class GiveawaySubmitPageContainer extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, user } = this.props
    form.validateFields(async (err, fieldsValue) => {
      if (!err) {
        const { image, ...values } = {
          ...fieldsValue,
          endDate: new Date(fieldsValue.endDate.toDate()),
          category: fieldsValue.category,
          image: fieldsValue.image[0],
        }
        const id = shortId.generate()

        const storageData = await firebase.storage
          .child(user.uid)
          .child(id)
          .child(image.name)
          .put(image.originFileObj)

        await Promise.all([
          firebase.store
            .collection("giveaways")
            .doc(id)
            .set({
              ...values,
              created: new Date(Date.now()),
              approved: false,
              createdBy: user.uid,
              images: [storageData.downloadURL],
              id,
            }),
          firebase.store
            .collection("users")
            .doc(user.uid)
            .collection("createdGiveaways")
            .doc(id)
            .set({ id }),
        ])
      }
    })
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

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <GiveawaySubmitPage
        normFile={this.normFile}
        onSubmit={this.handleSubmit}
        onUpload={this.handleUpload}
        getFieldDecorator={getFieldDecorator}
      />
    )
  }
}

const enhance = compose(
  connect(state => {
    return {
      user: state.auth.user,
    }
  }),
  Form.create(),
)

export default enhance(GiveawaySubmitPageContainer)
