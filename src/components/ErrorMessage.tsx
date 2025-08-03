const ErrorMessage = ({msg}: { msg?: string | null }) => {
  if (!msg) return null;
  return (
    <p className="text-red-500 text-sm">{msg}</p>
  );
};

export default ErrorMessage;