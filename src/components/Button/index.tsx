import Image from 'next/image';
import styles from './page.module.css'

interface Props {
    text: string;
    action: () => void;
}

const Button = ({ text, action}: Props) => {
    return(
        <div className={styles.main}>
            <button className={styles.button} onClick={action}>
                {text}   
            </button>
        </div>
    )
}

export default Button;