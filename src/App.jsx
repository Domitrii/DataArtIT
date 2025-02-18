import { GrFormNext } from "react-icons/gr";
import s from './App.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [header, setHeader] = useState('')
  const [response, setResponse] = useState('');
  const [emojis, setEmojis] = useState([])
  const [emojiRes, setEmojiRes] = useState([])
  const [numb , setNumb] = useState(0)

  const getData = async () => {
    try {
      const result = await axios.get('http://localhost:7070/api/');

      setHeader(result.data.question)
      setResponse(result.data.answer)


      setEmojis(result.data.availableVotes)
      for(let i = 0; i < 3; i++){
        emojiRes[i] = 
        <button 
        className={s.emoji} 
        onClick={() => 
          handleVote(result.data._id, emojis[i], i)
        } key={i}>
          {emojis[i]}: {result.data.votes[i].value}
        </button>
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleVote = async (jokeId, voteType, emojiNumb) => {
    const data = { jokeId, voteType };

    try {
      const result = await axios.post('http://localhost:7070/api/updateVotes/', data);
      console.log(result.data.votes[emojiNumb].value)
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
            <div>{header}</div>
            <div>{response}</div>
          </div>
          <div className={s.emojis}>
            {emojiRes}
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
