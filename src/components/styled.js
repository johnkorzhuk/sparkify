import styled from "styled-components"

export const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
`

export const InvertedButton = styled.button`
  max-width: 200px;
  background-color: white;
  color: rgba(0, 0, 0, 0);
  border: 2px solid white;
  padding: 7px 25px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  > span {
    -webkit-background-clip: text;
    filter: invert(1);
  }
`
