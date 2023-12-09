export default function ({ text }) {

    return (

        <div id="toast-simple" className="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 w-max" role="alert">
            <h1 className="text-2xl font-normal">{text}</h1>
        </div>


    );
}