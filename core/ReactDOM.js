import React from './React.js'

const createRoot = (dom) => {
  return {
    render: function (App) {
      React.render(App(), dom)
    }
  }
}

const ReactDOM = {
  createRoot,
}

export default ReactDOM;