var errorDiv = $('#errorBlock').find('div.alert.alert-danger.display-none');
var successDiv = $('#errorBlock').find('div.alert.alert-success.display-none');

var ModalerrorDiv = $('#ErrorBlock_M').find('div.alert.alert-danger.display-none');
var ModalsuccessDiv = $('#SuccessBlock_M').find('div.alert.alert-success.display-none');

function HideSuccErrDiv() {
    successDiv.hide();
    errorDiv.hide();
}
function ModalHideSuccErrDiv() {
    //ModalsuccessDiv.hide();
    //ModalerrorDiv.hide();
    $("#ErrorBlock_M").hide();
    $("#SuccessBlock_M").hide();
}

function FieldError(elementID, msg) {
    var errorSpanLength = $('#' + elementID + "-error").length;
    if (errorSpanLength == 0) {
        var errorElement = $("<span>").attr("id", elementID + "-error").addClass("help-block help-block-error").html(msg);
        errorElement.insertAfter($('#' + elementID));
        $('#' + elementID).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
    }
    else {
        $('#' + elementID + "-error").html(msg);
        $('#' + elementID).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
    }
}
function FieldSuccess(elementID, msg) {
    var errorSpanLength = $('#' + elementID + "-error").length;
    if (errorSpanLength > 0) {
        $('#' + elementID + "-error").remove();
        $('#' + elementID).closest('.form-group').removeClass('has-error').addClass('has-success'); // set error class to the control group
    }
}
function FormError(message, type, parrentID) {
    if (type == 'Error') {
        if ($('.alert-danger').length > 0) {
            $('.alert-danger').find('span').text(message);
        }
        else {
            var pageErrorElement = $("<div>").addClass("alert alert-danger display-block").html("<button class='close' data-dismiss='alert'></button> <span>" + message + "</span>");
            //pageErrorElement.insertAfter($(parrentID));
            $(parrentID).append(pageErrorElement);
        }
    }
    else if (type == 'Success') {
        if ($('.alert-success').length > 0) {
            $('.alert-success').find('span').text(message);
        }
        else {
            var pageErrorElement = $("<div>").addClass("alert alert-success display-block").html("<button class='close' data-dismiss='alert'></button> <span>" + message + "</span>");
            //pageErrorElement.insertAfter($(parrentID));
            $(parrentID).append(pageErrorElement);
        }
    }
}

function FormSuccessError(Message, Status, parrentID) {
    successDiv.hide();
    errorDiv.hide();
    if (Status == "Error") {
        FormError(Message, Status, parrentID);
        errorDiv.show();
    }
    else if (Status == "Success") {
        FormError(Message, Status, parrentID);
        successDiv.show();
    }
    $("html, body").animate({ scrollTop: $('#div_Scroll').offset().top }, "slow");
}


function ModalPopupError(message, type, parrentID) {
    ModalHideSuccErrDiv();
    if (type == 'Error') {
        if ($('.alert-danger').length > 0) {
            $('.alert-danger').find('span').text(message);
        }
        else {
            var pageErrorElement = $("<div>").addClass("alert alert-danger display-block").html("<button class='close' data-dismiss='alert'></button> <span>" + message + "</span>");
            //pageErrorElement.insertAfter($(parrentID));
            $(parrentID).append(pageErrorElement);
        }
        $("#ErrorBlock_M").show();
    }
    else if (type == 'Success') {
        if ($('.alert-success').length > 0) {
            $('.alert-success').find('span').text(message);
        }
        else {
            var pageErrorElement = $("<div>").addClass("alert alert-success display-block").html("<button class='close' data-dismiss='alert'></button> <span>" + message + "</span>");
            //pageErrorElement.insertAfter($(parrentID));
            $(parrentID).append(pageErrorElement);
        }
        $("#SuccessBlock_M").show();
    }
}
function FieldErrorForDropDown(elementID, msg) {
    var errorSpanLength = $('#' + elementID + "-error").length;

    if (errorSpanLength == 0) {
        var errorElement = $("<span>")
            .attr("id", elementID + "-error")
            .addClass("help-block help-block-error")
            .html(msg);
        errorElement.insertBefore($('#' + elementID));
        $('#' + elementID).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
        $('#' + elementID).closest('.col-md-6').removeClass('has-success').addClass('has-error'); // set error class to the control col-md-6
    }
    else {
        $('#' + elementID + "-error").html(msg);
        $('#' + elementID).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
        $('#' + elementID).closest('.col-md-6').removeClass('has-success').addClass('has-error'); // set error class to the control col-md-6
    }
}
function FieldErrorOnClass(elementID, msg, classname) {
    var errorSpanLength = $('#' + elementID + "-error").length;
    if (errorSpanLength == 0) {
        var errorElement = $("<span>")
            .attr("id", elementID + "-error")
            .addClass("help-block help-block-error")
            .html(msg);
        errorElement.insertAfter($('#' + elementID));
        $('#' + elementID).closest(classname).removeClass('has-success').addClass('has-error'); // set error class to the control group
    }
    else {
        $('#' + elementID + "-error").html(msg);
        $('#' + elementID).closest(classname).removeClass('has-success').addClass('has-error'); // set error class to the control group
    }
}
function FieldErrorForDropDownOnClass(elementID, msg, classname) {
    var errorSpanLength = $('#' + elementID + "-error").length;

    if (errorSpanLength == 0) {
        var errorElement = $("<span>")
            .attr("id", elementID + "-error")
            .addClass("help-block help-block-error")
            .html(msg);
        errorElement.insertBefore($('#' + elementID));
        $('#' + elementID).closest(classname).removeClass('has-success').addClass('has-error'); // set error class to the control group
    }
    else {
        $('#' + elementID + "-error").html(msg);
        $('#' + elementID).closest(classname).removeClass('has-success').addClass('has-error'); // set error class to the control group
    }
}
$('body').on('focus', ".Decimal", function () {
    $(this).keypress(function (event) {
        return isDecimal(event, this)
    });
})
$('body').on('focus', ".Numeric", function () {
    $(this).keypress(function (event) {
        return isNumber(event, this)
    });
})
$('body').on('focus', ".Email", function () {
    $(this).keypress(function (event) {
        return isEmail(event, this)
    });
})
$(document).on('keyup', "input[type=text]", function () {

    var id = $(this).attr('id');
    var errorSpanLength = $('#' + id + "-error").length;
    if (errorSpanLength > 0) {
        $('#' + id + "-error").remove();
        $('#' + id).closest('.form-group').removeClass('has-error'); // set error class to the control group
        $('#' + id).closest('.col-md-6').removeClass('has-error'); // set error class to the control group
    }

});
$(document).on('keyup', "textarea", function () {

    var id = $(this).attr('id');
    var errorSpanLength = $('#' + id + "-error").length;
    if (errorSpanLength > 0) {
        $('#' + id + "-error").remove();
        $('#' + id).closest('.form-group').removeClass('has-error'); // set error class to the control group
    }

});
$(document).on('change', 'select', function () {

    var id = $(this).attr('id');
    var errorSpanLength = $('#sp' + id + "-error").length;
    if (errorSpanLength > 0) {
        $('#sp' + id + "-error").remove();
        $('#sp' + id).closest('.form-group').removeClass('has-error'); // set error class to the control group
        $('#sp' + id).closest('.col-md-6').removeClass('has-error'); // set error class to the control group
    }

});

function isEmail(evt, element) {
    if (isValidEmailAddress(element)) {
        alert(element);
        FieldError(element, 'Please Enter Correct Email ID')
        return false;
    } else {
        return true;
    }
}

function isValidEmailAddress(emailAddress) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}

function isDecimal(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode < 48 || charCode > 57))
        return false;

    return true;
}

function ShowCustomMessage(status, CustomMessage) {
    if (status == "Success") {
        Show_Hide_AlertDiv();
        $('#ModalSuccessAlert').append('<p>' + CustomMessage + '</p>').show();
    }
    else {
        Show_Hide_AlertDiv();
        $('#ModalErrorAlert').append('<p>' + CustomMessage + '</p>').show();
    }
    $('#AlertModal').modal();
}
function Show_Hide_AlertDiv() {
    $('#ModalSuccessAlert').empty();
    $('#ModalSuccessAlert').hide();
    $('#ModalErrorAlert').empty();
    $('#ModalErrorAlert').hide();
}

function fnValidatePAN(panno) {
    if (panno != "") {
        var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
        var code = /([C,P,H,F,A,T,B,L,J,G])/;
        var code_chk = panno.substring(3, 4);
        if (panno.search(panPat) == -1) {
            //alert("Invalid Pan No");
            return false;
        }
    }
}

function IsValidEmail(_email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(_email)) {
        return true;
    }
    else {
        return false;
    }
}

function IsValidPhone(_phone) {
    var regex = /^[0-9-+()]*$/;
    if (regex.test(_phone)) {
        return true;
    }
    else {
        return false;
    }
}

var _customAlertInitialized = false;
function _initCustomAlert() {
    if (_customAlertInitialized) return;
    _customAlertInitialized = true;

    var css = document.createElement('style');
    css.textContent =
        '.custom-alert-overlay{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:rgba(0,0,0,0.55);z-index:999999;display:none}' +
        '.custom-alert-overlay.show{display:-webkit-flex !important;display:flex !important;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center}' +
        '.custom-alert-box{background:#fff;border-radius:14px;padding:32px 36px 28px;max-width:420px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.25);animation:customAlertIn .3s ease}' +
        '.custom-alert-box .ca-icon{width:56px;height:56px;line-height:56px;border-radius:50%;font-size:26px;display:inline-block;margin-bottom:14px;color:#fff}' +
        '.custom-alert-box .ca-icon.info{background:linear-gradient(135deg,#0089b3,#006d8f)}' +
        '.custom-alert-box .ca-icon.error{background:linear-gradient(135deg,#e53e3e,#c53030)}' +
        '.custom-alert-box .ca-icon.success{background:linear-gradient(135deg,#38a169,#276749)}' +
        '.custom-alert-box .ca-icon.warning{background:linear-gradient(135deg,#d69e2e,#b7791f)}' +
        '.custom-alert-box p{font-family:"Roboto",sans-serif;font-size:16px;font-weight:400;color:#2d3748;margin:8px 0 22px;line-height:1.7}' +
        '.custom-alert-box .ca-btn{display:inline-block;padding:11px 40px;font-family:"Roboto",sans-serif;font-size:14px;font-weight:500;border:none;border-radius:8px;cursor:pointer;color:#fff;background:linear-gradient(135deg,#0089b3,#006d8f);transition:all .2s;letter-spacing:.8px}' +
        '.custom-alert-box .ca-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,137,179,0.35)}' +
        '@-webkit-keyframes customAlertIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}' +
        '@keyframes customAlertIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}';
    document.head.appendChild(css);

    var overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    overlay.id = 'customAlertOverlay';
    overlay.innerHTML =
        '<div class="custom-alert-box">' +
        '<div class="ca-icon info" id="caIcon"><i class="fa fa-info-circle"></i></div>' +
        '<p id="caMessage"></p>' +
        '<button class="ca-btn" id="caOkBtn">OK</button>' +
        '</div>';
    document.body.appendChild(overlay);

    document.getElementById('caOkBtn').addEventListener('click', function () {
        overlay.classList.remove('show');
    });
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('show');
    });
}

function showCustomAlert(message, type) {
    _initCustomAlert();
    var overlay = document.getElementById('customAlertOverlay');
    var icon = document.getElementById('caIcon');
    var msg = document.getElementById('caMessage');
    type = type || 'info';
    icon.className = 'ca-icon ' + type;
    var icons = { info: 'fa-info-circle', error: 'fa-times-circle', success: 'fa-check-circle', warning: 'fa-exclamation-triangle' };
    icon.innerHTML = '<i class="fa ' + (icons[type] || icons.info) + '"></i>';
    msg.textContent = message;
    overlay.classList.add('show');
}

window.alert = function (message) {
    showCustomAlert(message, 'info');
};