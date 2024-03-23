import React from '../core/React.js'
import ReactDOM from '../core/ReactDOM.js'


const textEl = {
  type: 'TEXT_ELEMENT',
  props: {
    value: 'hello world',
    children: [],
  }
}
const btn = {
  type: 'button',
  props: {
    onclick: function () { alert('click button')},
    children: [
      textEl
    ]
  }
}
const container = {
  type: 'div',
  props: {
    id: 'container',
    children: [
      textEl,
      btn
    ]
  }
}

ReactDOM.createRoot(document.getElementById('app')).render(container)