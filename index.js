const dom = require("./lib");

/* Sample HTML
 *
 * <div class="container">
 *   <h1>Psuedo DOM</h1>
 *   <div class="row">
 *     <input type="text" class="input" value="1" />
 *   </div>
 * </div>
 *
 */

function render() {
  const input = new dom.HTMLInputElement({
    className: "input",
    type: "text",
    value: "1",
  });

  const row = new dom.HTMLDivElement({
    className: "row",
    children: [input],
  });

  const h1 = new dom.HTMLHeadingElement({
    tagName: "h1",
    innerText: "Psuedo DOM",
  });

  const container = new dom.HTMLDivElement({
    className: "container",
    children: [h1, row],
  });

   console.log(container.toString());
}

render();
