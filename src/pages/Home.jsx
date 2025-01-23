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
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { SpacesContext } from '../contexts/SpacesContext';
import { useContext,useEffect } from 'react';



export default function Home() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
    <>
        <h1 className="text-3xl font-bold text-center my-4">Home</h1>

        <Swiper
            style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={10}
            navigation={true}
            loop={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
        >

        {bestSpaces().map((space) => (
          photos
            .filter((photo) => photo.registre === space.numero_registro)
            .map((photo) => (
              <SwiperSlide key={space.id}>
                <img src={photo.image} alt="Espacio" />
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
                <img src={photo.image} alt="Espacio" />
              </SwiperSlide>
            ))
        ))}

      </Swiper>
      </>
  );
}
