const helper = require('./helper');

class Node {
  constructor({ childNodes } = {}) {
    this.childNodes = childNodes || [];
    this.parentNode = null;
  }

  appendChild(node) {
    this.childNodes.push(node);
    node.parentNode = this;
  }

  get depth() {
    let parent = this.parentNode;
    let generation = 0;

    while (parent) {
      parent = parent.parentNode;
      generation++;
    }

    return generation;
  }
}

class Element extends Node {
  constructor({ tagName, attributes, children }) {
    super();
    this.tagName = tagName;
    this.attributes = attributes || {};
    this.children = [];
    children?.forEach((child) => this.append(child));
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  append(ele) {
    this.children.push(ele);
    this.appendChild(ele);
  }

  getElementById(id) {
    for (const node of this.children) {
      if (node.id === id) {
        return node;
      }

      const found = node.getElementById(id);
      if (found) {
        return found;
      }
    }
  }

  getElementsByTagName(tagName) {
    return this.children.reduce((acc, node) => {
      if (node.tagName === tagName) {
        return [...acc, node];
      }

      return [...acc, ...node.getElementsByTagName(tagName)];
    },[])
  }

  getElementsByClassName(target) {
    return this.children.reduce((acc, node) => {
      const _className = node.getAttribute("class");
      if (_className === target) {
        return [...acc, node];
      }

      return [...acc, ...node.getElementsByClassName(target)];
    },[])
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0];
  }

  querySelectorAll(selector) {
    if (selector.startsWith(".")) {
      return this.getElementsByClassName(selector.slice(1)) || [];
    }

    if (selector.startsWith("#")) {
      const ele = this.getElementById(selector.slice(1));
      return ele ? [ele] : [];
    }

    return this.getElementsByTagName(selector);
  }
}

class HTMLElement extends Element {
  constructor({ innerText, tagName, attributes, children }) {
    super({ tagName, attributes, children });
    this.innerText = innerText;
  }

  set id(value) {
    this.setAttribute("id", value);
  }

  get id() {
    return this.getAttribute("id");
  }

  set className(value) {
    this.setAttribute("class", value);
  }

  get className() {
    return this.getAttribute("class");
  }

  toString() {
    const attr = helper.stringifyAttributes(this.attributes);

    return [
      helper.indent(`<${this.tagName}${attr ? " " + attr : ""}>`, this.depth),
      helper.indent(this.innerText, this.depth + 1),
      this.children.map((child) => child.toString()).join("\n"),
      helper.indent(`</${this.tagName}>`, this.depth),
    ]
      .filter((it) => it)
      .join("\n");
  }
}

class HTMLDivElement extends HTMLElement {
  constructor({ innerText, attributes, children }) {
    super({ innerText, tagName: "div", attributes, children });
  }
}

class HTMLInputElement extends HTMLElement {
  constructor({ innerText, attributes, children }) {
    super({ innerText, tagName: "input", attributes, children });
  }

  set value(value) {
    this.setAttribute("value", value);
  }

  get value() {
    return this.getAttribute("value");
  }

  set type(value) {
    this.setAttribute("type", value);
  }

  get type() {
    return this.getAttribute("type");
  }
}

class HTMLHeadingElement extends HTMLElement {
  constructor({ innerText, tagName, attributes, children }) {
    super({ innerText, tagName, attributes, children });
  }
}

module.exports = {
  HTMLDivElement,
  HTMLInputElement,
  HTMLHeadingElement,
};
