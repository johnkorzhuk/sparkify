import React from "react"
import { Row, Col } from "antd"

import { Container } from "../styled"
import GiveawayForm from "../forms/GiveawaySubmission"

const SubmitGiveaway = props => {
  return (
    <Container>
      <h2>Submit a giveaway</h2>
      <Row>
        <Col span={12}>
          <GiveawayForm {...props} />
        </Col>
      </Row>
    </Container>
  )
}

export default SubmitGiveaway
