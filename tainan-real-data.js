/**
 * 台南市2024年大选真实数据
 * 数据来源：中选会原始数据
 */

// 台南市2024年大选真实数据
const tainanRealData = {
    '中西區': { kmt_votes: 12279, dpp_votes: 23508, tpp_votes: 9708, total_votes: 45495, kmt_rate: 26.99, dpp_rate: 51.67, tpp_rate: 21.34 },
    '東區': { kmt_votes: 34120, dpp_votes: 49578, tpp_votes: 25276, total_votes: 108974, kmt_rate: 31.31, dpp_rate: 45.50, tpp_rate: 23.19 },
    '南區': { kmt_votes: 19507, dpp_votes: 40510, tpp_votes: 16537, total_votes: 76554, kmt_rate: 25.48, dpp_rate: 52.92, tpp_rate: 21.60 },
    '北區': { kmt_votes: 22626, dpp_votes: 36838, tpp_votes: 18165, total_votes: 77629, kmt_rate: 29.15, dpp_rate: 47.45, tpp_rate: 23.39 },
    '安平區': { kmt_votes: 11378, dpp_votes: 19638, tpp_votes: 9969, total_votes: 40985, kmt_rate: 27.76, dpp_rate: 47.92, tpp_rate: 24.32 },
    '安南區': { kmt_votes: 25908, dpp_votes: 61863, tpp_votes: 30381, total_votes: 118152, kmt_rate: 21.93, dpp_rate: 52.36, tpp_rate: 25.71 },
    '永康區': { kmt_votes: 37474, dpp_votes: 66181, tpp_votes: 36691, total_votes: 140346, kmt_rate: 26.70, dpp_rate: 47.16, tpp_rate: 26.14 },
    '歸仁區': { kmt_votes: 9781, dpp_votes: 22495, tpp_votes: 9988, total_votes: 42264, kmt_rate: 23.14, dpp_rate: 53.23, tpp_rate: 23.63 },
    '新化區': { kmt_votes: 7130, dpp_votes: 13320, tpp_votes: 6245, total_votes: 26695, kmt_rate: 26.71, dpp_rate: 49.90, tpp_rate: 23.39 },
    '善化區': { kmt_votes: 6363, dpp_votes: 15541, tpp_votes: 8346, total_votes: 30250, kmt_rate: 21.03, dpp_rate: 51.37, tpp_rate: 27.59 },
    '新市區': { kmt_votes: 4890, dpp_votes: 11759, tpp_votes: 6047, total_votes: 22696, kmt_rate: 21.55, dpp_rate: 51.81, tpp_rate: 26.64 },
    '安定區': { kmt_votes: 3925, dpp_votes: 10158, tpp_votes: 4525, total_votes: 18608, kmt_rate: 21.09, dpp_rate: 54.59, tpp_rate: 24.32 },
    '山上區': { kmt_votes: 1079, dpp_votes: 2289, tpp_votes: 972, total_votes: 4340, kmt_rate: 24.86, dpp_rate: 52.74, tpp_rate: 22.40 },
    '玉井區': { kmt_votes: 2725, dpp_votes: 3349, tpp_votes: 1612, total_votes: 7686, kmt_rate: 35.45, dpp_rate: 43.57, tpp_rate: 20.97 },
    '楠西區': { kmt_votes: 2105, dpp_votes: 2086, tpp_votes: 1003, total_votes: 5194, kmt_rate: 40.53, dpp_rate: 40.16, tpp_rate: 19.31 },
    '南化區': { kmt_votes: 1653, dpp_votes: 2137, tpp_votes: 872, total_votes: 4662, kmt_rate: 35.46, dpp_rate: 45.84, tpp_rate: 18.70 },
    '左鎮區': { kmt_votes: 727, dpp_votes: 1482, tpp_votes: 383, total_votes: 2592, kmt_rate: 28.05, dpp_rate: 57.17, tpp_rate: 14.78 },
    '仁德區': { kmt_votes: 12600, dpp_votes: 24021, tpp_votes: 11644, total_votes: 48265, kmt_rate: 26.11, dpp_rate: 49.77, tpp_rate: 24.12 },
    '關廟區': { kmt_votes: 5144, dpp_votes: 11619, tpp_votes: 4534, total_votes: 21297, kmt_rate: 24.15, dpp_rate: 54.56, tpp_rate: 21.29 },
    '龍崎區': { kmt_votes: 749, dpp_votes: 1243, tpp_votes: 363, total_votes: 2355, kmt_rate: 31.80, dpp_rate: 52.78, tpp_rate: 15.41 },
    '官田區': { kmt_votes: 2654, dpp_votes: 7561, tpp_votes: 2780, total_votes: 12995, kmt_rate: 20.42, dpp_rate: 58.18, tpp_rate: 21.39 },
    '麻豆區': { kmt_votes: 5048, dpp_votes: 16080, tpp_votes: 5854, total_votes: 26982, kmt_rate: 18.71, dpp_rate: 59.60, tpp_rate: 21.70 },
    '佳里區': { kmt_votes: 8179, dpp_votes: 19014, tpp_votes: 8033, total_votes: 35226, kmt_rate: 23.22, dpp_rate: 53.98, tpp_rate: 22.80 },
    '西港區': { kmt_votes: 3036, dpp_votes: 8928, tpp_votes: 3345, total_votes: 15309, kmt_rate: 19.83, dpp_rate: 58.32, tpp_rate: 21.85 },
    '七股區': { kmt_votes: 2669, dpp_votes: 7601, tpp_votes: 2520, total_votes: 12790, kmt_rate: 20.87, dpp_rate: 59.43, tpp_rate: 19.70 },
    '將軍區': { kmt_votes: 2227, dpp_votes: 6699, tpp_votes: 1805, total_votes: 10731, kmt_rate: 20.75, dpp_rate: 62.43, tpp_rate: 16.82 },
    '學甲區': { kmt_votes: 3153, dpp_votes: 8524, tpp_votes: 3039, total_votes: 14716, kmt_rate: 21.43, dpp_rate: 57.92, tpp_rate: 20.65 },
    '北門區': { kmt_votes: 1420, dpp_votes: 3131, tpp_votes: 1031, total_votes: 5582, kmt_rate: 25.44, dpp_rate: 56.09, tpp_rate: 18.47 },
    '新營區': { kmt_votes: 12991, dpp_votes: 19931, tpp_votes: 10809, total_votes: 43731, kmt_rate: 29.70, dpp_rate: 45.58, tpp_rate: 24.72 },
    '後壁區': { kmt_votes: 3180, dpp_votes: 7449, tpp_votes: 2606, total_votes: 13235, kmt_rate: 24.03, dpp_rate: 56.28, tpp_rate: 19.69 },
    '白河區': { kmt_votes: 3694, dpp_votes: 8608, tpp_votes: 2874, total_votes: 15176, kmt_rate: 24.34, dpp_rate: 56.72, tpp_rate: 18.94 },
    '東山區': { kmt_votes: 2859, dpp_votes: 5772, tpp_votes: 1959, total_votes: 10590, kmt_rate: 27.00, dpp_rate: 54.50, tpp_rate: 18.50 },
    '六甲區': { kmt_votes: 2797, dpp_votes: 6882, tpp_votes: 2837, total_votes: 12516, kmt_rate: 22.35, dpp_rate: 54.99, tpp_rate: 22.67 },
    '下營區': { kmt_votes: 3349, dpp_votes: 7289, tpp_votes: 2859, total_votes: 13497, kmt_rate: 24.81, dpp_rate: 54.00, tpp_rate: 21.18 },
    '柳營區': { kmt_votes: 2883, dpp_votes: 6654, tpp_votes: 2878, total_votes: 12415, kmt_rate: 23.22, dpp_rate: 53.59, tpp_rate: 23.18 },
    '鹽水區': { kmt_votes: 3229, dpp_votes: 7882, tpp_votes: 3056, total_votes: 14167, kmt_rate: 22.79, dpp_rate: 55.63, tpp_rate: 21.57 },
    '大內區': { kmt_votes: 1336, dpp_votes: 3191, tpp_votes: 1014, total_votes: 5541, kmt_rate: 24.11, dpp_rate: 57.59, tpp_rate: 18.30 }
};

window.tainanRealData = tainanRealData;
console.log('✅ 台南市真实选举数据已更新并加载');