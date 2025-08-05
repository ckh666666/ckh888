// ===== 台湾2024年大选数据 =====
const electionData = [
    { region: "南投县", kmt_votes: 109163, dpp_votes: 103279, tpp_votes: 74854, total_votes: 287296, kmt_rate: 38.0, dpp_rate: 35.95, tpp_rate: 26.05 },
    { region: "嘉义市", kmt_votes: 49507, dpp_votes: 68199, tpp_votes: 39950, total_votes: 157656, kmt_rate: 31.4, dpp_rate: 43.26, tpp_rate: 25.34 },
    { region: "嘉义县", kmt_votes: 85642, dpp_votes: 139510, tpp_votes: 67382, total_votes: 292534, kmt_rate: 29.28, dpp_rate: 47.69, tpp_rate: 23.03 },
    { region: "基隆市", kmt_votes: 84507, dpp_votes: 76079, tpp_votes: 58195, total_votes: 218781, kmt_rate: 38.63, dpp_rate: 34.77, tpp_rate: 26.6 },
    { region: "宜兰县", kmt_votes: 77441, dpp_votes: 119517, tpp_votes: 70171, total_votes: 267129, kmt_rate: 28.99, dpp_rate: 44.74, tpp_rate: 26.27 },
    { region: "屏东县", kmt_votes: 146789, dpp_votes: 226110, tpp_votes: 103028, total_votes: 475927, kmt_rate: 30.84, dpp_rate: 47.51, tpp_rate: 21.65 },
    { region: "彰化县", kmt_votes: 244140, dpp_votes: 282514, tpp_votes: 214714, total_votes: 741368, kmt_rate: 32.93, dpp_rate: 38.11, tpp_rate: 28.96 },
    { region: "新北市", kmt_votes: 864557, dpp_votes: 948818, tpp_votes: 645105, total_votes: 2458480, kmt_rate: 35.17, dpp_rate: 38.59, tpp_rate: 26.24 },
    { region: "新竹市", kmt_votes: 82326, dpp_votes: 92679, tpp_votes: 91384, total_votes: 266389, kmt_rate: 30.9, dpp_rate: 34.79, tpp_rate: 34.3 },
    { region: "新竹县", kmt_votes: 126016, dpp_votes: 93309, tpp_votes: 120985, total_votes: 340310, kmt_rate: 37.03, dpp_rate: 27.42, tpp_rate: 35.55 },
    { region: "桃园市", kmt_votes: 460823, dpp_votes: 476441, tpp_votes: 413528, total_votes: 1350792, kmt_rate: 34.12, dpp_rate: 35.27, tpp_rate: 30.61 },
    { region: "澎湖县", kmt_votes: 18052, dpp_votes: 19023, tpp_votes: 12202, total_votes: 49277, kmt_rate: 36.63, dpp_rate: 38.6, tpp_rate: 24.76 },
    { region: "台中市", kmt_votes: 552556, dpp_votes: 641622, tpp_votes: 513025, total_votes: 1707203, kmt_rate: 32.37, dpp_rate: 37.58, tpp_rate: 30.05 },
    { region: "台北市", kmt_votes: 587258, dpp_votes: 587899, tpp_votes: 366854, total_votes: 1542011, kmt_rate: 38.08, dpp_rate: 38.13, tpp_rate: 23.79 },
    { region: "台南市", kmt_votes: 286867, dpp_votes: 570811, tpp_votes: 262560, total_votes: 1120238, kmt_rate: 25.61, dpp_rate: 50.95, tpp_rate: 23.44 },
    { region: "台东县", kmt_votes: 54220, dpp_votes: 30131, tpp_votes: 25590, total_votes: 109941, kmt_rate: 49.32, dpp_rate: 27.41, tpp_rate: 23.28 },
    { region: "花莲县", kmt_votes: 87953, dpp_votes: 43157, tpp_votes: 43047, total_votes: 174157, kmt_rate: 50.5, dpp_rate: 24.78, tpp_rate: 24.72 },
    { region: "苗栗县", kmt_votes: 131230, dpp_votes: 91798, tpp_votes: 95637, total_votes: 318665, kmt_rate: 41.18, dpp_rate: 28.81, tpp_rate: 30.01 },
    { region: "连江县", kmt_votes: 3860, dpp_votes: 648, tpp_votes: 1651, total_votes: 6159, kmt_rate: 62.67, dpp_rate: 10.52, tpp_rate: 26.81 },
    { region: "金门县", kmt_votes: 28005, dpp_votes: 4569, tpp_votes: 13038, total_votes: 45612, kmt_rate: 61.4, dpp_rate: 10.02, tpp_rate: 28.58 },
    { region: "云林县", kmt_votes: 111633, dpp_votes: 169516, tpp_votes: 99470, total_votes: 380619, kmt_rate: 29.33, dpp_rate: 44.54, tpp_rate: 26.13 },
    { region: "高雄市", kmt_votes: 478476, dpp_votes: 800390, tpp_votes: 358096, total_votes: 1636962, kmt_rate: 29.23, dpp_rate: 48.89, tpp_rate: 21.88 }
];

// ===== 地区名称映射（处理繁简转换） =====
const regionNameMap = {
    // 简体 -> 繁体的完整映射
    "台北市": "臺北市",
    "台中市": "臺中市", 
    "台南市": "臺南市",
    "台东县": "臺東縣",
    "南投县": "南投縣",
    "嘉义市": "嘉義市",
    "嘉义县": "嘉義縣",
    "宜兰县": "宜蘭縣",
    "屏东县": "屏東縣",
    "彰化县": "彰化縣",
    "新竹县": "新竹縣",
    "桃园市": "桃園市",
    "澎湖县": "澎湖縣",
    "花莲县": "花蓮縣",
    "苗栗县": "苗栗縣",
    "连江县": "連江縣",
    "金门县": "金門縣",
    "云林县": "雲林縣",
    "新北市": "新北市",
    "基隆市": "基隆市",
    "新竹市": "新竹市",
    "高雄市": "高雄市"
};

// ===== 党派配置 =====
const partyConfig = {
    kmt: {
        name: "中国国民党",
        shortName: "KMT",
        colors: ["#E6F3FF", "#CCE7FF", "#99D5FF", "#66C2FF", "#3399FF", "#0052CC"],
        primary: "#0052CC"
    },
    dpp: {
        name: "民主进步党", 
        shortName: "DPP",
        colors: ["#E6FFE6", "#CCFFCC", "#99FF99", "#66FF66", "#33CC33", "#006600"],
        primary: "#006600"
    },
    tpp: {
        name: "台湾民众党",
        shortName: "TPP", 
        colors: ["#E6FFFF", "#CCFFFF", "#99FFFF", "#66FFFF", "#33CCCC", "#006666"],
        primary: "#006666"
    },
    winner: {
        name: "获胜党派",
        shortName: "WINNER",
        colors: ["#FFF8E1", "#FFECB3", "#FFE082", "#FFD54F", "#FFC107", "#FF8F00"],
        primary: "#FF8F00",
        modes: {
            rate: "胜率模式",
            party: "党派模式"
        }
    },
    recall: {
        name: "大罢免分析",
        shortName: "RECALL",
        colors: ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#F44336", "#D32F2F"],
        primary: "#D32F2F"
    },
    "winner-ranking": {
        name: "获胜党票数排行",
        shortName: "WINNER-RANKING",
        colors: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3"],
        primary: "#2196F3"
    }
};

// ===== 大罢免地区数据 =====
const recallRegions = [
    "雲林縣", "基隆市", "臺東縣", "桃園市", "新北市", 
    "臺中市", "花蓮縣", "新竹市", "臺北市"
];

// ===== 大罢免席位数据 =====
const recallSeats = {
    "臺北市": 5,
    "新竹市": 2,
    "花蓮縣": 1,
    "臺中市": 3,
    "新北市": 5,
    "桃園市": 6,
    "臺東縣": 1,
    "基隆市": 1,
    "雲林縣": 1
};

// 将大罢免数据设为全局可用
window.recallRegions = recallRegions;
window.recallSeats = recallSeats;

// ===== 全局变量 =====
let currentParty = 'kmt';
let currentWinnerMode = 'rate'; // 'rate' 或 'party'
let dataByRegion = {};

// 确保全局变量同步
window.currentParty = currentParty;

// ===== 数据初始化 =====
function initializeData() {
    // 创建地区数据映射并计算获胜党派
    electionData.forEach(item => {
        // 计算获胜党派
        const parties = [
            { name: 'kmt', votes: item.kmt_votes, rate: item.kmt_rate },
            { name: 'dpp', votes: item.dpp_votes, rate: item.dpp_rate },
            { name: 'tpp', votes: item.tpp_votes, rate: item.tpp_rate }
        ];
        
        // 按得票数排序，找出获胜党派
        const winner = parties.reduce((a, b) => a.votes > b.votes ? a : b);
        item.winner_party = winner.name;
        item.winner_name = partyConfig[winner.name].name;
        item.winner_votes = winner.votes;
        item.winner_rate = winner.rate;
        
        const normalizedName = normalizeRegionName(item.region);
        dataByRegion[normalizedName] = item;
        dataByRegion[item.region] = item; // 保留原始名称
    });
    
    console.log('数据初始化完成，包含获胜党派信息:', dataByRegion);
}

// ===== 地区名称标准化 =====
function normalizeRegionName(name) {
    // 先检查直接映射
    if (regionNameMap[name]) {
        return regionNameMap[name];
    }
    
    // 标准化处理：简体->繁体
    let normalized = name
        .replace(/台/g, '臺')           // 台 -> 臺
        .replace(/县/g, '縣')           // 县 -> 縣  
        .replace(/连/g, '連')           // 连 -> 連
        .replace(/门/g, '門')           // 门 -> 門
        .replace(/东/g, '東')           // 东 -> 東
        .replace(/义/g, '義')           // 义 -> 義
        .replace(/兰/g, '蘭')           // 兰 -> 蘭
        .replace(/栗/g, '栗')           // 栗 -> 栗
        .replace(/云/g, '雲')           // 云 -> 雲
        .replace(/园/g, '園')           // 园 -> 園
        .replace(/湖/g, '湖')           // 湖 -> 湖
        .replace(/莲/g, '蓮');          // 莲 -> 蓮
    
    console.log('地区名称转换:', name, '->', normalized);
    return normalized;
}

// ===== 颜色映射算法 =====
function getRegionColor(regionName, party = currentParty) {
    const data = dataByRegion[regionName] || dataByRegion[normalizeRegionName(regionName)];
    
    if (!data) {
        console.warn('未找到地区数据:', regionName);
        return '#f8f9fa'; // 默认灰色
    }
    
    // 如果是大罢免模式
    if (party === 'recall') {
        const normalizedName = normalizeRegionName(regionName);
        const isRecallRegion = recallRegions.includes(regionName) || recallRegions.includes(normalizedName);
        
        if (isRecallRegion) {
            // 根据席位数量确定颜色深度
            const seats = recallSeats[regionName] || recallSeats[normalizedName] || 0;
            
            if (seats >= 5) {
                return '#B71C1C'; // 深红色 - 5席及以上
            } else if (seats >= 3) {
                return '#D32F2F'; // 中红色 - 3-4席
            } else if (seats >= 2) {
                return '#E53935'; // 浅红色 - 2席
            } else {
                return '#FFCDD2'; // 最浅红色 - 1席
            }
        } else {
            return '#9E9E9E'; // 灰色 - 不参与大罢免的地区
        }
    }
    
    // 如果是获胜党票数排行模式
    if (party === 'winner-ranking') {
        const { kmt_votes, dpp_votes, tpp_votes } = data;
        const votes = [kmt_votes, dpp_votes, tpp_votes];
        const parties = ['kmt', 'dpp', 'tpp'];
        const maxIndex = votes.indexOf(Math.max(...votes));
        const winnerParty = parties[maxIndex];
        
        // 根据获胜党派选择颜色系列
        let colors;
        switch (winnerParty) {
            case 'kmt':
                colors = ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3'];
                break;
            case 'dpp':
                colors = ['#E8F5E8', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50'];
                break;
            case 'tpp':
                colors = ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#00897B'];
                break;
            default:
                colors = ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3'];
        }
        
        // 根据获胜党派的票数确定颜色深度
        const winnerVotes = votes[maxIndex];
        const totalVotes = kmt_votes + dpp_votes + tpp_votes;
        const winnerRate = (winnerVotes / totalVotes) * 100;
        
        if (winnerRate >= 55) return colors[5]; // 最深色 55%+
        if (winnerRate >= 45) return colors[4]; // 深色 45-55%
        if (winnerRate >= 35) return colors[3]; // 中深色 35-45%
        if (winnerRate >= 25) return colors[2]; // 中色 25-35%
        if (winnerRate >= 15) return colors[1]; // 浅色 15-25%
        return colors[0]; // 最浅色 0-15%
    }
    
    // 如果是获胜党派模式
    if (party === 'winner') {
        const winnerParty = data.winner_party;
        const winnerRate = data.winner_rate;
        
        if (currentWinnerMode === 'rate') {
            // 胜率模式：金色显示得票率
            const colors = partyConfig.winner.colors;
            
            // 根据获胜党派的得票率分配颜色层级
            if (winnerRate >= 55) return colors[5]; // 最深色 55%+
            if (winnerRate >= 45) return colors[4]; // 深色 45-55%
            if (winnerRate >= 35) return colors[3]; // 中深色 35-45%
            if (winnerRate >= 25) return colors[2]; // 中色 25-35%
            if (winnerRate >= 15) return colors[1]; // 浅色 15-25%
            return colors[0]; // 最浅色 0-15%
        } else {
            // 党派模式：使用获胜党派的颜色
            const colors = partyConfig[winnerParty].colors;
            
            // 根据获胜党派的得票率分配颜色层级
            if (winnerRate >= 55) return colors[5]; // 最深色 55%+
            if (winnerRate >= 45) return colors[4]; // 深色 45-55%
            if (winnerRate >= 35) return colors[3]; // 中深色 35-45%
            if (winnerRate >= 25) return colors[2]; // 中色 25-35%
            if (winnerRate >= 15) return colors[1]; // 浅色 15-25%
            return colors[0]; // 最浅色 0-15%
        }
    }
    
    // 普通政党模式
    const rate = data[`${party}_rate`];
    if (rate == null) {
        return '#f8f9fa';
    }
    
    const colors = partyConfig[party].colors;
    
    // 根据得票率分配颜色层级
    if (rate >= 55) return colors[5]; // 最深色 55%+
    if (rate >= 45) return colors[4]; // 深色 45-55%
    if (rate >= 35) return colors[3]; // 中深色 35-45%
    if (rate >= 25) return colors[2]; // 中色 25-35%
    if (rate >= 15) return colors[1]; // 浅色 15-25%
    return colors[0]; // 最浅色 0-15%
}

// ===== 计算全台统计数据 =====
function calculateOverallStats() {
    const totals = electionData.reduce((acc, item) => ({
        kmt_votes: acc.kmt_votes + item.kmt_votes,
        dpp_votes: acc.dpp_votes + item.dpp_votes,
        tpp_votes: acc.tpp_votes + item.tpp_votes,
        total_votes: acc.total_votes + item.total_votes
    }), { kmt_votes: 0, dpp_votes: 0, tpp_votes: 0, total_votes: 0 });
    
    return {
        ...totals,
        kmt_rate: ((totals.kmt_votes / totals.total_votes) * 100).toFixed(2),
        dpp_rate: ((totals.dpp_votes / totals.total_votes) * 100).toFixed(2),
        tpp_rate: ((totals.tpp_votes / totals.total_votes) * 100).toFixed(2)
    };
}

// ===== 生成排行榜数据 =====
function generateRanking(party = currentParty) {
    if (party === 'recall') {
        // 大罢免模式：只显示参与罢免的地区，按席位数量排序
        return electionData
            .map(item => {
                const normalizedName = normalizeRegionName(item.region);
                const isRecallRegion = recallRegions.includes(item.region) || recallRegions.includes(normalizedName);
                const seats = recallSeats[item.region] || recallSeats[normalizedName] || 0;
                
                if (isRecallRegion) {
                    return {
                        region: item.region,
                        seats: seats,
                        isRecallRegion: true
                    };
                }
                return null;
            })
            .filter(item => item !== null) // 过滤掉不参与罢免的地区
            .sort((a, b) => b.seats - a.seats); // 按席位数量降序排列
    }
    
    return electionData
        .map(item => {
            if (party === 'winner') {
                return {
                    region: item.region,
                    rate: item.winner_rate,
                    votes: item.winner_votes,
                    total: item.total_votes,
                    winner_party: item.winner_party,
                    winner_name: item.winner_name,
                    winner_mode: currentWinnerMode
                };
            } else {
                return {
                    region: item.region,
                    rate: item[`${party}_rate`],
                    votes: item[`${party}_votes`],
                    total: item.total_votes
                };
            }
        })
        .sort((a, b) => b.rate - a.rate);
}

// ===== 获取地区详细信息 =====
function getRegionDetail(regionName) {
    const data = dataByRegion[regionName] || dataByRegion[normalizeRegionName(regionName)];
    
    if (!data) {
        return null;
    }
    
    // 使用已计算的获胜党派信息
    const winner = {
        party: data.winner_party,
        rate: data.winner_rate,
        name: data.winner_name,
        votes: data.winner_votes
    };
    
    return {
        ...data,
        winner,
        ranking: generateRanking().findIndex(item => item.region === data.region) + 1
    };
}

// ===== 格式化数字 =====
function formatNumber(num) {
    return new Intl.NumberFormat('zh-TW').format(num);
}

// ===== 格式化百分比 =====
function formatPercentage(num) {
    return `${num}%`;
}

// ===== 获取党派颜色 =====
function getPartyColor(party, level = 3) {
    return partyConfig[party]?.colors[level] || '#f8f9fa';
}

// ===== 切换当前党派 =====
function switchParty(party) {
    console.log('🔍 switchParty - 开始切换政党:', party);
    console.log('🔍 switchParty - partyConfig[party]:', partyConfig[party]);
    
    if (partyConfig[party]) {
        console.log('✅ 政党配置存在，开始切换');
        
        // 保存之前的党派状态（用于恢复）
        if (currentParty !== party) {
            window.previousParty = currentParty;
            console.log('💾 保存之前的党派状态:', window.previousParty);
        }
        
        currentParty = party;
        window.currentParty = party; // 确保全局变量同步更新
        console.log('✅ 已设置 currentParty:', currentParty);
        console.log('✅ 已设置 window.currentParty:', window.currentParty);
        
        // 更新党派按钮状态
        document.querySelectorAll('.party-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-party="${party}"]`).classList.add('active');
        console.log('✅ 已更新党派按钮状态');
        
        // 更新图例颜色
        updateLegendColors(party);
        console.log('✅ 已更新图例颜色');
        
        // 特殊处理：如果切换到winner模式且当前是党派模式，确保图例被隐藏
        if (party === 'winner' && window.currentWinnerMode === 'party') {
            console.log('🎯 切换到winner模式且当前是党派模式，确保图例隐藏');
            const legendContainer = document.querySelector('.map-legend');
            if (legendContainer) {
                legendContainer.style.display = 'none';
            }
        }
        
        // 触发地图更新
        if (window.updateMapColors) {
            window.updateMapColors(party);
            console.log('✅ 已触发地图更新');
        }
        
        // 触发地区地图更新
        if (window.updateDistrictMapColors) {
            console.log(`🎯 switchParty: 调用 updateDistrictMapColors(${party})`);
            window.updateDistrictMapColors(party);
            console.log('✅ 已触发地区地图更新');
        }
        
        // 如果是从获胜党票数排行模式切换出来，需要特殊处理
        if (party !== 'winner-ranking') {
            console.log('🔄 从获胜党票数排行模式切换出来，恢复地图颜色');
            
            // 调用退出获胜党票数排行模式的函数
            if (window.exitWinnerRankingMode) {
                window.exitWinnerRankingMode();
            }
            
            // 检查当前是否在地区视图
            if (window.districtMapState && window.districtMapState.currentView === 'district') {
                console.log('🎯 当前在地区视图，不重新渲染台湾地图');
                // 在地区视图时，只更新地区地图颜色，不重新渲染台湾地图
                if (window.updateDistrictMapColors) {
                    window.updateDistrictMapColors(party);
                }
            } else {
                // 在全岛视图时，重新渲染台湾地图
                if (window.renderTaiwanMap) {
                    window.renderTaiwanMap();
                    console.log('✅ 台湾地图重新渲染完成');
                }
            }
        }
        
        // 智能更新排行榜 - 根据当前视图状态
        console.log('🔄 开始智能更新排行榜');
        updateRankingDisplaySmart();
        
        // 大数据免模式下的特殊检查
        if (party === 'recall') {
            // 检查当前地区是否参与大罢免
            let currentRegionName = null;
            let shouldBlockRecallMode = false;
            
            // 如果在地区视图，检查当前地区
            if (window.districtMapState && window.districtMapState.currentView === 'district') {
                currentRegionName = window.districtMapState.currentDistrictName;
            }
            
            // 如果在全岛视图，检查是否有高亮的地区
            if (!currentRegionName) {
                // 尝试从地图中获取当前高亮的地区
                const highlightedRegion = d3.select("#taiwan-map").select('.region[style*="stroke-width: 3px"]');
                if (!highlightedRegion.empty()) {
                    currentRegionName = highlightedRegion.datum().properties.name;
                }
            }
            
            if (currentRegionName) {
                console.log('🎯 切换到大数据免模式，检查当前地区是否参与大罢免:', currentRegionName);
                
                const recallRegions = window.recallRegions || [];
                const isParticipating = recallRegions.some(region => {
                    // 处理可能的繁简体差异
                    const normalizedRegion = region.replace(/臺/g, '台').replace(/縣/g, '县');
                    const normalizedRegionName = currentRegionName.replace(/臺/g, '台').replace(/縣/g, '县');
                    return normalizedRegion === normalizedRegionName || region === currentRegionName;
                });
                
                if (!isParticipating) {
                    console.log('❌ 当前地区不参与大罢免:', currentRegionName);
                    
                    // 显示不参与大罢免的提示
                    if (window.showRecallNotParticipatingMessage) {
                        window.showRecallNotParticipatingMessage(currentRegionName);
                    }
                    
                    // 标记需要阻止切换到大数据免模式
                    shouldBlockRecallMode = true;
                } else {
                    console.log('✅ 当前地区参与大罢免:', currentRegionName);
                }
            }
            
            // 如果当前地区不参与大罢免，阻止切换到大数据免模式
            if (shouldBlockRecallMode) {
                console.log('🚫 阻止切换到大数据免模式，保持当前地图状态');
                
                // 恢复党派按钮状态到之前的状态
                const previousParty = window.previousParty || 'kmt';
                document.querySelectorAll('.party-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-party="${previousParty}"]`).classList.add('active');
                
                // 恢复之前的党派状态
                currentParty = previousParty;
                window.currentParty = previousParty;
                
                // 恢复之前的图例颜色
                updateLegendColors(previousParty);
                
                // 恢复之前的地图颜色
                if (window.updateMapColors) {
                    window.updateMapColors(previousParty);
                }
                
                // 恢复地区地图颜色（如果在地区视图）
                if (window.updateDistrictMapColors) {
                    window.updateDistrictMapColors(previousParty);
                }
                
                // 恢复排行榜
                updateRankingDisplaySmart();
                
                // 隐藏返回按钮（如果不是大数据免模式）
                if (window.districtMapState && window.districtMapState.currentView === 'district') {
                    if (window.hideBackToRegionButton) {
                        window.hideBackToRegionButton();
                    }
                }
                
                console.log('✅ 已恢复到之前的模式:', previousParty);
                return; // 提前退出，不执行后续的大数据免模式切换
            }
            
            // 如果通过检查，正常显示大数据免模式的返回按钮
            if (window.districtMapState && window.districtMapState.currentView === 'district') {
                if (window.showBackToRegionButton) {
                    window.showBackToRegionButton();
                }
            }
        } else {
            // 其他模式下隐藏返回按钮
            if (window.districtMapState && window.districtMapState.currentView === 'district') {
                if (window.hideBackToRegionButton) {
                    window.hideBackToRegionButton();
                }
            }
        }
        
        console.log('✅ 切换到:', partyConfig[party].name);
    } else {
        console.log('❌ 政党配置不存在:', party);
    }
}

// ===== 切换获胜党派模式 =====
function switchWinnerMode(mode) {
    if (currentParty === 'winner' && partyConfig.winner.modes[mode]) {
        currentWinnerMode = mode;
        window.currentWinnerMode = mode;
        
        // 更新模式切换按钮状态
        document.querySelectorAll('.winner-mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // 更新图例颜色
        updateLegendColors('winner');
        
        // 特殊处理：如果切换到党派模式，立即隐藏图例
        if (mode === 'party') {
            console.log('🎯 switchWinnerMode: 切换到党派模式，立即隐藏图例');
            const legendContainer = document.querySelector('.map-legend');
            if (legendContainer) {
                legendContainer.style.display = 'none';
            }
        }
        
        // 触发地图更新
        if (window.updateMapColors) {
            window.updateMapColors('winner');
        }
        
        // 触发地区地图更新
        if (window.updateWinnerMode) {
            window.updateWinnerMode(mode);
        }
        
        // 智能更新排行榜
        updateRankingDisplaySmart();
        
        console.log('切换到获胜党派模式:', partyConfig.winner.modes[mode]);
    }
}

// ===== 更新图例颜色 =====
function updateLegendColors(party) {
    const legendBar = document.querySelector('.legend-bar');
    const legendContainer = document.querySelector('.map-legend');
    const legendTitle = document.getElementById('legend-title');
    
    if (legendBar && legendContainer) {
        // 特殊检查：如果当前是winner模式且是党派模式，立即隐藏图例
        if (party === 'winner' && window.currentWinnerMode === 'party') {
            console.log('🎯 updateLegendColors: 立即隐藏党派模式图例');
            legendContainer.style.display = 'none';
            return;
        }
        
        if (party === 'recall') {
            // 大罢免模式：显示多级红色和灰色的图例
            legendContainer.style.display = 'block';
            legendTitle.textContent = '大罢免席位分级';
            legendBar.style.background = 'linear-gradient(to right, #9E9E9E, #FFCDD2, #E53935, #D32F2F, #B71C1C)';
            
            // 更新图例标签
            const legendLabels = legendContainer.querySelector('.legend-labels');
            if (legendLabels) {
                legendLabels.innerHTML = '<span>不参与</span><span>1席</span><span>2席</span><span>3-4席</span><span>5席+</span>';
            }
        } else if (party === 'winner' && currentWinnerMode === 'party') {
            // 党派模式：完全隐藏图例
            console.log('🎯 updateLegendColors: 党派模式隐藏图例');
            legendContainer.style.display = 'none';
            return;
        } else if (party === 'winner-ranking') {
            // 获胜党票数排行模式：隐藏图例
            legendContainer.style.display = 'none';
            return;
        } else {
            // 其他模式：显示图例
            legendContainer.style.display = 'block';
            legendTitle.textContent = '得票率图例';
            
            let colors;
            if (party === 'winner') {
                // 胜率模式：使用金色
                colors = partyConfig.winner.colors;
            } else {
                colors = partyConfig[party].colors;
            }
            
            legendBar.style.background = `linear-gradient(to right, ${colors[0]}, ${colors[2]}, ${colors[4]}, ${colors[5]})`;
            
            // 恢复默认图例标签
            const legendLabels = legendContainer.querySelector('.legend-labels');
            if (legendLabels) {
                legendLabels.innerHTML = '<span>0%</span><span>20%</span><span>40%</span><span>60%+</span>';
            }
        }
    }
}

// ===== 智能更新排行榜显示 =====
function updateRankingDisplaySmart() {
    console.log('🔍 updateRankingDisplaySmart - 开始执行');
    console.log('🔍 updateRankingDisplaySmart - currentParty:', currentParty);
    console.log('🔍 updateRankingDisplaySmart - districtMapState:', window.districtMapState);
    console.log('🔍 updateRankingDisplaySmart - currentView:', window.districtMapState ? window.districtMapState.currentView : 'undefined');
    
    // 延迟执行，确保视图状态已经正确设置
    setTimeout(() => {
        console.log('🔍 updateRankingDisplaySmart - 延迟执行开始');
        console.log('🔍 updateRankingDisplaySmart - 延迟后 districtMapState:', window.districtMapState);
        console.log('🔍 updateRankingDisplaySmart - 延迟后 currentView:', window.districtMapState ? window.districtMapState.currentView : 'undefined');
        
        if (window.districtMapState && window.districtMapState.currentView === 'district') {
            console.log('🔄 当前在地区视图，更新地区排行榜');
            
            // 如果在地区视图，调用地区排行榜更新
            if (window.updateDistrictRankingForPartySwitch) {
                console.log('✅ 调用 updateDistrictRankingForPartySwitch');
                window.updateDistrictRankingForPartySwitch();
            } else {
                console.log('❌ updateDistrictRankingForPartySwitch 函数不存在');
            }
        } else {
            console.log('🔄 当前在台湾地图视图，更新全台排行榜');
            
            // 如果在台湾地图视图，更新全台排行榜
            updateRankingDisplay();
        }
    }, 100);
}

// ===== 更新排行榜显示 =====
function updateRankingDisplay() {
    const rankingList = document.getElementById('ranking-list');
    const rankingTitle = document.getElementById('ranking-title');
    if (!rankingList) return;
    
    // 更新排行榜标题
    console.log('🔍 updateRankingDisplay - currentParty:', currentParty);
    console.log('🔍 updateRankingDisplay - districtMapState:', window.districtMapState);
    console.log('🔍 updateRankingDisplay - currentView:', window.districtMapState ? window.districtMapState.currentView : 'taiwan');
    console.log('🔍 updateRankingDisplay - rankingTitle:', rankingTitle);
    
    if (currentParty === 'recall') {
        console.log('✅ 当前为罢免模式');
        if (rankingTitle) {
            // 检查当前是否在地区视图
            const currentView = window.districtMapState ? window.districtMapState.currentView : 'taiwan';
            console.log('🔍 当前视图:', currentView);
            console.log('🔍 districtMapState:', window.districtMapState);
            
            if (currentView === 'taiwan') {
                // 台湾地区视图：显示罢免席位排行
                rankingTitle.textContent = '🏆 罢免席位排行';
                console.log('✅ 设置为罢免席位排行');
                console.log('🔍 设置后的 rankingTitle.textContent:', rankingTitle.textContent);
            } else if (currentView === 'district') {
                // 分地区视图：显示投票率排行
                rankingTitle.textContent = '🏆 投票率排行';
                console.log('✅ 设置为投票率排行');
                console.log('🔍 设置后的 rankingTitle.textContent:', rankingTitle.textContent);
            } else {
                // 其他情况：显示投票率排行
                rankingTitle.textContent = '🏆 投票率排行';
                console.log('✅ 设置为投票率排行（其他情况）');
                console.log('🔍 设置后的 rankingTitle.textContent:', rankingTitle.textContent);
            }
        } else {
            console.log('❌ rankingTitle 元素不存在');
        }
            } else {
            console.log('❌ 当前不是罢免模式，currentParty:', currentParty);
            if (rankingTitle) {
                rankingTitle.textContent = '🏆 得票率排行';
                console.log('✅ 设置为得票率排行');
            }
        }
        
        // 强制更新DOM以确保标题显示正确
        if (rankingTitle) {
            rankingTitle.style.display = 'none';
            rankingTitle.offsetHeight; // 触发重排
            rankingTitle.style.display = '';
            console.log('✅ 强制更新DOM完成');
        }
    
    const ranking = generateRanking(currentParty);
    
    rankingList.innerHTML = ranking.map((item, index) => {
        let displayText = '';
        let color = getPartyColor(currentParty, 4);
        
        if (currentParty === 'recall') {
            // 大罢免模式：只显示参与罢免的地区，按席位排序
            displayText = `${item.seats}席`;
            if (item.seats >= 5) {
                color = '#B71C1C';
            } else if (item.seats >= 3) {
                color = '#D32F2F';
            } else if (item.seats >= 2) {
                color = '#E53935';
            } else {
                color = '#F44336';
            }
        } else if (currentParty === 'winner') {
            if (currentWinnerMode === 'rate') {
                // 胜率模式：显示获胜党派名称和得票率
                displayText = `${item.winner_name} ${formatPercentage(item.rate)}`;
                color = partyConfig.winner.primary;
            } else {
                // 党派模式：只显示获胜党派名称
                displayText = `${item.winner_name}`;
                color = partyConfig[item.winner_party].primary;
            }
        } else {
            // 普通政党模式
            displayText = formatPercentage(item.rate);
        }
        
        return `
            <div class="ranking-item" data-region="${item.region}">
                <div class="ranking-number ${index < 3 ? 'top-3' : ''}">${index + 1}</div>
                <div class="ranking-region">${item.region}</div>
                <div class="ranking-percentage" style="color: ${color}">
                    ${displayText}
                </div>
            </div>
        `;
    }).join('');
    
    // 添加点击事件
    rankingList.querySelectorAll('.ranking-item').forEach(item => {
        item.addEventListener('click', () => {
            const regionName = item.dataset.region;
            showRegionDetail(regionName);
            
            // 高亮地图上的对应区域
            if (window.highlightRegion) {
                window.highlightRegion(regionName);
            }
        });
    });
}

// ===== 显示地区详情 =====
function showRegionDetail(regionName) {
    const detail = getRegionDetail(regionName);
    const detailContainer = document.getElementById('region-detail');
    
    if (!detail || !detailContainer) return;
    
    // 检查是否为大罢免模式
    if (currentParty === 'recall') {
        const normalizedName = normalizeRegionName(regionName);
        const isRecallRegion = recallRegions.includes(regionName) || recallRegions.includes(normalizedName);
        const seats = recallSeats[regionName] || recallSeats[normalizedName] || 0;
        
        let color, bgColor;
        if (isRecallRegion) {
            if (seats >= 5) {
                color = '#B71C1C';
                bgColor = '#FFEBEE';
            } else if (seats >= 3) {
                color = '#D32F2F';
                bgColor = '#FFEBEE';
            } else if (seats >= 2) {
                color = '#E53935';
                bgColor = '#FFEBEE';
            } else {
                color = '#F44336';
                bgColor = '#FFEBEE';
            }
        } else {
            color = '#9E9E9E';
            bgColor = '#F5F5F5';
        }
        
        detailContainer.innerHTML = `
            <div class="detail-content">
                <div class="detail-title">${detail.region}</div>
                <div style="margin-top: 15px; padding: 15px; background: ${bgColor}; border-radius: 5px; text-align: center;">
                    <strong style="color: ${color}; font-size: 1.1rem;">
                        ${isRecallRegion ? `参与大罢免 (${seats}席)` : '不参与大罢免'}
                    </strong>
                    <br>
                    <small style="color: #666; margin-top: 5px; display: block;">
                        ${isRecallRegion ? `该地区参与2025年7月26日大罢免投票，发起${seats}个席位罢免` : '该地区未参与大罢免投票'}
                    </small>
                </div>
            </div>
        `;
        return;
    }
    
    detailContainer.innerHTML = `
        <div class="detail-content">
            <div class="detail-title">${detail.region}</div>
            <div class="detail-stats">
                <div class="detail-stat">
                    <div class="detail-stat-value" style="color: ${partyConfig.kmt.primary}">
                        ${formatPercentage(detail.kmt_rate)}
                    </div>
                    <div class="detail-stat-label">国民党得票率</div>
                </div>
                <div class="detail-stat">
                    <div class="detail-stat-value" style="color: ${partyConfig.dpp.primary}">
                        ${formatPercentage(detail.dpp_rate)}
                    </div>
                    <div class="detail-stat-label">民进党得票率</div>
                </div>
                <div class="detail-stat">
                    <div class="detail-stat-value" style="color: ${partyConfig.tpp.primary}">
                        ${formatPercentage(detail.tpp_rate)}
                    </div>
                    <div class="detail-stat-label">民众党得票率</div>
                </div>
                <div class="detail-stat">
                    <div class="detail-stat-value">${formatNumber(detail.total_votes)}</div>
                    <div class="detail-stat-label">总投票数</div>
                </div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px; text-align: center;">
                <strong style="color: ${partyConfig[detail.winner.party].primary};">
                    ${detail.winner.name} 获胜
                </strong>
                <br>
                <small>全台排名第 ${detail.ranking} 位</small>
            </div>
        </div>
    `;
}

// ===== 更新全台统计显示 =====
function updateOverallStats() {
    const stats = calculateOverallStats();
    
    const totalVotesEl = document.getElementById('total-votes');
    const validVotesEl = document.getElementById('valid-votes');
    const turnoutRateEl = document.getElementById('turnout-rate');
    
    if (totalVotesEl) totalVotesEl.textContent = formatNumber(stats.total_votes);
    if (validVotesEl) validVotesEl.textContent = formatNumber(stats.total_votes);
    if (turnoutRateEl) turnoutRateEl.textContent = "75.23%"; // 假设投票率
}

// ===== 创建分析图表 =====
function createAnalysisChart() {
    const chartContainer = document.getElementById('analysis-chart');
    if (!chartContainer) return;
    
    // 计算三党得票数据
    const overallStats = calculateOverallStats();
    
    const chartData = [
        { party: '国民党', votes: overallStats.kmt_votes, rate: parseFloat(overallStats.kmt_rate), color: partyConfig.kmt.primary },
        { party: '民进党', votes: overallStats.dpp_votes, rate: parseFloat(overallStats.dpp_rate), color: partyConfig.dpp.primary },
        { party: '民众党', votes: overallStats.tpp_votes, rate: parseFloat(overallStats.tpp_rate), color: partyConfig.tpp.primary }
    ];
    
    // 创建简单的横向柱状图
    chartContainer.innerHTML = `
        <div style="width: 100%; padding: 10px;">
            <h4 style="margin-bottom: 15px; text-align: center; color: var(--text-color);">全台得票率对比</h4>
            ${chartData.map(item => `
                <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.9rem;">
                        <span style="color: ${item.color}; font-weight: 500;">${item.party}</span>
                        <span style="font-weight: 600;">${item.rate}%</span>
                    </div>
                    <div style="background: #f0f0f0; height: 20px; border-radius: 10px; overflow: hidden;">
                        <div style="
                            background: ${item.color}; 
                            height: 100%; 
                            width: ${item.rate}%; 
                            border-radius: 10px;
                            transition: width 0.8s ease;
                        "></div>
                    </div>
                    <div style="font-size: 0.8rem; color: #666; margin-top: 2px;">
                        ${formatNumber(item.votes)} 票
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== 初始化事件监听器 =====
function initializeEventListeners() {
    // 党派切换按钮
    document.querySelectorAll('.party-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const party = btn.dataset.party;
            switchParty(party);
            
            // 显示/隐藏获胜党派模式控制
            const winnerModeControls = document.getElementById('winner-mode-controls');
            if (winnerModeControls) {
                if (party === 'winner') {
                    winnerModeControls.style.display = 'block';
                    
                    // 特殊处理：如果当前是党派模式，确保图例被隐藏
                    if (window.currentWinnerMode === 'party') {
                        console.log('🎯 切换到winner模式且当前是党派模式，确保图例隐藏');
                        const legendContainer = document.querySelector('.map-legend');
                        if (legendContainer) {
                            legendContainer.style.display = 'none';
                        }
                    }
                } else {
                    winnerModeControls.style.display = 'none';
                }
            }
        });
    });
    
    // 获胜党派模式切换按钮
    document.querySelectorAll('.winner-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            switchWinnerMode(mode);
        });
    });
    
    console.log('事件监听器初始化完成');
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('开始初始化选举数据...');
    
    initializeData();
    initializeEventListeners();
    updateOverallStats();
    
    // 根据当前政党模式正确设置排行榜标题
    console.log('🔍 页面初始化 - currentParty:', currentParty);
    console.log('🔍 页面初始化 - window.currentParty:', window.currentParty);
    
    // 确保在页面加载时根据当前政党模式设置正确的排行榜标题
    // 延迟执行以确保所有元素都已加载
    setTimeout(() => {
        // 页面初始化时保持默认的国民党模式，不自动切换到罢免模式
        console.log('🔍 页面初始化 - 保持默认模式:', currentParty);
        
        // 确保按钮状态正确
        document.querySelectorAll('.party-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const kmtBtn = document.querySelector('.party-btn[data-party="kmt"]');
        if (kmtBtn) {
            kmtBtn.classList.add('active');
        }
        
        updateRankingDisplay();
        console.log('✅ 页面初始化 - 排行榜标题已更新');
    }, 200);
    
    updateLegendColors(currentParty);
    createAnalysisChart();
    
    console.log('选举数据初始化完成');
});

// ===== 导出全局函数 =====
window.electionData = electionData;
window.getRegionColor = getRegionColor;
window.showRegionDetail = showRegionDetail;
window.switchParty = switchParty;
window.switchWinnerMode = switchWinnerMode;
window.updateLegendColors = updateLegendColors;
window.formatNumber = formatNumber;
window.formatPercentage = formatPercentage; 