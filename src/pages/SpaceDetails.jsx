import { useLocation} from "react-router-dom";


export default function SpaceDetails(){
    const location = useLocation();
    const { space } = location.state;
    
    return (
        <div>
            <h1>{space.name}</h1>
            <p>Tipus de espai: {space.typeSpace}</p>
            <p>Municipi: {space.municipality}</p>
            <img src={space.photo} alt={space.name} />
            <p>Modalitats:</p>
            <ul>
                {space.modalities.map((modality, index) => (
                    <li key={index}>{modality}</li>
                ))}
            </ul>
            
            <section>
                <h2>Comentaris</h2>
                {space.comments.map((comentario, index) => (
                    <div key={index}>
                        <p>{comentario.comentario}</p>
                        <p>Puntuació: {comentario.puntuacion}</p>
                        <p>Usuari: {comentario.usuario}</p>
                        <div>
                            { comentario.imagenes.length > 0 &&
                                comentario.imagenes.map((imagen, index) => (
                                    <img 
                                        key={index} 
                                        src={imagen.url_imagen} 
                                        alt={(comentario.usuario)} 
                                        onError={(e) => { 
                                            e.target.onerror = null;
                                            e.target.src = "/imgs/modalities/escultura.jpg";
                                        }}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </section>
            

            
            
        </div>
    );
}