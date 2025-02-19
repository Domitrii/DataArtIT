import { GrFormNext } from "react-icons/gr";
import s from './App.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [header, setHeader] = useState('')
  const [response, setResponse] = useState('');
  const [emojis, setEmojis] = useState([])
  const [votes, setVotes] = useState([])
  const [jokeId, setJokeId] = useState('');


  const getData = async () => {
    try {
      const result = await axios.get('https://dataartback.onrender.com/api/');

      setJokeId(result.data._id);
      setHeader(result.data.question)
      setResponse(result.data.answer)
      setEmojis(result.data.availableVotes)
      setVotes(result.data.votes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleVote = async (jokeId, voteType, emojiNumb) => {
    const data = { jokeId, voteType };

    setVotes(prevVotes => {
      return prevVotes.map((vote, index) =>
        index === emojiNumb ? { ...vote, value: vote.value + 1 } : vote
      );
    });

    try {
      await axios.post('https://dataartback.onrender.com/api/updateVotes/', data);
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className={s.fBody}>
      <div className={s.topSection}>
        <h1>RanDay.jokes</h1>
        <p>Welcome to RanDay.jokes, where we will publish jokes to make you laugh</p>
      </div>
      <div className={s.mainSection}>
        <div>
          <div className={s.jokeBlock}>
            <div className={s.jokeQ}>{header}</div>
            <div>{response}</div>
          </div>
          <div className={s.emojis}>
          {emojis.map((emoji, index) => (
            <button 
              className={s.emoji} 
              onClick={() => handleVote(jokeId, emoji, index)} 
              key={index}
            >
              {emoji}: {votes[index]?.value || 0}
            </button>
          ))}

          </div>
        </div>
        <span className={s.blockBtn}>
          <p>Next joke</p>
          <button onClick={getData} className={s.nextBtn}><GrFormNext className={s.iconBtn} /></button>
        </span>
      </div>
    </section>
  )
}

export default App
