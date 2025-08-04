/**
 * 臺北市大罷免詳細數據
 * 數據來源：2025年7月26日大罷免投票
 */

// 臺北市大罷免數據（全市範圍）
const taipeiRecallData = {
    // 第3選舉區：王鴻薇
    "中山區": {
        "legislator": "王鴻薇",
        "party": "國民黨",
        "district": "第3選舉區",
        "isRecall": true,
        "agree_votes": 51325,
        "disagree_votes": 53258,
        "valid_votes": 104583,
        "total_voters": 104583,
        "total_eligible": 179000,
        "turnout_rate": 58.42,
        "agree_rate": 49.08,
        "disagree_rate": 50.92
    },
    "松山區": {
        "legislator": "王鴻薇",
        "party": "國民黨",
        "district": "第3選舉區",
        "isRecall": true,
        "agree_votes": 25138,
        "disagree_votes": 33053,
        "valid_votes": 58191,
        "total_voters": 58191,
        "total_eligible": 94200,
        "turnout_rate": 61.79,
        "agree_rate": 43.20,
        "disagree_rate": 56.80
    },
    // 徐巧芯的松山区数据（用于重叠区域显示）
    "松山區_徐巧芯": {
        "legislator": "徐巧芯",
        "party": "國民黨",
        "district": "第7選舉區",
        "isRecall": true,
        "agree_votes": 16870,
        "disagree_votes": 18049,
        "valid_votes": 34919,
        "total_voters": 34919,
        "total_eligible": 58600,
        "turnout_rate": 59.60,
        "agree_rate": 48.31,
        "disagree_rate": 51.69
    },
    
    // 第4選舉區：李彥秀
    "內湖區": {
        "legislator": "李彥秀",
        "party": "國民黨",
        "district": "第4選舉區",
        "isRecall": true,
        "agree_votes": 55702,
        "disagree_votes": 74282,
        "valid_votes": 129984,
        "total_voters": 129984,
        "total_eligible": 218300,
        "turnout_rate": 59.54,
        "agree_rate": 42.86,
        "disagree_rate": 57.14
    },
    "南港區": {
        "legislator": "李彥秀",
        "party": "國民黨",
        "district": "第4選舉區",
        "isRecall": true,
        "agree_votes": 22858,
        "disagree_votes": 30887,
        "valid_votes": 53745,
        "total_voters": 53745,
        "total_eligible": 92300,
        "turnout_rate": 58.21,
        "agree_rate": 42.54,
        "disagree_rate": 57.46
    },
    
    // 第6選舉區：羅智強
    "大安區": {
        "legislator": "羅智強",
        "party": "國民黨",
        "district": "第6選舉區",
        "isRecall": true,
        "agree_votes": 56726,
        "disagree_votes": 74808,
        "valid_votes": 131534,
        "total_voters": 131534,
        "total_eligible": 228000,
        "turnout_rate": 57.69,
        "agree_rate": 43.12,
        "disagree_rate": 56.88
    },
    
    // 第7選舉區：徐巧芯
    "信義區": {
        "legislator": "徐巧芯",
        "party": "國民黨",
        "district": "第7選舉區",
        "isRecall": true,
        "agree_votes": 45763,
        "disagree_votes": 57352,
        "valid_votes": 103115,
        "total_voters": 103115,
        "total_eligible": 171600,
        "turnout_rate": 60.10,
        "agree_rate": 44.40,
        "disagree_rate": 55.60
    },
    
    
    // 第8選舉區：賴士葆
    "文山區": {
        "legislator": "賴士葆",
        "party": "國民黨",
        "district": "第8選舉區",
        "isRecall": true,
        "agree_votes": 47895,
        "disagree_votes": 75778,
        "valid_votes": 123673,
        "total_voters": 123673,
        "total_eligible": 210000,
        "turnout_rate": 58.91,
        "agree_rate": 38.72,
        "disagree_rate": 61.28
    },
    "中正區": {
        "legislator": "賴士葆",
        "party": "國民黨",
        "district": "第8選舉區",
        "isRecall": true,
        "agree_votes": 8063,
        "disagree_votes": 11129,
        "valid_votes": 19192,
        "total_voters": 19192,
        "total_eligible": 33700,
        "turnout_rate": 56.85,
        "agree_rate": 42.01,
        "disagree_rate": 57.99
    }
};

// 立委信息列表
const taipeiLegislators = [
    {
        name: "王鴻薇",
        party: "國民黨",
        district: "第3選舉區",
        regions: ["中山區", "松山區"],
        total_agree: 76463,
        total_disagree: 86311,
        total_valid: 162774,
        turnout_rate: 59.59,
        agree_rate: 46.97,
        disagree_rate: 53.03
    },
    {
        name: "李彥秀",
        party: "國民黨",
        district: "第4選舉區",
        regions: ["內湖區", "南港區"],
        total_agree: 78560,
        total_disagree: 105169,
        total_valid: 183729,
        turnout_rate: 59.14,
        agree_rate: 42.76,
        disagree_rate: 57.24
    },
    {
        name: "羅智強",
        party: "國民黨",
        district: "第6選舉區",
        regions: ["大安區"],
        total_agree: 56726,
        total_disagree: 74808,
        total_valid: 131534,
        turnout_rate: 57.69,
        agree_rate: 43.12,
        disagree_rate: 56.88
    },
    {
        name: "徐巧芯",
        party: "國民黨",
        district: "第7選舉區",
        regions: ["信義區", "松山區"],
        total_agree: 62633,
        total_disagree: 75401,
        total_valid: 138034,
        turnout_rate: 59.98,
        agree_rate: 45.37,
        disagree_rate: 54.63
    },
    {
        name: "賴士葆",
        party: "國民黨",
        district: "第8選舉區",
        regions: ["文山區", "中正區"],
        total_agree: 55958,
        total_disagree: 86907,
        total_valid: 142865,
        turnout_rate: 58.63,
        agree_rate: 39.17,
        disagree_rate: 60.83
    }
];

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('台北市', taipeiRecallData, {
        legislators: taipeiLegislators
    });
}

window.taipeiRecallData = taipeiRecallData;
window.taipeiLegislators = taipeiLegislators;
console.log('✅ 臺北市大罢免详细数据已加载'); 