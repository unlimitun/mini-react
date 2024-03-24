// 虚拟dom转真实dom
const render = (vDom, container) => {
  nextFiber = {
    type: vDom.type,
    props: vDom.props,
    parent: {
      dom: container
    }
  }
  requestIdleCallback(workLoop)
};
const createDom = (fiber) => {
    return fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode(fiber.props.nodeValue)
      : document.createElement(fiber.type);
}
const createTextVDom = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
};
// 创建虚拟dom
const createElement = (_type, _props, ..._children) => {
  console.log(_type, _props, _children);
  return {
    type: _type,
    props: {
      ..._props,
      children: _children.map((child) => {
        return typeof child === "string" ? createTextVDom(child) : child
      }),
    },
  };
};

let nextFiber = null

const workLoop = (deadLine) => {
  while(nextFiber) {
    if (deadLine.timeRemaining() < 1) {
      break;
    }
    nextFiber = performFiber(nextFiber)
  }
  requestIdleCallback(workLoop)
}

// 渲染一个dom,并处理好指针
const performFiber = (fiber) => {
  fiber.dom = createDom(fiber)
  if(fiber.parent) {
    fiber.parent.dom.append(fiber.dom)
  }
  if (fiber.type !== 'TEXT_ELEMENT') {
    Object.keys(fiber.props).forEach(key => {
      if (key !== 'children') {
        fiber.dom[key] = fiber.props[key]
      }
    })
  }
  if (fiber.props.children.length > 0) {
    let prevChild = null
    fiber.props.children.forEach((child, index) => {
      const newFiber = {
        type: child.type,
        dom: null,
        child: null,
        silbing: null,
        parent: fiber,
        props: child.props
      }
      if(index === 0) {
        fiber.child = newFiber
      } else {
        prevChild.sibling = newFiber 
      }
      prevChild = newFiber
    })
  }
  if(fiber.child) {
    return fiber.child
  }
  if(fiber.sibling){
    return fiber.sibling
  }
  if(fiber.parent) {
    return fiber.parent.sibling
  }
}
const React = {
  render,
  createElement,
};

export default React;
