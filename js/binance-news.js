/**
 * 币安公告自动同步
 * 从币安API获取最新公告
 */

class BinanceNews {
    constructor() {
        this.news = [];
        this.cacheKey = 'binance_news_cache';
        this.cacheTimeKey = 'binance_news_cache_time';
        this.cacheDuration = 30 * 60 * 1000; // 30分钟缓存
    }
    
    // 获取公告列表
    async fetchNews(pageSize = 10, catalogId = 48) {
        // 检查缓存
        const cached = this.getCache();
        if (cached) {
            console.log('使用缓存的公告数据');
            return cached;
        }
        
        try {
            // 由于币安API可能有CORS限制，我们使用一个代理或备用方案
            // 方案1: 直接请求（如果CORS允许）
            // 方案2: 使用JSONP或代理服务
            
            const url = `https://www.binance.com/bapi/composite/v1/public/cms/article/catalog/list/query?catalogId=${catalogId}&pageNo=1&pageSize=${pageSize}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success && data.data && data.data.articles) {
                this.news = data.data.articles.map(article => ({
                    id: article.id,
                    title: article.title,
                    description: article.description || '',
                    url: `https://www.binance.com/zh-CN/support/announcement/${article.code}`,
                    publishTime: article.publishTime,
                    formattedTime: Utils.formatDate(article.publishTime)
                }));
                
                // 保存到缓存
                this.setCache(this.news);
                
                return this.news;
            }
            
            throw new Error('Invalid response format');
            
        } catch (error) {
            console.error('获取币安公告失败:', error);
            // 返回备用数据或空数组
            return this.getFallbackNews();
        }
    }
    
    // 获取缓存
    getCache() {
        try {
            const cacheTime = localStorage.getItem(this.cacheTimeKey);
            if (!cacheTime) return null;
            
            const now = Date.now();
            if (now - parseInt(cacheTime) > this.cacheDuration) {
                return null;
            }
            
            const cached = localStorage.getItem(this.cacheKey);
            return cached ? JSON.parse(cached) : null;
        } catch (e) {
            return null;
        }
    }
    
    // 设置缓存
    setCache(data) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify(data));
            localStorage.setItem(this.cacheTimeKey, Date.now().toString());
        } catch (e) {
            console.warn('无法缓存数据:', e);
        }
    }
    
    // 备用数据（当API失败时使用）
    getFallbackNews() {
        return [
            {
                id: 1,
                title: '币安新币上线通知',
                description: '币安将上线新的加密货币交易对，敬请期待。',
                url: 'https://www.binance.com/zh-CN/support/announcement',
                publishTime: new Date().toISOString(),
                formattedTime: '刚刚'
            },
            {
                id: 2,
                title: '交易手续费优惠活动',
                description: '限时交易手续费折扣活动正在进行中。',
                url: 'https://www.binance.com/zh-CN/support/announcement',
                publishTime: new Date(Date.now() - 3600000).toISOString(),
                formattedTime: '1小时前'
            },
            {
                id: 3,
                title: '系统维护公告',
                description: '币安将进行系统升级维护，部分功能可能暂时不可用。',
                url: 'https://www.binance.com/zh-CN/support/announcement',
                publishTime: new Date(Date.now() - 86400000).toISOString(),
                formattedTime: '1天前'
            }
        ];
    }
    
    // 渲染新闻列表到页面
    async renderNewsPreview(containerId, limit = 3) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const news = await this.fetchNews(limit);
        
        if (news.length === 0) {
            container.innerHTML = '<p class="text-binance-light text-center py-8">暂无公告</p>';
            return;
        }
        
        container.innerHTML = news.map(item => `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" 
               class="block bg-binance-darker border border-binance-gray rounded-xl p-4 hover:border-binance-yellow transition-all group">
                <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-white group-hover:text-binance-yellow transition-colors truncate">
                            ${Utils.truncate(item.title, 60)}
                        </h3>
                        <p class="text-binance-light text-sm mt-1 line-clamp-2">
                            ${item.description || '点击查看详情'}
                        </p>
                    </div>
                    <span class="text-binance-light text-xs whitespace-nowrap ml-4">
                        ${item.formattedTime}
                    </span>
                </div>
            </a>
        `).join('');
    }
    
    // 渲染完整新闻列表
    async renderNewsList(containerId, pageSize = 20) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // 显示加载状态
        container.innerHTML = `
            <div class="flex items-center justify-center py-12">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-binance-yellow"></div>
                <span class="ml-3 text-binance-light">加载中...</span>
            </div>
        `;
        
        const news = await this.fetchNews(pageSize);
        
        if (news.length === 0) {
            container.innerHTML = '<p class="text-binance-light text-center py-12">暂无公告</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="space-y-4">
                ${news.map(item => `
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer" 
                       class="block bg-binance-darker border border-binance-gray rounded-xl p-6 hover:border-binance-yellow transition-all group">
                        <div class="flex items-start justify-between">
                            <div class="flex-1 min-w-0">
                                <h3 class="text-lg font-semibold text-white group-hover:text-binance-yellow transition-colors">
                                    ${item.title}
                                </h3>
                                <p class="text-binance-light mt-2">
                                    ${item.description || '点击查看详情'}
                                </p>
                            </div>
                            <span class="text-binance-light text-sm whitespace-nowrap ml-4">
                                ${item.formattedTime}
                            </span>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    const binanceNews = new BinanceNews();
    
    // 在首页渲染预览
    binanceNews.renderNewsPreview('news-preview', 3);
    
    // 在新闻页面渲染完整列表
    binanceNews.renderNewsList('news-list', 20);
    
    // 每小时自动刷新
    setInterval(() => {
        binanceNews.renderNewsPreview('news-preview', 3);
        binanceNews.renderNewsList('news-list', 20);
    }, 3600000);
});
