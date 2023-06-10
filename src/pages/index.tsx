import DataCard from "@/components/DataCard";
import Earth from "@/components/Earth";
import Nav from "@/components/Nav";
import Search from "@/components/Search";
import { useEffect } from "react";
import getRankingCountries from "@/services/getRankingCountries";


export default function Home() {
  
  useEffect(() => {
    getRankingCountries()
    .then(res => console.log(res))
  }, [])

  return (
    <>
      <Nav />
      <DataCard />
      <Earth />
      <Search />
    </>
  )
}
