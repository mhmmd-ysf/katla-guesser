import axios from "axios"
import { useEffect, useState } from "react"
import './App.css';
import {
  Form
} from "./components"

function App() {
  let [kamus, setKamus] = useState([])
  const [awalan, setAwalan] = useState('')
  const [akhiran, setAkhiran] = useState('')
  const [sedia, setSedia] = useState('')
  const [eksak, setEksak] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    setLoading(true)
    let { data } = await axios({
      method: "get",
      url: "https://kbbi.vercel.app/"
    })
    let { entries } = data
    entries = entries
      .filter(entry => !entry.includes("/cari"))
      .filter(entry => !entry.includes("%"))
      .filter(entry => !entry.includes("-"))
      .map(entry => entry.slice(35))
      .filter(entry => entry.length == 5)
    console.log("data")
    console.log(entries.length, entries[0])
    console.log("data")
    setKamus(entries)
    setLoading(false)
  }, [])

  function contains(str, letters) {
    return letters.every(letter => str.indexOf(letter) >= 0);
  }

  if(awalan || akhiran || sedia || eksak) {
    if(awalan) {
      kamus = (kamus.filter(item => item.indexOf(awalan.toLowerCase()) == 0))
    }
    if(akhiran) {
      kamus = (kamus.filter(item => item.indexOf(akhiran.toLowerCase()) == item.length - akhiran.length))
    }
    if(sedia) {
      kamus = (kamus.filter(item => contains(item, sedia.toLowerCase().split(""))))
    }
    if(eksak) {
      eksak.split("").forEach((item, idx) => {
        if(item != "*") kamus = kamus.filter(item2 => item2[idx] == item.toLowerCase())
        console.log(kamus.length)
      })
    }
  } else {
    kamus = []
  }
  
  function submitHandler(e) {
    if(e.key === "Enter") {
      e.target.blur()
    }
  }

  return (
    <div className="App">
      <h1 className="text-3xl text-red-400 font-bold underline">
        Katla Guesser
      </h1>
      <div className="p-5">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="md:text-lg block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="awalan">
              Awalan
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="awalan"
              type="text"
              placeholder="MAK"
              onChange={e => setAwalan(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="md:text-lg block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="akhiran">
              Akhiran
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="akhiran"
              type="text"
              placeholder="KAN"
              onChange={e => setAkhiran(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="md:text-lg block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tersedia">
              Huruf Tersedia
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="tersedia"
              type="text"
              placeholder="MKN"
              onChange={e => setSedia(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full mb-6 md:mb-0">
          <label className="md:text-lg block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="eksak">
            Eksak
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="eksak"
            type="text"
            placeholder="M*K*N"
            onChange={e => setEksak(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button className="bg-blue-400 rounded px-5 py-2 md:text-lg" onClick={submitHandler}>
          {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg> */}
          Cari
        </button>
      </div>
      {
        loading ?
        <div className="p-2 animate-pulse">
          Loading...
        </div>
        :
        <div className="grid grid-cols-4 md:grid-cols-10">
          {kamus
          .map(item => {
            return (
              <div className="p-2" key={item}>
                <button className="p-2 bg-gray-300 text-blue-900 rounded font-bold">{ item.toUpperCase() }</button>
              </div>
            )
          })}
        </div>
      }
    </div>
  );
}

export default App;
