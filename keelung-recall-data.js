/**
 * 基隆市大罷免詳細數據
 * 數據來源：2025年7月26日大罷免投票
 */

// 基隆市大罷免數據（全市範圍）
const keelungRecallData = {
    "中正區": {
        "legislator": "林沛祥",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 8790,
        "disagree_votes": 12688,
        "valid_votes": 21478,
        "total_voters": 21478,
        "total_eligible": 42200,
        "turnout_rate": 50.90,
        "agree_rate": 40.93,
        "disagree_rate": 59.07
    },
    "信義區": {
        "legislator": "林沛祥",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 9023,
        "disagree_votes": 15361,
        "valid_votes": 24384,
        "total_voters": 24384,
        "total_eligible": 44800,
        "turnout_rate": 54.41,
        "agree_rate": 37.00,
        "disagree_rate": 63.00
    },
    "仁愛區": {
        "legislator": "林沛祥",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 7748,
        "disagree_votes": 10036,
        "valid_votes": 17784,
        "total_voters": 17784,
        "total_eligible": 32900,
        "turnout_rate": 54.03,
        "agree_rate": 43.55,
        "disagree_rate": 56.45
    },
    "中山區": {
        "legislator": "林沛祥",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 8434,
        "disagree_votes": 12359,
        "valid_votes": 20793,
        "total_voters": 20793,
        "total_eligible": 39800,
        "turnout_rate": 52.27,
        "agree_rate": 40.56,
        "disagree_rate": 59.44
    },
    "安樂區": {
        "legislator": "林沛祥",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 14501,
        "disagree_votes": 22597,
        "valid_votes": 37098,
        "total_voters": 37098,
        "total_eligible": 67300,
        "turnout_rate": 55.13,
        "agree_rate": 39.09,
        "disagree_rate": 60.91
    },
    "暖暖區": {
        "legislator": "林沛祥",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 6852,
        "disagree_votes": 10194,
        "valid_votes": 17046,
        "total_voters": 17046,
        "total_eligible": 32100,
        "turnout_rate": 53.01,
        "agree_rate": 40.19,
        "disagree_rate": 59.81
    },
    "七堵區": {
        "legislator": "林沛祥",
        "party": "國民黨",
        "isRecall": true,
        "agree_votes": 9795,
        "disagree_votes": 13059,
        "valid_votes": 22854,
        "total_voters": 22854,
        "total_eligible": 43300,
        "turnout_rate": 52.81,
        "agree_rate": 42.87,
        "disagree_rate": 57.13
    }
};

// 立委信息列表 - 自动生成
const keelungLegislators = window.generateLegislatorsFromData ? 
    window.generateLegislatorsFromData('基隆市', keelungRecallData) : [
        {
            name: "林沛祥",
            party: "國民黨",
            district: "基隆市選舉區",
            regions: ["中正區", "信義區", "仁愛區", "中山區", "安樂區", "暖暖區", "七堵區"],
            total_agree: 64141,
            total_disagree: 96394,
            total_valid: 160535,
            turnout_rate: 53.22,
            agree_rate: 39.95,
            disagree_rate: 60.05
        }
    ];

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('基隆市', keelungRecallData, {
        legislators: keelungLegislators
    });
}

window.keelungRecallData = keelungRecallData;
window.keelungLegislators = keelungLegislators;
console.log('✅ 基隆市大罢免详细数据已加载'); 