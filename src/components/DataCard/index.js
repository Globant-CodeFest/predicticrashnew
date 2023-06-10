import Image from 'next/image';
import styles from './page.module.css'

const DataCard = ({ rankingCountries, rankingDisaster }) => {
    return(
        <div className={styles.main}>
            <div className={styles.card}>
                <div className={styles.line}>
                    <Image src="/imgs/logo-earth.svg" alt="Logo" width={20} height={20} />
                    <div className={styles.title}>More affected</div>
                </div>
                <div>
                    {
                        rankingCountries.map((country, index) => {
                            return (
                                <div key={index} className={styles.countries}>{country.Country}</div>
                            )
                        }   
                        )
                    }
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.line}>
                    <Image src="/imgs/fire.svg" alt="Logo" width={20} height={20} />
                    <div className={styles.title}>Disasters</div>
                </div>
                <div>
                {
                        rankingDisaster.map((disaster, index) => {
                            return (
                                <div key={index} className={styles.countries}>{disaster.Disastertype}</div>
                            )
                        }   
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default DataCard;