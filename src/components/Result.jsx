import React from 'react'
import { connect } from 'react-redux'

function Result({
  kamus,
  }) {
    console.log({ kamus, dari: "result" })
  return (
    <div>
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