// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import { useState } from 'react';
import { useLanguage } from "../contexts/LanguageContext";

export function ShowComment({space}){
    const [pagination,setPagination] = useState(2);
    const [commentsNumber,setCommentsNumber] = useState(space.comentarios.length);
    const { language } = useLanguage();
    
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i key={i} className={` ${i < space.score || i < space.puntuacion_total ? 'fa-solid fa-star' : 'fa-regular fa-star'} text-green-700`} />
            );
        }
        return stars;
    };

    const handleClick = () =>{
        setPagination(pagination + 2);
        setCommentsNumber(commentsNumber - 2);
        console.log(pagination);
    }

    return(
        <>
                {space.comentarios.slice(0,pagination).map((comentario, index) => (

                    <div key={index}
                         className="flex p-5 my-5 text-left border-b border-gray-300 text-wrap"
                    >
                        <div className="px-7 font-semibold flex flex-col items-center justify-center">
                            <p className="rounded-full p-2 text-white bg-green-600 border border-green-700 w-12 h-12 flex items-center justify-center">
                                {comentario.usuario.charAt(0).toUpperCase()}
                            </p>
                            <p className="">
                                {comentario.usuario}  
                            </p>

                            <p className="whitespace-nowrap">{renderStars()}</p>
                        </div>

                        <div>
                        <p className="text-gray-700">
                            <span>
                                { language === "ca" ? "Data del comentari:" : language === "es" ? "Fecha del comentario:" : "Comment date:" }    
                            </span> 
                            {new Date(comentario.fecha_creacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <p className="font-bold text-xl mb-4">{comentario.comentario}</p>

                        {comentario.imagenes.length > 0 &&
                        <div className="overflow-hidden w-full">
                            <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                              rotate: 50,
                              stretch: 0,
                              depth: 100,
                              modifier: 1,
                              slideShadows: true,
                            }}
                             pagination={true}
                             modules={[EffectCoverflow, Pagination]}
                             style={{
                                overflow: 'hidden',
                                width: '100%',
                                maxWidth: '600px',
                                paddingTop: '50px',
                                paddingBottom: '50px',
                              }}
                            >
                             {
                              comentario.imagenes.map((imagen, index) => (
                                 <SwiperSlide
                                  key={index}
                                   style={{
                                     backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                     width: '300px',
                                    height: '300px',
                                  }}
                                >
                                  <img
                                   src={imagen.url_imagen}
                                   alt={comentario.usuario}
                                    style={{ display: 'block', 
                                        width: '100%'}}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                     e.target.src = '/imgs/modalities/escultura.jpg';
                                    }}
                                  />
                                 </SwiperSlide>
                               ))}
                            </Swiper>
                            
                            </div>
}
                        </div>
                            
                    </div>

                    
                ))}


                { commentsNumber > 2 &&
                <div className='flex justify-center'>
                <button
                    className="text-white bg-green-600 border-2 border-white mt-3 py-2 px-5 mb-5 rounded-full font-semibold transition duration-400 ease-in-out hover:bg-green-800 hover:text-white"
                    onClick={handleClick}>
                        { language === "ca" ? "Més comentaris ..." : language === "es" ? "Más comentarios ..." : "More comments ..." }
                </button>
                </div>
                }
                
            </>
    )
}