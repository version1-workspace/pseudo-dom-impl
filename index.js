const dom = require("./lib");

/* Sample HTML
 *
 * <div class="container">
 *   <h1>Psuedo DOM</h1>
 *   <div class="row">
 *     <input id="input-form" type="text" class="input" value="1" />
 *   </div>
 * </div>
 *
 */

function getDOM() {
  const input = new dom.HTMLInputElement({
    attributes: {
      id: "input-form",
      class: "input",
      type: "text",
      value: "1",
    },
  });

  const row = new dom.HTMLDivElement({
    attributes: {
      class: "row",
    },
    children: [input],
  });

  const h1 = new dom.HTMLHeadingElement({
    tagName: "h1",
    innerText: "Psuedo DOM",
  });

  return new dom.HTMLDivElement({
    attributes: {
      class: "container",
    },
    children: [h1, row],
  });
}

const root = getDOM();
console.log("[Rendering whole DOM as string]");
console.log(root.toString());
console.log("");
console.log("");
console.log("");


console.log("[Append child to container]");
const newEle = new dom.HTMLDivElement({
  attributes: {
    class: "row",
  },
  innerText: "New Row",
});
root.append(newEle);
console.log(root.toString());
console.log("");
console.log("");
console.log("");
console.log("[Search Element]");
console.log("getElementById (input-form):");
console.log(root.getElementById("input-form").toString());
console.log("getElementsByTagName (input):")
console.log(root.getElementsByTagName("input").length);
console.log("getElementsByClassName (.row):")
console.log(root.getElementsByClassName("row").length);
console.log("querySelector (.row):")
console.log(root.querySelector(".row").toString());
console.log(
  "nested querySelector (.row > input):")
console.log(
  root.querySelector(".row").querySelector("input").toString(),
);
console.log("querySelectorAll (.row):")
console.log(root.querySelectorAll(".row").length);
