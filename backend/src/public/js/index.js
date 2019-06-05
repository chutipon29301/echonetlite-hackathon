const imageSrc = ['images/mitsubishi_red.jpg', 'images/mitsubishi_black.jpg', 'images/mitsubishi_white.jpg']
$('form').submit((e) => e.preventDefault());
$(() => {
    $.get('/monitor/allDevice').then((res) => {
        $('#product-table').html(
            res.devices.map((device, index) => {
                return `<div class="col-xl-4 col-md-6" id="${device.address}">
                    <div class="product">
                        <div class="product_image"><img src="${imageSrc[index]}" alt=""></div>
                        <div class="product_content">
                            <div class="product_info d-flex flex-row align-items-start justify-content-start">
                                <div>
                                    <div>
                                        <div class="product_name"><a href="product.html?address=${device.address}&name=AirNo.${index + 1}">AirNo.${index + 1} <br />IP ${device.address}</a></div>
                                        <div class="product_category">Timer : 13:00</div>
                                    </div>
                                </div>
                                <div class="ml-auto text-right">
                                    <div class="product_category">Status</div>
                                    <div class="product_price text-right">${device.status ? 'ON' : 'OFF'}</div>
                                </div>
                            </div>
                            <div class="product_buttons">
                                <div class=" d-flex flex-row align-items-start justify-content-start">
                                    <div class="text-center d-flex flex-column align-items-center justify-content-center">
                                        <div>
                                            <div>Temp Inside: ${device.tempInside}C</div>
                                        </div>
                                    </div>
                                    <div class="text-center d-flex flex-column align-items-center justify-content-center">
                                        <div>
                                            <div>Temp Outside: ${device.tempOutside}C</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join('')
        );
    });
    // <option selected>Choose...</option>
    // 				<option value="0">0</option>
    // 				<option value="2">2</option>
    // 				<option value="3">3</option>
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
        $.post('/user/setBedTime',{
            date: currentDate,
            temp: targetTemperature,
        }).then((res,err) => {
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
// console.log($('#manual-operations-input'));
// // Time Picker Initialization
// $('#input_starttime').pickatime({
// });
// var input = $('#manual-operations-input').pickatime({
//     autoclose: true,
//     'default': 'now'
// });

// // Manually toggle to the minutes view
// $('#check-minutes').click((e) => {
//     e.stopPropagation();
//     input.pickatime('show').pickatime('toggleView', 'minutes');
// });

// Time Picker Initialization
$('#input_starttime').pickatime({});



// function submitTurnOnTimeFunc() {
//     console.log('adsfadsf');
// }