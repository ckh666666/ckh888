/**
 * 金門縣2024年大選真實數據
 * 數據來源：台灣22縣市選舉數據.csv
 */

const kinmenRealData = {
    '金城鎮': { kmt_votes: 8895, dpp_votes: 1425, tpp_votes: 3823, total_votes: 14143, kmt_rate: 62.89, dpp_rate: 10.07, tpp_rate: 27.04 },
    '金沙鎮': { kmt_votes: 4337, dpp_votes: 491, tpp_votes: 1565, total_votes: 6393, kmt_rate: 67.84, dpp_rate: 7.68, tpp_rate: 24.48 },
    '金湖鎮': { kmt_votes: 6204, dpp_votes: 1032, tpp_votes: 3062, total_votes: 10298, kmt_rate: 60.24, dpp_rate: 10.02, tpp_rate: 29.74 },
    '金寧鄉': { kmt_votes: 6190, dpp_votes: 1303, tpp_votes: 3723, total_votes: 11216, kmt_rate: 55.19, dpp_rate: 11.62, tpp_rate: 33.19 },
    '烈嶼鄉': { kmt_votes: 2299, dpp_votes: 304, tpp_votes: 843, total_votes: 3446, kmt_rate: 66.72, dpp_rate: 8.82, tpp_rate: 24.46 },
    '烏坵鄉': { kmt_votes: 80, dpp_votes: 14, tpp_votes: 22, total_votes: 116, kmt_rate: 68.97, dpp_rate: 12.07, tpp_rate: 18.96 }
};

window.kinmenRealData = kinmenRealData;
console.log('✅ 金門縣真實選舉數據已加載'); 