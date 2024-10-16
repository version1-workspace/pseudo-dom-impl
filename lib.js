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
  constructor({ tagName, id, className, attributes, children }) {
    super();
    this.tagName = tagName;
    this.attributes = { id, className, ...(attributes || {}) };
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

  querySelector(selector) {
    return this.children.find((node) => node.tagName === selector);
  }

  querySelectorAll(selector) {
    return this.children.filter((node) => node.tagName === selector);
  }
}

class HTMLElement extends Element {
  constructor({ innerText, tagName, id, className, attributes, children }) {
    super({ tagName, id, className, attributes, children });
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
  constructor({ innerText, id, className, attributes, children }) {
    super({ innerText, tagName: "div", id, className, attributes, children });
  }
}

class HTMLInputElement extends HTMLElement {
  constructor({ innerText, id, className, value, type, attributes, children }) {
    super({ innerText, tagName: "input", id, className, attributes, children });
    this.setAttribute("type", type);
    this.setAttribute("value", value);
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
  constructor({ innerText, id, tagName, className, attributes, children }) {
    super({ innerText, tagName, id, className, attributes, children });
  }
}

module.exports = {
  Element,
  HTMLElement,
  HTMLDivElement,
  HTMLInputElement,
  HTMLHeadingElement,
};
