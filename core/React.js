// 虚拟dom转真实dom
const render = (el, pEl) => {
  console.log(el, pEl)
  const dom =
    el.type === "TEXT_ELEMENT"
      ? document.createTextNode(el.props.nodeValue)
      : document.createElement(el.type);

  if (el.type !== "TEXT_ELEMENT") {
    Object.keys(el.props).forEach((key) => {
      if (key !== "children") {
        dom[key] = el.props[key];
      }
    });
  }

  if (pEl !== null) {
    pEl.append(dom);
  }

  el.props.children.forEach((child) => {
    render(child, dom);
  });
};
// 创建文本节点
const createTextNode = (text) => {
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
        return typeof child === "string" ? createTextNode(child) : child
      }),
    },
  };
};

const React = {
  render,
  createElement,
};

export default React;
