import styles from "../css/AlbumDetails.module.css";
import back from '../statics/images/back.png';
import search from '../statics/images/search.png';
import { ImageForm } from "./ImageForm";
import { PhotoCard } from "./PhotoCard";
import { UpdateImageForm } from "./UpdateImageForm";
import { ViewImage } from "./ViewImage";
import { SearchBar } from "./SearchBar";
import cross from '../statics/images/cross.png';
import { useEffect } from "react";

export function AlbumDetails({
    addImageFormToggle,
    handleImageFormToggle,

    handleAlbumToggle,
    currentAlbumOBJ,
    addNewImgToAlbum,
    deleteImgfromAlbum,

    updateImgFormToggle,
    updateImgFormToggleHandle,
    updateImgInAlbum,
    currImgCardUpdateHandle,
    currImgCardUpdate,

    viewImageToggle,
    viewImageToggleHandle,

    currImagesForSlides,
    currImgIdxtoDispalayHandle,
    currImgIdx,

    searchIconToggle,
    searchedText,
    searchedTextHandle,
    searchIconToggleHandle,
}) {

    function CancelFormToggleHandle() {
        if (addImageFormToggle) {
            handleImageFormToggle();
        } else if (updateImgFormToggle) {
            updateImgFormToggleHandle();
        }
    }

    const filteredImages = currentAlbumOBJ.images.filter(imgOBJ =>
        imgOBJ.text.toLowerCase().includes(searchedText.toLowerCase())
    );
    useEffect( ()=>{
        console.log('filteredImages ',filteredImages);
    }, [])

    return (
        <div className={styles.container}>

            {viewImageToggle && <ViewImage viewImageToggleHandle={viewImageToggleHandle} imagesUrls={currImagesForSlides} currImgIdx={currImgIdx}/>}

            {addImageFormToggle && <ImageForm addNewImgToAlbum={addNewImgToAlbum} currentAlbumOBJ={currentAlbumOBJ} />}
            {updateImgFormToggle && <UpdateImageForm updateImgInAlbum={updateImgInAlbum} currentAlbumOBJ={currentAlbumOBJ} currImgCardUpdate={currImgCardUpdate}/>}

            <div className={styles.upperBox}>
                <span id={styles.span}onClick={handleAlbumToggle}><img src={back} alt="back" className={styles.back} /></span>
                <h4>Your Albums, {currentAlbumOBJ.text}</h4>
                <div className={styles.searchDiv}>

                    {searchIconToggle?(<> <SearchBar searchedText={searchedText} searchedTextHandle={searchedTextHandle}/> <span onClick={searchIconToggleHandle} className={styles.searchIcon}><img src={cross} alt="search" className={styles.search}/></span> </>):
                    (<span onClick={searchIconToggleHandle} className={styles.searchIcon}><img src={search} alt="search" className={styles.search} /></span>)}

                </div>
                {addImageFormToggle || updateImgFormToggle ? (
                    <button id={styles.cancel} onClick={CancelFormToggleHandle}>Cancel</button>
                ) : (
                    <button id={styles.addAlbum} onClick={handleImageFormToggle}>Add image</button>
                )}
            </div>

            <div className={styles.albumBox}>
                {filteredImages?.map((imgOBJ, index) => (
                    <PhotoCard imgOBJ={imgOBJ} key={index} deleteImgfromAlbum={deleteImgfromAlbum} index={index} 
                    handleImageFormToggle={handleImageFormToggle}
                    updateImgFormToggleHandle={updateImgFormToggleHandle}
                    currImgCardUpdateHandle={currImgCardUpdateHandle}
                    viewImageToggleHandle={viewImageToggleHandle}
                    currImgIdxtoDispalayHandle={currImgIdxtoDispalayHandle}
                    addImageFormToggle={addImageFormToggle}
                     
                    />
                ))}
            </div>
        </div>
    );
}
