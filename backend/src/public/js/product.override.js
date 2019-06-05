$('form').submit((e) => e.preventDefault());
$(() => {
    const variables = getUrlVars();
    $('#ipAddress').html(variables.address);
    $('#name').html(variables.name);
    $('#open').click(() => turnOn(variables.address));
    $('#close').click(() => turnOff(variables.address));
    $.get(`/monitor/detail/${variables.address}`).then((res) => {
        console.log(res.detail);
        $('#indoorTemp').html(`${res.detail.tempInside} celcius`);
        $('#light').html(`${res.detail.light} Lux`);
        $('#humidity').html(`${res.detail.humidity} %`);
        $('#outdoorTemp').html(`${res.detail.tempOutside}<span>celcius</span>`);
    });
    let hourOptions = `<option selected>Choose...</option>`;
    for (let i = 0; i < 24; i++) {
        hourOptions += `<option value="${i}">${i}</option>`
    }
    $('#hourOptions').html(hourOptions)
    let minuteOptions = `<option selected>Choose...</option>`;
    for (let i = 0; i < 60; i++) {
        minuteOptions += `<option value="${i}">${i}</option>`
    }
    $('#minuteOptions').html(minuteOptions);
    $('#submitTurnOnTime').click(() => {
        let targetTemperature = $('#targetTemperature').val();
        let hourOptions = $('#hourOptions').val();
        let minuteOptions = $('#minuteOptions').val();
        let currentDate = new Date();
        currentDate.setHours(hourOptions);
        currentDate.setMinutes(minuteOptions);
        $.post('/user/setBedTimeFor', {
            date: currentDate,
            temp: targetTemperature,
            ipAddress: variables.address,
        }).then((res, err) => {
            console.log(res);
        });
    });
    $('#setAutoSunrise').click(() => {
        console.log('Hello World');
        $.get('/calculation/setCloseSunrise').then((res, err) => {
            console.log(res);
            $('#modal-body').html(res);
            $("#myModal").modal("show")
            return res;
        });
    });
});

function getUrlVars() {
    let vars = {};
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
        let hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function turnOff(ipAddress) {
    $.post('/control', {
        ipAddress: ipAddress,
        airStatus: 'CLOSE'
    }).then((err, res) => {
        console.log(err);
        console.log(res);
    });
}

function turnOn(ipAddress) {
    $.post('/control', {
        ipAddress: ipAddress,
        airStatus: 'OPEN'
    }).then((err, res) => {
        console.log(err);
        console.log(res);
    });
}