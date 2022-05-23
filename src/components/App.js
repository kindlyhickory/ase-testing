import '../styles/App.css';
import React, { useEffect, useRef, useState } from 'react';
import Filter from './Filter';
import data, { objects } from '../utils/constants';
import Graph from "./Graph";
import html2pdf from 'html2pdf.js';
import buttonStyles from "../styles/button.module.css";
import * as d3 from "d3"
// import { ReactDOM } from 'react';

function App() {
  const [state, setState] = useState({
    startDate: "2015-01-01",
    // endDate: new Date().toLocaleDateString().split('.').reverse().join('-'),
    endDate: "2028-01-01"
  })

  const [dates, setDates] = useState([]);
  const [objectList, setObjectList] = useState(['1']);
  const legendRef = useRef();

  useEffect(() => {
    const svg = d3.select(legendRef.current)
      .attr('width', 1500)
      .attr('height', 50)
      .attr('transform', 'translate(0, 10)')
      .style('background-color', 'none')

    svg.append("circle")
      .attr('cx', 8)
      .attr('cy', 8)
      .attr('r', 6)
      .attr('fill', 'blue');
    svg.append("circle")
      .attr('cx', 500)
      .attr('cy', 8)
      .attr('r', 6)
      .attr('fill', 'red');
    svg.append("circle")
      .attr('cx', 700)
      .attr('cy', 8)
      .attr('r', 6)
      .attr('fill', 'green');
    svg.append("circle")
      .attr('cx', 1000)
      .attr('cy', 8)
      .attr('r', 6)
      .attr('fill', 'grey');
    svg.append("text")
      .attr('x', 25)
      .attr('y', 12)
      .text(' - Даты, согласно контрактного графика')
    svg.append("text")
      .attr('x', 510)
      .attr('y', 12)
      .text(' - Срыв')
    svg.append("text")
      .attr('x', 710)
      .attr('y', 12)
      .text(' - Пройденные вехи в срок')
    svg.append("text")
      .attr('x', 1010)
      .attr('y', 12)
      .text(' - Прогноз')
  })

  function generatePDF() {
    const element = document.querySelector(".App");
    const opt = {
      filename: "report.pdf",
      jsPDF: { orientation: 'landscape' },
    }
    html2pdf().set(opt).from(element).save();
  }

  return (
    <>
      <button className={buttonStyles.button} onClick={generatePDF}>Сохранить в ПДФ</button>
      <div className="App">
        <Filter state={state} setState={setState} setDates={setDates} dates={dates} objects={objects} objectList={objectList} setObjectList={setObjectList}></Filter>
        <svg ref={legendRef}></svg>
        {objectList.map(objectId => (
          <Graph key={objectId} id={objectId} initData={data.filter(item => item.objectNum === objectId)} state={state} setState={setState} setDates={setDates} dates={dates} objects={objects} objectList={objectList} setObjectList={setObjectList}></Graph>
        ))}
      </div>

    </>
  );
}

export default App;
