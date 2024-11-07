    // 1. Fetch the JSON data from an external file
    fetch('js/NC_Internet_Completed.json')  // Replace with the path to your JSON file
        .then(response => response.json())  // Parse the JSON
        .then(data => {
            // 2. Process the data to select relevant columns (cities and populations)
            const citiesData = data.map(item => ({
                name: item.city,  // Assuming the city name is stored under 'city' key
                population: item.population  // Assuming population is under 'population' key
            }));

            // 3. Prepare the data in the format Highcharts expects (array of arrays)
            const chartData = citiesData.map(city => [city.name, city.population]);

            // 4. Configure the Highcharts chart using the filtered data
            Highcharts.chart('chart0', {
                chart: {
                    type: 'column',
                    height: '100%', // Make it responsive
                    width: '100%'   // Make it responsive
                },
                title: {
                    text: 'World\'s largest cities per 2021'
                },
                subtitle: {
                    text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        autoRotation: [-45, -90],
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (millions)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
                },
                series: [{
                    name: 'Population',
                    colorByPoint: true,
                    groupPadding: 0,
                    data: chartData,  // Use the processed chartData
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        inside: true,
                        verticalAlign: 'top',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
