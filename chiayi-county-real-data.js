/**
 * 嘉义县2024年大选真实数据
 * 数据来源：中选会原始数据
 */

const chiayiCountyRealData = {
    '太保市': { kmt_votes: 6132, dpp_votes: 10504, tpp_votes: 6216, total_votes: 22852, kmt_rate: 26.83, dpp_rate: 45.96, tpp_rate: 27.20 },
    '朴子市': { kmt_votes: 7555, dpp_votes: 11318, tpp_votes: 5200, total_votes: 24073, kmt_rate: 31.38, dpp_rate: 47.01, tpp_rate: 21.60 },
    '布袋鎮': { kmt_votes: 4476, dpp_votes: 7142, tpp_votes: 2896, total_votes: 14514, kmt_rate: 30.84, dpp_rate: 49.21, tpp_rate: 19.95 },
    '大林鎮': { kmt_votes: 5511, dpp_votes: 8469, tpp_votes: 4324, total_votes: 18304, kmt_rate: 30.11, dpp_rate: 46.27, tpp_rate: 23.62 },
    '民雄鄉': { kmt_votes: 11928, dpp_votes: 19712, tpp_votes: 11394, total_votes: 43034, kmt_rate: 27.72, dpp_rate: 45.81, tpp_rate: 26.48 },
    '溪口鄉': { kmt_votes: 1987, dpp_votes: 4437, tpp_votes: 1746, total_votes: 8170, kmt_rate: 24.32, dpp_rate: 54.31, tpp_rate: 21.37 },
    '新港鄉': { kmt_votes: 4255, dpp_votes: 10017, tpp_votes: 4160, total_votes: 18432, kmt_rate: 23.08, dpp_rate: 54.35, tpp_rate: 22.57 },
    '水上鄉': { kmt_votes: 8642, dpp_votes: 13917, tpp_votes: 7296, total_votes: 29855, kmt_rate: 28.95, dpp_rate: 46.61, tpp_rate: 24.44 },
    '中埔鄉': { kmt_votes: 7726, dpp_votes: 11710, tpp_votes: 6324, total_votes: 25760, kmt_rate: 29.99, dpp_rate: 45.46, tpp_rate: 24.55 },
    '竹崎鄉': { kmt_votes: 6158, dpp_votes: 9471, tpp_votes: 4590, total_votes: 20219, kmt_rate: 30.46, dpp_rate: 46.84, tpp_rate: 22.70 },
    '梅山鄉': { kmt_votes: 3597, dpp_votes: 4974, tpp_votes: 2381, total_votes: 10952, kmt_rate: 32.84, dpp_rate: 45.42, tpp_rate: 21.74 },
    '番路鄉': { kmt_votes: 2277, dpp_votes: 2821, tpp_votes: 1524, total_votes: 6622, kmt_rate: 34.38, dpp_rate: 42.60, tpp_rate: 23.01 },
    '大埔鄉': { kmt_votes: 748, dpp_votes: 903, tpp_votes: 457, total_votes: 2108, kmt_rate: 35.48, dpp_rate: 42.84, tpp_rate: 21.68 },
    '阿里山鄉': { kmt_votes: 1550, dpp_votes: 631, tpp_votes: 624, total_votes: 2805, kmt_rate: 55.26, dpp_rate: 22.50, tpp_rate: 22.25 },
    '六腳鄉': { kmt_votes: 3468, dpp_votes: 6972, tpp_votes: 2349, total_votes: 12789, kmt_rate: 27.12, dpp_rate: 54.52, tpp_rate: 18.36 },
    '東石鄉': { kmt_votes: 4295, dpp_votes: 6529, tpp_votes: 2345, total_votes: 13169, kmt_rate: 32.62, dpp_rate: 49.58, tpp_rate: 17.80 },
    '義竹鄉': { kmt_votes: 3024, dpp_votes: 5357, tpp_votes: 1823, total_votes: 10204, kmt_rate: 29.63, dpp_rate: 52.49, tpp_rate: 17.88 },
    '鹿草鄉': { kmt_votes: 2313, dpp_votes: 4626, tpp_votes: 1733, total_votes: 8672, kmt_rate: 26.67, dpp_rate: 53.34, tpp_rate: 19.99 }
};

// 繁体别名，用于匹配TopoJSON中的繁体地名
// 如果TopoJSON中的地名是简体，这部分可以省略
chiayiCountyRealData['朴子市'] = chiayiCountyRealData['朴子市'];
chiayiCountyRealData['布袋鎮'] = chiayiCountyRealData['布袋鎮'];
chiayiCountyRealData['大林鎮'] = chiayiCountyRealData['大林鎮'];
chiayiCountyRealData['民雄鄉'] = chiayiCountyRealData['民雄鄉'];
chiayiCountyRealData['溪口鄉'] = chiayiCountyRealData['溪口鄉'];
chiayiCountyRealData['新港鄉'] = chiayiCountyRealData['新港鄉'];
chiayiCountyRealData['水上鄉'] = chiayiCountyRealData['水上鄉'];
chiayiCountyRealData['中埔鄉'] = chiayiCountyRealData['中埔鄉'];
chiayiCountyRealData['竹崎鄉'] = chiayiCountyRealData['竹崎鄉'];
chiayiCountyRealData['梅山鄉'] = chiayiCountyRealData['梅山鄉'];
chiayiCountyRealData['番路鄉'] = chiayiCountyRealData['番路鄉'];
chiayiCountyRealData['大埔鄉'] = chiayiCountyRealData['大埔鄉'];
chiayiCountyRealData['阿里山鄉'] = chiayiCountyRealData['阿里山鄉'];
chiayiCountyRealData['六腳鄉'] = chiayiCountyRealData['六腳鄉'];
chiayiCountyRealData['東石鄉'] = chiayiCountyRealData['東石鄉'];
chiayiCountyRealData['義竹鄉'] = chiayiCountyRealData['義竹鄉'];
chiayiCountyRealData['鹿草鄉'] = chiayiCountyRealData['鹿草鄉'];

window.chiayiCountyRealData = chiayiCountyRealData;
console.log('✅ 嘉义县真实选举数据已更新并加载');