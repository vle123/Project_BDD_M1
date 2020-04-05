//d3 = require("d3@5");
data = JSON.parse(document.getElementById("json").innerHTML);
size = 100;
console.log(data);
color = d3.scaleQuantize()
  .domain(d3.extent(data, d => d.radius))
  .range(["#156b87", "#876315", "#543510", "#872815"]);


    const pack = d3.pack().size([size, size]).padding(5);
    const planets = [{children: data}];
    const root = {children: planets};
    pack => {
      return pack(d3.hierarchy(root)
        .sum(d => d.radius * d.radius)
        .sort());
    };

function test(){
  const svg = d3.select("svg")
      .style("width", "100%")
      .style("height", "auto");

  const circle = svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("r", d => d.r)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

  circle.filter(d => d.data)
      .attr("fill", d => color(d.data.Masse))
    .append("title")
      .text(d => `${d.data.Nom}
Planet Masse: ${d.data.Masse} EU
Star distance: ${isNaN(d.data.Masse) ? "N/A" : `${d.data.Masse} pc`}`);

  circle.filter(d => d.children)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5);

  return svg.node();
}
test();

  

  