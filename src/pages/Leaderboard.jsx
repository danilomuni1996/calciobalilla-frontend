import { useEffect, useState } from "react";
import { API_BASE } from "../api";

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const load = async () => {
    try {
      setLoading(true); setErr(null);
      const r = await fetch(`${API_BASE}/leaderboard`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      setRows(data);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{padding:16}}>
      <h2>Classifica</h2>
      <button onClick={load} disabled={loading}>
        {loading ? "Aggiorno..." : "Aggiorna"}
      </button>
      {err && <div style={{color:"crimson", marginTop:8}}>Errore: {err}</div>}
      <ol style={{marginTop:12, paddingLeft:20}}>
        {rows.map((p) => (
          <li key={p.id} style={{marginBottom:10, display:"flex", alignItems:"center", gap:8}}>
            {p.photo_url && (
              <img
                src={`${API_BASE}${p.photo_url}`}
                alt=""
                width={28}
                height={28}
                style={{borderRadius:"50%", objectFit:"cover"}}
              />
            )}
            <span>{p.name} — {p.points} pt</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

