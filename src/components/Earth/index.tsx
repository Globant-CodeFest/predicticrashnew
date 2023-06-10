import Image from 'next/image';
import styles from './page.module.css'

const Earth = () => {
    return(
        <div className={styles.main}>
            <Image src="/imgs/earth.svg" alt="Logo" width={300} height={300} />
        </div>
    )
}

export default Earth;