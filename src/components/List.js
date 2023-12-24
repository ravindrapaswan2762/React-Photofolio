import styles from '../css/List.module.css';
import ImageAlbum from './ImageAlbum';

export function List({albums, toggle, handleToggle, handleAlbumToggle, dispalyImages, currImagesForSlidesHandle}){

    return (
        <div className={styles.container}>

            <div className={styles.upperBox}>
                <h4>Your Albums</h4>
                {toggle?<button onClick={handleToggle} id={styles.cancel}>Cancel</button>:
                <button onClick={handleToggle} id={styles.addAlbum}>Add album</button>}
            </div>

            <div className={styles.albumBox}>
                {albums && albums.map( (album, index)=>(
                    <ImageAlbum album={album} key={index} handleAlbumToggle={handleAlbumToggle}
                    dispalyImages={dispalyImages} index={index} currImagesForSlidesHandle={currImagesForSlidesHandle}
                    />
                ) )}
            </div>

        </div>
    )
}