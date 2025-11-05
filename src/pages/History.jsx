import { useState, useEffect } from "react";
import { API_BASE } from "../api";

export default function History() {
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const matchesResp = await fetch(`${API_BASE}/matches`);
      const playersResp = await fetch(`${API_BASE}/players`);
      setMatches(await matchesResp.json());
      setPlayers(await playersResp.json());
    } catch (e) {
      setErr("Failed to fetch");
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const playerName = id => players.find(p => p.id === id)?.name ?? `#${id}`;

  return (
    <div style={{ padding: 16 }}>
      <h2>Storico Partite</h2>
      <button onClick={load} disabled={loading}>
        {loading ? "Carico..." : "Ricarica"}
      </button>
      {err && <div style={{ color: "crimson", marginTop: 8 }}>Errore: {err}</div>}
      <ul style={{ marginTop: 12 }}>
        {matches.map((m) => (
          <li key={m.id} style={{ marginBottom: 10 }}>
            <div>
              {playerName(m.teamA_attacker_id)} + {playerName(m.teamA_goalkeeper_id)}
              {" vs "}
              {playerName(m.teamB_attacker_id)} + {playerName(m.teamB_goalkeeper_id)}
            </div>
            <div>
              Risultato: {m.score_a} - {m.score_b}
            </div>
            {m.created_at && (
              <div style={{ color: "#666", fontSize: 12 }}>
                Data: {new Date(m.created_at).toLocaleString("it-IT")}
              </div>
            )}
            <div style={{ fontSize: 12, color: "#333" }}>
              Match ID: {m.id}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
