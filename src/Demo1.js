// import React from 'react'

// function Demo1(props) {
//   return (
//     <div>Demo1:{props.var1}</div>
//   )
// }

// export default Demo1


import React from 'react'

function Demo1({var1}) {
  return (
    // <div>{var1.username}{var1.password}</div>
    <div>
        {var1.map((i, index)=>(
            <li key={index}>
                {i.username}
                {i.password}
            </li>
        ))}
    </div>
  )
}

export default Demo1