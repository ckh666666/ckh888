/**
 * 新竹市大罷免詳細數據
 * 數據來源：2025年7月26日大罷免投票
 */

// 新竹市大罷免數據（全市範圍）
const hsinchuCityRecallData = {
    // 立委罷免：鄭正鈐
    "東區": {
        "legislator": "鄭正鈐",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 40834,
        "disagree_votes": 57593,
        "valid_votes": 98427,
        "total_voters": 98427,
        "total_eligible": 166000,
        "turnout_rate": 59.35,
        "agree_rate": 41.47,
        "disagree_rate": 58.53
    },
    "北區": {
        "legislator": "鄭正鈐",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 32191,
        "disagree_votes": 41181,
        "valid_votes": 73372,
        "total_voters": 73372,
        "total_eligible": 124000,
        "turnout_rate": 59.27,
        "agree_rate": 43.87,
        "disagree_rate": 56.13
    },
    "香山區": {
        "legislator": "鄭正鈐",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 16945,
        "disagree_votes": 20531,
        "valid_votes": 37476,
        "total_voters": 37476,
        "total_eligible": 65000,
        "turnout_rate": 57.60,
        "agree_rate": 45.20,
        "disagree_rate": 54.80
    }
};

// 新竹市長罷免數據（全市範圍）
const hsinchuCityMayorRecallData = {
    "東區": {
        "mayor": "高虹安",
        "party": "民眾黨",
        "isRecall": true,
        "agree_votes": 38881,
        "disagree_votes": 60038,
        "valid_votes": 98919,
        "total_voters": 98919,
        "total_eligible": 167000,
        "turnout_rate": 59.26,
        "agree_rate": 39.32,
        "disagree_rate": 60.68
    },
    "北區": {
        "mayor": "高虹安",
        "party": "民眾黨",
        "isRecall": true,
        "agree_votes": 30926,
        "disagree_votes": 42957,
        "valid_votes": 73883,
        "total_voters": 73883,
        "total_eligible": 125000,
        "turnout_rate": 59.08,
        "agree_rate": 41.86,
        "disagree_rate": 58.14
    },
    "香山區": {
        "mayor": "高虹安",
        "party": "民眾黨",
        "isRecall": true,
        "agree_votes": 16484,
        "disagree_votes": 21365,
        "valid_votes": 37849,
        "total_voters": 37849,
        "total_eligible": 66000,
        "turnout_rate": 57.34,
        "agree_rate": 43.55,
        "disagree_rate": 56.45
    }
};

// 立委信息列表
const hsinchuCityLegislators = [
    {
        name: "鄭正鈐",
        party: "國民黨",
        district: "新竹市",
        regions: ["東區", "北區", "香山區"],
        total_agree: 89970,
        total_disagree: 119305,
        total_valid: 209275,
        turnout_rate: 59.00,
        agree_rate: 42.97,
        disagree_rate: 57.03
    }
];

// 市長信息列表
const hsinchuCityMayors = [
    {
        name: "高虹安",
        party: "民眾黨",
        district: "新竹市",
        regions: ["東區", "北區", "香山區"],
        total_agree: 86291,
        total_disagree: 124360,
        total_valid: 210651,
        turnout_rate: 58.84,
        agree_rate: 40.96,
        disagree_rate: 59.04
    }
];

// 合并立法委員和市長数据
const hsinchuCityCombinedRecallData = {};
Object.keys(hsinchuCityRecallData).forEach(region => {
    hsinchuCityCombinedRecallData[region] = {
        ...hsinchuCityRecallData[region],
        ...hsinchuCityMayorRecallData[region]
    };
});

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('新竹市', hsinchuCityCombinedRecallData, {
        legislators: hsinchuCityLegislators,
        mayors: hsinchuCityMayors,
        type: 'both',
        color: '#D32F2F',
        inactiveColor: '#9E9E9E'
    });
}

window.hsinchuCityRecallData = hsinchuCityRecallData;
window.hsinchuCityMayorRecallData = hsinchuCityMayorRecallData;
window.hsinchuCityLegislators = hsinchuCityLegislators;
window.hsinchuCityMayors = hsinchuCityMayors;
console.log('✅ 新竹市大罢免详细数据已加载'); 