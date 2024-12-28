

export default function Card({ typeSpace,name,municipality,photo,modalities,score,votes }) {

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i key={i} className={` ${i < score ? 'fa-solid fa-star' : 'fa-regular fa-star'}`} />
            );
        }
        return stars;
    };

    return (
        <article>
            <div>
                <img src={photo} alt={name} />
                <div>
                    <p>{typeSpace}</p>
                    <h3>{name}</h3>
                    <p>{municipality}</p>
                </div>
            </div>

            <div>
                <h4>{`${typeSpace}, ${name}, ubacicad en la localitat de ${municipality}`}</h4>
            </div>

            <div>
                <h4>Modalitats: 
                    {modalities.map((modality) => (
                        <span>{` ${modality} `}</span>
                        
                    ))}
                </h4>
            </div>

            <div>
                <h4>{renderStars()} 
                    <span>
                        <i className="fa-solid fa-hashtag"></i>
                        {votes} vots
                    </span> 
                </h4>
            </div>
        </article>
    );
    }