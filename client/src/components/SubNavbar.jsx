import React from "react"
import styled from "styled-components"
const Container = styled.div`
  display: ${(props) => props.type === "sm" && "none"};
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`
const Button = styled.button`
  cursor: pointer;
  border-radius: 20px;
  padding: 6px 20px;
  font-size: 14px;
  background: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: 0.5px solid #c9c9c9;
`

function SubNavbar() {
  return (
    <Container>
      <Wrapper>
        <Button
          style={{
            background: "black",
            color: "white",
          }}
        >
          All
        </Button>
        <Button>JavaScript</Button>
        <Button>Music</Button>
        <Button>Motivation</Button>
        <Button>Java</Button>
        <Button>Live</Button>
        <Button>Computer keyboard</Button>
        <Button>Lecture</Button>
        <Button>Gadgets</Button>
        <Button>Graphics design</Button>
        <Button>Lectures</Button>
        <Button>Mixes</Button>
        <Button>Java</Button>
        <Button>Cloud Computing </Button>
        <Button>Google</Button>
      </Wrapper>
    </Container>
  )
}

export default SubNavbar
