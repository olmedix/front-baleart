

export default function CardList({ spaces }) {
    return (
        <div className="card-list">
            {spaces.map((space, index) => (
                <Card
                    key={index}
                    typeSpace={space.typeSpace}
                    name={space.name}
                    municipality={space.municipality}
                    photo={space.photo}
                    modalities={space.modalities}
                    score={space.score}
                    votes={space.votes}
                />
            ))}
        </div>
    );
}