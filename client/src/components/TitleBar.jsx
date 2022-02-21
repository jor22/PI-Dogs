import React from "react";
import { Link } from "react-router-dom";
import icon from '../assests/dogIconPng.png'
import styles from './TitleBar.module.css'

export default function TitleBar(){

 return (
    <div className={styles.container}>
    <div className ={styles.titleContainer}>
       <Link to="/dog" style={{ textDecoration: "none" }}>
       <h1 className={styles.title}>Dog's World.<img src={icon} alt="" className={styles.icon}/></h1>
       </Link>
   </div>
   </div>
 )
}