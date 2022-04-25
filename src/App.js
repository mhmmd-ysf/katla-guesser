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
        <Route path="/" element={<Form setkamus={setKamus} />} />
        <Route path="/result" element={<Result kamus={kamus}/>} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
