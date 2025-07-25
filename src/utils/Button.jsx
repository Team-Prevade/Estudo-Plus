export default function Button({ text }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => alert('Go!')}
    >
      {text}
    </button>
  );
}
