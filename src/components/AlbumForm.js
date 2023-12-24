import { useState } from "react"
import styles from "../css/AlbumForm.module.css"

export function AlbumForm({addAlbum}) {
    const [newAlbum, SetNewAlbum] = useState({text: "", images: []});

    const clearInput = () => {
        SetNewAlbum({text: "", images: []});
    }
    const addHandle = () => {
        addAlbum(newAlbum);
        SetNewAlbum({text: "", images: []});
    }

    return (
        <div className={styles.container}>
            <div>Create an album</div>
            <div className={styles.footer}>
                <input 
                    type="text" 
                    placeholder="Album name" 
                    required 
                    onChange={(e)=>SetNewAlbum({text: e.target.value, images: []})}
                    value={newAlbum.text}
                />
                <button className={styles.btn} id={styles.clear} onClick={clearInput}>Clear</button>
                <button className={styles.btn} id={styles.create} onClick={addHandle}>Create</button>
            </div>
        </div>
    )
}