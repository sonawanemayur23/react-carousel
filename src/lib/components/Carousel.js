import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const ImageCarousel = ({ images,height,width }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState([]);
  const carouselItemsRef = useRef([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length
      );

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectedImageChange = (newIdx) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth"
        });
      }
    }
  };

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  return (
    <div className="carousel-container">
      <LazyLoadImage
        className="selected-image"
        alt={selectedImage?.alt}
        effect="blur"
        src={selectedImage?.url}
        height={height || "100%"}
        width={width || "100%"}
      />
      <div className="carousel">
        <div className="carousel__images">
          {images &&
            images.map((image, idx) => (
              <span ref={(el) => (carouselItemsRef.current[idx] = el)}>
                <LazyLoadImage
                  alt={image?.alt}
                  effect="blur"
                  src={image?.url}
                  className={`carousel__image ${selectedImageIndex === idx && "carousel__image-selected"
                    }`}
                  onClick={() => handleSelectedImageChange(idx)}
                  
                />
              </span>
            ))}
        </div>
        <span
          className="carousel__button carousel__button-left"
          onClick={handleLeftClick}
        />

        <span
          className="carousel__button carousel__button-right"
          onClick={handleRightClick}
        />
      </div>
    </div>
  );
};

export default ImageCarousel;