import{ useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../Slider.css';

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { SpacesContext } from '../contexts/SpacesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useContext,useEffect } from 'react';


export default function Home() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { language } = useLanguage();
  const { spaces, loading, error } = useContext(SpacesContext);
  const [photos, setPhotos] = useState([]);
  const [loadPhotos, setLoadPhotos] = useState(true);
  const [errorPhotos, setErrorPhotos] = useState(null);
  
  const fetchPhotos = async () =>{
  
      try {
        setLoadPhotos(true);
          const response = await fetch('/spacesPhotos.json');
          const data = await response.json();
          setPhotos(data); 
      } catch (error) {
        setErrorPhotos("Error al cargar las fotos");
      }finally{
        setLoadPhotos(false);
      }
    }
    useEffect(() => {
        fetchPhotos();
  }, []);

  const bestSpaces = () => {
    const espacios = spaces.filter(space => space.puntuacion_total > 2);
    return espacios;
  }


  if (loading || loadPhotos) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (errorPhotos) return <p>{errorPhotos}</p>;


  return (
    <div className="bg-gray-800 mt-8 p-6 flex flex-col items-center rounded-tl-3xl rounded-tr-3xl ">

        <h1 className="text-5xl font-bold text-green-700 text-center my-8 pt-7 rounded-t-lg">
          {language === "ca" ? "Espais millors puntuats" : language === "es" ? "Espacios mejor puntuados" : "Best rated spaces"}
        </h1>

        <Swiper
            style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={10}
            navigation={true}
            loop={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2"
            autoplay={{ delay: 3000 }}
        >

        {bestSpaces().map((space) => (
          photos
            .filter((photo) => photo.registre === space.numero_registro)
            .map((photo) => (
              <SwiperSlide key={space.id}>
                <div className='w-4/5 mx-auto'>
                  <h2 className='text-3xl text-white font-bold mb-4'>
                    <span className="pl-2 text-green-500 mr-3 shadow-xl text-shadow" >
                      {space.puntuacion_total}
                      <i className="fa-solid fa-star "></i>
                    </span> 
                    {space.nombre}
                  </h2>
                  <img className='w-full' src={photo.image} alt="Espacio" />
                </div>
                
              </SwiperSlide>
            ))
        ))}

      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        loop={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >

        {bestSpaces().map((space) => (
          photos
            .filter((photo) => photo.registre === space.numero_registro)
            .map((photo) => (
              <SwiperSlide key={space.id}>
                <img
                  style={{height: '200px'}} 
                  src={photo.image} 
                  alt="Espacio" 
                />
              </SwiperSlide>
            ))
        ))}

      </Swiper>
      </div>
  );
}
