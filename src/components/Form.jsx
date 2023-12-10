import { useState, useEffect } from 'react';
import Button from './Button';
import Modale from './Modale';
import ToastMessage from './ToastMessage';


export default function Form() {

    const situazioneIniziale = {
        nome: '',
        cognome: '',
        isDeveloper: false,
        paese: '',
        tecnologie: []
    };


    const [id, setId] = useState(0);
    const [nuovoUtente, setNuovoUtente] = useState(situazioneIniziale);
    const [modificaUtente, setModificaUtente] = useState({});
    const [mostraModale, setMostraModale] = useState(false);
    const [utentiTotali, setUtentiTotali] = useState([]);
    const [toastMessage, setToastMessage] = useState('');

    const tecnologieDisponibili = ['Vue', 'php', 'react', 'laravel'];

    //tasto reset
    function handleReset() {
        setNuovoUtente(situazioneIniziale);
        setModificaUtente({});

    }

    function apriModale() {
        setMostraModale(true);
    };

    function chiudiModale() {
        setMostraModale(false);
    };


    function testoModale(text) {
        setToastMessage(text);
    }

    //aggiungi utente
    function handleSubmit(e) {
        e.preventDefault();
        if (!nuovoUtente.nome || !nuovoUtente.cognome) return;

        setModificaUtente({});

        const newUser = {
            id: id + 1,
            nome: nuovoUtente.nome,
            cognome: nuovoUtente.cognome,
            isDeveloper: nuovoUtente.isDeveloper,
            paese: nuovoUtente.paese,
            tecnologie: nuovoUtente.tecnologie,
        };

        setUtentiTotali((quelliGiaEsistenti) => [...quelliGiaEsistenti, newUser]);
        setId(id + 1);
        setNuovoUtente(situazioneIniziale);
        testoModale(`Utente ${newUser.nome} creato con successo`);
    }

    //checkbox multiple
    function handleCheckboxChange(e, tecnologia) {
        const isChecked = e.target.checked;

        setNuovoUtente((prev) => {
            // Seleziona tecnologie esistenti o crea un array vuoto se non ci sono tecnologie
            const tecnologiePrecedenti = prev.tecnologie || [];

            if (isChecked) {
                // Aggiungi la tecnologia se la checkbox è selezionata
                return { ...prev, tecnologie: [...tecnologiePrecedenti, tecnologia] };
            } else {
                // Rimuovi la tecnologia se la checkbox non è selezionata
                return { ...prev, tecnologie: tecnologiePrecedenti.filter((item) => item !== tecnologia) };
            }
        });
    }

    function handleCheckboxChangeModifica(e, tecnologia) {
        const isChecked = e.target.checked;

        setModificaUtente((prev) => {
            const tecnologiePrecedenti = prev.tecnologie || [];

            if (isChecked) {
                return { ...prev, tecnologie: [...tecnologiePrecedenti, tecnologia] };
            } else {
                return { ...prev, tecnologie: tecnologiePrecedenti.filter((item) => item !== tecnologia) };
            }
        });
    }




    function handleModificaUtente(id) {
        const utenteDaModificare = utentiTotali.find((utente) => utente.id === id);

        if (!utenteDaModificare) {
            console.log("L'utente non esiste");
            return;
        }

        setModificaUtente(utenteDaModificare);
    }

    function confermaModifica() {
        if (modificaUtente) {

            const utenteModificato = { ...modificaUtente };

            utenteModificato.nome = modificaUtente.nome;
            utenteModificato.cognome = modificaUtente.cognome;

            // Aggiorna la lista degli utenti
            const nuoviUtenti = utentiTotali.map((utente) =>
                utente.id === utenteModificato.id ? utenteModificato : utente
            );

            setUtentiTotali(nuoviUtenti);
            testoModale(`Utente ${utenteModificato.nome} modificato con successo`);

            setModificaUtente(null);
        }
    }


    //elimina   
    function handleEliminaUtente(id) {
        setModificaUtente({});

        const user = utentiTotali.find((elemento) => elemento.id === id);

        if (!user) {
            console.log("L'utente non esiste");
            return;
        }

        const newListaUtenti = utentiTotali.filter((elemento) => elemento.id !== id);
        console.log("Nuova lista utenti:", newListaUtenti);

        setUtentiTotali(newListaUtenti);
        setMostraModale(false);
        testoModale(`Utente ${user.nome} eliminato con successo`);
    }

    // Nascondere il toast dopo 2 secondi
    useEffect(() => {
        if (toastMessage) {
            const timeoutId = setTimeout(() => {
                setToastMessage('');
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [toastMessage]);



    return (
        <div>

            {toastMessage && <ToastMessage text={toastMessage} />}
            <div className=''>

                <form className='max-w-max' onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>

                    <div className="mb-5">
                        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <input
                            onChange={(e) => setNuovoUtente(prevState => ({ ...prevState, nome: e.target.value }))}
                            value={nuovoUtente.nome}
                            id="nome"
                            name='nome'
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Inserisci nome"
                            required />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="cognome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cognome</label>
                        <input
                            onChange={(e) => setNuovoUtente(prevState => ({ ...prevState, cognome: e.target.value }))}
                            value={nuovoUtente.cognome}
                            id="cognome"
                            name='cognome'
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Inserisci cognome"
                            required />
                    </div>

                    <div className="mb-5 ">
                        <label htmlFor="isDeveloper" className="block text-sm font-medium text-gray-900 dark:text-white">
                            <input
                                className='mr-4'
                                onChange={(e) => setNuovoUtente(prevState => ({ ...prevState, isDeveloper: e.target.checked }))}
                                checked={nuovoUtente.isDeveloper}
                                type="checkbox"
                                name="isDeveloper"
                                id="isDeveloper"
                            />
                            E' uno sviluppatore? </label>
                    </div>


                    {/* Select */}
                    <div className="mb-5">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Scegli un paese</label>
                        <select
                            id="countries"
                            onChange={(e) => setNuovoUtente(prevState => ({ ...prevState, paese: e.target.value }))}
                            value={nuovoUtente.paese}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                            <option value="">Scegli un paese</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                    </div>

                    {/* Checkbox multiple*/}
                    <div className="mb-5">
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Tecnologie:</h3>
                        <ul className="items-center px-3 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {tecnologieDisponibili.map((tecnologia) => {
                                return (
                                    <li key={tecnologia} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input
                                                id={`${tecnologia}-checkbox-list`}
                                                type="checkbox"
                                                value={tecnologia}
                                                checked={nuovoUtente.tecnologie.includes(tecnologia)}
                                                onChange={(e) => handleCheckboxChange(e, tecnologia)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor={`${tecnologia}-checkbox-list`}
                                                className="w-full p-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tecnologia}</label>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className='flex gap-3'>
                        <Button colore="blue" nome="submit" tipo='submit' />
                        <Button colore="red" nome="reset" tipo='reset' />
                    </div>


                </form>

                <ul>
                    <h2 className='text-red-700 mt-4'>
                        {!utentiTotali.length ?
                            ' Nessun utente registrato' : `Lista partecipanti : ${utentiTotali.length}`
                        }
                    </h2>
                    {utentiTotali.map((utente) => (
                        <li key={utente.id}>
                            <div className='mt-4'>
                                {modificaUtente && modificaUtente.id === utente.id ? (
                                    <>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            type="text"
                                            value={modificaUtente.nome}
                                            onChange={(e) => setModificaUtente((prev) => ({ ...prev, nome: e.target.value }))}
                                        />
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            type="text"
                                            value={modificaUtente.cognome}
                                            onChange={(e) => setModificaUtente((prev) => ({ ...prev, cognome: e.target.value }))}
                                        />

                                        <div >
                                            <label htmlFor="isDeveloper" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E' uno sviluppatore?</label>
                                            <input
                                                onChange={(e) => setModificaUtente(prevState => ({ ...prevState, isDeveloper: e.target.checked }))}
                                                checked={modificaUtente.isDeveloper}
                                                type="checkbox"
                                                name="isDeveloper"
                                                id="isDeveloper"
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Scegli un paese</label>
                                            <select
                                                id="countries"
                                                onChange={(e) => setModificaUtente(prevState => ({ ...prevState, paese: e.target.value }))}
                                                value={modificaUtente.paese}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                            >
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                            </select>
                                        </div>

                                        {/* Checkbox multiple*/}
                                        <div className="mb-5">
                                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Tecnologie:</h3>
                                            <ul className="items-center px-3 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                {tecnologieDisponibili.map((tecnologia, i) => (
                                                    <li key={i} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                        <div className="flex items-center ps-3">
                                                            <input
                                                                id={`${tecnologia}-checkbox-list`}
                                                                type="checkbox"
                                                                value={tecnologia}
                                                                checked={modificaUtente.tecnologie.includes(tecnologia)}
                                                                onChange={(e) => handleCheckboxChangeModifica(e, tecnologia)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor={`${tecnologia}-checkbox-list`}
                                                                className="w-full p-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tecnologia}</label>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Button
                                            alClick={() => confermaModifica()}
                                            colore="green"
                                            nome="conferma"
                                        />
                                        <Button
                                            alClick={() => setModificaUtente({})}
                                            colore="red"
                                            nome="Annulla"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            {utente.nome} - {utente.cognome} - {utente.isDeveloper ? 'E\' un dev' : 'Non è un dev'} - viene da {(utente.paese)} e
                                            {utente.tecnologie.length > 0 ? ` conosce ${utente.tecnologie.join(', ')}` : " Non conosce na sega"}
                                        </p>


                                        {mostraModale &&
                                            <Modale
                                                isOpen={true}
                                                utente={utente}
                                                alClick={chiudiModale}
                                                clickElimina={() => handleEliminaUtente(utente.id)}
                                            />}
                                        <div className='flex gap-3'>

                                            <Button
                                                alClick={() => handleModificaUtente(utente.id)}
                                                colore="green"
                                                nome="modifica"
                                            />
                                            <Button
                                                alClick={apriModale}
                                                colore="red"
                                                nome="elimina"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

            </div >
        </div >
    );
}