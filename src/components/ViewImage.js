import styles from '../css/ViewImage.module.css';
import { useEffect, useState } from 'react';

export function ViewImage({viewImageToggleHandle, imagesUrls, currImgIdx}){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect( ()=>{
        setCurrentImageIndex(currImgIdx);
    }, [currImgIdx] );

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesUrls.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? imagesUrls.length - 1 : prevIndex - 1
        );
    };

    return(
        <div className={styles.viewContainer}>
            <button id={styles.cross} onClick={()=>viewImageToggleHandle(false)}> {`X`} </button>
            <button id={styles.left} onClick={prevImage}> {`<`} </button>
            <img src={imagesUrls[currentImageIndex]} alt='image' />
            <button id={styles.right} onClick={nextImage}>{`>`}</button>
        </div>
    )
}