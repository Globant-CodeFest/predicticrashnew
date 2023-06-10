import Image from 'next/image';
import styles from './page.module.css'

const Nav = () => {
    return(
        <div className={styles.main}>
            <Image src="/imgs/prediclogo.svg" alt="Logo" width={200} height={24} />
        </div>
    )
}

export default Nav;