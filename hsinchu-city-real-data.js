/**
 * 新竹市2024年大選真實數據
 * 數據來源：台灣22縣市選舉數據.csv
 */

const hsinchuCityRealData = {
    '東區': { kmt_votes: 40706, dpp_votes: 41716, tpp_votes: 44331, total_votes: 126753, kmt_rate: 32.11, dpp_rate: 32.91, tpp_rate: 34.98 },
    '北區': { kmt_votes: 28245, dpp_votes: 32902, tpp_votes: 30753, total_votes: 91900, kmt_rate: 30.73, dpp_rate: 35.80, tpp_rate: 33.47 },
    '香山區': { kmt_votes: 13375, dpp_votes: 18061, tpp_votes: 16300, total_votes: 47736, kmt_rate: 28.02, dpp_rate: 37.84, tpp_rate: 34.14 }
};

window.hsinchuCityRealData = hsinchuCityRealData;
console.log('✅ 新竹市真實選舉數據已加載');