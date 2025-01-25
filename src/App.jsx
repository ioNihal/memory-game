import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Success from './components/Success';

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [page, setPage] = useState(2);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=12`);
      const data = await response.json();
      const cardsData = data.map((item) => ({
        id: item.id,
        url: item.download_url,
        caption: item.author,
      }));
      setCards(cardsData);
    };
    fetchImages();
  }, [page]);

  useEffect(() => {
    if (score === 12) {
      const key = setTimeout(() => {
        setSuccess(true)
      }, 1000)
      return () => clearTimeout(key)
    }
  }, [score])

 const handleChangeImage = () => {
  setPage(page + 1)
 }



  return (
    <div>
      <h1>Memory Game</h1>
      <div className='wrapper'>
        <div className='score-container'>
          <span>Score: {score}</span>
          <span>Best Score: {bestScore}</span>
        </div>
        <button onClick={handleChangeImage}>Change Images: {page - 1}</button>
      </div>
      {
        success &&
        <Success page={page} setPage={setPage} setSuccess={setSuccess} setScore={setScore} /> || (
          <div className="cards-container">
            <Card cards={cards} bestScore={bestScore} score={score} setBestScore={setBestScore} setScore={setScore} />
          </div>
        )
      }
      <p>
        "<span>MindMaze: The Ultimate Memory Challenge!</span>"<br />
        "Step into MindMaze, the game that tests your focus and memory like never before!
        With 12 cards to choose from, your goal is to click on unique cards in sequence and
        build your highest score. But beware—clicking the same card twice in a row will reset the game!
        Challenge yourself to outsmart the maze and climb to the top of the leaderboard. How far can your memory take you?"
      </p>
    </div>

  )
}

export default App;
