/**
 * 花蓮縣2024年大選真實數據
 * 數據來源：中選會原始數據
 */

const hualienRealData = {
    '花蓮市': { kmt_votes: 25996, dpp_votes: 15020, tpp_votes: 14116, total_votes: 55132, kmt_rate: 47.16, dpp_rate: 27.24, tpp_rate: 25.60 },
    '鳳林鎮': { kmt_votes: 3268, dpp_votes: 1518, tpp_votes: 1235, total_votes: 6021, kmt_rate: 54.28, dpp_rate: 25.21, tpp_rate: 20.51 },
    '玉里鎮': { kmt_votes: 5805, dpp_votes: 2630, tpp_votes: 2342, total_votes: 10777, kmt_rate: 53.87, dpp_rate: 24.40, tpp_rate: 21.73 },
    '新城鄉': { kmt_votes: 5423, dpp_votes: 2651, tpp_votes: 3168, total_votes: 11242, kmt_rate: 48.24, dpp_rate: 23.58, tpp_rate: 28.18 },
    '吉安鄉': { kmt_votes: 23358, dpp_votes: 12492, tpp_votes: 12520, total_votes: 48370, kmt_rate: 48.29, dpp_rate: 25.83, tpp_rate: 25.88 },
    '壽豐鄉': { kmt_votes: 4764, dpp_votes: 2630, tpp_votes: 2306, total_votes: 9700, kmt_rate: 49.11, dpp_rate: 27.11, tpp_rate: 23.77 },
    '光復鄉': { kmt_votes: 3692, dpp_votes: 1405, tpp_votes: 1152, total_votes: 6249, kmt_rate: 59.08, dpp_rate: 22.48, tpp_rate: 18.44 },
    '豐濱鄉': { kmt_votes: 1313, dpp_votes: 395, tpp_votes: 321, total_votes: 2029, kmt_rate: 64.71, dpp_rate: 19.47, tpp_rate: 15.82 },
    '瑞穗鄉': { kmt_votes: 3231, dpp_votes: 1339, tpp_votes: 1082, total_votes: 5652, kmt_rate: 57.17, dpp_rate: 23.69, tpp_rate: 19.14 },
    '富里鄉': { kmt_votes: 2555, dpp_votes: 1204, tpp_votes: 935, total_votes: 4694, kmt_rate: 54.43, dpp_rate: 25.65, tpp_rate: 19.92 },
    '秀林鄉': { kmt_votes: 4803, dpp_votes: 1258, tpp_votes: 2489, total_votes: 8550, kmt_rate: 56.18, dpp_rate: 14.71, tpp_rate: 29.11 },
    '萬榮鄉': { kmt_votes: 1886, dpp_votes: 351, tpp_votes: 754, total_votes: 2991, kmt_rate: 63.06, dpp_rate: 11.74, tpp_rate: 25.21 },
    '卓溪鄉': { kmt_votes: 1859, dpp_votes: 264, tpp_votes: 627, total_votes: 2750, kmt_rate: 67.60, dpp_rate: 9.60, tpp_rate: 22.80 }
};

window.hualienRealData = hualienRealData;
console.log('✅ 花蓮縣真實選舉數據已更新並加載');