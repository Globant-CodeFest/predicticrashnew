import DataCard from "@/components/DataCard/index.js";
import Earth from "@/components/Earth";
import Nav from "@/components/Nav";
import Search from "@/components/Search/index.js";
import { useEffect, useState } from "react";
import getRankingCountries from "@/services/getRankingCountries";
import Button from "@/components/Button";
import getRankingDisaster from "../services/getRankingDisaster";
import getCountries from "../services/getCountries";

export default function Home() {
  const [rankingCountries, setRankingCountries] = useState(null)
  const [rankingDisaster, setRankingDisaster] = useState(null)
  const [countries, setCountries] = useState(null)

    useEffect(() => {
        getCountries()
        .then(setCountries)
    }, [])

  useEffect(() => {
    getRankingCountries()
    .then(setRankingCountries)
  }, [])

  useEffect(() => {
    getRankingDisaster()
    .then(setRankingDisaster)
  }, [])

  if(rankingCountries && rankingDisaster && countries) return ( 
    <>
      <Nav />
      <DataCard rankingCountries={rankingCountries}  rankingDisaster={rankingDisaster} />
      <Earth />
      <Search countries={countries}/>
      <Button text="Search" action={() => console.log("Hola")} />
    </>
  )
  return <></>
}
