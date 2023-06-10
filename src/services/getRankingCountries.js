const getRankingCountries = async () => {
    const response = await fetch(`api/ranking`);
    const data = await response.json();
    return data;
}   

export default getRankingCountries;