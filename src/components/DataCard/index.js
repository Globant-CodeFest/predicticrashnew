import Image from 'next/image';
import styles from './page.module.css'

const DataCard = ({ rankingCountries }) => {
    console.log(rankingCountries)
    if(rankingCountries) return(
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
                <div>
                    <div className={styles.foot}>updated today</div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.line}>
                    <Image src="/imgs/logo-earth.svg" alt="Logo" width={20} height={20} />
                    <div className={styles.title}> Earthquake</div>
                </div>
                <div>
                    <div className={styles.subtitle}>Natural Disaster</div>
                </div>
                <div>
                    <div className={styles.number}>10</div>
                </div>
                <div>
                    <div className={styles.foot}>updated today at14:36h</div>
                </div>
            </div>
        </div>
    )
}

export default DataCard;