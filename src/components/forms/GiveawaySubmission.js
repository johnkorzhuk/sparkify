import React from "react"
import {
  Form,
  DatePicker,
  Button,
  Input,
  InputNumber,
  Select,
  Radio,
  Cascader,
  Upload,
  Icon,
} from "antd"

import { LOCATIONS, TYPE_RESOURCES, CATEGORY_RESOURCES } from "../../config"

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const GiveawaySubmissionForm = ({
  getFieldDecorator,
  onSubmit,
  normFile,
  onUpload,
}) => {
  const timePickerConfig = {
    rules: [{ type: "object", required: true, message: "Required" }],
  }
  // TODO: make title max 25 characters
  return (
    <Form onSubmit={onSubmit}>
      <FormItem label="Title" hasFeedback>
        {getFieldDecorator("title", {
          rules: [{ required: true, message: "Required" }],
        })(<Input placeholder="Title" />)}
      </FormItem>

      <FormItem label="Description" hasFeedback>
        {getFieldDecorator("description", {
          rules: [{ required: true, message: "Required" }],
        })(
          <TextArea
            placeholder="Description"
            autosize={{ minRows: 2, maxRows: 4 }}
          />,
        )}
      </FormItem>

      <FormItem label="Giveaway link" hasFeedback>
        {getFieldDecorator("link", {
          rules: [{ required: true, message: "Required" }],
        })(<Input placeholder="https://www.gleam.io" />)}
      </FormItem>

      <FormItem label="Value">
        {getFieldDecorator("value", {
          rules: [{ required: true, message: "Required" }],
        })(
          <InputNumber
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={value => value.replace(/\$\s?|(,*)/g, "")}
          />,
        )}
      </FormItem>

      <FormItem label="Location" hasFeedback>
        {getFieldDecorator("location", {
          rules: [{ required: true, message: "Required" }],
        })(
          <Select placeholder="Please select a country">
            {LOCATIONS.map(loc => (
              <Option value={loc} key={loc}>
                {loc}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>

      <FormItem label="Type">
        {getFieldDecorator("type", {
          rules: [{ required: true, message: "Required" }],
        })(
          <RadioGroup>
            {Object.keys(TYPE_RESOURCES).map(type => (
              <RadioButton value={type} key={type}>
                {TYPE_RESOURCES[type].label}
              </RadioButton>
            ))}
          </RadioGroup>,
        )}
      </FormItem>

      <FormItem label="Category">
        {getFieldDecorator("category", {
          rules: [{ required: true, message: "Required" }],
        })(
          <RadioGroup>
            {Object.keys(CATEGORY_RESOURCES).map(category => (
              <RadioButton value={category} key={category}>
                {CATEGORY_RESOURCES[category].label}
              </RadioButton>
            ))}
          </RadioGroup>,
        )}
      </FormItem>

      <FormItem label="End date / time">
        {getFieldDecorator("endDate", timePickerConfig)(
          <DatePicker showTime format="MM-DD-YYYY HH:mm:ss" />,
        )}
      </FormItem>

      <FormItem label="Image">
        <div className="dropbox">
          {getFieldDecorator("image", {
            valuePropName: "fileList",
            getValueFromEvent: normFile,
          })(
            <Upload.Dragger name="files" customRequest={onUpload}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>,
          )}
        </div>
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  )
}

export default GiveawaySubmissionForm
