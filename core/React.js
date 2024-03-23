
// 虚拟dom转真实dom
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

// 创建虚拟dom
const createElement = (_type, _props, ..._children) => {
  return {
    type: _type,
    props: {
      ..._props,
      children,
    }
  }
}

const React = {
  render,
  createElement,
}

export default React