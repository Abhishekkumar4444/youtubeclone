import React, { useState } from "react"
import styled from "styled-components"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined"
import { Link, useNavigate } from "react-router-dom"
import MicIcon from "@mui/icons-material/Mic"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import { useSelector } from "react-redux"
import Upload from "./Upload"

const Container = styled.div`
  position: sticky;
  height: 66px;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100%;
  padding: 0 20px;
`
const Search = styled.div`
  position: absolute;
  left: -200px;
  right: 0px;
  width: 37%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
  padding: 5px;
`
const SearchIcon = styled.span`
  background: ${({ theme }) => theme.bgLighter};
  padding: 8px 18px 0px;
  cursor: pointer;
  border: 0.1px solid ${({ theme }) => theme.softi};
  color: ${({ theme }) => theme.text};
`
const MicIcons = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 9px;
  margin-left: 10px;
`
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 0.1px solid ${({ theme }) => theme.softi};
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bgLighter};
`

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`
const User = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`

function Navbar() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchIcon>
              <SearchOutlinedIcon
                onClick={() => navigate(`/search/query?=${q}`)}
              />
            </SearchIcon>
            <MicIcons>
              <MicIcon />
            </MicIcons>
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <NotificationsNoneOutlinedIcon />
              <Avatar src={currentUser.img} />
              {currentUser.name}
            </User>
          ) : (
            <Link
              to="signin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar
