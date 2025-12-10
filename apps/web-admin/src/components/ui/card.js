export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl p-4 shadow-lg w-full ${className}`}>
      {children}
    </div>
  );
}