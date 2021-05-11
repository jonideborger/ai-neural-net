"use strict";

//URL
const BIKE_URL = 'https://data.mobility.brussels/bike/api/counts/?request=history&featureID=CJM90&startDate=20200506&endDate=20210505';

const train = {
    fetch: async function() {
        const resp = await fetch(BIKE_URL);
        const json = await resp.json();
        console.log(json);
        const data = {};
        json.data.forEach(d => {
            if(data[d.count_date]) {
                data[d.count_date] += d.count;
            } else {
                data[d.count_date] = d.count;
            }
        });
        console.log(data, Object.keys(data).length);

        const weatherResp = await fetch('./data/weather.json');
        const weatherJson = await weatherResp.json();
        console.log(weatherJson);
        const weatherData = {};
        weatherJson.forEach(d => {
            const date = new Date(d.dt * 1000);
            const year = date.getFullYear();
            //const month = date.getMonth();
            //make month 2 digit
            const month = ("0" + (date.getMonth() + 1)).slice(-2)
            //const day = date.getDate();
            const day = ("0" + date.getDate()).slice(-2)
            //console.log(year, month, day);

            if(!weatherData[`${year}/${month}/${day}`]) {
                weatherData[`${year}/${month}/${day}`] = [];
            }
            weatherData[`${year}/${month}/${day}`].push(d.main.temp);
        });

        Object.keys(weatherData).forEach(d => {
            //console.log(d);
            const average = weatherData[d].reduce((sum, val) => {
                return sum + val;
            }) / weatherData[d].length;
            weatherData[d] = Number(average.toFixed(2));
        })

        console.log(weatherData);

/*         const trainingData = {};
        Object.keys(data).map(d => {
            //console.log(d, data[d]);
            const date = new Date(d);
            console.log(date, date.getDay());
            trainingData[d] = {
                amount: data[d],
                temp: weatherData[d],
                day: date.getDay()
            };
        }); */

        const trainingData = Object.keys(data).map(d => {
            //console.log(d, data[d]);
            const date = new Date(d);
            console.log(date, date.getDay());
            return {
                amount: data[d],
                temp: weatherData[d],
                day: date.getDay(),
                date: d
            }
        });

        console.log(JSON.stringify(trainingData));

    },
    init: function() {
        console.log('Init');
        this.fetch();
    }
};

train.init();