import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css'


export default function Dog({id, name, img, temperaments}) {

    return(
        <div className={styles.card} key={id} >
          <div className={styles.imgContainer}>
              <img className={styles.img} src={img} alt='DogIMG'/>
          </div>

          <div className={styles.textContainer}>
              <Link  to={`/dog/${id}`} style={{ textDecoration: "none" }} >
                <h2 className={styles.name}>{name}</h2>
              </Link>
              <h3 className={styles.temperaments}>{temperaments}</h3>
          </div>
        </div>
    )
} 