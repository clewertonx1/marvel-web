import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'

import getData from '../service/api'


export default function Home() {
  const data = getData()
  console.table(typeof(data))
  return (
    <div className={styles.container}>
     
    </div>
  )
}
