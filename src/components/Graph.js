import React, { useRef, useEffect } from "react";
import * as d3 from "d3"
import graphStyles from "../styles/graph.module.css"

const Graph = (props) => {

  const initData = props.initData
  const dimensions = { width: 1650, height: 175 }
  const chart = useRef()


  useEffect(() => {
    const svg = d3.select(chart.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .style('background-color', '#e4e4e4')

    const x = d3.scaleTime()
      .domain([d3.timeParse('%Y-%m-%d')(props.state.startDate), d3.timeParse('%Y-%m-%d')(props.state.endDate)])
      .range([0, dimensions.width - 100])

    svg.append('g')
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(20, 150)');

    const selectCircle = svg.selectAll(".circle")
      .data(initData);

    const selectText = svg.selectAll(".text")
      .data(initData);

    svg.append('path')
      .datum(initData)
      .attr('d', d3.line()
        .x(function (d) { return x(d3.timeParse('%Y-%m-%d')(d.factDate)) })
        .y(100)
      )
      .attr("fill", "none")
      .attr("stroke", "#c70469")
      .attr("stroke-width", 2);


    svg.append('path')
      .datum(initData)
      .attr('d', d3.line()
        .x(function (d) { return x(d3.timeParse('%Y-%m-%d')(d.plannedDate)) })
        .y(50)
      )
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    selectCircle.enter().append("circle")
      .attr("r", 6)
      .attr("cx", function (d) { return x(d3.timeParse('%Y-%m-%d')(d.plannedDate)) })
      .attr("cy", 50)
      .attr("fill", 'blue')

    selectText.enter().append("text")
      .attr("x", function (d) { return x(d3.timeParse('%Y-%m-%d')(d.plannedDate)) })
      .attr("y", 50)
      .attr("dy", -5)
      .text(function (d) { return d.plannedDate })

    selectCircle.enter().append("circle")
      .attr("r", 6)
      .attr("cx", function (d) { return x(d3.timeParse('%Y-%m-%d')(d.factDate)) })
      .attr("cy", 100)
      .attr("fill", function (d) {
        if (d3.timeParse('%Y-%m-%d')(d.factDate) > new Date()) {
          return 'grey'
        } else {
          if (d3.timeParse('%Y-%m-%d')(d.factDate) <= d3.timeParse('%Y-%m-%d')(d.plannedDate)) {
            return 'green'
          } else if (d3.timeParse('%Y-%m-%d')(d.factDate) > d3.timeParse('%Y-%m-%d')(d.plannedDate)) {
            return 'red'
          }
        }
      })

    selectText.enter().append("text")
      .attr("x", function (d) { return x(d3.timeParse('%Y-%m-%d')(d.factDate)) })
      .attr("y", 100)
      .attr("dy", -5)
      .text(function (d) { return d.factDate })

    selectText.enter().append("text")
      .attr("x", function (d) { return x(d3.timeParse('%Y-%m-%d')(d.factDate)) })
      .attr("y", 120)
      .text(function (d) { return d.label })

    selectText.enter().append("text")
      .attr("x", function (d) { return x(d3.timeParse('%Y-%m-%d')(d.plannedDate)) })
      .attr("y", 70)
      .text(function (d) { return d.label })


    return () => {
      d3.select("g").remove();
      d3.selectAll("circle").remove();
      d3.selectAll("text").remove();
      d3.selectAll("path").remove();
    }

  });


  return (
    <>
      <div>
        <h3 className={graphStyles.title}>Объект {props.id}</h3>
        <svg ref={chart}></svg>
      </div>
    </>
  )
}

export default Graph;