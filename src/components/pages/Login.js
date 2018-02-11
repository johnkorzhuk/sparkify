import React from "react"
import styled from "styled-components"
import { Row, Col, Button, Form, Input, Icon } from "antd"

import { Container } from "../styled"
import RegisterLoginForm from "../forms/Register-Login"

const FormItem = Form.Item

const H2 = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`

const SeperatorText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.25);
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  > span {
    padding-bottom: 3px;
  }
`

const StyledCol = styled(Col)`
  padding-top: 20px;

  &:first-child {
    padding-right: 40px;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
  }

  &:last-child {
    padding-left: 40px;
  }
`

const ProviderLoginButton = styled(Button)`
  width: 100%;
  display: block;
  margin: 10px 0;

  &:first-child {
    margin-top: 0;
  }
`

const Login = ({
  match,
  form,
  onUsernameChange,
  onSubmit,
  onConfirmBlur,
  onProviderClick,
  confirmDirty,
  username,
  email,
  ...props
}) => {
  const registering = match.path === "/register"
  const { getFieldDecorator } = form

  const checkConfirm = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["password-2"], { force: true })
    }
    callback()
  }

  const checkPassword = (rule, value, callback) => {
    if (value && value.length > 0 && value !== form.getFieldValue("password")) {
      callback("Passwords do not match")
    } else {
      callback()
    }
  }
  return (
    <Container>
      <H2>{registering ? "Register" : "Login"}</H2>
      <Row>
        <StyledCol span={12}>
          <RegisterLoginForm
            registering={registering}
            getFieldDecorator={getFieldDecorator}
            onSubmit={e => onSubmit(e, form)}
            onConfirmBlur={onConfirmBlur}
            checkConfirm={checkConfirm}
            checkPassword={checkPassword}
            usernameIsChecked={username.checked}
            emailIsChecked={email.checked}
          />
        </StyledCol>
        <SeperatorText>
          <span>or</span>
        </SeperatorText>
        <StyledCol span={12}>
          {registering ? (
            <FormItem hasFeedback={username.checked}>
              {getFieldDecorator("username-2", {
                rules: [{ required: true, message: "Required" }, {}],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />,
              )}
            </FormItem>
          ) : null}
          <ProviderLoginButton onClick={() => onProviderClick("google", form)}>
            Google
          </ProviderLoginButton>
          <ProviderLoginButton
            onClick={() => onProviderClick("facebook", form)}
          >
            Facebook
          </ProviderLoginButton>
          <ProviderLoginButton onClick={() => onProviderClick("twitter", form)}>
            Twitter
          </ProviderLoginButton>
        </StyledCol>
      </Row>
    </Container>
  )
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onFormChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value.trim(),
      }),
      "username-2": Form.createFormField({
        ...props["username-2"],
        value: props.username.value.trim(),
      }),
      email: Form.createFormField({
        ...props.email,
        value: props.email.value,
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
      "password-2": Form.createFormField({
        ...props["password-2"],
        value: props["password-2"].value,
      }),
    }
  },
})(Login)
