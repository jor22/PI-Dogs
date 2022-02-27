import{ React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../redux/actions/actions";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar({handleSort, handleTemp , handleOrigin}) {
  const dispatch = useDispatch();
  const {temperaments} = useSelector((state) => state);
  
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  return (
    <div className={styles.container}>

      <div className={styles.create}>
        <Link to="/create"  style={{ textDecoration: "none" }}>
          <h3 className={styles.createTitle}>Create Dog</h3>
        </Link>
      </div>

      <div className={styles.filterContainer}>
        <select className={styles.filter} name="activity" onChange={e => handleTemp(e)} >
            <option value="All">by temperament</option>
            {temperaments &&
              temperaments.map((temperament) => (
                  <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
            ))}
        </select>
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


      <div className={styles.filterContainer} >
      <select className={styles.filter}  onChange={e => handleOrigin(e)}>
        <option value='All'>Origin by..</option>
        <option value='DataBase'>from DataBase </option>
        <option value='Api'> from Api </option> 
      </select>
      </div>

      <SearchBar/>
    </div>
  );
}
