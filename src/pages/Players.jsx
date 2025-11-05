import { useEffect, useState } from "react";
import { API_BASE } from "../api";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("attaccante");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const load = () =>
    fetch(`${API_BASE}/players`).then(r => r.json()).then(setPlayers);

  useEffect(() => { load(); }, []);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const addPlayer = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("preferred_role", role);
    if (file) fd.append("photo", file);
    const res = await fetch(`${API_BASE}/players`, { method: "POST", body: fd });
    if (!res.ok) { alert("Errore creazione giocatore"); return; }
    setName(""); setRole("attaccante"); setFile(null); setPreview(null);
    load();
  };

  return (
    <div style={{padding:16}}>
      <h2>Giocatori</h2>
      <form onSubmit={addPlayer} style={{display:"grid", gap:8, maxWidth:420}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" required />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="attaccante">Attaccante</option>
          <option value="portiere">Portiere</option>
        </select>
        <input type="file" accept="image/*" onChange={onFile} />
        {preview && <img src={preview} width={100} height={100} alt="preview" />}
        <button type="submit">Aggiungi</button>
      </form>
      <hr/>
      <ul>
        {players.map(p=>(
          <li key={p.id}>
            {p.photo_url && <img src={`${API_BASE}${p.photo_url}`} width={28} height={28} alt="" style={{verticalAlign:"middle", marginRight:8}}/>}
            {p.name} — {p.preferred_role ?? "-"} — {p.points} pt
          </li>
        ))}
      </ul>
    </div>
  );
}
