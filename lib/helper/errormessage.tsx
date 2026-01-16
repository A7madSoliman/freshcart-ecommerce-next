interface ErrorMessageProps {
  show?: boolean;
  message?: string;
}

export function ErrorMessage({ show, message }: ErrorMessageProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        show && message ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-red-500 text-sm">{message}</p>
    </div>
  );
}
