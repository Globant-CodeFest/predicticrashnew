const fs = require("fs");


async function readCSV(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const lines = data.split('\n');
    const header = lines[0];
    return {header, data: lines.splice(1)}
}

async function main() {
    const tableName = '1900'
    const data = await  readCSV(tableName+'.csv');
    
    const cols = [
        'Year VARCHAR(255)',
        'Seq VARCHAR(255)',
        'Glide VARCHAR(255)',
        'DisasterGroup VARCHAR(255)',
        'DisasterSubgroup VARCHAR(255)',
        'DisasterType VARCHAR(255)',
        'DisasterSubtype VARCHAR(255)',
        'DisasterSubsubtype VARCHAR(255)',
        'EventName VARCHAR(255)',
        'Country VARCHAR(255)',
        'ISO VARCHAR(255)',
        'Region VARCHAR(255)',
        'Continent VARCHAR(255)',
        'Location VARCHAR(255)',
        'Origin VARCHAR(255)',
        'AssociatedDis VARCHAR(255)',
        'AssociatedDis2 VARCHAR(255)',
        'OFDAResponse VARCHAR(255)',
        'Appeal VARCHAR(255)',
        'Declaration VARCHAR(255)',
        'AidContribution VARCHAR(255)',
        'DisMagValue VARCHAR(255)',
        'DisMagScale VARCHAR(255)',
        'Latitude VARCHAR(255)',
        'Longitude VARCHAR(255)',
        'LocalTime1 VARCHAR(255)',
        'RiverBasin VARCHAR(255)',
        'StartYear VARCHAR(255)',
        'StartMonth VARCHAR(255)',
        'StartDay VARCHAR(255)',
        'EndYear VARCHAR(255)',
        'EndMonth VARCHAR(255)',
        'EndDay VARCHAR(255)',
        'TotalDeaths VARCHAR(255)',
        'NoInjured VARCHAR(255)',
        'NoAffected VARCHAR(255)',
        'NoHomeless VARCHAR(255)',
        'TotalAffected VARCHAR(255)',
        "InsuredDamages VARCHAR(255)",
        "TotalDamages VARCHAR(255)",
        'CPI VARCHAR(255)',
        'AdmLevel VARCHAR(255)',
        'Admin1Code VARCHAR(255)',
        'Admin2Code VARCHAR(255)',
        'GeoLocations VARCHAR(255)'
      ]
      // data.header.split(',').map(x=>x.replace(' ','') + ' VARCHAR(255)');
    console.log(`create table disastre (${cols.join(', ')});`);
}

main().catch(err => console.log(err));
