import { useState } from "react";

export default function QuizScreen({
  question,
  index,
  total,
  currentAnswer,
  onAnswer,
  onBack,
  onRestart,
  canGoBack,
}) {
  const [selected, setSelected] = useState(currentAnswer ?? "");

  // keep local selection in sync when question changes
  // (simple approach: reset when index changes by keying the component in App)
  // We'll do it here manually:
  if (currentAnswer !== null && selected === "" && currentAnswer !== "") {
    // (rare) if we landed on a question that already had an answer
    setSelected(currentAnswer);
  }

  function handleNext() {
    if (!selected) return;
    onAnswer(selected);
    setSelected(""); // reset for next question
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topRow}>
          <div style={styles.progress}>
            Question {index + 1} / {total}
          </div>
          <button style={styles.linkButton} onClick={onRestart}>
            restart
          </button>
        </div>

        <h2 style={styles.prompt}>{question.prompt}</h2>

        <div style={styles.options}>
          {question.options.map((opt) => {
            const active = selected === opt;
            return (
              <button
                key={opt}
                style={{
                  ...styles.option,
                  ...(active ? styles.optionActive : null),
                }}
                onClick={() => setSelected(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div style={styles.bottomRow}>
          <button
            style={{ ...styles.secondary, opacity: canGoBack ? 1 : 0.5 }}
            onClick={onBack}
            disabled={!canGoBack}
          >
            Back
          </button>

          <button
            style={{ ...styles.primary, opacity: selected ? 1 : 0.5 }}
            onClick={handleNext}
            disabled={!selected}
          >
            {index === total - 1 ? "Finish" : "Next"}
          </button>
        </div>
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
    width: "min(620px, 100%)",
    background: "white",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progress: { fontSize: 14, opacity: 0.75 },
  linkButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textDecoration: "underline",
    opacity: 0.8,
  },
  prompt: { marginTop: 6, marginBottom: 16, fontSize: 22 },
  options: { display: "grid", gap: 10, marginBottom: 18 },
  option: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    background: "white",
    cursor: "pointer",
    textAlign: "left",
    fontSize: 16,
  },
  optionActive: {
    border: "2px solid rgba(0,0,0,0.6)",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },
  secondary: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.2)",
    background: "white",
    cursor: "pointer",
    fontSize: 15,
    flex: 1,
  },
  primary: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
    flex: 1,
  },
};
