
export default function Modal({ utente, alClick, clickElimina }) {


    return (
        <div
            className={`fixed overflow-y-auto overflow-x-hidden inset-0 z-50 justify-center items-center w-full h-screen bg-zinc bg-opacity-50`}
        >
            <div className="relative p-4 w-full max-w-md mx-auto my-8 bg-violet-400 rounded-lg shadow">
                <button
                    onClick={alClick}
                    className="absolute top-3 right-3 text-orange-400 bg-transparent hover:bg-orange-200 hover:text-orange-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="p-4 text-center">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Sei sicuro di voler eliminare {utente.nome} {utente.cognome}</h3>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={clickElimina}
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Conferma
                        </button>
                        <button
                            onClick={alClick}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
