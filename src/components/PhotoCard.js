import styles from '../css/PhotoCard.module.css';
import updateImg from '../statics/images/update.png';
import deleteImg from '../statics/images/delete.png';

export function PhotoCard({imgOBJ, deleteImgfromAlbum, index, updateImgFormToggleHandle, currImgCardUpdateHandle, 
    viewImageToggleHandle, currImgIdxtoDispalayHandle, handleImageFormToggle,addImageFormToggle}){

    async function updateHandle() {
        const imgDetails = { text: imgOBJ.text, url: imgOBJ.url, index: index };
        await currImgCardUpdateHandle(imgDetails);
        updateImgFormToggleHandle(true);
        if(addImageFormToggle){
            handleImageFormToggle();
        }
    }

    function onClickHandle(){
        viewImageToggleHandle(true);
        currImgIdxtoDispalayHandle(index);
    }
    

    return (
        <div className={styles.card} >
            <img src={imgOBJ.url} alt='Image' id={styles.image} onClick={onClickHandle} />
            <span id={styles.text}>{imgOBJ.text}</span>

            <div className={styles.updateDiv} onClick={updateHandle}>
                <img src={updateImg} alt='Update' className={styles.icon}/>
            </div>
            <div className={styles.deleteDiv} onClick={()=>deleteImgfromAlbum(index)}>
                <img src={deleteImg} alt='Delete' className={styles.icon}/>
            </div>
        </div>
    )
}