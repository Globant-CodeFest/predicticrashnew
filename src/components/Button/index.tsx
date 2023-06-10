import Image from 'next/image';
import styles from './page.module.css'

interface Props {
    text: string;
    action: () => void;
}

const Button = ({ text, action}: Props) => {
    return(
        <button className={styles.main} onClick={action}>
            {text}   
        </button>
    )
}

export default Button;