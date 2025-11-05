import { useState } from "react";
import Players from "./pages/Players.jsx";
import NewMatch from "./pages/NewMatch.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import History from "./pages/History.jsx";


export default function App() {
  const [page, setPage] = useState("players");
  return (
    <div>
      <nav style={{display:"flex", gap:12, padding:12, flexWrap:"wrap"}}>
        <button onClick={()=>setPage("players")}>Giocatori</button>
        <button onClick={()=>setPage("newmatch")}>Nuova Partita</button>
        <button onClick={()=>setPage("leaderboard")}>Classifica</button>
        <button onClick={()=>setPage("history")}>Storico</button>
      </nav>
      {page === "players" && <Players/>}
      {page === "newmatch" && <NewMatch/>}
      {page === "leaderboard" && <Leaderboard/>}
      {page === "history" && <History/>}
    </div>
  );
}
