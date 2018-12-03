function loadCharts(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var graphParams = getGraph(this.response);
            Plotly.newPlot("gauge1", graphParams[0].data, graphParams[0].layout,{displayModeBar: false});
            Plotly.newPlot("bar1", graphParams[1].data, graphParams[1].layout, {displayModeBar: false});

        }
    };
    xhttp.open("GET",   "/reviews");
    xhttp.send();
}


function getGraph(json) {


    var arr = JSON.parse(json);

    var level = arr[2];

    var degrees = 10.9 - level,
        radius = .5;
    var radians = degrees * Math.PI / 10;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var return_dict = [
        {
            data: [{
                type: 'scatter',
                x: [0], y: [0],
                marker: {size: 20, color: '850000'},
                showlegend: false,
                name: 'score',
                text: level,
                hoverinfo: 'text+name'
            },
                {
                    values: [50 / 10, 50 / 10, 50 / 10, 50 / 10, 50 / 10, 50 / 10, 50 / 10, 50 / 10, 50 / 10, 50 / 10, 50],
                    rotation: 90,
                    text: ['10', '9', '8', '7',
                        '6', '5', '4', '3', '2', '1', ''],
                    textinfo: 'text',
                    marker: {
                        colors: ['rgba(24, 255, 9,.9)', 'rgba(73, 252, 8, .8)',
                            'rgba(120, 249, 7 , .7)', 'rgba(167, 246, 6, .65)',
                            'rgba(213, 243, 5 , .5)', 'rgba(240, 222, 4, .5)', 'rgba(237, 171, 3,.5)',
                            'rgba(234, 122, 2, .5)', 'rgba(231, 73, 1, .5)',
                            'rgba(229, 24, 0,.5)',
                            'rgba(255, 255, 255, 0)']
                    },
                    hoverinfo: "none",
                    hole: .3,
                    showlegend: false,
                    type: 'pie',

                }
            ], layout: {
                shapes: [{
                    type: 'path',
                    path: path,
                    fillcolor: '850000',
                    line: {
                        color: '850000'
                    }
                }],
                title: arr[0] + " " + "by" + " " + arr[1],
                height: 800,
                width: 800,
                xaxis: {
                    zeroline: false, showticklabels: false,
                    showgrid: false, range: [-1, 1]
                },
                yaxis: {
                    zeroline: false, showticklabels: false,
                    showgrid: false, range: [-1, 1]
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)'
            }
        }, {
            data: [
                {
                    x: ['Review', 'Average'],
                    y: [arr[2], 7.5], //HERE
                    showlegend: false,
                    marker: {color: 'rgba(96, 134, 172,0.9)'},
                    type: 'bar',
                    hoverinfo: "none",
                }
            ],
            layout: {
                height: 470,
                width: 800,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)'
            }
        }
    ];
    return return_dict
}

