/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var socket = io();

/* Zone data TTL */
var zones = {
    zone_1: 0,
    zone_2: 0,
    zone_3: 0,
    zone_4: 0
};

function check_zones() {
    jQuery.each(zones, function (key, val) {
        zones[key] -= 10;
        if (zones[key] < 0) {
            $('#' + key).removeClass('zone_online');
            $('#' + key).addClass('zone_alert');
        }
    });
}
setInterval(check_zones, 1000);

socket.on('update_zone', function (data) {
    var zone_name = data.name.replace(' ', '_').toLowerCase();
    var count_id = data.name.replace(' ', '_').toLowerCase() + '_count';
    var noise_id = data.name.replace(' ', '_').toLowerCase() + '_noise';
    var temp_id = data.name.replace(' ', '_').toLowerCase() + '_temp';
    var gname_id = data.name.replace(' ', '_').toLowerCase() + '_gname';

    $('#' + count_id).html(data.count);
    $('#' + noise_id).html(data.noise);
    $('#' + temp_id).html(data.temp);
    $('#' + gname_id).html(data.gname);

    // Update zone data TTL
    zones[zone_name] = 100;

    // Change zone status highlighter
    $('#' + zone_name).removeClass('zone_alert');
    $('#' + zone_name).addClass('zone_online');
});

socket.on('update_msg', function (msg_data) {
    
    var msg_div = '<li> \
                <h4><span class="glyphicon-envelope"> </span><span class="sender">' + msg_data.from  + '</span>' + ' </span><span class="datetime">' + msg_data.datetime + '</span></h4> \
                <div> \
                    <p class="message">' + msg_data.message + '</p> \
                </div> \
            </li>';
    
    $('.mail').prepend(msg_div);
    var msgCount = $('.mail li').length;
    console.log("Msg count: " + msgCount);
    
    if ( msgCount > 4) {
        $('.mail li:last').remove();
    }
    
    // Refresh accordion
    $( ".mail" ).accordion( "refresh" );
    console.log(' New message  ' + msg_data.datetime + ' ' + msg_data.from + '\n' + msg_data.message);
});
