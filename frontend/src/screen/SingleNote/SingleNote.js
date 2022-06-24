import React, { useEffect, useState } from "react"
import MainScreen from "../../components/MainScreen"
import { Button, Card, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { updateNoteAction } from "../../actions/noteActions"
import ErrorMessage from "../../components/ErrorMessage"
import Loading from "../../components/Loading"
import ReactMarkdown from "react-markdown"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../Helper/axios"
import axios from "axios"

function SingleNote() {
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [category, setCategory] = useState()
  const [date, setDate] = useState("")
  const { id } = useParams()

  const dispatch = useDispatch()

  const noteUpdate = useSelector((state) => state.noteUpdate)
  const { loading, error } = noteUpdate

  const navigate = useNavigate()

  console.log(id)

  useEffect(() => {
    const getData = async () => {
      const {data} = await axios.get(
        `http://localhost:4000/api/notes/${id}`
      )
      console.log("axios data",data);
      

      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
      setDate(data.updatedAt)
    }

    getData()
  }, [id])

  const resetHandler = () => {
    setTitle("")
    setCategory("")
    setContent("")
  }

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateNoteAction(id, title, content, category))
    if (!title || !content || !category) return

    resetHandler()
    navigate("/mynotes")
  }

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          {/* Updated on - {date.substring(0, 10)} */}
        </Card.Footer>
      </Card>
    </MainScreen>
  )
}

export default SingleNote
