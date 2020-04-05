// https://observablehq.com/@mbostock/exoplanets@73
export default function define(runtime, observer) {
  const main = runtime.module();

  main.variable(observer()).define(["d3","DOM","size","pack","data","color"], function(d3,DOM,size,pack,data,color)
{
  const svg = d3.select(DOM.svg(size, size))
      .style("width", "90%")
      .style("height", "auto");

  const circle = svg.selectAll("circle")
    .data(pack(data).descendants().slice(1))
    .enter().append("circle")
      .attr("r", d => d.r)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

  circle.filter(d => d.data)
      .attr("fill", d => color(d.data.Categorie))
    .append("title")
      .text(d => `${d.data.Nom}
      Type: ${d.data.Type} 
      Diamètre: ${isNaN(d.data.Diametre) ? "N/A" : `${d.data.Diametre} km`}
      Masse: ${isNaN(d.data.Masse) ? "N/A" : `${d.data.Masse} Kg`}`);

  

  return svg.node();
}
);
  main.variable(observer("pack")).define("pack", ["d3","size","data"], function(d3,size,data)
{
  const pack = d3.pack().size([size, size]).padding(5);
  
  const root = {children: data};
  return data => {
    return pack(d3.hierarchy(root)
      .sum(d => d.Diametre**0.5 )
      .sort(( b,a) => {
        return !a.children - !b.children
            || isNaN(a.data.Diametre) - isNaN(b.data.Diametre)
            || a.data.Diametre - b.data.Diametre;
      }));
  };
}
);
  main.variable(observer("size")).define("size", function(){return(
1000
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
    d3.scaleOrdinal().domain(data,d=>d.Categorie).range(["purple","gold", "blue", "green", "brown", "orange", "grey", "darkgreen", "pink", "red", "slateblue", "grey1"])
  
)});
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.csv("/data/data.csv", ({Nom, Diametre,Masse,Type,Categorie}) => ({Nom,Diametre: Diametre ? +Diametre : 0.001,Masse: Masse ? +Masse : null,Type,Categorie}))

)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
