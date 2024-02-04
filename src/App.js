import { select, range } from "d3";
import { useEffect } from "react";

function App() {
  const { innerHeight: height, innerWidth: width } = window;

  useEffect(() => {
    const svg = select("#root").append("svg");
    svg.attr("width", width).attr("height", height);

    const n = 100;
    
    svg
      .selectAll("rect.horizontal")
      .data(range(n))
      .join("rect")
      .attr("y", (d) => d * 20)
      .attr("width", width)
      .attr("height", 10)
      .attr("class", "horizontal")
      .attr("mask", "url(#circle-mask)");

    const circleMask = svg.append("mask").attr("id", "circle-mask");
    const smallRadius = width > height ? height / 3 : width / 3;
    circleMask
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", smallRadius)
      .attr("fill", "white");

    svg
      .selectAll("rect.vertical")
      .data(range(n))
      .join("rect")
      .attr("x", (d) => d * 20)
      .attr("width", 10)
      .attr("height", height)
      .attr("class", "vertical")
      .attr("mask", "url(#mask2)");

    const mask2 = svg.append("mask").attr("id", "mask2");
    mask2
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "white");
      // appended a circle to stop the layout crashing of the circle mask
      // appended after the rect only works
    mask2
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", smallRadius)
      .attr("fill", "black");
  }, [height, width]);

  return null;
}

export default App;
