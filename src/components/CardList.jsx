import Card from "./Card";

export default function CardList({ spaces }) {
    return (
        <div className="bg-gray-900 p-8">
            {spaces.map((space) => (
                    <Card
                        key={space.id}
                        typeSpace={space.tipo_espacio.name}
                        name={space.nombre}
                        municipality={space.direccion.municipio}
                        photo={"/baluard.jpg"}
                        modalities={space.modalidades.map( modality => modality.nombre)}
                        score={space.puntuacion_total}
                        votes={space.votos_totales}
                    />
                ))
            }
        </div>
    );
}
