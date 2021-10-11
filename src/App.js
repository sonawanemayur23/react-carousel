import {useState,useEffect} from 'react'
import  Carousel from './lib/components/Carousel';
import './App.css';

function App() {
  const [images, setImages] = useState();

  useEffect(() => {
    setImages(
      Array.from(Array(20).keys()).map((id) => ({
        id,
        url: `https://picsum.photos/1000?random=${id}`
      }))
    );
  }, []);

  return (
    <div >

        <Carousel images={images} />

       
    </div>
  );
}

export default App;
