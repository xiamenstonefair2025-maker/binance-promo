/**
 * 主要交互逻辑
 */

document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 设置所有注册按钮的链接
    const registerButtons = [
        'nav-register-btn',
        'mobile-register-btn',
        'hero-register-btn',
        'cta-register-btn'
    ];
    
    registerButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn && typeof CONFIG !== 'undefined') {
            btn.href = CONFIG.BINANCE_REGISTER_URL;
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
        }
    });
    
    // 设置Telegram按钮链接
    const telegramButtons = [
        'telegram-btn',
        'cta-telegram-btn',
        'footer-telegram'
    ];
    
    telegramButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn && typeof CONFIG !== 'undefined') {
            btn.href = CONFIG.TELEGRAM_URL;
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
        }
    });
    
    // 导航栏滚动效果
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// 工具函数
const Utils = {
    // 格式化日期
    formatDate: function(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        // 小于1小时
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return minutes < 1 ? '刚刚' : `${minutes}分钟前`;
        }
        // 小于24小时
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `${hours}小时前`;
        }
        // 小于7天
        if (diff < 604800000) {
            const days = Math.floor(diff / 86400000);
            return `${days}天前`;
        }
        
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    },
    
    // 截断文本
    truncate: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
