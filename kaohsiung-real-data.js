/**
 * 高雄市2024年大选真实数据
 * 数据来源：中选会原始数据
 */

// 高雄市2024年大选真实数据
const kaohsiungRealData = {
    '楠梓區': { kmt_votes: 32903, dpp_votes: 51318, tpp_votes: 26969, total_votes: 111190, kmt_rate: 29.59, dpp_rate: 46.15, tpp_rate: 24.25 },
    '左營區': { kmt_votes: 40310, dpp_votes: 48791, tpp_votes: 26338, total_votes: 115439, kmt_rate: 34.92, dpp_rate: 42.26, tpp_rate: 22.82 },
    '鼓山區': { kmt_votes: 26388, dpp_votes: 38328, tpp_votes: 17188, total_votes: 81904, kmt_rate: 32.22, dpp_rate: 46.79, tpp_rate: 20.98 },
    '三民區': { kmt_votes: 57596, dpp_votes: 100125, tpp_votes: 43266, total_votes: 200987, kmt_rate: 28.66, dpp_rate: 49.82, tpp_rate: 21.53 },
    '鹽埕區': { kmt_votes: 4091, dpp_votes: 7835, tpp_votes: 2573, total_votes: 14499, kmt_rate: 28.22, dpp_rate: 54.04, tpp_rate: 17.75 },
    '前金區': { kmt_votes: 5357, dpp_votes: 8448, tpp_votes: 3357, total_votes: 17162, kmt_rate: 31.21, dpp_rate: 49.22, tpp_rate: 19.56 },
    '新興區': { kmt_votes: 9502, dpp_votes: 15007, tpp_votes: 5768, total_votes: 30277, kmt_rate: 31.38, dpp_rate: 49.57, tpp_rate: 19.05 },
    '苓雅區': { kmt_votes: 31923, dpp_votes: 48667, tpp_votes: 20044, total_votes: 100634, kmt_rate: 31.72, dpp_rate: 48.36, tpp_rate: 19.92 },
    '前鎮區': { kmt_votes: 31793, dpp_votes: 55508, tpp_votes: 22888, total_votes: 110189, kmt_rate: 28.85, dpp_rate: 50.38, tpp_rate: 20.77 },
    '旗津區': { kmt_votes: 3414, dpp_votes: 8702, tpp_votes: 3107, total_votes: 15223, kmt_rate: 22.43, dpp_rate: 57.16, tpp_rate: 20.41 },
    '小港區': { kmt_votes: 23659, dpp_votes: 45675, tpp_votes: 20662, total_votes: 89996, kmt_rate: 26.29, dpp_rate: 50.75, tpp_rate: 22.96 },
    '鳳山區': { kmt_votes: 65076, dpp_votes: 98990, tpp_votes: 48651, total_votes: 212717, kmt_rate: 30.59, dpp_rate: 46.54, tpp_rate: 22.87 },
    '林園區': { kmt_votes: 9228, dpp_votes: 21587, tpp_votes: 8574, total_votes: 39389, kmt_rate: 23.43, dpp_rate: 54.81, tpp_rate: 21.77 },
    '大寮區': { kmt_votes: 17777, dpp_votes: 33642, tpp_votes: 15226, total_votes: 66645, kmt_rate: 26.68, dpp_rate: 50.49, tpp_rate: 22.85 },
    '大樹區': { kmt_votes: 6075, dpp_votes: 13685, tpp_votes: 4896, total_votes: 24656, kmt_rate: 24.64, dpp_rate: 55.50, tpp_rate: 19.86 },
    '大社區': { kmt_votes: 4898, dpp_votes: 11133, tpp_votes: 4724, total_votes: 20755, kmt_rate: 23.60, dpp_rate: 53.64, tpp_rate: 22.76 },
    '仁武區': { kmt_votes: 14724, dpp_votes: 28972, tpp_votes: 14344, total_votes: 58040, kmt_rate: 25.37, dpp_rate: 49.92, tpp_rate: 24.71 },
    '鳥松區': { kmt_votes: 8222, dpp_votes: 14360, tpp_votes: 5758, total_votes: 28340, kmt_rate: 29.01, dpp_rate: 50.67, tpp_rate: 20.32 },
    '岡山區': { kmt_votes: 17258, dpp_votes: 26882, tpp_votes: 13310, total_votes: 57450, kmt_rate: 30.04, dpp_rate: 46.79, tpp_rate: 23.17 },
    '橋頭區': { kmt_votes: 6096, dpp_votes: 14401, tpp_votes: 6161, total_votes: 26658, kmt_rate: 22.87, dpp_rate: 54.02, tpp_rate: 23.11 },
    '燕巢區': { kmt_votes: 4620, dpp_votes: 9234, tpp_votes: 3819, total_votes: 17673, kmt_rate: 26.14, dpp_rate: 52.25, tpp_rate: 21.61 },
    '田寮區': { kmt_votes: 1047, dpp_votes: 2419, tpp_votes: 618, total_votes: 4084, kmt_rate: 25.64, dpp_rate: 59.23, tpp_rate: 15.13 },
    '阿蓮區': { kmt_votes: 3825, dpp_votes: 9111, tpp_votes: 3414, total_votes: 16350, kmt_rate: 23.40, dpp_rate: 55.72, tpp_rate: 20.88 },
    '路竹區': { kmt_votes: 8051, dpp_votes: 15149, tpp_votes: 7122, total_votes: 30322, kmt_rate: 26.55, dpp_rate: 49.96, tpp_rate: 23.49 },
    '湖內區': { kmt_votes: 4386, dpp_votes: 9463, tpp_votes: 4039, total_votes: 17888, kmt_rate: 24.52, dpp_rate: 52.90, tpp_rate: 22.58 },
    '茄萣區': { kmt_votes: 4308, dpp_votes: 9551, tpp_votes: 3561, total_votes: 17420, kmt_rate: 24.73, dpp_rate: 54.83, tpp_rate: 20.44 },
    '永安區': { kmt_votes: 2128, dpp_votes: 4334, tpp_votes: 1964, total_votes: 8426, kmt_rate: 25.26, dpp_rate: 51.43, tpp_rate: 23.31 },
    '彌陀區': { kmt_votes: 3278, dpp_votes: 5672, tpp_votes: 2379, total_votes: 11329, kmt_rate: 28.93, dpp_rate: 50.07, tpp_rate: 21.00 },
    '梓官區': { kmt_votes: 5106, dpp_votes: 12115, tpp_votes: 4396, total_votes: 21617, kmt_rate: 23.62, dpp_rate: 56.04, tpp_rate: 20.34 },
    '旗山區': { kmt_votes: 6090, dpp_votes: 10321, tpp_votes: 3979, total_votes: 20390, kmt_rate: 29.87, dpp_rate: 50.62, tpp_rate: 19.51 },
    '美濃區': { kmt_votes: 8684, dpp_votes: 9157, tpp_votes: 4001, total_votes: 21842, kmt_rate: 39.76, dpp_rate: 41.92, tpp_rate: 18.32 },
    '六龜區': { kmt_votes: 2062, dpp_votes: 2972, tpp_votes: 1048, total_votes: 6082, kmt_rate: 33.90, dpp_rate: 48.86, tpp_rate: 17.23 },
    '甲仙區': { kmt_votes: 1200, dpp_votes: 1294, tpp_votes: 521, total_votes: 3015, kmt_rate: 39.80, dpp_rate: 42.92, tpp_rate: 17.28 },
    '杉林區': { kmt_votes: 2103, dpp_votes: 2767, tpp_votes: 933, total_votes: 5803, kmt_rate: 36.24, dpp_rate: 47.68, tpp_rate: 16.08 },
    '內門區': { kmt_votes: 2530, dpp_votes: 3976, tpp_votes: 1411, total_votes: 7917, kmt_rate: 31.96, dpp_rate: 50.22, tpp_rate: 17.82 },
    '茂林區': { kmt_votes: 660, dpp_votes: 182, tpp_votes: 310, total_votes: 1152, kmt_rate: 57.29, dpp_rate: 15.80, tpp_rate: 26.91 },
    '桃源區': { kmt_votes: 1186, dpp_votes: 340, tpp_votes: 494, total_votes: 2020, kmt_rate: 58.71, dpp_rate: 16.83, tpp_rate: 24.46 },
    '那瑪夏區': { kmt_votes: 922, dpp_votes: 277, tpp_votes: 283, total_votes: 1482, kmt_rate: 62.21, dpp_rate: 18.69, tpp_rate: 19.10 }
};

window.kaohsiungRealData = kaohsiungRealData;
console.log('✅ 高雄市真实选举数据已更新并加载');