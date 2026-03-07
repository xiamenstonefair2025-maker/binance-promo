/**
 * 币安推广网站配置
 * 修改此文件以更新跳转链接
 */

const CONFIG = {
    // 币安注册链接（带返佣码）
    BINANCE_REGISTER_URL: 'https://www.bsmkweb.cc/join?ref=VIPBN',
    
    // Telegram社群链接
    TELEGRAM_URL: 'https://t.me/CXWeb3',
    
    // 币安API配置（用于获取公告）
    BINANCE_API: {
        // 币安公告API
        NOTICE_URL: 'https://www.binance.com/bapi/composite/v1/public/cms/article/catalog/list/query',
        // catalogId: 48 = 最新公告, 49 = 活动公告
        CATALOG_ID: 48,
        // 每页数量
        PAGE_SIZE: 10
    },
    
    // 网站信息
    SITE: {
        NAME: '币安推广官方合作',
        DESCRIPTION: '币安官方推广合作伙伴，注册即享最高40%交易返佣',
        COMMISSION_RATE: '40%'
    }
};

// 导出配置（兼容不同模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
