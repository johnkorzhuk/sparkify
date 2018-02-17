import React from "react"
import styled from "styled-components"
import { Input, Checkbox, Cascader, Select, Button, Icon, Form } from "antd"

import { CATEGORIES, TYPES } from "../../config"

const { Option } = Select
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

const SelectFormItem = styled(Form.Item)`
  min-width: 110px !important;
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

const CloseCircle = styled(({ hasInput, ...props }) => <Icon {...props} />)`
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
  cursor: ${({ hasInput }) => (hasInput ? "pointer" : "default")};
  transition: color 0.3s ease, opacity 0.15s ease;
  opacity: ${({ hasInput }) => (hasInput ? 1 : 0)};

  &:hover {
    color: rgba(0, 0, 0, 0.45);
  }
`

const GiveawayFilters = ({
  search,
  categories,
  sort,
  type,
  hideViewed,
  setFilter,
  resetFilter,
}) => {
  return (
    <StyledForm layout="inline">
      <SearchFormItem>
        <Input
          suffix={
            <CloseCircle
              type="close-circle"
              onClick={() => !!search && resetFilter("searchInput")}
              hasInput={!!search}
            />
          }
          placeholder="Filter"
          onChange={e => {
            setFilter("searchInput", e.target.value)
          }}
          value={search}
        />
      </SearchFormItem>
      <CascaderFormItem>
        <StyledCascader
          options={CATEGORIES}
          placeholder="Categories"
          changeOnSelect
          type="categories"
          value={categories}
          onChange={value => {
            setFilter("categories", value)
          }}
        />
      </CascaderFormItem>
      <SelectFormItem>
        <Select
          value={type}
          onChange={value => {
            setFilter("type", value)
          }}
          placeholder="Type"
          allowClear
        >
          {TYPES.map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </SelectFormItem>
      <SelectFormItem>
        <Select
          value={sort.value}
          onSelect={value => {
            const order =
              value === sort.value && sort.order !== "descending"
                ? "descending"
                : "acsending"
            setFilter("sort", value, order)
          }}
        >
          <Option value="value">Value</Option>
          <Option value="newest">Newest</Option>
          <Option value="endDate">End Date</Option>
        </Select>
      </SelectFormItem>
      <FormItem>
        <Checkbox
          checked={hideViewed}
          onChange={e => {
            setFilter("hideViewed", e.target.checked)
          }}
        >
          Hide Viewed
        </Checkbox>
      </FormItem>
    </StyledForm>
  )
}

export default GiveawayFilters
