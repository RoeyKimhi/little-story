import AppLayout from "./features/layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome to LittleStory</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start creating your next story by clicking the Create Story button
          above.
        </p>
      </section>
    </AppLayout>
  );
}

export default App;
