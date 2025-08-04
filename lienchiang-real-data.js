/**
 * 連江縣2024年大選真實數據
 * 數據來源：台灣22縣市選舉數據.csv
 */

const lienchiangRealData = {
    '南竿鄉': { kmt_votes: 2331, dpp_votes: 392, tpp_votes: 931, total_votes: 3654, kmt_rate: 63.79, dpp_rate: 10.73, tpp_rate: 25.48 },
    '北竿鄉': { kmt_votes: 792, dpp_votes: 135, tpp_votes: 328, total_votes: 1255, kmt_rate: 63.11, dpp_rate: 10.76, tpp_rate: 26.13 },
    '莒光鄉': { kmt_votes: 386, dpp_votes: 58, tpp_votes: 158, total_votes: 602, kmt_rate: 64.12, dpp_rate: 9.63, tpp_rate: 26.25 },
    '東引鄉': { kmt_votes: 351, dpp_votes: 63, tpp_votes: 234, total_votes: 648, kmt_rate: 54.17, dpp_rate: 9.72, tpp_rate: 36.11 }
};

window.lienchiangRealData = lienchiangRealData;
console.log('✅ 連江縣真實選舉數據已加載');