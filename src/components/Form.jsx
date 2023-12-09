import { useState } from 'react';
import Button from './Button';
import Modale from './Modale';
import ToastMessage from './ToastMessage';


export default function Form() {

    const situazioneIniziale = {
        nome: '',
        cognome: ''
    };


    const [id, setId] = useState(0);
    const [nuovoUtente, setNuovoUtente] = useState(situazioneIniziale);
    const [modificaUtente, setModificaUtente] = useState({});
    const [mostraModale, setMostraModale] = useState(false);
    const [utentiTotali, setUtentiTotali] = useState([]);
    const [toastMessage, setToastMessage] = useState('');

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
            cognome: nuovoUtente.cognome
        };

        setUtentiTotali(quelliGiaEsistenti => [...quelliGiaEsistenti, newUser]);
        setId(id + 1);
        setNuovoUtente(situazioneIniziale);
        testoModale(`Utente ${newUser.nome} creato con successo`);
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



    return (
        <div>

            {toastMessage && <ToastMessage text={toastMessage} />}
            <div className='flex gap-4'>

                <form className='max-w-max' onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>

                    <div className="mb-5">
                        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <input
                            onChange={(e) => setNuovoUtente(prevState => ({ ...prevState, nome: e.target.value }))}
                            value={nuovoUtente.nome}
                            id="nome"
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
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Inserisci cognome"
                            required />
                    </div>

                    <div className='flex gap-3'>
                        <Button colore="blue" nome="submit" tipo='submit' />
                        <Button colore="red" nome="reset" tipo='reset' />
                    </div>


                </form>

                <ul>
                    {!utentiTotali.length ?
                        <h2 className='text-red-700'>Nessun utente registrato</h2>
                        :
                        <h2 className='text-red-700'>Lista partecipanti : {utentiTotali.length}</h2>
                    }

                    {utentiTotali.map((utente) => (
                        <li key={utente.id}>
                            <div className='flex gap-4 justify-between my-3'>
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
                                            {utente.nome} - {utente.cognome}
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

            </div>
        </div >
    );
}