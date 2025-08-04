/**
 * 臺中市大罷免詳細數據
 * 數據來源：2025年7月26日大罷免投票
 */

// 臺中市大罷免數據（全市範圍）
const taichungRecallData = {
    // 第5選舉區：黃健豪
    "北屯區": {
        "legislator": "黃健豪",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 59542,
        "disagree_votes": 81556,
        "valid_votes": 141098,
        "total_voters": 252500,
        "total_eligible": 452000,
        "turnout_rate": 55.86,
        "agree_rate": 42.21,
        "disagree_rate": 57.79
    },
    "北區": {
        "legislator": "黃健豪",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 29372,
        "disagree_votes": 37984,
        "valid_votes": 67356,
        "total_voters": 120000,
        "total_eligible": 214000,
        "turnout_rate": 56.13,
        "agree_rate": 43.60,
        "disagree_rate": 56.40
    },
    // 第4選舉區：廖偉翔
    "西屯區": {
        "legislator": "廖偉翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 45799,
        "disagree_votes": 60105,
        "valid_votes": 105904,
        "total_voters": 189500,
        "total_eligible": 339000,
        "turnout_rate": 55.88,
        "agree_rate": 43.25,
        "disagree_rate": 56.75
    },
    "南屯區": {
        "legislator": "廖偉翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 38013,
        "disagree_votes": 46429,
        "valid_votes": 84442,
        "total_voters": 146500,
        "total_eligible": 254000,
        "turnout_rate": 57.65,
        "agree_rate": 45.02,
        "disagree_rate": 54.98
    },
    // 第6選舉區：羅廷瑋
    "西區": {
        "legislator": "羅廷瑋",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 25457,
        "disagree_votes": 27769,
        "valid_votes": 53226,
        "total_voters": 91700,
        "total_eligible": 158000,
        "turnout_rate": 58.03,
        "agree_rate": 47.84,
        "disagree_rate": 52.16
    },
    "中區": {
        "legislator": "羅廷瑋",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 3524,
        "disagree_votes": 3778,
        "valid_votes": 7302,
        "total_voters": 13700,
        "total_eligible": 25700,
        "turnout_rate": 53.31,
        "agree_rate": 48.26,
        "disagree_rate": 51.74
    },
    "東區": {
        "legislator": "羅廷瑋",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 17365,
        "disagree_votes": 20231,
        "valid_votes": 37596,
        "total_voters": 64600,
        "total_eligible": 111000,
        "turnout_rate": 58.16,
        "agree_rate": 46.19,
        "disagree_rate": 53.81
    },
    "南區": {
        "legislator": "羅廷瑋",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 27666,
        "disagree_votes": 34644,
        "valid_votes": 62310,
        "total_voters": 105800,
        "total_eligible": 179000,
        "turnout_rate": 58.85,
        "agree_rate": 44.41,
        "disagree_rate": 55.59
    }
};

// 立委信息列表
const taichungLegislators = [
    {
        name: "黃健豪",
        party: "國民黨",
        district: "臺中市",
        regions: ["北屯區", "北區"],
        total_agree: 88914,
        total_disagree: 119540,
        total_valid: 208454,
        turnout_rate: 55.95,
        agree_rate: 42.66,
        disagree_rate: 57.34
    },
    {
        name: "廖偉翔",
        party: "國民黨",
        district: "臺中市",
        regions: ["西屯區", "南屯區"],
        total_agree: 83812,
        total_disagree: 106534,
        total_valid: 190346,
        turnout_rate: 56.66,
        agree_rate: 44.03,
        disagree_rate: 55.97
    },
    {
        name: "羅廷瑋",
        party: "國民黨",
        district: "臺中市",
        regions: ["西區", "中區", "東區", "南區"],
        total_agree: 74012,
        total_disagree: 86422,
        total_valid: 160434,
        turnout_rate: 58.14,
        agree_rate: 46.13,
        disagree_rate: 53.87
    }
];

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('台中市', taichungRecallData, {
        legislators: taichungLegislators
    });
}

window.taichungRecallData = taichungRecallData;
window.taichungLegislators = taichungLegislators;
console.log('✅ 臺中市大罢免详细数据已加载'); 