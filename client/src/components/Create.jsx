import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../redux/actions/actions";
import TitleBar from "./TitleBar";
import patita from "../assests/huella.png";
import styles from "./Create.module.css";

export default function Activity() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const validate = (input) => {
    let error = {};

    if (!input.name) {
      error.name = "Dog Name or breed  is required";
    }
    if (!input.weight_max) {
      error.weight_max = "Dog weigth max is required";
    }
    if (!input.weight_min) {
      error.weight_min = "Dog weigth min is required";
    }
    if (!input.height_max) {
      error.height_max = "Dog heigth max is required";
    }
    if (!input.height_min) {
      error.height_min = "Dog heigth min is required";
    }
    if (!input.life_span) {
      error.life_span = "Dog life span is required";
    }

    return error;
  };

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleChange(e) {
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    setInput({
      ...input,
      [e.target.name]:
        e.target.name === "temperament"
          ? [...input.temperament, e.target.value]
          : e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("input handleSubmit", e);
    dispatch(createDog(input));
    setInput({
      name: "",
      height_min: "",
      height_max: "",
      weight_min: "",
      weight_max: "",
      life_span: "",
      temperament: [],
    });
  }

  console.log("input", input);
  console.log("error", error);

  return (
    <div className={styles.container}>
      <TitleBar />
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.title}>
            Create New Dog <img src={patita} className={styles.patita} />
          </h1>

          <div className={styles.form}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input type="text" name="name" onChange={handleChange}></input>
            {error.name && <p className={styles.showError}>{error.name}</p>}
          </div>

          <div className={styles.form}>
            <label className={styles.label} htmlFor="weight_max">
              Weight Max:
            </label>
            <input
              type="text"
              name="weight_max"
              onChange={handleChange}
            ></input>
            {"kg"}
            {error.weight_max && <p className={styles.showError}>{error.weight_max}</p> }
          </div>

          <div className={styles.form}>
            <label className={styles.label} htmlFor="weight_min">
              Weight Min:
            </label>
            <input
              type="text"
              name="weight_min"
              onChange={handleChange}
            ></input>
            {"kg"}
            {error.weight_min && <p className={styles.showError}>{error.weight_min}</p>}
          </div>

          <div className={styles.form}>
            <label className={styles.label} htmlFor="Peso">
              Height Max:
            </label>
            <input
              type="text"
              name="height_max"
              onChange={handleChange}
            ></input>
            {"Cm"}
            {error.height_max && <p className={styles.showError}>{error.height_max}</p>}
          </div>

          <div className={styles.form}>
            <label className={styles.label} htmlFor="height_min">
              Height Min:
            </label>
            <input
              type="text"
              name="height_min"
              onChange={handleChange}
            ></input>
            {"Cm"}
            {error.height_min && <p className={styles.showError}>{error.height_min}</p>}
          </div>

          <div className={styles.form}>
            <label className={styles.label} htmlFor="life_span">
              Life Span:
            </label>
            <input type="text" name="life_span" onChange={handleChange}></input>
            {"Years"}
            {error.life_span && <p className={styles.showError}>{error.life_span}</p>}
          </div>

          <div className={styles.form}>
            <label className={styles.label} html="Temperament"></label>
            <select name="temperament" onChange={handleChange}>
              <option value="">Temperaments</option>
              {temperaments &&
                temperaments.map((temperament) => (
                  <option key={temperament.id} value={temperament.name}>
                    {temperament.name}
                  </option>
                ))}
            </select>
            {error.temperament && <p className={styles.showError}>{error.temperament}</p>}
          </div>

          <ul>
            <li className={styles.ul}>
              {input.temperament?.map((temperament) => `${temperament} | `)}
            </li>
          </ul>

          <div>
            <button className={styles.btn} type="submit">
              Create DOG!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
