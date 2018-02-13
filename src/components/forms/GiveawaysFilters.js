import React from "react"
import styled from "styled-components"
import {
  Input,
  Checkbox,
  Cascader,
  Dropdown,
  Menu,
  Button,
  Icon,
  Form,
} from "antd"

import { CATEGORIES, TYPES } from "../../config"

const { Search } = Input
const FormItem = Form.Item

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledCascader = styled(Cascader)`
  width: auto !important;
  > .ant-cascader-picker-label {
    padding-right: 20px;
  }
`

const SearchFormItem = styled(Form.Item)`
  flex-grow: 3;

  > .ant-form-item-control-wrapper {
    width: 100%;
  }
`

const CascaderFormItem = styled(Form.Item)`
  flex-grow: 3;

  > .ant-form-item-control,
  .ant-form-item-control-wrapper,
  .ant-cascader-picker {
    width: 100% !important;
  }
`

const GiveawayFilters = () => {
  const onChange = () => null
  const type_menu = (
    <Menu onClick={onChange}>
      {TYPES.map(type => <Menu.Item key={type}>{type}</Menu.Item>)}
    </Menu>
  )

  const sort_menu = (
    <Menu onClick={onChange}>
      <Menu.Item key="value">Value</Menu.Item>
      <Menu.Item key="date">Date</Menu.Item>
      <Menu.Item key="another">Entered</Menu.Item>
    </Menu>
  )

  return (
    <StyledForm layout="inline">
      <SearchFormItem>
        <Search placeholder="Filter" onSearch={value => console.log(value)} />
      </SearchFormItem>
      <CascaderFormItem>
        <StyledCascader
          options={CATEGORIES}
          placeholder="Categories"
          changeOnSelect
        />
      </CascaderFormItem>
      <FormItem>
        <Dropdown overlay={sort_menu}>
          <Button>
            Sort By <Icon type="down" />
          </Button>
        </Dropdown>
      </FormItem>
      <FormItem>
        <Dropdown overlay={type_menu}>
          <Button>
            Type <Icon type="down" />
          </Button>
        </Dropdown>
      </FormItem>
      <FormItem>
        <Checkbox onChange={onChange}>Hide Viewed</Checkbox>
      </FormItem>
    </StyledForm>
  )
}

export default GiveawayFilters
