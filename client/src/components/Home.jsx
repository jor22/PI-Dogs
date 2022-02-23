import { React, useEffect  , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/actions/actions";
import styles from "./Home.module.css";
import TitleBar from "./TitleBar";
import NavBar from "./NavBar";
import Dog from "./Card";
import Pagination from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { dogs } = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(1)
  const dogsPerPage =  8
  
  const pages = (pageNum) => {
    setCurrentPage(pageNum)
  }

  useEffect(() => {
    dispatch(getAll());
  }, []);
  


  let indexOfLastDogs= currentPage * dogsPerPage 
  let indexOfirstDogs = indexOfLastDogs - dogsPerPage  
  let currentDogs = dogs.slice( indexOfirstDogs , indexOfLastDogs) 


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TitleBar />
        <NavBar />
      </div>

      <div className={styles.dogContainer}>
        {currentDogs && currentDogs.map((d) => <Dog 
         name={d.name}
         img={d.img}
         id={d.id}
         key={d.id}
         temperaments={d.temperaments}
        />)}
      </div>

      <Pagination
        amountPerPage={dogsPerPage}
        totalAmount={dogs.length}
        pageNumber={pages}
      />
    </div>
  );
}