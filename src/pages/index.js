import DataCard from "@/components/DataCard/index.js";
import Earth from "@/components/Earth";
import Nav from "@/components/Nav";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import getRankingCountries from "@/services/getRankingCountries";
import Button from "@/components/Button";

export default function Home() {
  const [rankingCountries, setRankingCountries] = useState(null)

  useEffect(() => {
    getRankingCountries()
    .then(setRankingCountries)
  }, [])
  console.log(rankingCountries)

  if(rankingCountries) return (
    <>
      <Nav />
      <DataCard rankingCountries={rankingCountries} />
      <Earth />
      <Search />
      <Button text="Search" action={() => console.log("Hola")} />
    </>
  )
  return <></>
}
