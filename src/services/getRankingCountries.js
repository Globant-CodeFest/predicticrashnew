const getRankingCountries = async () => {
    const response = await fetch(`api/ranking`);
    const data = await response.json();
    console.log(data)
    return data;
}   

export default getRankingCountries;