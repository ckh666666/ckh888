/**
 * 新北市大罷免詳細數據
 * 數據來源：2025年7月26日大罷免投票
 */

// 新北市大罷免數據（全市範圍）
const newtaipeiRecallData = {
    // 第1選舉區：洪孟楷
    "石門區": {
        "legislator": "洪孟楷",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 1680,
        "disagree_votes": 2692,
        "valid_votes": 4372,
        "total_voters": 4372,
        "total_eligible": 8950,
        "turnout_rate": 48.84,
        "agree_rate": 38.43,
        "disagree_rate": 61.57
    },
    "三芝區": {
        "legislator": "洪孟楷",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 3886,
        "disagree_votes": 6087,
        "valid_votes": 9973,
        "total_voters": 9973,
        "total_eligible": 19250,
        "turnout_rate": 51.85,
        "agree_rate": 38.96,
        "disagree_rate": 61.04
    },
    "淡水區": {
        "legislator": "洪孟楷",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 39833,
        "disagree_votes": 52525,
        "valid_votes": 92358,
        "total_voters": 92358,
        "total_eligible": 172000,
        "turnout_rate": 53.74,
        "agree_rate": 43.13,
        "disagree_rate": 56.87
    },
    "八里區": {
        "legislator": "洪孟楷",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 8235,
        "disagree_votes": 10751,
        "valid_votes": 18986,
        "total_voters": 18986,
        "total_eligible": 36000,
        "turnout_rate": 52.72,
        "agree_rate": 43.37,
        "disagree_rate": 56.63
    },
    "林口區": {
        "legislator": "洪孟楷",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 25244,
        "disagree_votes": 31034,
        "valid_votes": 56278,
        "total_voters": 56278,
        "total_eligible": 103750,
        "turnout_rate": 54.23,
        "agree_rate": 44.86,
        "disagree_rate": 55.14
    },
    "泰山區": {
        "legislator": "洪孟楷",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 15930,
        "disagree_votes": 18503,
        "valid_votes": 34433,
        "total_voters": 34433,
        "total_eligible": 63050,
        "turnout_rate": 54.59,
        "agree_rate": 46.25,
        "disagree_rate": 53.75
    },
    
    // 第7選舉區：葉元之
    "板橋區": {
        "legislator": "葉元之",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 63357,
        "disagree_votes": 66917,
        "valid_votes": 130274,
        "total_voters": 130274,
        "total_eligible": 230000,
        "turnout_rate": 56.68,
        "agree_rate": 48.62,
        "disagree_rate": 51.38
    },
    
    // 第8選舉區：張智倫
    "中和區": {
        "legislator": "張智倫",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 67131,
        "disagree_votes": 95319,
        "valid_votes": 162450,
        "total_voters": 162450,
        "total_eligible": 286500,
        "turnout_rate": 56.71,
        "agree_rate": 41.33,
        "disagree_rate": 58.67
    },
    
    // 第9選舉區：林德福
    "永和區": {
        "legislator": "林德福",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 38975,
        "disagree_votes": 62045,
        "valid_votes": 101020,
        "total_voters": 101020,
        "total_eligible": 177500,
        "turnout_rate": 56.95,
        "agree_rate": 38.59,
        "disagree_rate": 61.41
    },
    
    // 第12選舉區：廖先翔
    "金山區": {
        "legislator": "廖先翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 4105,
        "disagree_votes": 4344,
        "valid_votes": 8449,
        "total_voters": 8449,
        "total_eligible": 17450,
        "turnout_rate": 48.42,
        "agree_rate": 48.58,
        "disagree_rate": 51.42
    },
    "萬里區": {
        "legislator": "廖先翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 3882,
        "disagree_votes": 4324,
        "valid_votes": 8206,
        "total_voters": 8206,
        "total_eligible": 17800,
        "turnout_rate": 46.10,
        "agree_rate": 47.31,
        "disagree_rate": 52.69
    },
    "汐止區": {
        "legislator": "廖先翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 42475,
        "disagree_votes": 56804,
        "valid_votes": 99279,
        "total_voters": 99279,
        "total_eligible": 178500,
        "turnout_rate": 55.58,
        "agree_rate": 42.79,
        "disagree_rate": 57.21
    },
    "平溪區": {
        "legislator": "廖先翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 767,
        "disagree_votes": 911,
        "valid_votes": 1678,
        "total_voters": 1678,
        "total_eligible": 3675,
        "turnout_rate": 45.65,
        "agree_rate": 45.71,
        "disagree_rate": 54.29
    },
    "瑞芳區": {
        "legislator": "廖先翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 5916,
        "disagree_votes": 8965,
        "valid_votes": 14881,
        "total_voters": 14881,
        "total_eligible": 30750,
        "turnout_rate": 48.35,
        "agree_rate": 39.76,
        "disagree_rate": 60.24
    },
    "雙溪區": {
        "legislator": "廖先翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 1330,
        "disagree_votes": 1785,
        "valid_votes": 3115,
        "total_voters": 3115,
        "total_eligible": 6840,
        "turnout_rate": 45.54,
        "agree_rate": 42.70,
        "disagree_rate": 57.30
    },
    "貢寮區": {
        "legislator": "廖先翔",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 2469,
        "disagree_votes": 1665,
        "valid_votes": 4134,
        "total_voters": 4134,
        "total_eligible": 9700,
        "turnout_rate": 42.60,
        "agree_rate": 59.72,
        "disagree_rate": 40.28
    },
    
    // 其他地區不參與罷免
    "三重區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "新莊區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "新店區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "樹林區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "土城區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "蘆洲區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "五股區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "石碇區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "坪林區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "烏來區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "三峽區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "鶯歌區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    },
    "深坑區": {
        "legislator": "",
        "party": "",
        "isRecall": false
    }
};

// 立委信息列表
const newtaipeiLegislators = [
    {
        name: "洪孟楷",
        party: "國民黨",
        district: "新北市",
        regions: ["石門區", "三芝區", "淡水區", "八里區", "林口區", "泰山區"],
        total_agree: 94808,
        total_disagree: 121592,
        total_valid: 216400,
        turnout_rate: 53.71,
        agree_rate: 43.81,
        disagree_rate: 56.19
    },
    {
        name: "葉元之",
        party: "國民黨",
        district: "新北市",
        regions: ["板橋區"],
        total_agree: 63357,
        total_disagree: 66917,
        total_valid: 130274,
        turnout_rate: 56.68,
        agree_rate: 48.62,
        disagree_rate: 51.38
    },
    {
        name: "張智倫",
        party: "國民黨",
        district: "新北市",
        regions: ["中和區"],
        total_agree: 67131,
        total_disagree: 95319,
        total_valid: 162450,
        turnout_rate: 56.71,
        agree_rate: 41.33,
        disagree_rate: 58.67
    },
    {
        name: "林德福",
        party: "國民黨",
        district: "新北市",
        regions: ["永和區"],
        total_agree: 51484,
        total_disagree: 83862,
        total_valid: 135346,
        turnout_rate: 57.32,
        agree_rate: 38.04,
        disagree_rate: 61.96
    },
    {
        name: "廖先翔",
        party: "國民黨",
        district: "新北市",
        regions: ["金山區", "萬里區", "汐止區", "平溪區", "瑞芳區", "雙溪區", "貢寮區"],
        total_agree: 60944,
        total_disagree: 78798,
        total_valid: 139742,
        turnout_rate: 52.75,
        agree_rate: 43.61,
        disagree_rate: 56.39
    }
];

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('新北市', newtaipeiRecallData, {
        legislators: newtaipeiLegislators
    });
}

window.newtaipeiRecallData = newtaipeiRecallData;
window.newtaipeiLegislators = newtaipeiLegislators;
console.log('✅ 新北市大罢免详细数据已加载'); 