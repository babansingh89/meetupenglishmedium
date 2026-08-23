(function () {
    var _customAlertInitialized = false;
    var _pendingOk = null;

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
            '.custom-alert-box .ca-btn.ca-btn-cancel{background:#fff;color:#64748b;border:1.5px solid #e2e8f0;box-shadow:none;margin-left:10px}' +
            '.custom-alert-box .ca-btn.ca-btn-cancel:hover{background:#f8fafc;color:#1e293b;border-color:#cbd5e1;transform:none;box-shadow:none}' +
            '.custom-alert-box.ca-wide{width:560px;text-align:left}' +
            '.custom-alert-box.ca-xwide{width:820px;text-align:left}' +
            '.custom-alert-box.ca-wide .ca-body{padding:20px 24px 8px;text-align:left}' +
            '.custom-alert-box.ca-wide .ca-message{text-align:left}' +
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
            '<button class="ca-btn ca-btn-cancel" id="caCancelBtn" style="display:none;"><i class="fa fa-times"></i><span>Cancel</span></button>' +
            '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        function hideOverlay() {
            overlay.classList.remove('show');
            document.getElementById('caCancelBtn').style.display = 'none';
            var boxEl = document.querySelector('.custom-alert-box');
            boxEl.classList.remove('ca-wide');
            boxEl.classList.remove('ca-xwide');
            _pendingOk = null;
        }

        document.getElementById('caOkBtn').addEventListener('click', function () {
            overlay.classList.remove('show');
            document.getElementById('caCancelBtn').style.display = 'none';
            var boxEl = document.querySelector('.custom-alert-box');
            boxEl.classList.remove('ca-wide');
            boxEl.classList.remove('ca-xwide');
            var cb = _pendingOk;
            _pendingOk = null;
            if (typeof cb === 'function') cb();
        });
        document.getElementById('caCancelBtn').addEventListener('click', function () {
            hideOverlay();
        });
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) hideOverlay();
        });
    }

    function showCustomAlert(message, type, onOk, opts) {
        _initCustomAlert();
        var header = document.getElementById('caHeader');
        type = type || 'info';
        var boxEl = document.querySelector('.custom-alert-box');
        var isHtml = !!(opts && opts.html);

        if (isHtml) { boxEl.classList.add('ca-wide'); } else { boxEl.classList.remove('ca-wide'); }
        if (opts && opts.wide) { boxEl.classList.add('ca-xwide'); } else { boxEl.classList.remove('ca-xwide'); }

        header.className = 'ca-header ' + type;
        var config = {
            info: { icon: 'fa-info-circle', title: 'Info' },
            error: { icon: 'fa-times-circle', title: 'Error' },
            success: { icon: 'fa-check-circle', title: 'Success' },
            warning: { icon: 'fa-exclamation-triangle', title: 'Warning' }
        };
        var cfg = config[type] || config.info;
        header.querySelector('.ca-header-icon').innerHTML = '<i class="fa ' + cfg.icon + '"></i>';
        document.getElementById('caTitle').textContent = (opts && opts.title) ? opts.title : cfg.title;
        if (isHtml) {
            document.getElementById('caMessage').innerHTML = message;
        } else {
            document.getElementById('caMessage').textContent = message;
        }
        _pendingOk = (typeof onOk === 'function') ? onOk : null;
        document.getElementById('caCancelBtn').style.display = _pendingOk ? 'inline-flex' : 'none';
        document.getElementById('customAlertOverlay').classList.add('show');
    }

    window.showCustomAlert = showCustomAlert;
    window.alert = function (message) {
        showCustomAlert(message, 'info');
    };
})();
