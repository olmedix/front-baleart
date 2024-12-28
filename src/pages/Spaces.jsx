import Card from "../components/Card";

export default function Spaces(){
    return(
        <>

        <Card 
            typeSpace="Museo" 
            name="Es baluart" 
            municipality="Palma" 
            photo="/baluard.jpg"
            modalities={["Danza", "Teatro", "Música"]} 
            score={2} 
            votes={6}
        />

         </>
    )
}