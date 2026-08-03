(function () {
    var _customAlertInitialized = false;

    function _initCustomAlert() {
        if (_customAlertInitialized) return;
        _customAlertInitialized = true;

        var css = document.createElement('style');
        css.textContent =
            '.custom-alert-overlay{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:rgba(2,10,20,0.55);z-index:999999;display:none}' +
            '.custom-alert-overlay.show{display:-webkit-flex !important;display:flex !important;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center}' +
            '.custom-alert-box{width:420px;max-width:92%;background:#fff;border-radius:16px;overflow:hidden;text-align:center;box-shadow:0 25px 70px rgba(0,0,0,0.35);animation:customAlertIn .3s ease;-webkit-animation:customAlertIn .3s ease}' +
            '.custom-alert-box .ca-header{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;gap:10px;padding:18px 20px;color:#fff;font-family:"Roboto",sans-serif}' +
            '.custom-alert-box .ca-header.info{background:linear-gradient(135deg,#0089b3,#006d8f)}' +
            '.custom-alert-box .ca-header.error{background:linear-gradient(135deg,#e53e3e,#c53030)}' +
            '.custom-alert-box .ca-header.success{background:linear-gradient(135deg,#38a169,#276749)}' +
            '.custom-alert-box .ca-header.warning{background:linear-gradient(135deg,#d69e2e,#b7791f)}' +
            '.custom-alert-box .ca-header .ca-header-icon{width:34px;height:34px;line-height:34px;border-radius:50%;background:rgba(255,255,255,0.22);font-size:16px;text-align:center;flex-shrink:0}' +
            '.custom-alert-box .ca-header .ca-title{font-size:17px;font-weight:600;letter-spacing:.5px;text-transform:uppercase}' +
            '.custom-alert-box .ca-body{padding:28px 30px 10px}' +
            '.custom-alert-box .ca-body .ca-message{font-family:"Roboto",sans-serif;font-size:15px;font-weight:400;color:#334155;line-height:1.7;margin:0;word-break:break-word}' +
            '.custom-alert-box .ca-footer{padding:20px 30px 26px}' +
            '.custom-alert-box .ca-btn{display:-webkit-inline-flex;display:inline-flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;gap:8px;padding:11px 44px;font-family:"Roboto",sans-serif;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;border:none;border-radius:8px;cursor:pointer;color:#fff;background:linear-gradient(135deg,#0089b3,#006d8f);box-shadow:0 4px 14px rgba(0,137,179,0.3);transition:all .2s}' +
            '.custom-alert-box .ca-btn:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,137,179,0.4)}' +
            '@-webkit-keyframes customAlertIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}' +
            '@keyframes customAlertIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}';
        document.head.appendChild(css);

        var overlay = document.createElement('div');
        overlay.className = 'custom-alert-overlay';
        overlay.id = 'customAlertOverlay';
        overlay.innerHTML =
            '<div class="custom-alert-box">' +
            '<div class="ca-header info" id="caHeader">' +
            '<span class="ca-header-icon"><i class="fa fa-info-circle"></i></span>' +
            '<span class="ca-title" id="caTitle">Info</span>' +
            '</div>' +
            '<div class="ca-body">' +
            '<p class="ca-message" id="caMessage"></p>' +
            '</div>' +
            '<div class="ca-footer">' +
            '<button class="ca-btn" id="caOkBtn"><i class="fa fa-check"></i><span>OK</span></button>' +
            '</div>' +
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
        var header = document.getElementById('caHeader');
        type = type || 'info';

        header.className = 'ca-header ' + type;
        var config = {
            info: { icon: 'fa-info-circle', title: 'Info' },
            error: { icon: 'fa-times-circle', title: 'Error' },
            success: { icon: 'fa-check-circle', title: 'Success' },
            warning: { icon: 'fa-exclamation-triangle', title: 'Warning' }
        };
        var cfg = config[type] || config.info;
        header.querySelector('.ca-header-icon').innerHTML = '<i class="fa ' + cfg.icon + '"></i>';
        document.getElementById('caTitle').textContent = cfg.title;
        document.getElementById('caMessage').textContent = message;
        overlay.classList.add('show');
    }

    window.showCustomAlert = showCustomAlert;
    window.alert = function (message) {
        showCustomAlert(message, 'info');
    };
})();
