export default function StartScreen({ onStart }) {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>The Hailey Ultimate Valintine Quiz!</h1>
        <p style={styles.text}>
          You must pass the quiz cheese.
        </p>

        <button style={styles.button} onClick={onStart}>
          Start
        </button>
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
    width: "min(520px, 100%)",
    background: "white",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  title: { margin: 0, fontSize: 34 },
  text: { marginTop: 12, marginBottom: 18, fontSize: 16, lineHeight: 1.4 },
  button: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
  },
};
