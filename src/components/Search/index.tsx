import Image from 'next/image';
import styles from './page.module.css'

const Search = () => {
    return(
        <div className={styles.main}>
            <div className={styles.title}>
                Custom Location
            </div>
            <form className={styles.form}>
                <input className={styles.input} placeholder="Country" />
                <input className={styles.input} placeholder="City" />
            </form>
            
        </div>
    )
}

export default Search;