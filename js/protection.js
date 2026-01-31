// Усиленная защита от просмотра кода
(function() {
    'use strict';
    
    // Защита от DevTools
    const devtools = {
        isOpen: false,
        orientation: null
    };
    
    const threshold = 160;
    
    const emitEvent = (isOpen, orientation) => {
        if (isOpen) {
            document.documentElement.innerHTML = `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #2E86AB 0%, #3CB371 100%);
                    color: white;
                    font-family: 'Segoe UI', sans-serif;
                    text-align: center;
                    padding: 20px;
                ">
                    <div style="font-size: 80px; margin-bottom: 20px;">🔒</div>
                    <h1 style="font-size: 48px; margin-bottom: 20px;">Доступ запрещен</h1>
                    <p style="font-size: 24px; max-width: 600px;">
                        Просмотр исходного кода этого сайта запрещен.<br>
                        Пожалуйста, закройте инструменты разработчика.
                    </p>
                    <p style="margin-top: 40px; font-size: 18px; opacity: 0.8;">
                        Codemy - Unlock Your Code Journey
                    </p>
                </div>
            `;
        }
    };
    
    setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';
        
        if (!(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
            if (!devtools.isOpen || devtools.orientation !== orientation) {
                emitEvent(true, orientation);
            }
            devtools.isOpen = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.isOpen) {
                emitEvent(false, null);
            }
            devtools.isOpen = false;
            devtools.orientation = null;
        }
    }, 500);
    
    // Дополнительная проверка через debugger
    setInterval(() => {
        const before = new Date();
        debugger;
        const after = new Date();
        if (after - before > 100) {
            emitEvent(true, 'debugger');
        }
    }, 1000);
    
    // Защита от копирования через буфер обмена
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        e.clipboardData.setData('text/plain', '© Codemy - Контент защищен');
        return false;
    });
    
    // Защита от скриншотов (частичная)
    document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('');
            alert('Скриншоты запрещены!');
        }
    });
    
    // Обфускация кода в консоли
    if (window.console) {
        Object.defineProperty(window.console, '_commandLineAPI', {
            get: function() {
                throw 'Доступ запрещен';
            }
        });
    }
    
    // Защита от автоматизации
    Object.defineProperty(navigator, 'webdriver', {
        get: () => false
    });
    
})();

// Защита от iframe
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

// Водяной знак (невидимый)
const watermark = document.createElement('div');
watermark.style.cssText = 'position:fixed;bottom:0;right:0;opacity:0.01;pointer-events:none;';
watermark.textContent = '© Codemy ' + new Date().toISOString();
document.body.appendChild(watermark);
