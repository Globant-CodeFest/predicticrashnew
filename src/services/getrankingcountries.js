const getRankingCountries = async () => {
    const response = await fetch(`https://apex.oracle.com/pls/apex/vnn/hr/empinfo/`);
    const data = await response.json();
    return data;
}   