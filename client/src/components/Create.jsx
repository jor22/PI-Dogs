import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../redux/actions/actions";
import TitleBar from "./TitleBar";
import patita from "../assests/huella.png";
import styles from "./Create.module.css";

export default function CreateNewDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const validate = (input) => {
    let error = {};

    if (!input.name.trim()) {
      error.name = " * Dog Name or breed  is required";
    }
    if (!input.weight_max.trim()) {
      error.weight_max = " * Dog weight max is required";
    }
    if (!input.weight_min.trim()) {
      error.weight_min = " * Dog weight min is required";
    }
    if (!input.height_max.trim()) {
      error.height_max = " * Dog height max is required";
    }
    if (!input.height_min.trim()) {
      error.height_min = " * Dog height min is required";
    }
    if (!input.life_span.trim()) {
      error.life_span = " * Dog life span is required";
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
      [e.target.name]:e.target.name === "temperament"? [...input.temperament, e.target.value]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );

    if(Object.keys(error).length === 0){
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
    }else{
        return;
    }
  }

  console.log("input", input);
  console.log("error", error);

  return (
    <div className={styles.container}>
      <TitleBar />
      <div className={styles.cardContainer}>

        <h1 className={styles.title}>
          Create New Dog <img src={patita} className={styles.patita} />
        </h1>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
            
          <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input type="text" name="name" onChange={handleChange} className={styles.inputName}></input>
          </div>
          </div>

        <span>
            {error.name && <span className={styles.showError}>{error.name}</span>}
        </span>
    
          <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="weight_max">
              Weight Max:
            </label>
            <input
              type="text"
              name="weight_max"
              onChange={handleChange}
              className={styles.inputWeightmax}
            ></input>
            <span>{"kg"}</span>
          </div>
          </div>

          <span>
          {error.weight_max && <span className={styles.showError}>{error.weight_max}</span>}
          </span>
    
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="weight_min">
              Weight Min:
            </label>
            <input
              type="text"
              name="weight_min"
              onChange={handleChange}
              className={styles.inputWeightmin}
            ></input>
            <span>{"kg"}</span>
          </div>

          <span>
            {error.weight_min && <span className={styles.showError}> {error.weight_min} </span>}
          </span>
         

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="Peso">
              Height Max:
            </label>
            <input
              type="text"
              name="height_max"
              onChange={handleChange}
              className={styles.inputHeightmax}
            ></input>
            <span>{"Cm"}</span>
          </div>

          <span>
            {error.height_max && <span className={styles.showError}>{error.height_max}</span> }
          </span>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="height_min">
              Height Min:
            </label>
            <input
              type="text"
              name="height_min"
              onChange={handleChange}
              className={styles.inputHeightmin}
            ></input>
            <span>{"Cm"}</span>
          </div>

          
          <span>
            {error.height_min && <span className={styles.showError}>{error.height_min}</span> }
          </span>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="life_span">
              Life Span:
            </label>
            <input 
            type="text" 
            name="life_span" 
            onChange={handleChange}
            className={styles.inputLifeSpan}
            ></input>
            <span>{"Years"}</span>
          </div>

          <span>
            {error.life_span && <span className={styles.showError}>{error.life_span}</span> }
          </span>


          <div className={styles.inputContainer}>
            <label className={styles.label} html="Temperament"></label>
            <select name="temperament"  onChange={handleChange} className={styles.select}>
              <option value="No have temperament">Temperaments</option>
              {temperaments &&
                temperaments.map((temperament) => (
                  <option key={temperament.id} value={temperament.name}>
                    {temperament.name}
                  </option>
                ))}
            </select>
          </div>

        </form>

        <span className={styles.addTemperament}>
            {input.temperament?.map((temperament) => `${temperament} , `)}
        </span>
     

        <button className={styles.btn} type="submit">
            Create DOG!
        </button>
     

      </div>
      </div>
    </div>
  );
}
