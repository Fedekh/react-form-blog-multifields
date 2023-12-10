export default function Toast({ text, backgroundColor = "bg-green-500" }) {
    return (
        <div
            id="toast-simple"
            className={`flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 ${backgroundColor} shadow dark:text-black-400 `}
            role="alert"
        >
            <h1 className="text-2xl font-normal">{text}</h1>
        </div>
    );
}
