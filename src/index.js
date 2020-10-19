import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
function generateCodeFromObject(obj) {
  //return a code generated string

  const jsonToJSX = (data) => {
    let style = "";
    if (Object.keys(data.style).length !== 0) {
      let propArray = [];
      for (let key in data.style) {
        if (data.style.hasOwnProperty(key)) {
          let nKey = key.split("-");
          if (nKey.length > 1) {
            nKey[1] = nKey[1].charAt(0).toUpperCase() + nKey[1].slice(1);
          }
          nKey = nKey.join("");
          propArray.push(
            `${nKey}:${
              Number.isInteger(data.style[key])
                ? `${data.style[key]}`
                : `"${data.style[key]}"`
            }`
          );
        }
      }
      let propString = propArray.join(", ");
      style = `style={{${propString}}}`;
    }

    if (data.children.length === 0) {
      return `
          <${data.name} ${style}/>
          `;
    } else {
      let childArray = (data.children || []).map((childData) => {
        return jsonToJSX(childData);
      });
      let childString = childArray.join(" ");

      return `
          <${data.name} ${style}>
            ${childString}
          <${data.name}/>
          `;
    }
  };

  return jsonToJSX(JSON.parse(obj)).toString();
}

module.exports = generateCodeFromObject;

// ReactDOM.render(<App />, document.getElementById("root"));
