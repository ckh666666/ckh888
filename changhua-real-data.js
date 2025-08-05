/**
 * 彰化县2024年大选真实数据
 * 数据来源：台湾22县市选举数据.csv
 */

const changhuaRealData = {
    '彰化市': { kmt_votes: 45699, dpp_votes: 50658, tpp_votes: 40445, total_votes: 136802, kmt_rate: 33.40, dpp_rate: 37.00, tpp_rate: 29.60 },
    '鹿港鎮': { kmt_votes: 14776, dpp_votes: 20577, tpp_votes: 14139, total_votes: 49492, kmt_rate: 29.85, dpp_rate: 41.58, tpp_rate: 28.57 },
    '和美鎮': { kmt_votes: 17176, dpp_votes: 19424, tpp_votes: 16783, total_votes: 53383, kmt_rate: 32.18, dpp_rate: 36.39, tpp_rate: 31.43 },
    '線西鄉': { kmt_votes: 3477, dpp_votes: 3027, tpp_votes: 3267, total_votes: 9771, kmt_rate: 35.59, dpp_rate: 30.98, tpp_rate: 33.43 },
    '伸港鄉': { kmt_votes: 7311, dpp_votes: 7612, tpp_votes: 7454, total_votes: 22377, kmt_rate: 32.67, dpp_rate: 34.00, tpp_rate: 33.33 },
    '福興鄉': { kmt_votes: 7940, dpp_votes: 11128, tpp_votes: 7744, total_votes: 26812, kmt_rate: 29.61, dpp_rate: 41.50, tpp_rate: 28.89 },
    '秀水鄉': { kmt_votes: 7395, dpp_votes: 8864, tpp_votes: 7061, total_votes: 23320, kmt_rate: 31.71, dpp_rate: 38.01, tpp_rate: 30.28 },
    '員林市': { kmt_votes: 24645, dpp_votes: 27276, tpp_votes: 21049, total_votes: 72970, kmt_rate: 33.77, dpp_rate: 37.38, tpp_rate: 28.85 },
    '溪湖鎮': { kmt_votes: 10675, dpp_votes: 11359, tpp_votes: 9290, total_votes: 31324, kmt_rate: 34.08, dpp_rate: 36.26, tpp_rate: 29.66 },
    '田中鎮': { kmt_votes: 8294, dpp_votes: 9100, tpp_votes: 6491, total_votes: 23885, kmt_rate: 34.73, dpp_rate: 38.10, tpp_rate: 27.17 },
    '大村鄉': { kmt_votes: 7616, dpp_votes: 9025, tpp_votes: 7611, total_votes: 24252, kmt_rate: 31.40, dpp_rate: 37.21, tpp_rate: 31.39 },
    '埔鹽鄉': { kmt_votes: 7335, dpp_votes: 6364, tpp_votes: 5418, total_votes: 19117, kmt_rate: 38.37, dpp_rate: 33.29, tpp_rate: 28.34 },
    '埔心鄉': { kmt_votes: 6485, dpp_votes: 8340, tpp_votes: 6219, total_votes: 21044, kmt_rate: 30.81, dpp_rate: 39.63, tpp_rate: 29.56 },
    '永靖鄉': { kmt_votes: 7057, dpp_votes: 8485, tpp_votes: 6092, total_votes: 21634, kmt_rate: 32.62, dpp_rate: 39.22, tpp_rate: 28.16 },
    '社頭鄉': { kmt_votes: 7823, dpp_votes: 10219, tpp_votes: 7242, total_votes: 25284, kmt_rate: 30.94, dpp_rate: 40.42, tpp_rate: 28.64 },
    '二水鄉': { kmt_votes: 3075, dpp_votes: 3741, tpp_votes: 1986, total_votes: 8802, kmt_rate: 34.93, dpp_rate: 42.50, tpp_rate: 22.57 },
    '北斗鎮': { kmt_votes: 6495, dpp_votes: 7642, tpp_votes: 5543, total_votes: 19680, kmt_rate: 33.00, dpp_rate: 38.83, tpp_rate: 28.17 },
    '二林鎮': { kmt_votes: 10384, dpp_votes: 9912, tpp_votes: 7249, total_votes: 27545, kmt_rate: 37.70, dpp_rate: 35.97, tpp_rate: 26.33 },
    '田尾鄉': { kmt_votes: 5152, dpp_votes: 6230, tpp_votes: 4514, total_votes: 15896, kmt_rate: 32.41, dpp_rate: 39.20, tpp_rate: 28.39 },
    '埤頭鄉': { kmt_votes: 5508, dpp_votes: 6556, tpp_votes: 4747, total_votes: 16811, kmt_rate: 32.76, dpp_rate: 38.99, tpp_rate: 28.25 },
    '芬園鄉': { kmt_votes: 3468, dpp_votes: 6972, tpp_votes: 2349, total_votes: 12789, kmt_rate: 27.12, dpp_rate: 54.52, tpp_rate: 18.36 },
    '花壇鄉': { kmt_votes: 9451, dpp_votes: 9555, tpp_votes: 8237, total_votes: 27243, kmt_rate: 34.69, dpp_rate: 35.07, tpp_rate: 30.24 },
    '芳苑鄉': { kmt_votes: 5649, dpp_votes: 7498, tpp_votes: 4160, total_votes: 17307, kmt_rate: 32.64, dpp_rate: 43.32, tpp_rate: 24.04 },
    '大城鄉': { kmt_votes: 3064, dpp_votes: 3001, tpp_votes: 1878, total_votes: 7943, kmt_rate: 38.57, dpp_rate: 37.78, tpp_rate: 23.65 },
    '竹塘鄉': { kmt_votes: 2476, dpp_votes: 3551, tpp_votes: 1965, total_votes: 7992, kmt_rate: 30.98, dpp_rate: 44.46, tpp_rate: 24.56 },
    '溪州鄉': { kmt_votes: 4929, dpp_votes: 7675, tpp_votes: 4347, total_votes: 16951, kmt_rate: 29.08, dpp_rate: 45.28, tpp_rate: 25.64 }
};

window.changhuaRealData = changhuaRealData;
console.log('✅ 彰化县真实选举数据已加载');