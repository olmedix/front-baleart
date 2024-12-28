

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
        <article className="w-4/5 py-5 mt-5 bg-slate-400 shadow-xl shadow-stone-500 rounded-2xl items-center justify-center">
            <section className="w-4/5 mx-auto relative">
                <div className="my-1 py-5 ">
                <img
                    className="rounded-2xl shadow-lg shadow-green-800" 
                    src={photo} 
                    alt={name} />
                </div>
                
                <div className="absolute top-5 left-0 bg-transparent text-left text-white p-2">
                    <p>{typeSpace}</p>
                    <h3>{name}</h3>
                    <p>{municipality}</p>
                </div>
            </section>

            <section className="flex w-4/5 mx-auto font-bold">

                <div className="ml-3">
                    <ul className="text-left">
                        <li>
                            Tipus de espai: <span className="font-normal">{typeSpace}</span> 
                        </li>
                        <li>
                            Nom: <span className="font-normal">{name}</span>
                        </li>
                        <li>
                            Municipi: <span className="font-normal">{municipality}</span>
                        </li>
                        <li>
                            <ul className="list-disc">
                                Modalitats:
                                    {modalities.map((modality) => (
                                        <li className="font-normal" key={modality}>{`${modality}`}</li>
                                    ))}
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="ml-auto text-right mr-2">
                    <p className="text-green-800">{renderStars()} 
                        <span className="pl-2">
                            <i className="fa-solid fa-hashtag"></i>
                             {votes} vots
                        </span> 
                    </p>
                </div>

            </section>

            
        </article>
    );
    }