// SearchBar.js
import React, { useState } from 'react';
import styles from '../css/SearchBar.module.css';
import icon from '../statics/images/cross.png';

export const SearchBar = ({searchedTextHandle}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className={styles.searchBox}>
        <input type='text' placeholder='Search...' onChange={(e)=>searchedTextHandle(e.target.value)}/>
    </div>
  );
};
