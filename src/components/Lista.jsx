import React from 'react';
import Button from "./Button";
import Modale from "./Modale";

export default function Lista({
    utentiTotali,
    modificaUtente,
    mostraModale,
    setModificaUtente,
    apriModale,
    chiudiModale,
    handleModificaUtente,
    handleEliminaUtente
}) {
    return (
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
                                {/* ... restante codice */}
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
    );
}
