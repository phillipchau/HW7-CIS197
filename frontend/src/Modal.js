import React, { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import './App.css'
import Modal from 'react-bootstrap/Modal'

require('react-bootstrap/ModalHeader')

const QuestionModal = props => {
  const [questionText, setQuestion] = useState('')
  const { showState, hide } = props
  const submitQuestion = async () => {
    const data = await axios.post('/api/questions/add', { questionText })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR while filling in question. Please try again')
    } else {
      setQuestion('')
      hide()
    }
  }
  return (
    <>
      <Modal
        show={showState}
        onHide={hide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="questionForm">
            <form onSubmit={e => {
              e.preventDefault()
            }}
            >
              <div className="form-group">
                <label style={{ fontSize:20, fontWeight: 'bold' }} htmlFor="textbox">Submit a question: </label>
                <textarea className="form-control" value={questionText} onChange={e => setQuestion(e.target.value)} id="textbox" rows="3" />
              </div>
              <button style={{ marginBottom: 5 }} onClick={submitQuestion} type="submit" className="btn btn-primary btn-lg btn-block">Submit Question</button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button style={{ marginBottom: 5 }} type="button" onClick={hide} className="btn btn-danger btn-lg btn-block">Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default QuestionModal
