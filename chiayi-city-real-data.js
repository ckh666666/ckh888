/**
 * 嘉义市2024年大选真实数据
 * 数据来源：台湾22县市选举数据.csv
 */

const chiayiCityRealData = {
    '东区': { kmt_votes: 23575, dpp_votes: 29901, tpp_votes: 17487, total_votes: 70963, kmt_rate: 33.22, dpp_rate: 42.14, tpp_rate: 24.64 },
    '西区': { kmt_votes: 25932, dpp_votes: 38298, tpp_votes: 22463, total_votes: 86693, kmt_rate: 29.91, dpp_rate: 44.18, tpp_rate: 25.91 }
};
// 繁体别名
chiayiCityRealData['東區'] = chiayiCityRealData['东区'];
chiayiCityRealData['西區'] = chiayiCityRealData['西区'];

window.chiayiCityRealData = chiayiCityRealData;
console.log('✅ 嘉义市真实选举数据已加载');