import React from 'react'
import styles from './Pagination.module.css'

export default function Pagination({ amountPerPage, totalAmount, pageNumber }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalAmount / amountPerPage); i++) {
    pageNumbers.push(i)
  }
 
  return (
    <nav className={styles.numBar}>
      <div className={styles.numContainer}>
        {
          pageNumbers.map( (number) => {
            return (
              <a
                key={number}
                className={styles.number}
                onClick={() => pageNumber(number)}
              >
                {number}
              </a>
            )
          })}
      </div>
    </nav>
  )
}
