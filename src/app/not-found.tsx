export default function NotFoundPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
      <section
        style={{
          width: "100%",
          maxWidth: "640px",
          borderRadius: "20px",
          padding: "32px",
          background: "#fff",
          boxShadow: "0 20px 60px rgba(17, 32, 50, 0.08)",
        }}
      >
        <h1 style={{ margin: "0 0 12px" }}>Page Not Found</h1>
        <p style={{ margin: 0 }}>The requested route is not part of the current BuddyScript build.</p>
      </section>
    </main>
  );
}
