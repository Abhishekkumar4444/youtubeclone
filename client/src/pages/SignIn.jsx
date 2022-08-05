import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js"
import { auth, provider } from "../utils/firebase.js"
import { signInWithPopup } from "firebase/auth"

import { useNavigate } from "react-router-dom"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 66px);
  color: ${({ theme }) => theme.text};
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 50px;
  border: 1px solid ${({ theme }) => theme.soft};
  gap: 10px;
`

const Title = styled.h1``
const SubTitle = styled.h2``
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: white;
`
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  &:hover {
    background-color: ${({ theme }) => theme.text};
  }
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
`
const More = styled.div`
  display: flex;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 10px;
`
const Links = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 50px;
`
const Link = styled.div`
  margin-left: 30px;
`

function SignIn() {
  const [name, setName] = useState("")
  const [setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signInWithGoogle = () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data))
          })
      })
      .catch((err) => {
        loginFailure()
      })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try {
      const res = await axios.post("auth/signin", {
        name,
        password,
      })
      dispatch(loginSuccess(res.data))
      navigate("/")
      console.log(res.data)
    } catch (error) {
      dispatch(loginFailure())
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to contiue to Technical ojha</SubTitle>
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>SignIn with Google</Button>
        <Input
          type="username"
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign Up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}

export default SignIn
