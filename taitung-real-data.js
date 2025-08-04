/**
 * 台东县2024年大选真实数据
 * 数据来源：中选会原始数据
 */

const taitungRealData = {
    '臺東市': { kmt_votes: 25394, dpp_votes: 16951, tpp_votes: 14134, total_votes: 56479, kmt_rate: 44.96, dpp_rate: 30.01, tpp_rate: 25.03 },
    '成功鎮': { kmt_votes: 3604, dpp_votes: 1431, tpp_votes: 1215, total_votes: 6250, kmt_rate: 57.66, dpp_rate: 22.90, tpp_rate: 19.44 },
    '關山鎮': { kmt_votes: 2148, dpp_votes: 1129, tpp_votes: 934, total_votes: 4211, kmt_rate: 51.01, dpp_rate: 26.81, tpp_rate: 22.18 },
    '卑南鄉': { kmt_votes: 4325, dpp_votes: 2724, tpp_votes: 2032, total_votes: 9081, kmt_rate: 47.63, dpp_rate: 29.99, tpp_rate: 22.38 },
    '鹿野鄉': { kmt_votes: 1791, dpp_votes: 1243, tpp_votes: 778, total_votes: 3812, kmt_rate: 46.98, dpp_rate: 32.61, tpp_rate: 20.41 },
    '池上鄉': { kmt_votes: 1818, dpp_votes: 1192, tpp_votes: 902, total_votes: 3912, kmt_rate: 46.47, dpp_rate: 30.47, tpp_rate: 23.06 },
    '東河鄉': { kmt_votes: 2105, dpp_votes: 996, tpp_votes: 753, total_votes: 3854, kmt_rate: 54.62, dpp_rate: 25.84, tpp_rate: 19.54 },
    '長濱鄉': { kmt_votes: 1924, dpp_votes: 744, tpp_votes: 482, total_votes: 3150, kmt_rate: 61.08, dpp_rate: 23.62, tpp_rate: 15.30 },
    '太麻里鄉': { kmt_votes: 2889, dpp_votes: 1591, tpp_votes: 1123, total_votes: 5603, kmt_rate: 51.56, dpp_rate: 28.39, tpp_rate: 20.04 },
    '大武鄉': { kmt_votes: 1510, dpp_votes: 610, tpp_votes: 587, total_votes: 2707, kmt_rate: 55.78, dpp_rate: 22.53, tpp_rate: 21.68 },
    '綠島鄉': { kmt_votes: 873, dpp_votes: 327, tpp_votes: 559, total_votes: 1759, kmt_rate: 49.63, dpp_rate: 18.59, tpp_rate: 31.78 },
    '海端鄉': { kmt_votes: 1213, dpp_votes: 211, tpp_votes: 411, total_votes: 1835, kmt_rate: 66.10, dpp_rate: 11.50, tpp_rate: 22.40 },
    '延平鄉': { kmt_votes: 1172, dpp_votes: 236, tpp_votes: 414, total_votes: 1822, kmt_rate: 64.32, dpp_rate: 12.95, tpp_rate: 22.72 },
    '金峰鄉': { kmt_votes: 1432, dpp_votes: 169, tpp_votes: 494, total_votes: 2095, kmt_rate: 68.35, dpp_rate: 8.07, tpp_rate: 23.58 },
    '達仁鄉': { kmt_votes: 1265, dpp_votes: 207, tpp_votes: 377, total_votes: 1849, kmt_rate: 68.41, dpp_rate: 11.20, tpp_rate: 20.39 },
    '蘭嶼鄉': { kmt_votes: 754, dpp_votes: 370, tpp_votes: 395, total_votes: 1519, kmt_rate: 49.64, dpp_rate: 24.36, tpp_rate: 26.00 }
};

window.taitungRealData = taitungRealData;
console.log('✅ 台东县真实选举数据已更新并加载');