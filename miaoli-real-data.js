/**
 * 苗栗县2024年大选真实数据
 * 数据来源：中选会原始数据
 */

// 苗栗县2024年大选真实数据
const miaoliRealData = {
    '苗栗市': {
        kmt_votes: 24617, dpp_votes: 12117, tpp_votes: 15517,
        total_votes: 52251, kmt_rate: 47.11, dpp_rate: 23.19, tpp_rate: 29.70
    },
    '頭份市': {
        kmt_votes: 25488, dpp_votes: 14640, tpp_votes: 21203,
        total_votes: 61331, kmt_rate: 41.56, dpp_rate: 23.87, tpp_rate: 34.57
    },
    '竹南鎮': {
        kmt_votes: 17405, dpp_votes: 16412, tpp_votes: 17423,
        total_votes: 51240, kmt_rate: 33.97, dpp_rate: 32.03, tpp_rate: 34.00
    },
    '後龍鎮': {
        kmt_votes: 7334, dpp_votes: 6938, tpp_votes: 5588,
        total_votes: 19860, kmt_rate: 36.93, dpp_rate: 34.93, tpp_rate: 28.14
    },
    '通霄鎮': {
        kmt_votes: 6490, dpp_votes: 7730, tpp_votes: 4918,
        total_votes: 19138, kmt_rate: 33.91, dpp_rate: 40.39, tpp_rate: 25.70
    },
    '苑裡鎮': {
        kmt_votes: 7827, dpp_votes: 11191, tpp_votes: 7806,
        total_votes: 26824, kmt_rate: 29.18, dpp_rate: 41.72, tpp_rate: 29.10
    },
    '卓蘭鎮': {
        kmt_votes: 3524, dpp_votes: 3681, tpp_votes: 2228,
        total_votes: 9433, kmt_rate: 37.36, dpp_rate: 39.02, tpp_rate: 23.62
    },
    '大湖鄉': {
        kmt_votes: 3881, dpp_votes: 2021, tpp_votes: 1794,
        total_votes: 7696, kmt_rate: 50.43, dpp_rate: 26.26, tpp_rate: 23.31
    },
    '公館鄉': {
        kmt_votes: 8523, dpp_votes: 4801, tpp_votes: 5753,
        total_votes: 19077, kmt_rate: 44.68, dpp_rate: 25.17, tpp_rate: 30.16
    },
    '銅鑼鄉': {
        kmt_votes: 5015, dpp_votes: 2420, tpp_votes: 2689,
        total_votes: 10124, kmt_rate: 49.54, dpp_rate: 23.90, tpp_rate: 26.56
    },
    '三義鄉': {
        kmt_votes: 4391, dpp_votes: 2304, tpp_votes: 2661,
        total_votes: 9356, kmt_rate: 46.94, dpp_rate: 24.63, tpp_rate: 28.44
    },
    '西湖鄉': {
        kmt_votes: 2124, dpp_votes: 890, tpp_votes: 962,
        total_votes: 3976, kmt_rate: 53.42, dpp_rate: 22.38, tpp_rate: 24.20
    },
    '造橋鄉': {
        kmt_votes: 3210, dpp_votes: 1942, tpp_votes: 1991,
        total_votes: 7143, kmt_rate: 44.94, dpp_rate: 27.19, tpp_rate: 27.87
    },
    '三灣鄉': {
        kmt_votes: 1955, dpp_votes: 936, tpp_votes: 938,
        total_votes: 3829, kmt_rate: 51.06, dpp_rate: 24.45, tpp_rate: 24.50
    },
    '獅潭鄉': {
        kmt_votes: 1422, dpp_votes: 646, tpp_votes: 540,
        total_votes: 2608, kmt_rate: 54.52, dpp_rate: 24.77, tpp_rate: 20.71
    },
    '南庄鄉': {
        kmt_votes: 2726, dpp_votes: 1161, tpp_votes: 1235,
        total_votes: 5122, kmt_rate: 53.22, dpp_rate: 22.67, tpp_rate: 24.11
    },
    '頭屋鄉': {
        kmt_votes: 3156, dpp_votes: 1495, tpp_votes: 1676,
        total_votes: 6327, kmt_rate: 49.89, dpp_rate: 23.63, tpp_rate: 26.49
    },
    '泰安鄉': {
        kmt_votes: 2142, dpp_votes: 473, tpp_votes: 715,
        total_votes: 3330, kmt_rate: 64.32, dpp_rate: 14.20, tpp_rate: 21.47
    }
};

window.miaoliRealData = miaoliRealData;
console.log('✅ 苗栗县真实选举数据已更新并加载');