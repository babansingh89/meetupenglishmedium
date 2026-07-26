function ajaxindicatorstart(text) {
    if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
        jQuery('body').append(
            '<div id="resultLoading" style="display:none">' +
            '<div class="bg" style="position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:rgba(10,43,60,0.7);"></div>' +
            '<div class="loader-wrap" style="position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:180px;text-align:center;z-index:10;">' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:18px;">' +
            '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#0089b3;-webkit-animation:ldB 1s ease-in-out infinite;animation:ldB 1s ease-in-out infinite;"></span>' +
            '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#f0bcb4;-webkit-animation:ldB 1s ease-in-out 0.15s infinite;animation:ldB 1s ease-in-out 0.15s infinite;"></span>' +
            '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#8b5c7e;-webkit-animation:ldB 1s ease-in-out 0.3s infinite;animation:ldB 1s ease-in-out 0.3s infinite;"></span>' +
            '</div>' +
            '<div style="font-family:Roboto,sans-serif;font-size:15px;font-weight:400;color:rgba(255,255,255,0.9);letter-spacing:1px;">' + text + '</div>' +
            '</div>' +
            '<style>@-webkit-keyframes ldB{0%,60%,100%{-webkit-transform:translateY(0);opacity:.4}30%{-webkit-transform:translateY(-16px);opacity:1}}@keyframes ldB{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-16px);opacity:1}}</style>' +
            '</div>'
        );
    }

    jQuery('#resultLoading').css({
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'z-index': '10000000',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto'
    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
}

function ajaxindicatorstop() {
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}


jQuery(document).ajaxStart(function () {
    //show ajax indicator
    ajaxindicatorstart('Please wait..');
}).ajaxError(function (event, xhr, settings) {
    if (xhr.status == 401) {
        alert("Sorry, your session has expired. Please login again to continue");
        window.location.href = "/LoginERP";
    }
    else if (xhr.status == 500) {
        //alert("Error");
        window.location.href = "/Error";
    }
    else {
        alert("An error occurred: " + xhr.status + "Error: " + xhr.statusText);
    }
}).ajaxStop(function () {
    //hide ajax indicator
    ajaxindicatorstop();
});
$(document).keydown(function (e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
        ajaxindicatorstop();
    }
});