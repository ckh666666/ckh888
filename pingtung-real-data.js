/**
 * 屏东县2024年大选真实数据
 * 数据来源：中选会原始数据
 */

const pingtungRealData = {
    '屏東市': { kmt_votes: 38953, dpp_votes: 50346, tpp_votes: 26869, total_votes: 116168, kmt_rate: 33.53, dpp_rate: 43.34, tpp_rate: 23.13 },
    '潮州鎮': { kmt_votes: 9549, dpp_votes: 15019, tpp_votes: 7183, total_votes: 31751, kmt_rate: 30.07, dpp_rate: 47.30, tpp_rate: 22.62 },
    '東港鎮': { kmt_votes: 6811, dpp_votes: 14271, tpp_votes: 5904, total_votes: 26986, kmt_rate: 25.24, dpp_rate: 52.88, tpp_rate: 21.88 },
    '恆春鎮': { kmt_votes: 5112, dpp_votes: 6362, tpp_votes: 3541, total_votes: 15015, kmt_rate: 34.05, dpp_rate: 42.37, tpp_rate: 23.58 },
    '萬丹鄉': { kmt_votes: 7807, dpp_votes: 15685, tpp_votes: 6701, total_votes: 30193, kmt_rate: 25.86, dpp_rate: 51.95, tpp_rate: 22.19 },
    '長治鄉': { kmt_votes: 5466, dpp_votes: 8696, tpp_votes: 4116, total_votes: 18278, kmt_rate: 29.90, dpp_rate: 47.58, tpp_rate: 22.52 },
    '麟洛鄉': { kmt_votes: 1916, dpp_votes: 3825, tpp_votes: 1381, total_votes: 7122, kmt_rate: 26.90, dpp_rate: 53.71, tpp_rate: 19.39 },
    '九如鄉': { kmt_votes: 2930, dpp_votes: 7819, tpp_votes: 2853, total_votes: 13602, kmt_rate: 21.54, dpp_rate: 57.48, tpp_rate: 20.97 },
    '里港鄉': { kmt_votes: 3751, dpp_votes: 8368, tpp_votes: 3533, total_votes: 15652, kmt_rate: 23.97, dpp_rate: 53.46, tpp_rate: 22.57 },
    '鹽埔鄉': { kmt_votes: 4580, dpp_votes: 6587, tpp_votes: 3225, total_votes: 14392, kmt_rate: 31.82, dpp_rate: 45.77, tpp_rate: 22.41 },
    '高樹鄉': { kmt_votes: 3361, dpp_votes: 8148, tpp_votes: 2295, total_votes: 13804, kmt_rate: 24.35, dpp_rate: 59.03, tpp_rate: 16.63 },
    '萬巒鄉': { kmt_votes: 2926, dpp_votes: 6502, tpp_votes: 2232, total_votes: 11660, kmt_rate: 25.10, dpp_rate: 55.76, tpp_rate: 19.14 },
    '內埔鄉': { kmt_votes: 9042, dpp_votes: 15833, tpp_votes: 6796, total_votes: 31671, kmt_rate: 28.55, dpp_rate: 50.00, tpp_rate: 21.46 },
    '竹田鄉': { kmt_votes: 2825, dpp_votes: 5576, tpp_votes: 1916, total_votes: 10317, kmt_rate: 27.38, dpp_rate: 54.05, tpp_rate: 18.57 },
    '新埤鄉': { kmt_votes: 1736, dpp_votes: 2916, tpp_votes: 1063, total_votes: 5715, kmt_rate: 30.38, dpp_rate: 51.02, tpp_rate: 18.60 },
    '枋寮鄉': { kmt_votes: 4028, dpp_votes: 6794, tpp_votes: 2687, total_votes: 13509, kmt_rate: 29.82, dpp_rate: 50.29, tpp_rate: 19.89 },
    '新園鄉': { kmt_votes: 4630, dpp_votes: 11651, tpp_votes: 4076, total_votes: 20357, kmt_rate: 22.74, dpp_rate: 57.23, tpp_rate: 20.02 },
    '崁頂鄉': { kmt_votes: 2036, dpp_votes: 4497, tpp_votes: 1660, total_votes: 8193, kmt_rate: 24.85, dpp_rate: 54.89, tpp_rate: 20.26 },
    '林邊鄉': { kmt_votes: 2744, dpp_votes: 5745, tpp_votes: 1797, total_votes: 10286, kmt_rate: 26.68, dpp_rate: 55.85, tpp_rate: 17.47 },
    '南州鄉': { kmt_votes: 1639, dpp_votes: 3434, tpp_votes: 1180, total_votes: 6253, kmt_rate: 26.21, dpp_rate: 54.92, tpp_rate: 18.87 },
    '佳冬鄉': { kmt_votes: 2904, dpp_votes: 5962, tpp_votes: 1976, total_votes: 10842, kmt_rate: 26.78, dpp_rate: 55.00, tpp_rate: 18.22 },
    '琉球鄉': { kmt_votes: 2622, dpp_votes: 2225, tpp_votes: 1449, total_votes: 6296, kmt_rate: 41.64, dpp_rate: 35.34, tpp_rate: 23.02 },
    '車城鄉': { kmt_votes: 1359, dpp_votes: 2258, tpp_votes: 852, total_votes: 4469, kmt_rate: 30.41, dpp_rate: 50.53, tpp_rate: 19.06 },
    '滿州鄉': { kmt_votes: 1206, dpp_votes: 1755, tpp_votes: 682, total_votes: 3643, kmt_rate: 33.10, dpp_rate: 48.17, tpp_rate: 18.72 },
    '枋山鄉': { kmt_votes: 882, dpp_votes: 1479, tpp_votes: 489, total_votes: 2850, kmt_rate: 30.95, dpp_rate: 51.89, tpp_rate: 17.16 },
    '三地門鄉': { kmt_votes: 2762, dpp_votes: 849, tpp_votes: 1095, total_votes: 4706, kmt_rate: 58.70, dpp_rate: 18.04, tpp_rate: 23.27 },
    '霧臺鄉': { kmt_votes: 1289, dpp_votes: 457, tpp_votes: 452, total_votes: 2198, kmt_rate: 58.64, dpp_rate: 20.79, tpp_rate: 20.56 },
    '瑪家鄉': { kmt_votes: 2442, dpp_votes: 720, tpp_votes: 1101, total_votes: 4263, kmt_rate: 57.28, dpp_rate: 16.89, tpp_rate: 25.83 },
    '泰武鄉': { kmt_votes: 1841, dpp_votes: 518, tpp_votes: 858, total_votes: 3217, kmt_rate: 57.23, dpp_rate: 16.10, tpp_rate: 26.67 },
    '來義鄉': { kmt_votes: 2698, dpp_votes: 678, tpp_votes: 1129, total_votes: 4505, kmt_rate: 59.89, dpp_rate: 15.05, tpp_rate: 25.06 },
    '春日鄉': { kmt_votes: 1627, dpp_votes: 331, tpp_votes: 707, total_votes: 2665, kmt_rate: 61.05, dpp_rate: 12.42, tpp_rate: 26.53 },
    '獅子鄉': { kmt_votes: 1775, dpp_votes: 349, tpp_votes: 648, total_votes: 2772, kmt_rate: 64.03, dpp_rate: 12.59, tpp_rate: 23.38 },
    '牡丹鄉': { kmt_votes: 1540, dpp_votes: 455, tpp_votes: 582, total_votes: 2577, kmt_rate: 59.76, dpp_rate: 17.66, tpp_rate: 22.58 }
};

window.pingtungRealData = pingtungRealData;
console.log('✅ 屏东县真实选举数据已更新并加载');