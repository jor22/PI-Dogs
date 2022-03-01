import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions/actions";
import  searchIcon  from '../assests/buscarWhite.png'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  let handleChange = (e) =>{
      e.preventDefault()
      setValue(e.target.value)
  }

  let handleSubmit = (e) => {
      e.preventDefault()
      dispatch(getByName(value))
      setValue('')
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        onChange={(e) => handleChange(e)}
        placeholder="Search Breeds."
      />
      <button
       className={styles.button}
       onClick={e => handleSubmit(e)}
       type='submit'
      >
       <img src={searchIcon} alt="search"  className={styles.img} />
      </button>
    </div>
  );
}
