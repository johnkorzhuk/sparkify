import React from "react"
import styled from "styled-components"
import { Input, Checkbox, Cascader, Select, Button, Icon, Form } from "antd"

import { CATEGORY_RESOURCES, TYPE_RESOURCES } from "../../config"

const { Option } = Select
const FormItem = Form.Item

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchFormItem = styled(FormItem)`
  flex-grow: 3;

  > .ant-form-item-control-wrapper {
    width: 100%;
  }
`

const SelectFormItem = styled(({ minWidth, ...props }) => (
  <FormItem {...props} />
))`
  min-width: ${({ minWidth }) => minWidth || 110}px !important;

  > .ant-form-item-control-wrapper {
    width: 100%;
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
  category,
  sort,
  type,
  hideViewed,
  setFilter,
  resetFilter,
  updateFilterSortOrder,
}) => {
  return (
    <StyledForm layout="inline">
      <SearchFormItem>
        <Input
          suffix={
            <CloseCircle
              type="close-circle"
              onClick={() => {
                resetFilter("searchInput")
                updateFilterSortOrder(["filter", "sort"])
              }}
              hasInput={!!search}
            />
          }
          placeholder="Filter"
          onChange={e => {
            updateFilterSortOrder(["sort", "filter"])
            setFilter("searchInput", e.target.value)
          }}
          value={search}
        />
      </SearchFormItem>
      <SelectFormItem>
        <Select
          value={category}
          onChange={value => {
            setFilter("category", value)
          }}
          placeholder="Categories"
          allowClear
        >
          {Object.keys(CATEGORY_RESOURCES).map(category => (
            <Option key={category} value={category}>
              {CATEGORY_RESOURCES[category].label}
            </Option>
          ))}
        </Select>
      </SelectFormItem>
      <SelectFormItem minWidth={160}>
        <Select
          value={type}
          onChange={value => {
            setFilter("type", value)
          }}
          placeholder="Type"
          allowClear
        >
          {Object.keys(TYPE_RESOURCES).map(type => (
            <Option key={type} value={type}>
              {TYPE_RESOURCES[type].label}
            </Option>
          ))}
        </Select>
      </SelectFormItem>
      <SelectFormItem>
        <Select
          value={sort.value}
          onSelect={value => {
            const order =
              value === sort.value && sort.order !== "desc" ? "desc" : "asc"
            setFilter("sort", value, order)
            updateFilterSortOrder(["filter", "sort"])
          }}
        >
          <Option value="value">Value</Option>
          <Option value="createdOn">Newest</Option>
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
