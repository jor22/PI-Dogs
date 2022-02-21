import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className={styles.container}>

      <div className={styles.create}>
        <Link to="/create"  style={{ textDecoration: "none" }}>
          <h3 className={styles.createTitle}>Create Dog</h3>
        </Link>
      </div>
    </div>
  );
}
