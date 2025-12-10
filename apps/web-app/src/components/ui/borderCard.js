export default function borderCard({ children }) {
    return (
        <div className="bg-white border-l-4 border-primary rounded-2xl shadow-md py-3 px-4 w-full h-full">
            {children}
        </div>
    )
}