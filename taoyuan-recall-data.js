/**
 * 桃園市大罷免詳細數據
 * 數據來源：2025年7月26日大罷免投票
 */

// 桃園市大罷免數據（全市範圍）
const taoyuanRecallData = {
    // 第1選舉區：牛煦庭
    "蘆竹區": {
        "legislator": "牛煦庭",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 34779,
        "disagree_votes": 38967,
        "valid_votes": 73746,
        "total_voters": 132500,
        "total_eligible": 238000,
        "turnout_rate": 55.65,
        "agree_rate": 47.15,
        "disagree_rate": 52.85
    },
    "龜山區": {
        "legislator": "牛煦庭",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 34999,
        "disagree_votes": 44743,
        "valid_votes": 79742,
        "total_voters": 147500,
        "total_eligible": 273000,
        "turnout_rate": 54.07,
        "agree_rate": 43.88,
        "disagree_rate": 56.12
    },
    "桃園區": {
        "legislator": "牛煦庭",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 16956,
        "disagree_votes": 22927,
        "valid_votes": 39883,
        "total_voters": 72300,
        "total_eligible": 131000,
        "turnout_rate": 55.18,
        "agree_rate": 42.51,
        "disagree_rate": 57.49
    },
    // 第2選舉區：涂權吉
    "大園區": {
        "legislator": "涂權吉",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 17539,
        "disagree_votes": 19749,
        "valid_votes": 37288,
        "total_voters": 69300,
        "total_eligible": 129000,
        "turnout_rate": 53.81,
        "agree_rate": 47.04,
        "disagree_rate": 52.96
    },
    "觀音區": {
        "legislator": "涂權吉",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 14359,
        "disagree_votes": 16642,
        "valid_votes": 31001,
        "total_voters": 57700,
        "total_eligible": 112000,
        "turnout_rate": 51.35,
        "agree_rate": 46.32,
        "disagree_rate": 53.68
    },
    "新屋區": {
        "legislator": "涂權吉",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 9930,
        "disagree_votes": 13046,
        "valid_votes": 22976,
        "total_voters": 41100,
        "total_eligible": 76000,
        "turnout_rate": 55.94,
        "agree_rate": 43.21,
        "disagree_rate": 56.79
    },
    "楊梅區": {
        "legislator": "涂權吉",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 28482,
        "disagree_votes": 51982,
        "valid_votes": 80464,
        "total_voters": 144000,
        "total_eligible": 258000,
        "turnout_rate": 55.89,
        "agree_rate": 35.39,
        "disagree_rate": 64.61
    },
    // 第3選舉區：魯明哲
    "中壢區": {
        "legislator": "魯明哲",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 66301,
        "disagree_votes": 105323,
        "valid_votes": 171624,
        "total_voters": 307500,
        "total_eligible": 551000,
        "turnout_rate": 55.79,
        "agree_rate": 38.63,
        "disagree_rate": 61.37
    },
    // 第4選舉區：萬美玲
    "桃園區": {
        "legislator": "萬美玲",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 72626,
        "disagree_votes": 97544,
        "valid_votes": 170170,
        "total_voters": 305000,
        "total_eligible": 547000,
        "turnout_rate": 55.76,
        "agree_rate": 42.69,
        "disagree_rate": 57.31
    },
    // 第5選舉區：呂玉玲
    "平鎮區": {
        "legislator": "呂玉玲",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 40052,
        "disagree_votes": 61603,
        "valid_votes": 101655,
        "total_voters": 179500,
        "total_eligible": 317000,
        "turnout_rate": 56.56,
        "agree_rate": 39.41,
        "disagree_rate": 60.59
    },
    "龍潭區": {
        "legislator": "呂玉玲",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 19776,
        "disagree_votes": 36367,
        "valid_votes": 56143,
        "total_voters": 101500,
        "total_eligible": 183000,
        "turnout_rate": 55.31,
        "agree_rate": 35.23,
        "disagree_rate": 64.77
    },
    // 第6選舉區：邱若華
    "八德區": {
        "legislator": "邱若華",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 36552,
        "disagree_votes": 54788,
        "valid_votes": 91340,
        "total_voters": 168000,
        "total_eligible": 309000,
        "turnout_rate": 54.41,
        "agree_rate": 40.01,
        "disagree_rate": 59.99
    },
    "大溪區": {
        "legislator": "邱若華",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 17917,
        "disagree_votes": 21130,
        "valid_votes": 39047,
        "total_voters": 73000,
        "total_eligible": 136000,
        "turnout_rate": 53.49,
        "agree_rate": 45.88,
        "disagree_rate": 54.12
    },
    "復興區": {
        "legislator": "邱若華",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 562,
        "disagree_votes": 833,
        "valid_votes": 1395,
        "total_voters": 3210,
        "total_eligible": 7380,
        "turnout_rate": 43.48,
        "agree_rate": 40.29,
        "disagree_rate": 59.71
    }
};

// 立委信息列表
const taoyuanLegislators = [
    {
        name: "牛煦庭",
        party: "國民黨",
        district: "桃園市",
        regions: ["蘆竹區", "龜山區", "桃園區"],
        total_agree: 86734,
        total_disagree: 106637,
        total_valid: 193371,
        turnout_rate: 54.89,
        agree_rate: 44.85,
        disagree_rate: 55.15
    },
    {
        name: "涂權吉",
        party: "國民黨",
        district: "桃園市",
        regions: ["大園區", "觀音區", "新屋區", "楊梅區"],
        total_agree: 70310,
        total_disagree: 101419,
        total_valid: 171729,
        turnout_rate: 54.57,
        agree_rate: 40.94,
        disagree_rate: 59.06
    },
    {
        name: "魯明哲",
        party: "國民黨",
        district: "桃園市",
        regions: ["中壢區"],
        total_agree: 66301,
        total_disagree: 105323,
        total_valid: 171624,
        turnout_rate: 55.79,
        agree_rate: 38.63,
        disagree_rate: 61.37
    },
    {
        name: "萬美玲",
        party: "國民黨",
        district: "桃園市",
        regions: ["桃園區"],
        total_agree: 72626,
        total_disagree: 97544,
        total_valid: 170170,
        turnout_rate: 55.76,
        agree_rate: 42.69,
        disagree_rate: 57.31
    },
    {
        name: "呂玉玲",
        party: "國民黨",
        district: "桃園市",
        regions: ["平鎮區", "龍潭區"],
        total_agree: 59828,
        total_disagree: 97970,
        total_valid: 157798,
        turnout_rate: 56.11,
        agree_rate: 37.91,
        disagree_rate: 62.09
    },
    {
        name: "邱若華",
        party: "國民黨",
        district: "桃園市",
        regions: ["八德區", "大溪區", "復興區", "中壢區"],
        total_agree: 61635,
        total_disagree: 92049,
        total_valid: 153684,
        turnout_rate: 54.24,
        agree_rate: 40.10,
        disagree_rate: 59.90
    }
];

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('桃园市', taoyuanRecallData, {
        legislators: taoyuanLegislators
    });
}

window.taoyuanRecallData = taoyuanRecallData;
window.taoyuanLegislators = taoyuanLegislators;
console.log('✅ 桃園市大罢免详细数据已加载'); 