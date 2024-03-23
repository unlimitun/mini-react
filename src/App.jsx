import React from '../core/React'

export default function App() {
  const clickHandle = () => {
    alert('click')
  }
  return (
    <div>
      <span style="color: red">hello</span>
      <span style="color: green">world</span>
      <button onclick={clickHandle}>click me</button>
    </div>
  )
}