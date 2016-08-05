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
        if (zones[key] < 0)
            $('#' + key).addClass('zone_alert');
        else
            $('#' + key).removeClass('zone_alert');
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
});

socket.on('update_msg', function (msg_data) {
    $('#msg_list').prepend(
            '<li><i class="unread openmodal"></i> \
                    \
			         <p class="sender">' + msg_data.from + '</p> \
                    <span class="datetime">' + msg_data.datetime + '</span> \
			         <p class="message">' + msg_data.message + '</p> \
			         <div class="actions"> \
            </li>'
            );
    $('#msg_list li:last').remove();
    console.log(item_id + ' New message  ' + msg_data.datetime + ' ' + msg_data.from + '\n' + msg_data.message);
});

$('.openmodal').on('click', function (e) {
    var html_text = $(this).html()
    $('#modalnew').modal('show');
});


