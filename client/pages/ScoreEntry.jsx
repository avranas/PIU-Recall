import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ScoreEntry() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [greats, setGreats] = useState();
  const [goods, setGoods] = useState();
  const [bads, setBads] = useState();
  const [misses, setMisses] = useState();
  const [totalScore, setTotalScore] = useState();
  const [stagePass, setStagePass] = useState(true);
  const [scoreId, setScoreId] = useState(null);
  const chartId = searchParams.get('chart_id'); //get from query string

  // TODO: BAD NOT DRY CODE FIX THIS
  useEffect(() => {
    async function goToLoginPageIfNotLoggedIn() {
      try {
        const response = await fetch('/users');
        if (response.status !== 200) {
          navigate('/login-page');
        }
        const json = await response.json();
        // Get the user's score for this song
        const userId = json.id;
        console.log('fetch url', `/scores/${chartId}/${userId}`);
        const score = await fetch(`/scores/${chartId}/${userId}`);
        // Do this if a score was found
        console.log('score', score);
        if (score.status === 200) {
          const scoreJson = await score.json();
          console.log('score', scoreJson);
          //Auto fill form
          setGreats(scoreJson.greats);
          setGoods(scoreJson.goods);
          setBads(scoreJson.bads);
          setMisses(scoreJson.misses);
          setTotalScore(scoreJson.total_score);
          setStagePass(scoreJson.stage_pass);
          console.log("scoreJson.id", scoreJson.id)
          setScoreId(scoreJson.id);
        }
      } catch (err) {
        console.log(err);
      }
    }
    goToLoginPageIfNotLoggedIn();
  }, []);

  async function submitNewScore() {
    if (
      greats === undefined ||
      goods === undefined ||
      bads === undefined ||
      misses === undefined ||
      totalScore === undefined
    )
      return;
    const body = {
      greats,
      goods,
      bads,
      misses,
      stage_pass: stagePass,
      total_score: totalScore,
      
    }
    console.log(body)
    try {
      // If a score was loaded, update that score
      // Get user ID
      const response = await fetch('/users');
      if (response.status !== 200) {
        navigate('/login-page');
      }
      const json = await response.json();
      // Get the user's score for this song
      const userId = json.id;
      console.log("scoreId", scoreId);
      if (scoreId) {
        const response = await fetch(`/scores/${scoreId}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

      }
      // If not, create a new score
      else {
        body.chart_id = chartId;
        const response = await fetch(`/scores`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      }
      navigate('/song-list')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <label htmlFor="greats">Greats</label>
      <br />
      <input
        type="text"
        id="greats"
        value={greats}
        onChange={(e) => setGreats(e.target.value)}
      ></input>
      <br />

      <label htmlFor="goods">Goods</label>
      <br />
      <input
        type="text"
        id="goods"
        value={goods}
        onChange={(e) => setGoods(e.target.value)}
      ></input>
      <br />

      <label htmlFor="bads">Bads</label>
      <br />
      <input
        type="text"
        id="bads"
        value={bads}
        onChange={(e) => setBads(e.target.value)}
      ></input>
      <br />

      <label htmlFor="misses">Misses</label>
      <br />
      <input
        type="text"
        id="misses"
        value={misses}
        onChange={(e) => setMisses(e.target.value)}
      ></input>
      <br />

      <label htmlFor="total-score">Total Score</label>
      <br />
      <input
        type="text"
        id="total-score"
        value={totalScore}
        onChange={(e) => setTotalScore(e.target.value)}
      ></input>
      <br />

      <label htmlFor="stage-pass">Stage Pass</label>
      <br />
      <input
        type="checkbox"
        id="stage-pass"
        checked={stagePass}
        onChange={(e) => setStagePass(e.target.checked)}
      ></input>
      <br />
      <button onClick={submitNewScore}>Submit</button>
    </div>
  );
}

export default ScoreEntry;
