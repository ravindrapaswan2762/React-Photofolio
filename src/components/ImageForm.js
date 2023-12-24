import { useState } from 'react';
import styles from '../css/ImageForm.module.css';

export function ImageForm({ currentAlbumOBJ, addNewImgToAlbum }) {
  const [imageObj, setImageOBJ] = useState({ text: '', url: '' });
  const [isValid, setIsValid] = useState(false);

  const onClickHandle = (e) => {
    e.preventDefault();
    if (isValid) {
      addNewImgToAlbum(imageObj);
      onClear();
    }
  };

  const onClear = () => {
    setImageOBJ({ text: '', url: '' });
    setIsValid(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageOBJ((prevImageObj) => ({ ...prevImageObj, [name]: value }));
    setIsValid(!!value); // Set isValid to true if there is a value.
  };

  return (
    <div className={styles.container}>
      <span>Add image to {currentAlbumOBJ.text}</span>

      <form onSubmit={onClickHandle}>
        <input
          type="text"
          name="text"
          placeholder="Title"
          required
          onChange={handleInputChange}
          value={imageObj.text}
        />
        <input
          type="text"
          name="url"
          placeholder="Image Url"
          required
          onChange={handleInputChange}
          value={imageObj.url}
        />

        <div className={styles.footer}>
          <button type="button" id={styles.clear} onClick={onClear}>
            Clear
          </button>
          <button id={styles.add} type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
