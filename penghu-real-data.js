/**
 * 澎湖縣2024年大選真實數據
 * 數據來源：中選會原始數據
 */

const penghuRealData = {
    '馬公市': { kmt_votes: 11784, dpp_votes: 11299, tpp_votes: 8163, total_votes: 31246, kmt_rate: 37.71, dpp_rate: 36.16, tpp_rate: 26.12 },
    '西嶼鄉': { kmt_votes: 1280, dpp_votes: 1519, tpp_votes: 743, total_votes: 3542, kmt_rate: 36.14, dpp_rate: 42.88, tpp_rate: 20.98 },
    '望安鄉': { kmt_votes: 471, dpp_votes: 764, tpp_votes: 277, total_votes: 1512, kmt_rate: 31.15, dpp_rate: 50.53, tpp_rate: 18.32 },
    '七美鄉': { kmt_votes: 452, dpp_votes: 389, tpp_votes: 244, total_votes: 1085, kmt_rate: 41.66, dpp_rate: 35.85, tpp_rate: 22.49 },
    '白沙鄉': { kmt_votes: 1631, dpp_votes: 1624, tpp_votes: 821, total_votes: 4076, kmt_rate: 39.99, dpp_rate: 39.84, tpp_rate: 20.14 },
    '湖西鄉': { kmt_votes: 2434, dpp_votes: 3428, tpp_votes: 1954, total_votes: 7816, kmt_rate: 31.14, dpp_rate: 43.86, tpp_rate: 24.99 }
};

window.penghuRealData = penghuRealData;
console.log('✅ 澎湖縣真實選舉數據已更新並加載');