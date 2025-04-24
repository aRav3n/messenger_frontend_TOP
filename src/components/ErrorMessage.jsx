export default function ErrorMessage({ error }) {
  if (!error) return null;
  console.log(error);
  return (
    <div className="errorMessage">
      <p>It looks like there was an error:</p>

      <p>{error.message}</p>
    </div>
  );
}
