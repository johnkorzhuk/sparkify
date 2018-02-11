import React from "react"
import styled from "styled-components"
import { Form, Icon, Input, Button } from "antd"
import { Link } from "react-router-dom"

const FormItem = styled(Form.Item)`
  &:last-child {
    margin-bottom: 0;
  }
`

const RegisterText = styled.span`
  margin-left: 10px;
`

const Register = ({
  getFieldDecorator,
  onSubmit,
  onConfirmBlur,
  checkConfirm,
  checkPassword,
  checkUsername,
  checkedUsername,
  registering,
  usernameIsChecked,
  emailIsChecked,
}) => {
  return (
    <Form onSubmit={onSubmit} className="login-form">
      {registering && (
        <FormItem hasFeedback={usernameIsChecked}>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Required" }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />,
          )}
        </FormItem>
      )}
      <FormItem hasFeedback={emailIsChecked}>
        {getFieldDecorator("email", {
          rules: [{ required: true, message: "Required" }],
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            type="email"
          />,
        )}
      </FormItem>

      <FormItem hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            { required: true, message: "Required" },
            { validator: checkConfirm },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: "Min. of 6 characters and at least 1 number:",
            },
          ],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </FormItem>
      {registering && (
        <FormItem hasFeedback>
          {getFieldDecorator("password-2", {
            rules: [
              { required: true, message: "Required" },
              { validator: checkPassword },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Repeat password"
              onBlur={onConfirmBlur}
            />,
          )}
        </FormItem>
      )}
      <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {registering ? "Join" : "Login"}
        </Button>
        <RegisterText>
          or{" "}
          <Link to={registering ? "/login" : "/register"}>
            {registering ? "login" : "register"}
          </Link>
        </RegisterText>
      </FormItem>
    </Form>
  )
}

export default Register
