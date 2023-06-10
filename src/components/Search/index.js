import Image from 'next/image';
import styles from './page.module.css'
import getCountries from '../../services/getCountries';
import { useEffect, useState } from 'react';

const Search = ({ countries }) => {
    console.log(countries)

    return(
        <div className={styles.main}>
            <div className={styles.title}>
                Custom Location
            </div>
            <form className={styles.form}>
                <input className={styles.input} placeholder="Country" />
                <select name="country">
                    {
                        countries?.map((country) => {
                            <option value={country.Country}>{country.Country}</option>
                        })
                    }
                </select>
            </form>
            
        </div>
    )
    return<></>
}

export default Search;