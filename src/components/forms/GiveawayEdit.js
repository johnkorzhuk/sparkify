import React, { Fragment } from "react"
import styled from "styled-components"
import ReactIScroll from "react-iscroll"
import iScroll from "iscroll"
import moment from "moment"
import {
  Form,
  DatePicker,
  Button,
  Input,
  InputNumber,
  Select,
  Radio,
  Upload,
  Icon,
} from "antd"

import { Upload as UploadIcon } from "../icons/index"
import { LOCATIONS, TYPE_RESOURCES, CATEGORY_RESOURCES } from "../../config"

const { Option } = Select
const { TextArea } = Input
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 20px;
`

const ItemsContainer = styled.div`
  position: relative;
`

const FormLabel = styled.span`
  font-weight: bold;
  color: white;
  font-size: 18px;
`

const StyledFormItem = styled(Form.Item)`
  padding-right: 32px !important;
  padding-left: 5px !important;
`

const StyledFormElement = styled(({ Element, width, ...props }) => (
  <Element {...props} />
))`
  width: ${({ width }) => width} !important;
`

const StyledDragger = styled(Upload.Dragger)`
  > .ant-upload-drag {
    background: none !important;
  }

  > .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
    border-color: white !important;
  }
`

const StyedUploadIcon = styled(UploadIcon)`
  font-size: 48px;
  color: white;
  padding-bottom: 20px;
`

const UploadText = styled.p`
  color: white;
  font-size: 16px;
  margin: 0 0 4px;
`

const Submit = styled(Button)`
  margin-top: 30px;
  margin-left: 5px;
`

const I_SCROLL_OPTIONS = {
  scrollY: true,
  disablePointer: true,
  disableTouch: false,
  disableMouse: true,
  mouseWheel: true,
  scrollbars: "custom",
  interactiveScrollbars: true,
}

const GiveawayEditForm = ({
  getFieldDecorator,
  category,
  images,
  title,
  description,
  value,
  type,
  location,
  link,
  endDate,
  normFile,
  onUpload,
}) => {
  const timePickerConfig = {}
  // TODO: make title max 25 characters
  return (
    <Container>
      <ReactIScroll iScroll={iScroll} options={I_SCROLL_OPTIONS}>
        <ItemsContainer>
          <StyledFormItem label={<FormLabel>Title</FormLabel>} colon={false}>
            {getFieldDecorator("title", {
              initialValue: title,
            })(<Input placeholder="Title" />)}
          </StyledFormItem>

          <StyledFormItem
            label={<FormLabel>Description</FormLabel>}
            colon={false}
          >
            {getFieldDecorator("description", {
              initialValue: description,
            })(
              <TextArea
                placeholder="Description"
                autosize={{ minRows: 2, maxRows: 4 }}
              />,
            )}
          </StyledFormItem>

          <StyledFormItem label={<FormLabel>Value</FormLabel>} colon={false}>
            {getFieldDecorator("value", {
              initialValue: value,
            })(
              <InputNumber
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
              />,
            )}
          </StyledFormItem>

          <StyledFormItem label={<FormLabel>Type</FormLabel>} colon={false}>
            {getFieldDecorator("type", {
              initialValue: type,
            })(
              <StyledFormElement
                Element={Select}
                width="40%"
                placeholder="Please select a country"
              >
                {Object.keys(TYPE_RESOURCES).map(type => (
                  <Option value={type} key={type}>
                    {type}
                  </Option>
                ))}
              </StyledFormElement>,
            )}
          </StyledFormItem>

          <StyledFormItem label={<FormLabel>Location</FormLabel>} colon={false}>
            {getFieldDecorator("location", {
              initialValue: location,
            })(
              <StyledFormElement
                Element={Select}
                width="40%"
                placeholder="Please select a country"
              >
                {LOCATIONS.map(loc => (
                  <Option value={loc} key={loc}>
                    {loc}
                  </Option>
                ))}
              </StyledFormElement>,
            )}
          </StyledFormItem>

          <StyledFormItem
            label={<FormLabel>End date & time</FormLabel>}
            colon={false}
          >
            {getFieldDecorator("endDate", {
              initialValue: moment(endDate),
            })(
              <StyledFormElement
                Element={DatePicker}
                width="40%"
                showTime
                format="MM-DD-YYYY HH:mm:ss"
              />,
            )}
          </StyledFormItem>

          <StyledFormItem
            label={<FormLabel>Giveaway link</FormLabel>}
            colon={false}
          >
            {getFieldDecorator("link", {
              initialValue: link,
            })(<Input placeholder="https://www.gleam.io" />)}
          </StyledFormItem>

          <StyledFormItem label={<FormLabel>Category</FormLabel>} colon={false}>
            {getFieldDecorator("category", {
              initialValue: category,
            })(
              <RadioGroup>
                {Object.keys(CATEGORY_RESOURCES).map(category => (
                  <RadioButton value={category} key={category}>
                    {CATEGORY_RESOURCES[category].label}
                  </RadioButton>
                ))}
              </RadioGroup>,
            )}
          </StyledFormItem>

          <StyledFormItem label={<FormLabel>Images</FormLabel>} colon={false}>
            <div className="dropbox">
              {getFieldDecorator("image", {
                valuePropName: "fileList",
                getValueFromEvent: normFile,
              })(
                <StyledDragger name="files" customRequest={onUpload}>
                  <StyedUploadIcon />
                  <UploadText>
                    Click or drag file to this area to upload
                  </UploadText>
                </StyledDragger>,
              )}
            </div>
          </StyledFormItem>

          <Form.Item>
            <Submit type="primary" htmlType="submit" size="large">
              Submit Changes
            </Submit>
          </Form.Item>
        </ItemsContainer>
      </ReactIScroll>
    </Container>
  )
}

export default GiveawayEditForm
