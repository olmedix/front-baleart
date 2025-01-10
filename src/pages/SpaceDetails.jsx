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
            
        </div>
    );
}