export default function Button({ alClick, tipo = 'button', nome, colore }) {
    return (
        <button
            type={tipo}
            className={`text-white bg-${colore}-700 hover:bg-${colore}-800 focus:ring-4
                focus:outline-none focus:ring-${colore}-300 font-medium rounded-lg text-sm w-full 
                sm:w-auto px-5 py-2.5 text-center dark:bg-${colore}-600 dark:hover:bg-${colore}-700 dark:focus:ring-${colore}-800`}
            onClick={alClick}
        >
            {nome}
        </button>
    );
}
