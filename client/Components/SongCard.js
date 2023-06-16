import React, { useState, useEffect } from 'react';
import ChartButton from './ChartButton';
import { v4 as uuidv4 } from 'uuid';

//TODO: Get env variables working with React!!
const serverUrl = 'http://localhost:3000/';
console.log("serverUrl", serverUrl)

function SongCard(props) {
  const [charts, setCharts] = useState();

  useEffect(() => {
    setCharts(
      props.charts.map((chart) => {
        return (
          <ChartButton
            key={uuidv4()}
            chart_id={chart.id}
            style={chart.style}
            rating={chart.rating}
          />
        );
      })
    );
  }, []);
  return (
    <div className="song-card">
      {console.log(`${serverUrl}/images/${props.banner_img}`)}
      <img src={`${serverUrl}/images/${props.banner_img}`} className="banner-image"></img>
      <div>
        <p><strong>Song Title</strong></p>
        <p>{props.title}</p>
      </div>
      <div>
        <p><strong>Artist</strong></p>
        <p>{props.artist}</p>
      </div>
      {charts}
    </div>
  );
}
export default SongCard;
