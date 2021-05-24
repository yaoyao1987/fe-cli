import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.less'

const Home: FC = () => {
  return (
    <div>
      <div className={styles.title}>Welcome Home</div>
      <p className={styles.row}>
        <Link to='/about'>about</Link>
      </p>
    </div>
  )
}

export default Home