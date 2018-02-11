import React, { Component } from "react"
import { connect } from "react-redux"
// import { compose } from "redux"

import { signup, login } from "../store/auth/actions"
import { selectAuthenticatedState } from "../store/auth/selectors"
import firebase from "../services/firebase"
import { checkUserFields } from "../store/auth/utils"

import Login from "../components/pages/Login"

class LoginPageContaner extends Component {
  state = {
    confirmDirty: false,
    fields: {
      username: {
        value: "",
        checked: false,
      },
      email: {
        value: "",
        checked: false,
      },
      password: {
        value: "",
      },
      "password-2": {
        value: "",
      },
    },
  }

  componentDidMount() {
    const { match, authenticated, history } = this.props

    if (match.path === "/login" && authenticated) history.push("/giveaways")
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true })
    }
    callback()
  }

  handleFormChange = changedFields => {
    const field = Object.keys(changedFields)[0]

    if (field && field.includes("username")) {
      this.setState({
        ...this.state,
        fields: {
          ...this.state.fields,
          username: {
            ...this.state.fields.username,
            value: changedFields[field].value,
            errors: this.state.fields.username.errors
              ? changedFields[field].errors
              : this.state.fields.username.errors,
          },
          "username-2": {
            ...this.state.fields["username-2"],
            value: changedFields[field].value,
            errors: this.state.fields.username.errors
              ? changedFields[field].errors
              : this.state.fields.username.errors,
          },
          ...changedFields,
        },
      })
    } else {
      this.setState({
        ...this.state,
        fields: { ...this.state.fields, ...changedFields },
      })
    }
  }

  handleSubmit = (e, form) => {
    const { signup, login, history, match } = this.props

    if (e) e.preventDefault()

    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          if (match.path === "/register") {
            this.checkIfFieldsExist(form, ["username", "email"], async () => {
              await signup(firebase.auth, null, firebase.store, values)
              history.push("giveaways")
            })
          } else if (match.path === "/login") {
            await login(firebase.auth, null, values)
            history.push("giveaways")
          }
          // TODO: add a verified email check
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            // TODO: handle this case
            console.error(error.message)
          }
        }
      }
    })
  }

  handleProviderClick = async (provider, form) => {
    const { signup, login, match, history } = this.props
    if (match.path === "/register") {
      this.checkIfFieldsExist(form, ["username-2"], async values => {
        await signup(
          firebase.auth,
          firebase.getAuthProvider(provider),
          firebase.store,
          {
            username: values["username-2"],
          },
        )
        history.push("giveaways")
      })
    } else {
      await login(firebase.auth, firebase.getAuthProvider(provider))
      history.push("giveaways")
    }
  }

  setFieldValidationError(field, message) {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [field]: {
          ...this.state.fields[field],
          validating: false,
          errors: [
            {
              field,
              message,
            },
          ],
        },
      },
    })
  }

  setFieldProperty(field, property, value) {
    this.setState(prevState => {
      return {
        ...prevState,
        fields: {
          ...prevState.fields,
          [field]: {
            ...prevState.fields[field],
            [property]: value,
          },
        },
      }
    })
  }

  checkIfFieldsExist(form, fields, success) {
    form.validateFields(fields, { force: true }, async (errors, values) => {
      if (!errors) {
        let fieldExists = false
        fields.forEach(field =>
          this.setFieldProperty(field, "validating", true),
        )
        const fieldData = await checkUserFields(
          firebase.store,
          fields.reduce((aggr, curr) => {
            aggr[curr] = values[curr]
            return aggr
          }, {}),
        )

        Object.entries(fieldData).forEach(([field, { exists }]) => {
          if (exists) {
            fieldExists = true
            const capitized = `${field.charAt(0).toUpperCase()}${field.slice(
              1,
              field.length,
            )}`
            this.setFieldValidationError(field, `${capitized} already exists`)
          } else {
            const usernameField = field.includes("username")
              ? "username"
              : false
            this.setFieldProperty(usernameField || field, "checked", true)
            this.setFieldProperty(field, "validating", false)
          }
        })
        if (!fieldExists) {
          success(values)
        }
      }
    })
  }

  render() {
    const { fields, confirmDirty } = this.state

    return (
      <Login
        {...this.props}
        {...fields}
        confirmDirty={confirmDirty}
        validateUsername={this.validateUsername}
        onFormChange={this.handleFormChange}
        onSubmit={this.handleSubmit}
        onConfirmBlur={this.handleConfirmBlur}
        onProviderClick={this.handleProviderClick}
      />
    )
  }
}

export default connect(
  state => {
    return {
      authenticated: selectAuthenticatedState(state),
    }
  },
  { signup, login },
)(LoginPageContaner)
