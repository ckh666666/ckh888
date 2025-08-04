// 台北市2024年大选真实数据
const taipeiRealData = {
    '松山區': {
        kmt_votes: 47452,
        dpp_votes: 43780,
        tpp_votes: 26090,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '信義區': {
        kmt_votes: 53076,
        dpp_votes: 46634,
        tpp_votes: 30132,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '大安區': {
        kmt_votes: 72954,
        dpp_votes: 62381,
        tpp_votes: 35909,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '中山區': {
        kmt_votes: 48579,
        dpp_votes: 54448,
        tpp_votes: 30227,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '中正區': {
        kmt_votes: 34733,
        dpp_votes: 32196,
        tpp_votes: 21278,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '大同區': {
        kmt_votes: 21351,
        dpp_votes: 34270,
        tpp_votes: 18485,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '萬華區': {
        kmt_votes: 38905,
        dpp_votes: 43369,
        tpp_votes: 27497,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '文山區': {
        kmt_votes: 70844,
        dpp_votes: 50345,
        tpp_votes: 39875,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '南港區': {
        kmt_votes: 26529,
        dpp_votes: 26117,
        tpp_votes: 19007,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '內湖區': {
        kmt_votes: 64781,
        dpp_votes: 61339,
        tpp_votes: 44597,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '士林區': {
        kmt_votes: 56397,
        dpp_votes: 71869,
        tpp_votes: 37782,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    },
    '北投區': {
        kmt_votes: 51657,
        dpp_votes: 61151,
        tpp_votes: 35975,
        get total_votes() { return this.kmt_votes + this.dpp_votes + this.tpp_votes; },
        get kmt_rate() { return (this.kmt_votes / this.total_votes * 100).toFixed(2); },
        get dpp_rate() { return (this.dpp_votes / this.total_votes * 100).toFixed(2); },
        get tpp_rate() { return (this.tpp_votes / this.total_votes * 100).toFixed(2); }
    }
};

// 导出数据供其他模块使用
window.taipeiRealData = taipeiRealData;

console.log('✅ 台北市真实选举数据已加载'); 