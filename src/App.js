import { select, range, symbol, symbols } from "d3";
import { useEffect } from "react";

function App() {
  const { innerHeight: height, innerWidth: width } = window;

  useEffect(() => {
    const svg = select("#root").append("svg");
    svg.attr("width", width).attr("height", height);

    const n = 100;

    svg
      .append("g")
      .selectAll("rect")
      .data(range(n))
      .join("rect")
      .attr("y", (d) => d * 20)
      .attr("width", width)
      .attr("height", 10)
      .attr("mask", "url(#mask1)");

    svg
      .append("g")
      .selectAll("rect")
      .data(range(width/10))
      .join("rect")
      .attr("x", (d) => d * 20)
      .attr("width", 10)
      .attr("height", height)
      .attr("mask", "url(#mask2)");
    const renderMask = (selection, id, inverted) => {
      const mask = selection.append("mask").attr("id", id);
      mask
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", inverted ? "white" : "black");
      mask
        .selectAll("g")
        .data(range(symbols.length))
        .join((enter) =>
          enter
            .append("g")
            .attr("transform",d=>`translate(${d*width/6},${height/2})`)
            .append("path")
            .attr("d", (d) => symbol(symbols[d], width * 20)())
            .attr("fill", inverted ? "black" : "white")
        );
    };
    renderMask(svg, "mask1", true);
    renderMask(svg, "mask2", false);
  }, [height, width]);

  return null;
}

export default App;
