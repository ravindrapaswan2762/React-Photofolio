import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/ImageAlbum.module.css';
import img from '../albums.png';

const ImageAlbum = ({album, handleAlbumToggle, dispalyImages, index, currImagesForSlidesHandle}) => {

  const onClickHandle = () => {
    handleAlbumToggle();
    dispalyImages(index);
    currImagesForSlidesHandle(album);
  }
  
  return (
    <div className={styles.container} onClick={onClickHandle}>
        <img src={img} className={styles.img} alt='img' />
        <span className={styles.text}>{album.text}</span>
    </div>
  );
};


export default ImageAlbum;
