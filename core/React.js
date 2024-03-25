// 虚拟dom转真实dom
let container = null;
let rootFiber = null;
const render = (vDom, _container) => {
  container = _container
  rootFiber = nextFiber = {
    type: vDom.type,
    props: vDom.props,
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
  if (typeof _type === 'function') {
    const functionDom = _type();
    const vDom = {
      type: functionDom.type,
      props: {
        ...functionDom.props,
        children: functionDom.props.children ? functionDom.props.children.map((child) => {
          return typeof child !== "object" ? createTextVDom(child) : child
        }) : []
      }
    }
    console.log(functionDom, vDom);
    return vDom;
  }
  return {
    type: _type,
    props: {
      ..._props,
      children: _children.map((child) => {
        return typeof child !== "object" ? createTextVDom(child) : child
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
  if (!nextFiber) {
    container.append(rootFiber.dom);
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
