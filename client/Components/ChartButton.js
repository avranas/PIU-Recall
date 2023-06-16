import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ChartButton(props) {
  const navigate = useNavigate();
  const styleColorMap = {
    "Single": "rgba(218,0,0,1)",
    "Double": "rgba(0,218,23,1)",
    "Co-Op": "rgba(200,170,0,1)",
    "Single-Performance": "rgba(241,0,255,1)",
    "Double-Performance": "rgba(0,221,255,1)"
  }
  function goToScorePage() {
    navigate(`/score-entry?chart_id=${props.chart_id}`);
  }

  //TODO LAST: Make scores display on the song list
  useEffect(() => {
    async function getScore() {
      // const chartId = props.id;
      // //TODO with all this I should be able to query the server and get
      // //the score I want
      // const result = await fetch(`/scores/${chartId}`);
      // console.log(result);
    }
    getScore();
  },[])

  return (
    <div onClick={goToScorePage}className="chart-button" style={{background: styleColorMap[props.style]}}>
      <p>{props.rating}</p>
      <p>{props.style}</p>
      <div className="score">{props.score ? props.score : 0}</div>
    </div>
  )
}

export default ChartButton;