/**
 * 新竹县2024年大选真实数据
 * 数据来源：中选会原始数据
 */

// 新竹县2024年大选真实数据
const hsinchuCountyRealData = {
    '竹北市': {
        kmt_votes: 36780, dpp_votes: 37154, tpp_votes: 45955,
        total_votes: 119889, kmt_rate: 30.68, dpp_rate: 31.00, tpp_rate: 38.33
    },
    '竹東鎮': {
        kmt_votes: 23335, dpp_votes: 12998, tpp_votes: 20107,
        total_votes: 56440, kmt_rate: 41.35, dpp_rate: 23.03, tpp_rate: 35.63
    },
    '新埔鎮': {
        kmt_votes: 7845, dpp_votes: 6297, tpp_votes: 6844,
        total_votes: 20986, kmt_rate: 37.38, dpp_rate: 29.99, tpp_rate: 32.61
    },
    '關西鎮': {
        kmt_votes: 7259, dpp_votes: 4692, tpp_votes: 4579,
        total_votes: 16530, kmt_rate: 43.91, dpp_rate: 28.39, tpp_rate: 27.70
    },
    '湖口鄉': {
        kmt_votes: 18500, dpp_votes: 11891, tpp_votes: 17219,
        total_votes: 47610, kmt_rate: 38.86, dpp_rate: 24.98, tpp_rate: 36.17
    },
    '新豐鄉': {
        kmt_votes: 11808, dpp_votes: 9288, tpp_votes: 12538,
        total_votes: 33634, kmt_rate: 35.11, dpp_rate: 27.62, tpp_rate: 37.28
    },
    '芎林鄉': {
        kmt_votes: 5359, dpp_votes: 3235, tpp_votes: 4295,
        total_votes: 12889, kmt_rate: 41.58, dpp_rate: 25.10, tpp_rate: 33.32
    },
    '寶山鄉': {
        kmt_votes: 3720, dpp_votes: 2570, tpp_votes: 3042,
        total_votes: 9332, kmt_rate: 39.86, dpp_rate: 27.54, tpp_rate: 32.60
    },
    '北埔鄉': {
        kmt_votes: 2490, dpp_votes: 1263, tpp_votes: 1604,
        total_votes: 5357, kmt_rate: 46.48, dpp_rate: 23.58, tpp_rate: 29.94
    },
    '峨眉鄉': {
        kmt_votes: 1525, dpp_votes: 1022, tpp_votes: 838,
        total_votes: 3385, kmt_rate: 45.05, dpp_rate: 30.19, tpp_rate: 24.76
    },
    '尖石鄉': {
        kmt_votes: 2353, dpp_votes: 750, tpp_votes: 1240,
        total_votes: 4343, kmt_rate: 54.18, dpp_rate: 17.27, tpp_rate: 28.55
    },
    '五峰鄉': {
        kmt_votes: 1404, dpp_votes: 394, tpp_votes: 554,
        total_votes: 2352, kmt_rate: 59.70, dpp_rate: 16.75, tpp_rate: 23.55
    },
    '橫山鄉': {
        kmt_votes: 3638, dpp_votes: 1755, tpp_votes: 2170,
        total_votes: 7563, kmt_rate: 48.10, dpp_rate: 23.20, tpp_rate: 28.69
    }
};

// 如果需要，可以添加繁体别名来匹配TopoJSON中的地名
// hsinchuCountyRealData['竹東鎮'] = hsinchuCountyRealData['竹東鎮'];
// ...

window.hsinchuCountyRealData = hsinchuCountyRealData;
console.log('✅ 新竹县真实选举数据已更新并加载');