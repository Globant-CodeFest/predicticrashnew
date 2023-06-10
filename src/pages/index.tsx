import DataCard from "@/components/DataCard";
import Earth from "@/components/Earth";
import Nav from "@/components/Nav";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import getRankingCountries from "@/services/getRankingCountries";
import Button from "@/components/Button";

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getRankingCountries()
    .then(res => setData(res.items))
  }, [])
  console.log(data)

  return (
    <>
      <Nav />
      <DataCard />
      <Earth />
      <Search />
      <Button text="Search" action={() => console.log("Hola")} />
    </>
  )
}
