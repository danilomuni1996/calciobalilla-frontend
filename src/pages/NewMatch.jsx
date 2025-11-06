import { API_BASE } from "../api";
import { useEffect, useState } from "react";

export default function NewMatch() {
  const [players, setPlayers] = useState([]);
  const [Aatt, setAatt] = useState("");
  const [Agoa, setAgoa] = useState("");
  const [Batt, setBatt] = useState("");
  const [Bgoa, setBgoa] = useState("");
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [result, setResult] = useState(null);

  // nuovi stati
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(true); // true finché non salvi

  useEffect(() => {
    fetch(`${API_BASE}/players`).then(r => r.json()).then(setPlayers);
  }, []);

  // wrapper che marca il form come "modificato" a ogni cambio
  const markDirty = (setter) => (e) => {
    setter(e.target.value);
    setIsDirty(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (isSubmitting || !isDirty) return; // doppia guardia

    setIsSubmitting(true);
    const payload = {
      teamA_attacker_id: Number(Aatt),
      teamA_goalkeeper_id: Number(Agoa),
      teamB_attacker_id: Number(Batt),
      teamB_goalkeeper_id: Number(Bgoa),
      score_a: Number(scoreA),
      score_b: Number(scoreB),
    };

    try {
      const res = await fetch(`${API_BASE}/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const m = await res.json();
      setResult(m);
      setIsDirty(false); // dopo un salvataggio, blocca finché non cambia qualcosa
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Nuova Partita</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <h4>Squadra A</h4>
        <label>Attaccante</label>
        <select value={Aatt} onChange={markDirty(setAatt)} required>
          <option value=""></option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <label>Portiere</label>
        <select value={Agoa} onChange={markDirty(setAgoa)} required>
          <option value=""></option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <h4>Squadra B</h4>
        <label>Attaccante</label>
        <select value={Batt} onChange={markDirty(setBatt)} required>
          <option value=""></option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <label>Portiere</label>
        <select value={Bgoa} onChange={markDirty(setBgoa)} required>
          <option value=""></option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <h4>Risultato</h4>
        <input type="number" value={scoreA} onChange={markDirty(setScoreA)} />
        <input type="number" value={scoreB} onChange={markDirty(setScoreB)} />

        <button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? "Salvataggio…" : (isDirty ? "Salva" : "Modifica un campo per salvare")}
        </button>
      </form>

      {result && (
        <>
          <h4>Partita salvata</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
