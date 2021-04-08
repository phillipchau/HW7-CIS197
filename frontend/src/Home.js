import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './App.css'
import QuestionModal from './Modal'

const Home = () => {
  const [questions, setQuestion] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [response, setResponse] = useState('')
  const [_id, setId] = useState('')

  const [answer, setAnswer] = useState('')
  const [login, setLogin] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const history = useHistory()

  const submitResponse = async () => {
    const data = await axios.post('/api/questions/answer', { _id, answer })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR while answering question')
    } else {
      setResponse(answer)
      setAnswer('')
    }
  }

  const getLog = async () => {
    const logdata = await axios.get('/account/logstatus')
    if (typeof logdata.data === 'string' && logdata.data.startsWith('ERROR:')) {
      alert('ERROR with getting login data')
    } else {
      setLogin(logdata.data.user)
    }
  }

  const logout = async () => {
    const data = await axios.post('/account/logout')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR logging out')
    } else {
      history.push('/')
      getLog()
    }
  }

  const questionClick = data => {
    setTitle(data.questionText)
    setAuthor(data.author)
    setResponse(data.answer)
    setId(data._id)
  }

  const getData = async () => {
    const data = await axios.get('/api/questions')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR getting data')
    } else {
      setQuestion(data.data)
    }
  }

  useEffect(() => {
    getLog()
  }, [])

  useEffect(() => {
    questions.forEach(entry => {
      if (entry._id === _id) {
        questionClick(entry)
      }
    })
  }, [questions])

  useEffect(() => {
    const intervalID = setInterval(() => {
      getData()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])
  return (
    <>
      <div className="floatcontain">
        <div id="topbar">
          <span>
            <h1 style={{ paddingBottom: 5, paddingTop: 5, marginLeft: 5 }}>
              CampusWire Lite
            </h1>
          </span>

          {login && (
            <>
              <span style={{ paddingTop: 5 }}>
                <h4 style={{ display: 'inline' }}> Hello </h4>
                <h4 style={{ display: 'inline', marginRight: 10 }}>
                  {login}
                </h4>
                <button style={{ marginBottom: 5, marginRight: 20, display: 'inline' }} type="button" onClick={logout} className="btn btn-success">Log Out</button>
              </span>
            </>
          )}
        </div>
        <div id="floatLeft">
          {!login && (
            <button style={{ marginBottom: 5 }} type="button" onClick={() => history.push('/login')} className="btn btn-primary btn-lg btn-block">Log In</button>
          )}
          {login && (
            <>
              <button style={{ marginBottom: 5 }} type="button" className="btn btn-primary btn-lg btn-block" onClick={() => setModalShow(true)}>Add Question +</button>
              <QuestionModal showState={modalShow} hide={() => setModalShow(false)} />
            </>
          )}
          {questions.map(q => (
            <button key={q._id} style={{ marginBottom: 5 }} onClick={() => questionClick(q)} type="button" className="btn btn-info btn-xl btn-block">{q.questionText}</button>
          ))}
        </div>
        <div id="floatRight">
          {title !== '' && (
          <>
            <div id="response">
              <h3>{title}</h3>
              <p id="author">Author: </p>
              <p>
                {author}
              </p>
              <p id="answer">Answer: </p>
              <p>
                {response}
              </p>
            </div>
            {login && (
              <>
                <div id="answerForm">
                  <form onSubmit={e => {
                    e.preventDefault()
                    submitResponse()
                  }}
                  >
                    <div className="form-group">
                      <label id="textlabel" htmlFor="textbox">Answer this question: </label>
                      <textarea className="form-control" value={answer} onChange={e => setAnswer(e.target.value)} id="textbox" rows="3" />
                    </div>
                    <button style={{ marginBottom: 5 }} type="submit" className="btn btn-primary btn-lg btn-block">Submit Answer</button>
                  </form>
                </div>
              </>
            )}
          </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
