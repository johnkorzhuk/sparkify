import React, { Component } from "react"
import {
  Form,
  DatePicker,
  TimePicker,
  Button,
  Input,
  InputNumber,
  Select,
  Radio,
  Cascader,
  Upload,
  Icon,
} from "antd"

const FormItem = Form.Item
const { MonthPicker } = DatePicker
const { Option } = Select
const { TextArea } = Input
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const location = ["U.S.A", "Canada", "Mexico", "Europe", "Worldwide"]
const categories = [
  {
    value: "tech",
    label: "Tech",
    children: [
      {
        value: "accessories",
        label: "Accessories",
      },
      {
        value: "cellphones-tablets",
        label: "Cell phones & Tablets",
      },
    ],
  },
  {
    value: "books",
    label: "Books",
  },
  {
    value: "other",
    label: "Other",
  },
  {
    value: "gaming",
    label: "Gaming",
    children: [
      {
        value: "game-keys",
        label: "Game keys",
      },
      {
        value: "skins",
        label: "Skins",
      },
    ],
  },
]

const GiveawaySubmissionForm = ({
  getFieldDecorator,
  onSubmit,
  normFile,
  onUpload,
}) => {
  const timePickerConfig = {
    rules: [{ type: "object", required: true, message: "Required" }],
  }
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
            {location.map(loc => (
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
            <RadioButton value="a">item 1</RadioButton>
            <RadioButton value="b">item 2</RadioButton>
            <RadioButton value="c">item 3</RadioButton>
          </RadioGroup>,
        )}
      </FormItem>

      <FormItem label="Category" hasFeedback>
        {getFieldDecorator("category", {
          rules: [{ type: "array", required: true, message: "required" }],
        })(<Cascader options={categories} />)}
      </FormItem>

      <FormItem label="End date / time">
        {getFieldDecorator("end-date", timePickerConfig)(
          <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" />,
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
