import { useEffect, useState } from 'react';
import styles from '../css/ImageForm.module.css';
import { useRef } from 'react';

export function UpdateImageForm({ updateImgInAlbum, currImgCardUpdate }) {
    const [imageObj, setImageOBJ] = useState({ text: "", url: "", index: null });

    const inputRef = useRef(null);

    function onClear() {
        setImageOBJ({ text: "", url: "" });
    }

    function submitUpdateHandle(e){
        e.preventDefault();
        updateImgInAlbum(imageObj);
        onClear();
    }

    useEffect(() => {
        console.log("currImgCardUpdate from updateImageForm component ",currImgCardUpdate)
        inputRef.current.focus();
        
        setImageOBJ({ text: currImgCardUpdate.text, url: currImgCardUpdate.url, index: currImgCardUpdate.index });
    }, [currImgCardUpdate]);

    return (
        <div className={styles.container}>
            <span>Update image {currImgCardUpdate.text}</span>

            <form>
                <input
                    type="text"
                    placeholder="Title"
                    required
                    onChange={(e) => setImageOBJ({ ...imageObj, text: e.target.value })}
                    value={imageObj.text}
                    ref={inputRef}
                />
                <input
                    type="text"
                    placeholder="Image Url"
                    required
                    onChange={(e) => setImageOBJ({ ...imageObj, url: e.target.value })}
                    value={imageObj.url}
                />

                <div className={styles.footer}>
                    <button type="button" id={styles.clear} onClick={onClear}>
                        Clear
                    </button>
                    <button id={styles.add} onClick={submitUpdateHandle}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
