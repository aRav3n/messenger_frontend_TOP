export default function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="errorMessage">
      <p>It looks like there was an error:</p>
      <p>{error.message}</p>
    </div>
  );
}
