let gas_value, humid_value, temp_value;

let gas_data = [];
let gasChart;

let temp_data = [];
let tempChart;

let humid_data = [];
let humidChart;

const maxDataPoints = 10;
let startTime;


const temp_sensor = document.getElementById("temp-sensor");
const humid_sensor = document.getElementById("humid-sensor");
const gas_sensor = document.getElementById("gas-sensor");
const rain_sensor = document.getElementById("rain-sensor");

function getSensorValue() {
    gas_value = Math.floor(Math.random() * 4001);
    humid_value = Math.floor(Math.random() * 101);
    temp_value = Math.floor(Math.random() * 101);
    rain_value = Math.floor(Math.random() * 2);

    displayTemp(temp_value);
    displayHumid(humid_value);
    displayGas(gas_value);
    displayRain(rain_value);

    updateGasChart(gas_value);
    updateTempChart(temp_value);
    updateHumidChart(humid_value);
}

function displayRain(rain_value){
    rain_value = rain_value === 1 ? "RAIN" : "NOT RAIN";
    rain_sensor.textContent = rain_value;

    const container_rain = document.getElementById("container-rain");

    console.log(rain_value);
    
    if(rain_value === "RAIN"){
        container_rain.style.backgroundColor = "#FF6961";
        container_rain.style.color = "#f5f5f5";
    }else if(rain_value === "NOT RAIN"){
        container_rain.style.backgroundColor = "#6FC276";
        container_rain.style.color = "#f5f5f5";
    }else{
        container_rain.style.backgroundColor = "#f5f5f5";
        container_rain.textContent = "OUT OF RANGE"
    }
}

function displayTemp(temp_value) {
    temp_sensor.textContent = temp_value + "°C";

    const container_temp = document.getElementById("container-temp");

    if (temp_value <= 25) {
        container_temp.style.backgroundColor = "#6488EA";
        container_temp.style.color = "#f5f5f5";
    } else if (temp_value > 25 && temp_value <= 35) {
        container_temp.style.backgroundColor = "#6FC276";
        container_temp.style.color = "#f5f5f5";
    } else if (temp_value > 35) {
        container_temp.style.backgroundColor = "#FF6961";
        container_temp.style.color = "#f5f5f5";
    }else{
        container_temp.style.backgroundColor = "#f5f5f5";
        container_temp.textContent = "OUT OF RANGE"
    }
}

function updateTempChart(temp_value) {
    temp_data.push(temp_value);

    if (!tempChart) {
        startTime = new Date();
        tempChart = Highcharts.chart('chart-temp', {
            chart: {
                type: 'spline',
                width: 750,
                height: 226
            },
            title: {
                text: 'TEMPERATURE'
            },
            xAxis: {
                title: {
                    text: 'Time (HH:MM:SS)'
                },
                labels: {
                    formatter: function () {
                        const currentTime = new Date(startTime.getTime() + this.value * 1000);
                        return Highcharts.dateFormat('%H:%M:%S', currentTime);
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                min: 0,
                max: 100
            },
            tooltip: {
                formatter: function () {
                    const time = Highcharts.dateFormat('%H:%M:%S', new Date(startTime.getTime() + this.x * 1000));
                    return `<b>Time:</b> ${time}<br/><b>Temperature:</b> ${this.y}°C`;
                }
            },
            series: [{
                name: 'Temperature',
                data: [],
                lineWidth: 2,
                color: '#6488EA',
                marker: {
                    enabled: true,
                    radius: 4,
                    fillColor: '#4771e6',
                    lineWidth: 2,
                    lineColor: '#4771e6'
                },
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{y}°C'
                }
            }],
            legend: {
                enabled: false
            }
        });
    } else {
        tempChart.series[0].addPoint(temp_value, true, false);
    }

    if (temp_data.length > maxDataPoints) {
        temp_data.shift();
        tempChart.series[0].data[0].remove(false);
    }
}

function displayHumid(humid_value) {
    humid_sensor.textContent = humid_value + "%";

    const container_humid = document.getElementById("container-humid");

    if (humid_value <= 40) {
        container_humid.style.backgroundColor = "#FBB117";
        container_humid.style.color = "#f5f5f5";
    } else if (humid_value > 40 && humid_value <= 70) {
        container_humid.style.backgroundColor = "#6FC276";
        container_humid.style.color = "#f5f5f5";
    } else if (humid_value > 70) {
        container_humid.style.backgroundColor = "#6488EA";
        container_humid.style.color = "#f5f5f5";
    }else{
        container_humid.style.backgroundColor = "#f5f5f5";
        container_humid.textContent = "OUT OF RANGE"
    }
}

function updateHumidChart(humid_value) {
    humid_data.push(humid_value);

    if (!humidChart) {
        startTime = new Date();
        humidChart = Highcharts.chart('chart-humid', {
            chart: {
                type: 'spline',
                width: 750,
                height: 226
            },
            title: {
                text: 'HUMIDITY'
            },
            xAxis: {
                title: {
                    text: 'Time (HH:MM:SS)'
                },
                labels: {
                    formatter: function () {
                        const currentTime = new Date(startTime.getTime() + this.value * 1000);
                        return Highcharts.dateFormat('%H:%M:%S', currentTime);
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Humidity (%)'
                },
                min: 0,
                max: 100
            },
            tooltip: {
                formatter: function () {
                    const time = Highcharts.dateFormat('%H:%M:%S', new Date(startTime.getTime() + this.x * 1000));
                    return `<b>Time:</b> ${time}<br/><b>Humidity:</b> ${this.y}%`;
                }
            },
            series: [{
                name: 'Humidity',
                data: [],
                lineWidth: 2,
                color: '#6FC276',
                marker: {
                    enabled: true,
                    radius: 4,
                    fillColor: '#4fbd58',
                    lineWidth: 2,
                    lineColor: '#4fbd58'
                },
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{y}%'
                }
            }],
            legend: {
                enabled: false
            }
        });
    } else {
        humidChart.series[0].addPoint(humid_value, true, false);
    }

    if (humid_data.length > maxDataPoints) {
        humid_data.shift();
        humidChart.series[0].data[0].remove(false);
    }
}

function displayGas(gas_value) {
    gas_sensor.textContent = gas_value + " ppm";

    const container_gas = document.getElementById("container-gas");

    if (gas_value <= 1000) {
        container_gas.style.backgroundColor = "#6FC276";
        container_gas.style.color = "#f5f5f5";
    } else if (gas_value > 1000 && gas_value <= 3000) {
        container_gas.style.backgroundColor = "#FBB117";
        container_gas.style.color = "#f5f5f5";
    } else if (gas_value > 3000) {
        container_gas.style.backgroundColor = "#FF6961";
        container_gas.style.color = "#f5f5f5";
    }else{
        container_gas.style.backgroundColor = "#f5f5f5";
        container_gas.textContent = "OUT OF RANGE"
    }
}

function updateGasChart(gas_value) {
    gas_data.push(gas_value);

    if (!gasChart) {
        startTime = new Date();
        gasChart = Highcharts.chart('chart-gas', {
            chart: {
                type: 'spline',
                width: 750,
                height: 226
            },
            title: {
                text: 'GAS CONCENTRATION LEVEL'
            },
            xAxis: {
                title: {
                    text: 'Time (HH:MM:SS)'
                },
                labels: {
                    formatter: function () {
                        const currentTime = new Date(startTime.getTime() + this.value * 1000);
                        return Highcharts.dateFormat('%H:%M:%S', currentTime);
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Gas Concentration Level (ppm)'
                },
                min: 0,
                max: 4000
            },
            tooltip: {
                formatter: function () {
                    const time = Highcharts.dateFormat('%H:%M:%S', new Date(startTime.getTime() + this.x * 1000));
                    return `<b>Time:</b> ${time}<br/><b>Gas Value:</b> ${this.y} ppm`;
                }
            },
            series: [{
                name: 'Gas',
                data: [],
                lineWidth: 2,
                color: '#FF6961',
                marker: {
                    enabled: true,
                    radius: 4,
                    fillColor: '#f95047',
                    lineWidth: 2,
                    lineColor: '#f95047'
                },
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{y} ppm'
                }
            }],
            legend: {
                enabled: false
            }
        });
    } else {
        gasChart.series[0].addPoint(gas_value, true, false);
    }

    if (gas_data.length > maxDataPoints) {
        gas_data.shift();
        gasChart.series[0].data[0].remove(false);
    }
}

setInterval(getSensorValue, 1500);