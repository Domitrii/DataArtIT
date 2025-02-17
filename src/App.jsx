import { GrFormNext } from "react-icons/gr";
import s from './App.module.css'

function App() {

  return (
    <section className={s.fBody}>
      <div className={s.topSection}>
        <h1>RanDay.jokes</h1>
        <p>Welcome to RanDay.jokes, where we will publish jokes to make you laugh</p>
      </div>
      <div className={s.mainSection}>
        <div className={s.jokeBlock}>
          Why did the baker go to therapy?
          Because every time he tried to make dough, he just kept kneading validation from everyone around him!
        </div>
        <span className={s.blockBtn}>
          <p>Next joke</p>
          <button className={s.nextBtn}><GrFormNext className={s.iconBtn} /></button>
        </span>
      </div>
    </section>
  )
}

export default App
