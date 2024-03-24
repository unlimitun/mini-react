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
      <div>
        hello
        <div>
          hello2
          <div>
            hello3
            <span>hello4</span>
            <span>hello5</span>
            <div>
              hello6
              <span>hello7</span>
              <span>hello8</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}