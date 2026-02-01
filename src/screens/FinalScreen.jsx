import { useMemo, useState } from "react";

export default function FinalScreen({ answers, questions, onRestart }) {
  const [saidYes, setSaidYes] = useState(false);

  const summary = useMemo(() => {
    // Map answers by questionId for quick lookup
    const map = new Map(answers.map((a) => [a.questionId, a.choice]));
    return questions.map((q) => ({
      prompt: q.prompt,
      choice: map.get(q.id) ?? "(no answer)",
    }));
  }, [answers, questions]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {!saidYes ? (
          <>
            <h1 style={styles.title}>Results:</h1>
            <p style={styles.text}>You passed!!!! Yipppeee you're my valentine! Yahooo. Send me the screenshot of this page!</p>

            <div style={styles.summary}>
              {summary.map((row) => (
                <div key={row.prompt} style={styles.row}>
                  <div style={styles.q}>{row.prompt}</div>
                  <div style={styles.a}>{row.choice}</div>
                </div>
              ))}
            </div>


            <button style={styles.linkButton} onClick={onRestart}>
              restart
            </button>
          </>
        ) : (
          <>
            <h1 style={styles.title}>YAYYYYY 💖</h1>
            <p style={styles.text}>
              Best answers ever!!!
            </p>
            <div style={styles.heartWrap}>💘💘💘</div>

            <button style={styles.yes} onClick={onRestart}>
              Play again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "linear-gradient(135deg, #ffd6e8, #e7d6ff)",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  card: {
    width: "min(720px, 100%)",
    background: "white",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  },
  title: { margin: 0, fontSize: 34 },
  text: { marginTop: 10, marginBottom: 14, fontSize: 16, lineHeight: 1.4 },
  summary: {
    display: "grid",
    gap: 10,
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1px solid rgba(0,0,0,0.1)",
  },
  row: {
    display: "grid",
    gap: 6,
    padding: 12,
    borderRadius: 12,
    background: "rgba(0,0,0,0.03)",
  },
  q: { fontSize: 14, opacity: 0.75 },
  a: { fontSize: 16, fontWeight: 600 },
  bigAsk: { margin: "16px 0 10px", fontSize: 26 },
  buttons: { display: "flex", gap: 12 },
  yes: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 800,
    flex: 1,
  },
  no: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.2)",
    background: "white",
    cursor: "pointer",
    fontSize: 16,
    flex: 1,
  },
  linkButton: {
    marginTop: 14,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textDecoration: "underline",
    opacity: 0.8,
  },
  heartWrap: { fontSize: 36, margin: "16px 0" },
};
