
const render = (el, pEl) => {
  const dom = el.type === 'TEXT_ELEMENT'
  ? document.createTextNode(el.props.value)
  : document.createElement(el.type)

  if (el.type !== 'TEXT_ELEMENT') {
    Object.keys(el.props).forEach(key => {
      if (key!=='children') {
        dom[key] = el.props[key]
      }
    })
  }

  if(pEl !== null) {
    pEl.append(dom)
  }

  el.props.children.forEach(child => {
    render(child, dom)
  })
}

const createRoot = (dom) => {
  return {
    render: function (App) {
      render(App, dom)
    }
  }
}


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

createRoot(document.getElementById('app')).render(container)