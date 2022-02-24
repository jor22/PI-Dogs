import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar({handleSort}) {
  
  
  return (
    <div className={styles.container}>

      <div className={styles.create}>
        <Link to="/create"  style={{ textDecoration: "none" }}>
          <h3 className={styles.createTitle}>Create Dog</h3>
        </Link>
      </div>

      <div className={styles.filterContainer} >
      <select className={styles.filter}  onChange={e => handleSort(e)}>
        <option value='AZ'> Sort by..</option>
        <option value='AZ'>Name (A-Z)</option>
        <option value='ZA'>Name (Z-A)</option> 
        <option value='Weight max'>Weight max </option>
        <option value='Weight min'>Weight min </option> 
      </select>
      </div>
    
      <SearchBar/>
    </div>
  );
}
