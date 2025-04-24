export default function ErrorMessage({ error }) {
  if (!error) return null;
  let message;
  if (typeof error === "object") {
    if ("message" in error) {
      message = error.message;
    } else if ("data" in error) {
      if ("message" in error.data) {
        message = error.data.message;
      } else {
        message = "There was an unknown error thrown";
      }
    }
  }
  return (
    <div className="errorMessage">
      <p>It looks like there was an error:</p>

      <p>{message}</p>
    </div>
  );
}
