
export default function MessageBubble({ own, text }) {
  return (
    <div
      className={`flex ${
        own ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-md px-6 py-4 rounded-3xl text-lg shadow

        ${
          own
            ? "bg-yellow-400 rounded-br-md"
            : "bg-white rounded-bl-md"
        }`}
      >
        {text}
      </div>
    </div>
  );
}