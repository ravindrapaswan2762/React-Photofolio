import "./styles.css";
import { Component } from "react";
import { Navbar } from "./components/Navbar";
import { List } from "./components/List";
import { AlbumForm } from "./components/AlbumForm";
import { AlbumDetails } from "./components/AlbumDetails";

import { db } from "./firebase";
import { addDoc, collection, doc, updateDoc, onSnapshot, getDoc, serverTimestamp, orderBy, query } from "firebase/firestore";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import unp1 from './statics/images/unp1.jpg'
import unp2 from './statics/images/unp2.jpg'
import unp3 from './statics/images/unp3.jpg'
import unp4 from './statics/images/unp4.jpg'
import unp5 from './statics/images/unp5.jpg'
import unp6 from './statics/images/unp6.jpg'
import unp7 from './statics/images/unp7.jpg'
import unp8 from './statics/images/unp8.jpg'
import unp9 from './statics/images/unp9.jpg'
import unp10 from './statics/images/unp10.jpg'
import unp11 from './statics/images/unp11.jpg'
import unp13 from './statics/images/unp13.jpg'
import unp15 from './statics/images/unp15.jpg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      albums: [],
      toggle: false, // this toggle is used for addAlbum form
      addImageFormToggle: false,
      albumToggle: false,
      updateImgFormToggle: false,
      viewImageToggle: false,
      searchIconToggle: false, 
      searchedText: "",
      isInitialized: false,

      currentAlbumOBJ:  {},// accesing current clicked album and modifying/displaying if needed, and then setting back in albums.
      currImgCardUpdate: {},

      currImagesForSlides: [], // extracting all image url's from imagesOBJ and send to ImageView Comp. to display slidewise. 
      currImgIdx: 0,
    };
  }

  searchedTextHandle = (text) => {
    this.setState( (prevState)=>({
      searchedText: text
    }), ()=>{console.log("searchedText ",this.state.searchedText)} )
  }

  searchIconToggleHandle = () => {
    this.setState( (prevState)=>({
      searchIconToggle: !this.state.searchIconToggle,
      
    }), ()=>{
      if(this.state.searchIconToggle === false){
        this.searchedTextHandle("");
      }
    } )
  }

  currImgIdxtoDispalayHandle = (index) => {
    this.setState( (prevState)=>({
      currImgIdx: index
    }) )
  }

  currImagesForSlidesHandle = (album) => { 
    const imagesUrls = album.images.map( (imgObj, index)=> imgObj.url );
    console.log('imagesUrls ',imagesUrls);

    this.setState((prevState) => ({
      currImagesForSlides: imagesUrls
    }), console.log('this.state.currImagesForSlides ',this.state.currImagesForSlides));
  };

  currImgCardUpdateHandle = (imgOBJ) => { 
  
    this.setState((prevState) => ({
      currImgCardUpdate: imgOBJ
    }), console.log('this.state.currImgCardUpdate ',this.state.currImgCardUpdate));
  };

  

  dispalyImages = (index) => {
    console.log('index ',index);
    const album = this.state.albums.find( (album, idx) => idx === index );
    console.log("album ",album);

    this.setState((prevState) => ({
      currentAlbumOBJ: album,
    }), ()=>{console.log('this.state.currentAlbum ',this.state.currentAlbumOBJ)});
  }

  handleToggle = () => { // handling album form toggle
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
  };

  viewImageToggleHandle = (TorF) => {
    this.setState( (prevState)=>({
      viewImageToggle: TorF
    }) )
  }

  handleImageFormToggle = () => {
    this.setState((prevState) => ({
      addImageFormToggle: !prevState.addImageFormToggle,
    }));
  };

  updateImgFormToggleHandle = (data) => {
    this.setState((prevState) => ({
      updateImgFormToggle: data,
    }));
  };

  handleAlbumToggle = () => {

    this.setState((prevState) => ({
      albumToggle: !prevState.albumToggle,
    }));
  };


  // -----------------------------------------------------------------------------------------
  // componentDidMount() {
  //   // Check if the component has already been initialized
  //   if (!this.state.isInitialized) {
  //     // Load albums from Firestore when the component mounts.
  //     const albumsCollection = collection(db, 'albums');
  
  //     const unsubscribe = onSnapshot(albumsCollection, (snapshot) => {
  //       const albumsData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  
  //       this.setState({ 
  //         albums: albumsData,
  //         isInitialized: true, // Set the flag to true after the initial load
  //       }, () => {
  //         console.log('Albums have been loaded from Firestore:', this.state.albums);
  //       });
  //     });
  
  //     // Unsubscribe from the snapshot listener when the component unmounts
  //     return () => unsubscribe();
  //   }
  // }

  // componentDidMount() {
  //   // Load albums from Firestore when the component mounts.
  //   const albumsCollection = collection(db, 'albums');
  
  //   const unsubscribe = onSnapshot(albumsCollection, (snapshot) => {
  //     const albumsData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  
  //     this.setState({ albums: albumsData }, () => {
  //       console.log('Albums have been loaded from Firestore:', this.state.albums);
  //     });
  //   });
  
  //   // Unsubscribe from the snapshot listener when the component unmounts
  //   return () => unsubscribe();
  // }

  componentDidMount() {
    // Load albums from Firestore when the component mounts.
    const albumsCollection = collection(db, 'albums');
  
    const unsubscribe = onSnapshot(
      query(albumsCollection, orderBy('createdAt', 'desc')), // Replace 'timestampField' with the actual field name
      (snapshot) => {
        const albumsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        this.setState({ albums: albumsData }, () => {
          console.log('Albums have been loaded from Firestore:', this.state.albums);
        });
      }
    );
  
    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }
  
  
  
  
  // ----------------------------------------------------------------------------------
  updateImgInAlbum = async (imageObj) => {
    try {
      const { albums, currentAlbumOBJ } = this.state;
      const albumId = currentAlbumOBJ.id;
  
      // Update the images array for the album in Firestore
      const updatedImages = currentAlbumOBJ.images.map((img, idx) => {
        if (imageObj.index !== null && imageObj.index === idx) {
          return { text: imageObj.text, url: imageObj.url };
        } else {
          return img;
        }
      });
      await updateDoc(doc(db, 'albums', albumId), {
        images: updatedImages,
      });
  
      // Update the state
      this.setState((prevState) => {
        const newAlbums = prevState.albums.map((album) => {
          if (album.id === albumId) {
            return { ...album, images: updatedImages };
          } else {
            return album;
          }
        });
  
        return {
          albums: newAlbums,
          currentAlbumOBJ: {
            ...prevState.currentAlbumOBJ,
            images: updatedImages,
          },
        };
      }, () => {
        toast.success("Image updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toastMessage",
        });
      });
    } catch (error) {
      console.error('Error updating image in album:', error);
      toast.error("Error updating image", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toastMessage",
      });
    }
  };
  
  deleteImgfromAlbum = async (index) => {
    try {
      const { albums, currentAlbumOBJ } = this.state;
      const albumId = currentAlbumOBJ.id;
  
      // Update the images array for the album in Firestore
      const updatedImages = currentAlbumOBJ.images.filter((img, idx) => idx !== index);
      await updateDoc(doc(db, 'albums', albumId), {
        images: updatedImages,
      });
  
      // Update the state
      this.setState((prevState) => {
        const newAlbums = prevState.albums.map((album) => {
          if (album.id === albumId) {
            return { ...album, images: updatedImages };
          } else {
            return album;
          }
        });
  
        return {
          albums: newAlbums,
          currentAlbumOBJ: {
            ...prevState.currentAlbumOBJ,
            images: updatedImages,
          },
        };
      }, () => {
        // Update local storage after state has been updated
        localStorage.setItem('albums', JSON.stringify(this.state.albums));
        toast.success("Image deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    } catch (error) {
      console.error('Error deleting image from album:', error);
      toast.error("Error deleting image", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toastMessage",
      });
    }
  };
  
  addNewImgToAlbum = async (imageOBJ) => {
    const albumId = this.state.currentAlbumOBJ.id;
  
    try {
      // Update the album in Firestore
      const albumRef = doc(db, 'albums', albumId);
      await updateDoc(albumRef, {
        images: [...this.state.currentAlbumOBJ.images, imageOBJ],
      });
  
      // Fetch the updated album data from Firestore
      const updatedAlbumDoc = await getDoc(albumRef);
      const updatedAlbumData = updatedAlbumDoc.data();
  
      // Update the state
      this.setState(
        (prevState) => ({
          albums: prevState.albums.map((album) =>
            album.id === albumId ? { ...album, images: updatedAlbumData.images } : album
          ),
          currentAlbumOBJ: { ...prevState.currentAlbumOBJ, images: updatedAlbumData.images },
        }),
        () => {
          toast.success('Image added successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toastMessage',
          });
        }
      );
    } catch (error) {
      console.error('Error adding image to album:', error);
      toast.error('Error adding image', {
        position: toast.POSITION.TOP_RIGHT,
        className: 'toastMessage',
      });
    }
  };
  
addAlbum = async (data) => {
  try {
 
    // const docRef = await addDoc(collection(db, "albums"), data);
    const docRef = await addDoc(collection(db, 'albums'), {
      ...data,
      createdAt: serverTimestamp(),
    });

    toast.success("Album created successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastMessage",
    });
  } catch (error) {
    console.error('Error adding album:', error);
    toast.error("Error creating album", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastMessage",
    });
  }
};





  //------------------------------------------------------------------------------------------------ 


  render() {
    return (
      <>
        <ToastContainer />
        <Navbar />

        {/* ------------------------------------------------- */}

        {this.state.albumToggle ? (
          <AlbumDetails
            handleImageFormToggle={this.handleImageFormToggle}
            addImageFormToggle={this.state.addImageFormToggle}
            handleAlbumToggle={this.handleAlbumToggle}
            currentAlbumOBJ={this.state.currentAlbumOBJ}
            addNewImgToAlbum={this.addNewImgToAlbum}
            deleteImgfromAlbum={this.deleteImgfromAlbum}
            updateImgFormToggle={this.state.updateImgFormToggle}
            updateImgFormToggleHandle={this.updateImgFormToggleHandle}
            updateImgInAlbum={this.updateImgInAlbum}
            currImgCardUpdateHandle={this.currImgCardUpdateHandle}
            currImgCardUpdate={this.state.currImgCardUpdate}
            viewImageToggle={this.state.viewImageToggle}
            viewImageToggleHandle={this.viewImageToggleHandle}
            currImagesForSlides={this.state.currImagesForSlides}
            currImgIdxtoDispalayHandle={this.currImgIdxtoDispalayHandle}
            currImgIdx={this.state.currImgIdx}
            searchIconToggleHandle={this.searchIconToggleHandle}
            searchIconToggle={this.state.searchIconToggle}
            searchedTextHandle = {this.searchedTextHandle}
            searchedText={this.state.searchedText}
      

            
          />
        ) : (
          <>
            {this.state.toggle && <AlbumForm addAlbum={this.addAlbum} />}
            <List
              albums={this.state.albums}
              handleToggle={this.handleToggle}
              toggle={this.state.toggle}
              handleAlbumToggle={this.handleAlbumToggle}
              dispalyImages={this.dispalyImages}
              currImagesForSlidesHandle={this.currImagesForSlidesHandle}
            />
          </>
        )}

        {/* ------------------------------------------------------- */}

      </>
    );
  }
  
}

export default App;
