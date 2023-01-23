import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import { fetchKBBI } from "./store/actions"
import './App.css';
import {
  Form, Result
} from "./components"

function App({
  fetchKBBI,
}) {
  let [kamus, setKamus] = useState([])
  
  const [input, setInput] = useState({
    "input-1": "",
    "input-2": "",
    "input-3": "",
    "input-4": "",
    "input-5": "",
  });
  const [right, setRight] = useState('')
  const [wrong, setWrong] = useState('')
  const [keepHints, setKeepHints] = useState(true)

  function clear() {
    if (!keepHints) {
      setInput({
        "input-1": "",
        "input-2": "",
        "input-3": "",
        "input-4": "",
        "input-5": "",
      })
      setRight("")
      setWrong("")
    }
  }


  // console.log({ kamus, dari: "app" })
  useEffect(() => {
    console.log("============== By ucuphis ==============")
  }, [fetchKBBI])
  useEffect(() => {
    fetchKBBI()
    return () => {}
  }, [fetchKBBI])

  return (
    <div className="App bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-blue-400 font-bold underline">
        <Link to={"/"}>
          Katla Guesser
        </Link>
      </h1>
      <Routes>
        <Route path="/" element={
          <Form
            setkamus={setKamus}
            input={input}
            setInput={setInput}
            right={right}
            setRight={setRight}
            wrong={wrong}
            setWrong={setWrong}
            keepHints={keepHints}
            setKeepHints={setKeepHints}
          />
        } />
        <Route path="/result" element={<Result kamus={kamus} clear={clear}/>} />
      </Routes>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    kbbi: state.kbbi,
    loading: state.loading
  }
}

const mapDispatchToProps = {
  fetchKBBI
}

const tes = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
