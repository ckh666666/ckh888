/**
 * 南投县2024年大选真实数据
 * 数据来源：中选会原始数据
 */

const nantouRealData = {
    '南投市': { kmt_votes: 22512, dpp_votes: 20878, tpp_votes: 16078, total_votes: 59468, kmt_rate: 37.86, dpp_rate: 35.11, tpp_rate: 27.04 },
    '埔里鎮': { kmt_votes: 18078, dpp_votes: 15305, tpp_votes: 11930, total_votes: 45313, kmt_rate: 39.90, dpp_rate: 33.78, tpp_rate: 26.33 },
    '草屯鎮': { kmt_votes: 20997, dpp_votes: 21818, tpp_votes: 17124, total_votes: 59939, kmt_rate: 35.03, dpp_rate: 36.40, tpp_rate: 28.57 },
    '竹山鎮': { kmt_votes: 10891, dpp_votes: 12631, tpp_votes: 7809, total_votes: 31331, kmt_rate: 34.76, dpp_rate: 40.32, tpp_rate: 24.92 },
    '集集鎮': { kmt_votes: 2368, dpp_votes: 2272, tpp_votes: 1572, total_votes: 6212, kmt_rate: 38.12, dpp_rate: 36.58, tpp_rate: 25.31 },
    '名間鄉': { kmt_votes: 6881, dpp_votes: 9914, tpp_votes: 5647, total_votes: 22442, kmt_rate: 30.66, dpp_rate: 44.18, tpp_rate: 25.16 },
    '鹿谷鄉': { kmt_votes: 4199, dpp_votes: 3889, tpp_votes: 2247, total_votes: 10335, kmt_rate: 40.63, dpp_rate: 37.63, tpp_rate: 21.74 },
    '中寮鄉': { kmt_votes: 3127, dpp_votes: 3300, tpp_votes: 1965, total_votes: 8392, kmt_rate: 37.26, dpp_rate: 39.32, tpp_rate: 23.41 },
    '魚池鄉': { kmt_votes: 3254, dpp_votes: 3280, tpp_votes: 2018, total_votes: 8552, kmt_rate: 38.05, dpp_rate: 38.35, tpp_rate: 23.60 },
    '國姓鄉': { kmt_votes: 4260, dpp_votes: 3407, tpp_votes: 2382, total_votes: 10049, kmt_rate: 42.40, dpp_rate: 33.91, tpp_rate: 23.70 },
    '水里鄉': { kmt_votes: 3823, dpp_votes: 3558, tpp_votes: 2175, total_votes: 9556, kmt_rate: 40.01, dpp_rate: 37.23, tpp_rate: 22.76 },
    '信義鄉': { kmt_votes: 4017, dpp_votes: 2018, tpp_votes: 2004, total_votes: 8039, kmt_rate: 49.97, dpp_rate: 25.10, tpp_rate: 24.93 },
    '仁愛鄉': { kmt_votes: 4756, dpp_votes: 1009, tpp_votes: 1903, total_votes: 7668, kmt_rate: 62.03, dpp_rate: 13.16, tpp_rate: 24.82 }
};

window.nantouRealData = nantouRealData;
console.log('✅ 南投县真实选举数据已更新并加载');