import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/actions/actions";
import styles from "./Home.module.css";
import TitleBar from "./TitleBar";
import NavBar from "./NavBar";
import Dog from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const { dogs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TitleBar />
        <NavBar />
      </div>

      <div className={styles.dogContainer}>
        {dogs && dogs.map((d) => <Dog 
         name={d.name}
         img={d.img}
         id={d.id}
         key={d.id}
         temperaments={d.temperaments}
        />)}
      </div>
    </div>
  );
}