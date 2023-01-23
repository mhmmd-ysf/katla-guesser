import React, { useState } from 'react';
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";

function Form({
  kbbi,
  setkamus,
  input,
  setInput,
  right,
  setRight,
  wrong,
  setWrong,
  keepHints,
  setKeepHints,
}) {
  const navigate = useNavigate();
  // const [input, setInput] = useState({
  //   "input-1": "",
  //   "input-2": "",
  //   "input-3": "",
  //   "input-4": "",
  //   "input-5": "",
  // });
  // const [right, setRight] = useState('')
  // const [wrong, setWrong] = useState('')

  let classes = [
    "appearance-none",
    "rounded-none",
    "relative",
    "block",
    "text-lg",
    "w-1/5",
    "h-12",
    "sm:text-2xl",
    "sm:w-20",
    "sm:h-16",
    "px-2",
    "py-auto",
    "text-center",
    "place-content-center",
    "border",
    "border-gray-300",
    "placeholder-gray-500",
    "text-gray-900",
    "font-bold",
    "focus:outline-none",
    "focus:ring-indigo-500",
    "focus:border-indigo-500",
    "focus:z-10",
  ]

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value.toUpperCase()
    })
    if(e.target.value !== "") {
      const nextSibling = document.querySelector(`input[name="${e.target.name}"]`).nextSibling
        || document.querySelector(`button[name="ini-submit"]`)
      nextSibling.focus()
    } else {
      const prevSibling = document.querySelector(`input[name="${e.target.name}"]`).previousSibling
        || document.querySelector(`button[name="input-1"]`)
      prevSibling.focus()
    }
  }

  function convertInput(obj) {
    let arr = []
    let abjad = "abcdefghijklmnopqrstuvwxyz"
    for (let key in obj) {
      let isAbjad = abjad.includes(obj[key].toLowerCase())
      // console.log({ letter: obj[key], isAbjad })
      arr.push(isAbjad && obj[key] !== "" ? obj[key] : "*")
    }
    return arr.join("")
  }

  function contains(str, letters) {
    return letters.every(letter => str.indexOf(letter) >= 0);
  }

  function notContain(str, letters) {
    return letters.every(letter => str.toLowerCase().indexOf(letter.toLowerCase()) < 0);
  }

  function submitHandler(e) {
    e.preventDefault()
    if (e.key === "Enter") {
      e.target.blur()
    }
    let eksak = convertInput(input)
    let clone = [...kbbi]
    if (right || wrong || eksak) {
      if (wrong) {
        clone = kbbi.filter(item => notContain(item, wrong.toLowerCase().split("")))
      }
      if (right) {
        clone = (clone.filter(item => contains(item, right.toLowerCase().split(""))))
      }
      if(eksak) {
        eksak.split("").forEach((char, idx) => {
          if(char !== "*") {
            clone = clone.filter(char2 => {
              let tes = char2[idx] === char.toLowerCase()
              return tes
            })
          }
        })
      }
    } else {
      clone = []
    }
    setkamus(clone)
    navigate("/result")
    // console.log({ input: convertInput(input), right, wrong, kamus: clone })
  }


  return (
    <>
      <form onSubmit={submitHandler}>
        {/* ========== Rights and Wrongs ========== */}
        <div className="p-5">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-3 md:mb-0">
              <label className="md:text-lg block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tersedia">
                Huruf Benar
              </label>
              <h1 className="text-gray-400">Warna Kuning & Hijau</h1>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="tersedia"
                type="text"
                placeholder="MKN"
                value={right.toUpperCase()}
                onChange={e => setRight(e.target.value.toUpperCase())}
                onSubmit={submitHandler}
              />
            </div>
          </div>
          <div className="w-full md:mb-0">
            <label className="md:text-lg block uppercase tracking-wide text-gray-700 text-xs font-bold my-2" htmlFor="tmengandung">
              Huruf Salah
            </label>
            <h1 className="text-gray-400">Warna Hitam</h1>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="tmengandung"
              type="text"
              placeholder="RST"
              value={wrong.toUpperCase()}
              onChange={e => setWrong(e.target.value.toUpperCase())}
              onSubmit={submitHandler}
            />
          </div>
        </div>
        {/* =============== Exact =============== */}
        <div className="flex items-center justify-center">
          <div className="space-y-6 px-2">
            <div className="-space-x-px flex flex items-center justify-center">
              <input name="input-1" value={input["input-1"]} maxLength={1} onChange={handleChange} className={classes.join(" ") + " rounded-l-md"} />
              <input name="input-2" value={input["input-2"]} maxLength={1} onChange={handleChange} className={classes.join(" ")} />
              <input name="input-3" value={input["input-3"]} maxLength={1} onChange={handleChange} className={classes.join(" ")} />
              <input name="input-4" value={input["input-4"]} maxLength={1} onChange={handleChange} className={classes.join(" ")} />
              <input name="input-5" value={input["input-5"]} maxLength={1} onChange={handleChange} className={classes.join(" ") + " rounded-r-md"} />
            </div>

            <div className="space-x-3">
              <input type="checkbox" name="keep" checked={keepHints} onChange={ e => setKeepHints(!keepHints)}/>
              <label htmlFor="keep">Keep hints</label>
            </div>

            <div
              className="flex justify-center"
            >
              <button
                name="ini-submit"
                type="submit"
                className="group relative w-1/2 md:w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={submitHandler}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {/* <div>
          <button className="bg-blue-400 rounded px-5 py-2 md:text-lg mb-3 md:hidden" onClick={submitHandler}>
            Cari
          </button>
        </div> */}
      </form>
    </>
  );
}

const mapStateToProps = state => {
  return {
    kbbi: state.kbbi
  }
}

export default connect(mapStateToProps)(Form);