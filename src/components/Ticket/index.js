import {useEffect, useState} from 'react'
import styles from './index.module.css'

export default function Ticket() {
  const [isTransEnd, setIsTransEnd] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsTransEnd(true)
    }, 1000);
  }, [])
  return <div className={styles.container}>
    <div className={styles.body}></div>
    <div className={`${styles.footer} ${styles.transStart} ${isTransEnd ? styles.transEnd : ''}`}></div>
  </div>
}