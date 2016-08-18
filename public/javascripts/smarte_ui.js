/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var socket = io();

    /* Zone data TTL */
    var zones = {
        zone_1: 0,
        zone_2: 0,
        zone_3: 0,
        zone_4: 0
    };

    function generateNumber(min, max) {
        min = typeof min !== 'undefined' ? min : 1;
        max = typeof max !== 'undefined' ? max : 100;

        return Math.floor((Math.random() * max) + min);
    }

    var chart,
            categories = ['Categorie 1', 'Categorie 2', 'Categorie 3', 'Categorie 4', 'Categorie 5', 'Categorie 6', 'Categorie 7', 'Categorie 8', 'Categorie 9', 'Categorie 10'],
            serie1 = [3, 4, 0, 4, 2, 0, 0, 3, 3, 1],
            serie2 = [2, 1, 2, 3, 2, 1, 0, 2, 2, 1];
    var chartingOptions = {
        chart: {
            renderTo: 'zonechart',
            type: 'column',
            backgroundColor: 'transparent',
            height: 100,
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 0,
            marginTop: 0
        },
        title: {
            text: ''
        },
        xAxis: {
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                enabled: false
            },
            categories: categories
        },
        yAxis: {
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            title: {
                text: null,
            },
        },
        series: [{
                name: 'Zone 1',
                data: serie1
            }, {
                name: 'Zone 2',
                data: serie2,
                color: 'blue'
            }],
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                borderWidth: 0,
                color: '#b2c831',
                shadow: false
            },
            line: {
                marker: {
                    enabled: false
                },
                lineWidth: 3
            }
        },
        tooltip: {
            enabled: false
        }
    };


    chart = new Highcharts.Chart(chartingOptions);


    function check_zones() {
        jQuery.each(zones, function (key, val) {
            zones[key] -= 10;
            if (zones[key] < 0) {
                $('#' + key).removeClass('zone_online');
                $('#' + key).addClass('zone_alert');
                $('#' + key).html('');
            }
        });
    }
    setInterval(check_zones, 1000);

    socket.on('update_zone', function (data) {

        var zone_name = data.name.replace(' ', '_').toLowerCase();
        var count_id = data.name.replace(' ', '_').toLowerCase() + '_count';
        var noise_id = data.name.replace(' ', '_').toLowerCase() + '_noise';
        var light_id = data.name.replace(' ', '_').toLowerCase() + '_light';
        var temp_id = data.name.replace(' ', '_').toLowerCase() + '_temp';
        var gname_id = data.name.replace(' ', '_').toLowerCase() + '_gname';


        var zone_div = '';
        // Add zone html structures 
        zone_div += '<dtitle>' + data.name + '</dtitle>';
        zone_div += '<p>Guarded by  - <span class="" id=' + gname_id + '>' + data.gname + '</span></p>';
        zone_div += '<span class="guest_count" id=' + count_id + '>' + data.count + '</span>';
        zone_div += '<p>Persons</p>';
        zone_div += '<div class="moreinfo">'
        zone_div += '<p> Light - <span class="" id=' + light_id + '>' + data.light + '</span> </p>';
        zone_div += '<p> Temp - <span class="" id=' + temp_id + '>' + data.temp + '</span> </p></div>';

        $('#' + zone_name).html(zone_div);
        // Update zone data TTL
        zones[zone_name] = 100;

        // Update chart series
        var zone_id = data.name.slice(-1);
        console.log('zone_id is: ' + zone_id + " Count: " + data.count);
        chart.series[zone_id - 1].addPoint(data.count, true, true);

        // Change zone status highlighter
        $('#' + zone_name).removeClass('zone_alert');
        $('#' + zone_name).addClass('zone_online');
    });

    socket.on('update_msg', function (msg_data) {

        var msg_div = '';
        for (var i = 0; i < msg_data.length; i++)
        {
            console.log(msg_data[i].sender + ' : ' + msg_data[i].message);
            var dateString = new Date(msg_data[i].datetime).toISOString().slice(0, 19).replace('T', ' ');

            msg_div += '<li> \
                <h4><span class="glyphicon-envelope"> </span><span class="sender">' + msg_data[i].sender + '</span><span class="datetime">' + dateString + '</span></h4> \
                <div> \
                    <p class="message">' + msg_data[i].message + '</p> \
                </div> \
            </li>';
        }

        $('.mail').html(msg_div);
        // Refresh accordion
        $(".mail").accordion("refresh");
        //console.log(' New message  ' + msg_data.datetime + ' ' + msg_data.sender + '\n' + msg_data.message);
    });

    /* Functio for display dashboard uptime */
    var date = new Date();
    var startTime = date.getTime();

    function uptimeUpdate() {
        var now = new Date();
        var difference = (now - startTime);

        days = Math.floor(difference / (60 * 60 * 1000 * 24) * 1);
        hours = Math.floor((difference % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
        mins = Math.floor(((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
        secs = Math.floor((((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);

        var outputText = hours + 'h ' + mins + 'm ' + secs + 's';
        $('#uptime').text(outputText);
        // console.log(outputText);
    }
    setInterval(uptimeUpdate, 1000);


    /* Chart stuff */

//
//    setInterval(function () {
//        chart.series[0].addPoint(generateNumber(), true, true);
//        chart.series[1].addPoint(generateNumber(), true, true);
//    }, 1000);

});