function indent(v, depth) {
  if (!v) {
    return ""
  }

  return "  ".repeat(depth) + v;
}

function stringifyAttributes(attributes) {
  return Object.keys(attributes)
    .filter((key) => attributes[key])
    .map((key) => {
      if (key === "className") {
        return `class="${attributes[key]}"`;
      }

      return `${key}="${attributes[key]}"`;
    })
    .join(" ");
}


module.exports = {
  indent,
  stringifyAttributes,
}
