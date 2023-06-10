const getRankingDisaster = async () => {
    const response = await fetch(`api/rankingdisaster`);
    const data = await response.json();
    console.log(data)
    return data;
}   

export default getRankingDisaster;