/**
 * 花蓮縣大罷免詳細數據
 * 數據來源：2025年7月26日大罷免投票
 */

// 花蓮縣大罷免數據（全縣範圍）
const hualienRecallData = {
    "花蓮市": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 19377,
        "disagree_votes": 23606,
        "valid_votes": 42983,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 61.29,
        "agree_rate": 45.08,
        "disagree_rate": 54.92
    },
    "鳳林鎮": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 1604,
        "disagree_votes": 2707,
        "valid_votes": 4311,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 61.06,
        "agree_rate": 37.21,
        "disagree_rate": 62.79
    },
    "玉里鎮": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 2444,
        "disagree_votes": 4255,
        "valid_votes": 6699,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 53.29,
        "agree_rate": 36.48,
        "disagree_rate": 63.52
    },
    "新城鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 2921,
        "disagree_votes": 4220,
        "valid_votes": 7141,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 59.50,
        "agree_rate": 40.90,
        "disagree_rate": 59.10
    },
    "吉安鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 15857,
        "disagree_votes": 20494,
        "valid_votes": 36351,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 62.01,
        "agree_rate": 43.62,
        "disagree_rate": 56.38
    },
    "壽豐鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 2661,
        "disagree_votes": 3421,
        "valid_votes": 6082,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 60.82,
        "agree_rate": 43.75,
        "disagree_rate": 56.25
    },
    "光復鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 1194,
        "disagree_votes": 1401,
        "valid_votes": 2595,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 55.68,
        "agree_rate": 46.01,
        "disagree_rate": 53.99
    },
    "豐濱鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 169,
        "disagree_votes": 137,
        "valid_votes": 306,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 51.42,
        "agree_rate": 55.23,
        "disagree_rate": 44.77
    },
    "瑞穗鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 1247,
        "disagree_votes": 1902,
        "valid_votes": 3149,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 58.13,
        "agree_rate": 39.60,
        "disagree_rate": 60.40
    },
    "富里鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 1071,
        "disagree_votes": 2454,
        "valid_votes": 3525,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 51.46,
        "agree_rate": 30.38,
        "disagree_rate": 69.62
    },
    "秀林鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 375,
        "disagree_votes": 561,
        "valid_votes": 936,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 52.63,
        "agree_rate": 40.06,
        "disagree_rate": 59.94
    },
    "萬榮鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 31,
        "disagree_votes": 63,
        "valid_votes": 94,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 46.12,
        "agree_rate": 32.98,
        "disagree_rate": 67.02
    },
    "卓溪鄉": {
        "legislator": "傅崐萁",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 18,
        "disagree_votes": 79,
        "valid_votes": 97,
        "total_voters": 48969,
        "total_eligible": 65300,
        "turnout_rate": 41.45,
        "agree_rate": 18.56,
        "disagree_rate": 81.44
    }
};

// 立委信息列表
const hualienLegislators = [
    {
        name: "傅崐萁",
        party: "國民黨",
        district: "花蓮縣",
        regions: ["花蓮市", "鳳林鎮", "玉里鎮", "新城鄉", "吉安鄉", "壽豐鄉", "光復鄉", "豐濱鄉", "瑞穗鄉", "富里鄉", "秀林鄉", "萬榮鄉", "卓溪鄉"],
        total_agree: 48969,
        total_disagree: 65300,
        total_valid: 114269,
        turnout_rate: 60.1,
        agree_rate: 42.85,
        disagree_rate: 57.15
    }
];

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('花莲县', hualienRecallData, {
        legislators: hualienLegislators
    });
}

window.hualienRecallData = hualienRecallData;
window.hualienLegislators = hualienLegislators;
console.log('✅ 花蓮縣大罢免详细数据已加载'); 