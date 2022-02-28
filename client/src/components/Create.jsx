import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from "../redux/actions/actions";
import TitleBar from "./TitleBar";
import patita from '../assests/huella.png'
import styles from "./Create.module.css"



export default function Activity() {
    const dispatch = useDispatch()
    const  temperaments = useSelector((state) => state.temperaments)

    const validate = (input) => {

        let error = {}

        // if(!input.name){
        //     error.name = "Activity Name is required"
        // }else if(/\d/.test(input.name)){
        //     error.name = "Activity Name is invalid , it should not have numbers"
        // }else if(input.name.length > 20 ){
        //     error.name = "Activity name is to long"
        // }
        // if(input.duration.length > 20 ){
        //     error.name = "Duration is to long"
        // }

        return error
    }



    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name:'',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span:'',
        temperament: [],
    })

    useEffect(() => {

        dispatch(getTemperaments())

    }, [])

    function handleChange(e) {

        
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value
            }
        ));

        setInput({
            ...input,
            [e.target.name]: e.target.name === "temperament" ? [...input.temperament, e.target.value] : e.target.value
        })
    }


    function handleSumit(e) {
        e.preventDefault()
        // dispatch(createActivity(input))
    }

   

    console.log(input)
    console.log(error)
    

    return (
        <div className={styles.container}>
            <TitleBar/>
            <div className={styles.card}>
                <form onSubmit={handleSumit}>
                    
                    <h1 className={styles.title}> Create New Dog <img src={patita} className={styles.patita}/> </h1>
                    
                    
                    <div  className={styles.form}>
                        <label className={styles.label} htmlFor="name" >Name:</label>
                        <input
                            type='text'
                            name='name'
                            onChange={handleChange}
                        >
                        </input>
                        {error.name && <p className={styles.showError}>{error.name}</p>}
                    </div>


                    <div className={styles.form} >
                        <label className={styles.label}  htmlFor="weight_max" >Weight Max:</label>
                        <input
                            type='text'
                            name='weight_max'
                            onChange={handleChange}
                        ></input>{'kg'}
                        {error.name && <p className={styles.showError}>{error.name}</p>}
                    </div>

                    <div className={styles.form} >
                        <label className={styles.label}  htmlFor="weight_min" >Weight Min:</label>
                        <input
                            type='text'
                            name='weight_min'
                            onChange={handleChange}
                        ></input>{'kg'}
                        {error.name && <p className={styles.showError}>{error.name}</p>}
                    </div>

                    <div className={styles.form} >
                        <label className={styles.label}  htmlFor="Peso" >Height Max:</label>
                        <input
                            type='text'
                            name='height_max'
                            onChange={handleChange}
                        ></input>{'Cm'}
                        {error.name && <p className={styles.showError}>{error.name}</p>}
                    </div>

                    <div className={styles.form} >
                        <label className={styles.label}  htmlFor="height_min" >Height Min:</label>
                        <input
                            type='text'
                            name='height_min'
                            onChange={handleChange}
                        ></input>{'Cm'}
                        {error.name && <p className={styles.showError}>{error.name}</p>}
                    </div>

                    <div className={styles.form} >
                        <label className={styles.label}  htmlFor="life_span" >Life Span:</label>
                        <input
                            type='text'
                            name='life_span'
                            onChange={handleChange}
                        ></input>{'Years'}
                        {error.name && <p className={styles.showError}>{error.name}</p>}
                    </div>


                    <div className={styles.form} >
                        <label className={styles.label}  html='Temperament'></label>
                        <select name="temperament" onChange={handleChange} >
                            <option value="">Temperaments</option>
                            {temperaments && temperaments.map((temperament) => (
                                <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
                            ))}
                        </select>
                    </div>


                    <ul >
                        <li className={styles.ul} >{input.temperament?.map((temperament) => `${temperament} | ` )}</li>
                    </ul>
                   

                    <div>
                        <button className={styles.btn}  type='submit'>
                            Create DOG!
                        </button>
                    </div>


                    {/* <div>
                        <Link  to='/countries'>
                        <button className={styles.btnHome} >
                            Go Home
                        </button>
                    </Link>
                    </div> */}
                </form>
            </div>
        </div>
    )
}