import React, { useContext } from 'react';
import { SpacesContext } from '../contexts/SpacesContext';

export default function Comments(){
    const { spaces } = useContext(SpacesContext);

    const {nombre,comentarios} = spaces.data;

    return(
        <>
            <h2>Tots els comentaris dels nostres usuaris</h2>

            {spaces.map((space) => (
                <div key={space.id}>
                    <p>{space.name}</p>
                    {/* Aquí puedes agregar lógica específica para comentarios */}
                </div>
            ))}
          
        </>
    )
}

