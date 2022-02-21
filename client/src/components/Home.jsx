import React from "react";
import styles from './Home.module.css'
import TitleBar from "./TitleBar";
import NavBar from "./NavBar";

export default function Home() {

    return(
        <div className={styles.container}>
        <div className={styles.header}>
        <TitleBar/>
        <NavBar/>
        </div>   
        </div>
    )
}