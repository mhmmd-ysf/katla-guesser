import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";

function Result({
  kamus,
  clear,
  }) {
  const navigate = useNavigate()
  function back () {
    clear()
    navigate("/")
  }
    // console.log({ kamus, dari: "result" })
  return (
    <div>
      {/* <Link className="my-2 text-blue-800" to={"/"}>← Back</Link> */}
      <p className="my-2 text-blue-800 cursor-pointer" onClick={_ => back()}>← Back</p>
      {
        // loading ?
        //   <div className="p-2 animate-pulse">
        //     Result Loading...
        //   </div>
        //   :
          <div className="grid grid-cols-4 md:grid-cols-10">
            {kamus
              .map(item => {
                return (
                  <div className="p-2" key={item}>
                    <button className="p-2 bg-gray-300 text-blue-900 rounded font-bold">{item.toUpperCase()}</button>
                  </div>
                )
              })}
          </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // kamus: state.kbbi
  }
}

export default connect(mapStateToProps)(Result)