import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css'
import patita from '../assests/huella.png'


export default function Landing() {
  return (
    <div  className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>PI Dog's World. <img src={patita} className={styles.patita}/></h1>
        <h3 className={styles.text}>
        “A dog is the only thing on earth that loves you more than he loves himself.”<br/>― Josh Billings
        </h3>
        <Link to={"/dog"} >
         <button className={styles.btn}>Go HOME!</button>
        </Link>
        <p className={styles.footer}>A project by Jorge Ariel Castillo</p>
      </div>
    </div>
  );
}
