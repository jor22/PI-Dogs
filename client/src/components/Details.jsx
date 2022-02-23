import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDogDetails } from "../redux/actions/actions";
import TitleBar from "./TitleBar";
import styles from "./Details.module.css";

export default function Details() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.dog);

  useEffect(() => {
    dispatch(getDogDetails(id));
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.imgContainer}>
            <img src={dogDetails.img} alt="Img" className={styles.img} />
          </div>
          
          <h1 className={styles.name}>{dogDetails.name}</h1>

          <div className={styles.infoContainer}>
            <h3 className={styles.info}>
              Weight Max:{"   "}{dogDetails.weight_max}{"  "}Kg
            </h3>
            <h3 className={styles.info}>
              Weight Min:{"   "}{dogDetails.weight_min}{"  "}Kg
            </h3>
            <h3 className={styles.info}>
              Height Max:{"   "}{dogDetails.height_max}{"  "}Cm
            </h3>
            <h3 className={styles.info}>
              Height Min:{"   "}{dogDetails.height_min}{"  "}Cm
            </h3>
            <h3 className={styles.info}>
              Life Span:{"   "}{dogDetails.life_span}
            </h3>
          </div>
          
          <div className={styles.temperamentsContainer}>
            <h2 className={styles.temperamentTitle}>Temperaments:</h2>
            <h3 className={styles.temperaments}>{dogDetails.temperaments}</h3>
          </div>

        </div>
      </div>
    </div>
  );
}
