const getCountries = async () => {
    const response = await fetch(`api/countries`);
    const data = await response.json();
    return data;
}   

export default getCountries;