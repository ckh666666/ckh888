/**
 * 宜兰县2024年大选真实数据
 * 数据来源：中选会原始数据
 */

// 宜兰县2024年大选真实数据
const yilanRealData = {
    '宜蘭市': {
        kmt_votes: 17796, dpp_votes: 22647, tpp_votes: 15039,
        total_votes: 55482, kmt_rate: 32.08, dpp_rate: 40.82, tpp_rate: 27.11
    },
    '羅東鎮': {
        kmt_votes: 11352, dpp_votes: 18236, tpp_votes: 10649,
        total_votes: 40237, kmt_rate: 28.21, dpp_rate: 45.32, tpp_rate: 26.47
    },
    '蘇澳鎮': {
        kmt_votes: 6463, dpp_votes: 10223, tpp_votes: 5491,
        total_votes: 22177, kmt_rate: 29.14, dpp_rate: 46.10, tpp_rate: 24.76
    },
    '頭城鎮': {
        kmt_votes: 5596, dpp_votes: 6268, tpp_votes: 4503,
        total_votes: 16367, kmt_rate: 34.19, dpp_rate: 38.30, tpp_rate: 27.51
    },
    '礁溪鄉': {
        kmt_votes: 6041, dpp_votes: 9922, tpp_votes: 5463,
        total_votes: 21426, kmt_rate: 28.19, dpp_rate: 46.31, tpp_rate: 25.50
    },
    '壯圍鄉': {
        kmt_votes: 3901, dpp_votes: 7111, tpp_votes: 3846,
        total_votes: 14858, kmt_rate: 26.25, dpp_rate: 47.86, tpp_rate: 25.89
    },
    '員山鄉': {
        kmt_votes: 5109, dpp_votes: 9522, tpp_votes: 5164,
        total_votes: 19795, kmt_rate: 25.81, dpp_rate: 48.10, tpp_rate: 26.09
    },
    '冬山鄉': {
        kmt_votes: 7690, dpp_votes: 16170, tpp_votes: 8726,
        total_votes: 32586, kmt_rate: 23.60, dpp_rate: 49.62, tpp_rate: 26.78
    },
    '五結鄉': {
        kmt_votes: 6140, dpp_votes: 12158, tpp_votes: 6831,
        total_votes: 25129, kmt_rate: 24.43, dpp_rate: 48.38, tpp_rate: 27.19
    },
    '三星鄉': {
        kmt_votes: 3439, dpp_votes: 6500, tpp_votes: 2956,
        total_votes: 12895, kmt_rate: 26.67, dpp_rate: 50.41, tpp_rate: 22.92
    },
    '大同鄉': {
        kmt_votes: 1937, dpp_votes: 489, tpp_votes: 807,
        total_votes: 3233, kmt_rate: 59.91, dpp_rate: 15.13, tpp_rate: 24.96
    },
    '南澳鄉': {
        kmt_votes: 1977, dpp_votes: 271, tpp_votes: 696,
        total_votes: 2944, kmt_rate: 67.15, dpp_rate: 9.21, tpp_rate: 23.64
    }
};

window.yilanRealData = yilanRealData;
console.log('✅ 宜兰县真实选举数据已加载');