import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Comment from "./Comment"
import axios from "axios"
import { useSelector } from "react-redux"
const Container = styled.div``
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.textSoft};
  outline: none;
  padding: 5px;
  background: transparent;
  width: 100%;
`

function Comments({ videoId }) {
  const [comments, setComments] = useState([])
  const { currentUser } = useSelector((state) => state.user)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`)
        setComments(res.data)
      } catch (error) {}
    }
    fetchComments()
  }, [videoId])
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="add a comment..." />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  )
}

export default Comments
