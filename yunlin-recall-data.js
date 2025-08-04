/**
 * 雲林縣大罷免詳細數據
 * 數據來源：2025年7月26日大罷免投票
 * 共1個立法委員席位
 */

// 雲林縣大罷免數據（全市範圍）
const yunlinRecallData = {
    // 第1選舉區：丁學忠
    "麥寮鄉": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 6046,
        "disagree_votes": 10649,
        "valid_votes": 16695,
        "total_voters": 16695,
        "total_eligible": 38800,
        "turnout_rate": 43.03,
        "agree_rate": 36.22,
        "disagree_rate": 63.78
    },
    "臺西鄉": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 2766,
        "disagree_votes": 5855,
        "valid_votes": 8621,
        "total_voters": 8621,
        "total_eligible": 18450,
        "turnout_rate": 46.75,
        "agree_rate": 32.08,
        "disagree_rate": 67.92
    },
    "東勢鄉": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 2482,
        "disagree_votes": 3258,
        "valid_votes": 5740,
        "total_voters": 5740,
        "total_eligible": 11600,
        "turnout_rate": 49.49,
        "agree_rate": 43.24,
        "disagree_rate": 56.76
    },
    "褒忠鄉": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 2368,
        "disagree_votes": 2942,
        "valid_votes": 5310,
        "total_voters": 5310,
        "total_eligible": 10050,
        "turnout_rate": 52.79,
        "agree_rate": 44.60,
        "disagree_rate": 55.40
    },
    "土庫鎮": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 5224,
        "disagree_votes": 6932,
        "valid_votes": 12156,
        "total_voters": 12156,
        "total_eligible": 22850,
        "turnout_rate": 53.18,
        "agree_rate": 42.97,
        "disagree_rate": 57.03
    },
    "虎尾鎮": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 12158,
        "disagree_votes": 20377,
        "valid_votes": 32535,
        "total_voters": 32535,
        "total_eligible": 57650,
        "turnout_rate": 56.44,
        "agree_rate": 37.37,
        "disagree_rate": 62.63
    },
    "四湖鄉": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 3321,
        "disagree_votes": 4723,
        "valid_votes": 8044,
        "total_voters": 8044,
        "total_eligible": 18180,
        "turnout_rate": 44.24,
        "agree_rate": 41.28,
        "disagree_rate": 58.72
    },
    "元長鄉": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 4619,
        "disagree_votes": 5190,
        "valid_votes": 9809,
        "total_voters": 9809,
        "total_eligible": 19980,
        "turnout_rate": 49.11,
        "agree_rate": 47.10,
        "disagree_rate": 52.90
    },
    "口湖鄉": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 4690,
        "disagree_votes": 4880,
        "valid_votes": 9570,
        "total_voters": 9570,
        "total_eligible": 21320,
        "turnout_rate": 44.89,
        "agree_rate": 48.99,
        "disagree_rate": 51.01
    },
    "水林鄉": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 5159,
        "disagree_votes": 4101,
        "valid_votes": 9260,
        "total_voters": 9260,
        "total_eligible": 19580,
        "turnout_rate": 47.28,
        "agree_rate": 55.71,
        "disagree_rate": 44.29
    },
    "北港鎮": {
        "legislator": "丁學忠",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 8498,
        "disagree_votes": 8257,
        "valid_votes": 16755,
        "total_voters": 16755,
        "total_eligible": 31220,
        "turnout_rate": 53.67,
        "agree_rate": 50.72,
        "disagree_rate": 49.28
    }
};

// 立委信息列表
const yunlinLegislators = [
    {
        name: "丁學忠",
        party: "國民黨",
        district: "雲林縣",
        regions: ["麥寮鄉", "臺西鄉", "東勢鄉", "褒忠鄉", "土庫鎮", "虎尾鎮", "四湖鄉", "元長鄉", "口湖鄉", "水林鄉", "北港鎮"],
        total_agree: 57331,
        total_disagree: 77164,
        total_valid: 134495,
        turnout_rate: 49.87,
        agree_rate: 42.62,
        disagree_rate: 57.38
    }
];

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('云林县', yunlinRecallData, {
        legislators: yunlinLegislators
    });
}

window.yunlinRecallData = yunlinRecallData;
window.yunlinLegislators = yunlinLegislators;
console.log('✅ 雲林縣大罷免詳細數據已加載'); 