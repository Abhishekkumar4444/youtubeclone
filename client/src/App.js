import React from "react"
import styled, { ThemeProvider } from "styled-components"

import Navbar from "./components/Navbar"
import Menu from "./components/Menu"
import { darkTheme, lightTheme } from "./utils/Theme"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Video from "./pages/Video"
import SignIn from "./pages/SignIn"
import SubNavbar from "./components/SubNavbar"
import { useSelector } from "react-redux"
import Search from "./pages/Search"

const Container = styled.div`
  display: flex;
  background: red;
`
const Main = styled.div`
  flex: 7;
  background: ${({ theme }) => theme.bg};
  flex-wrap: wrap;
`
const Wrapper = styled.div`
  padding: 22px 96px;
`
const NavWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.softi};
  border-top: 1px solid ${({ theme }) => theme.softi};
  padding: 10px 20px;
  background: ${({ theme }) => theme.bgLighter};
`

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const { currentUser } = useSelector((state) => state.user)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Router>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <NavWrapper>
              <SubNavbar />
            </NavWrapper>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
