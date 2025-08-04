/**
 * 罢免数据模板文件
 * 用于快速为新的地区添加立委选择功能
 * 
 * 使用方法：
 * 1. 复制此文件并重命名为 [地区名]-recall-data.js
 * 2. 修改地区名称和罢免数据
 * 3. 立委信息会自动生成，无需手动计算
 */

// 示例：XX市大罷免詳細數據
const exampleRecallData = {
    "地區1": {
        "legislator": "立委姓名",
        "party": "政黨",
        "district": "選舉區", // 可选
        "isRecall": true,
        "agree_votes": 1000,
        "disagree_votes": 1500,
        "valid_votes": 2500,
        "total_voters": 2500,
        "total_eligible": 5000,
        "turnout_rate": 50.0,
        "agree_rate": 40.0,
        "disagree_rate": 60.0
    },
    "地區2": {
        "legislator": "立委姓名",
        "party": "政黨",
        "district": "選舉區", // 可选
        "isRecall": true,
        "agree_votes": 1200,
        "disagree_votes": 1800,
        "valid_votes": 3000,
        "total_voters": 3000,
        "total_eligible": 6000,
        "turnout_rate": 50.0,
        "agree_rate": 40.0,
        "disagree_rate": 60.0
    }
    // ... 添加更多地区数据
};

// 立委信息列表 - 自动生成
const exampleLegislators = window.generateLegislatorsFromData ? 
    window.generateLegislatorsFromData('XX市', exampleRecallData) : [
        // 如果自动生成失败，可以手动添加立委信息
        {
            name: "立委姓名",
            party: "政黨",
            district: "XX市選舉區",
            regions: ["地區1", "地區2"],
            total_agree: 2200,
            total_disagree: 3300,
            total_valid: 5500,
            turnout_rate: 50.0,
            agree_rate: 40.0,
            disagree_rate: 60.0
        }
    ];

// 使用框架注册数据
if (window.registerRecallData) {
    window.registerRecallData('XX市', exampleRecallData, {
        legislators: exampleLegislators
    });
}

// 暴露数据到全局（可选）
window.exampleRecallData = exampleRecallData;
window.exampleLegislators = exampleLegislators;
console.log('✅ XX市大罢免详细数据已加载');

/**
 * 数据格式说明：
 * 
 * 1. 地区数据格式：
 *    - legislator: 立委姓名（必需）
 *    - party: 政黨（必需）
 *    - district: 選舉區（可选）
 *    - isRecall: 是否参与罢免（必需，true表示参与）
 *    - agree_votes: 同意票数（必需）
 *    - disagree_votes: 不同意票数（必需）
 *    - valid_votes: 有效票数（必需）
 *    - total_voters: 投票人数（必需）
 *    - total_eligible: 有资格投票人数（必需）
 *    - turnout_rate: 投票率（可选，会自动计算）
 *    - agree_rate: 同意票率（可选，会自动计算）
 *    - disagree_rate: 不同意票率（可选，会自动计算）
 * 
 * 2. 立委信息会自动从地区数据中生成，包含：
 *    - name: 立委姓名
 *    - party: 政黨
 *    - district: 選舉區
 *    - regions: 所属地区列表
 *    - total_agree: 总同意票数
 *    - total_disagree: 总不同意票数
 *    - total_valid: 总有效票数
 *    - turnout_rate: 平均投票率
 *    - agree_rate: 平均同意票率
 *    - disagree_rate: 平均不同意票率
 * 
 * 3. 注册数据后，立委选择功能会自动启用，包括：
 *    - 立委下拉选择菜单
 *    - 立委详细数据面板（包含姓名、党派、选区等基本信息，根据党派显示不同颜色）
 *    - 立委选区地图高亮
 *    - 立委选区排行榜
 */ 