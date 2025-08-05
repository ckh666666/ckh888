/**
 * 地区详细地图 - 轻量级实现
 * 基于taiwan-map.js的架构，实现县市详细地图功能
 */

// 本地getPartyColor函数定义，避免依赖其他文件
function getPartyColor(party, level = 3) {
    const colors = {
        kmt: ['#E6F3FF', '#CCE7FF', '#99D5FF', '#66C2FF', '#3399FF', '#0052CC'],
        dpp: ['#E6FFE6', '#CCFFCC', '#99FF99', '#66FF66', '#33CC33', '#006600'],
        tpp: ['#E6FFFF', '#CCFFFF', '#99FFFF', '#66FFFF', '#33CCCC', '#006666']
    };
    return colors[party] ? colors[party][level] : '#f8f9fa';
}

// 全局状态管理
window.districtMapState = {
    currentView: 'taiwan', // 'taiwan' 或 'district'
    currentDistrictName: null,
    currentDistrictCode: null,
    isLoading: false,
    currentMode: 'district', // 'district' 或 'legislator'
    selectedLegislator: null // 当前选中的立委
};

/**
 * 重叠区域数据管理器
 */
window.overlappingDataManager = {
    // 重叠区域配置
    overlappingRegions: {
        '新竹市': ['東區', '北區', '香山區'],
        '桃园市': ['桃園區', '中壢區'],
        '台北市': ['松山區']
    },
    
    // 重叠区域数据存储
    overlappingData: {},
    
    // 检查是否为重叠区域
    isOverlappingRegion(districtName, regionName) {
        // 处理简繁体转换
        const normalizedDistrictName = districtName.replace(/台/g, '臺').replace(/县/g, '縣').replace(/园/g, '園');
        const reverseNormalizedDistrictName = districtName.replace(/臺/g, '台').replace(/縣/g, '县').replace(/園/g, '园');
        
        // 尝试多种可能的地区名称
        const possibleDistrictNames = [districtName, normalizedDistrictName, reverseNormalizedDistrictName];
        
        console.log(`🔍 检查重叠区域: ${districtName} - ${regionName}`);
        console.log(`🔍 可能的地区名称:`, possibleDistrictNames);
        console.log(`🔍 当前重叠区域配置:`, this.overlappingRegions);
        
        for (const name of possibleDistrictNames) {
            const regions = this.overlappingRegions[name];
            if (regions && regions.includes(regionName)) {
                console.log(`✅ 找到重叠区域: ${name} - ${regionName}`);
                return true;
            }
        }
        
        console.log(`❌ 未找到重叠区域: ${districtName} - ${regionName}`);
        return false;
    },
    
    // 注册地区重叠数据
    registerDistrictData(districtName, data) {
        this.overlappingData[districtName] = data;
        console.log(`✅ 注册重叠区域数据: ${districtName}`);
        console.log(`🔍 注册的数据:`, data);
    },
    
    // 获取重叠区域数据
    getOverlappingData(districtName, regionName, legislatorName = null) {
        // 处理简繁体转换，找到正确的数据
        const normalizedDistrictName = districtName.replace(/台/g, '臺').replace(/县/g, '縣').replace(/园/g, '園');
        const reverseNormalizedDistrictName = districtName.replace(/臺/g, '台').replace(/縣/g, '县').replace(/園/g, '园');
        
        const possibleDistrictNames = [districtName, normalizedDistrictName, reverseNormalizedDistrictName];
        let districtData = null;
        let actualDistrictName = null;
        
        for (const name of possibleDistrictNames) {
            if (this.overlappingData[name]) {
                districtData = this.overlappingData[name];
                actualDistrictName = name;
                break;
            }
        }
        
        if (!districtData) return null;
        
        if (legislatorName) {
            // 立委模式：查找特定立委的数据
            const key = `${regionName}_${legislatorName}`;
            return districtData[key] || null;
        } else {
            // 地区模式：返回该地区所有立委的综合数据
            return this.getRegionSummaryData(actualDistrictName, regionName, districtData);
        }
    },
    
    // 获取地区综合数据（用于地区模式显示）
    getRegionSummaryData(districtName, regionName, districtData) {
        const regionKeys = Object.keys(districtData).filter(key => key.startsWith(regionName));
        if (regionKeys.length === 0) return null;
        
        // 计算综合投票率（取最高值）
        const rates = regionKeys.map(key => districtData[key].turnout_rate);
        const maxRate = Math.max(...rates);
        
        // 计算总票数
        const totalVotes = regionKeys.reduce((sum, key) => sum + districtData[key].valid_votes, 0);
        const totalAgreeVotes = regionKeys.reduce((sum, key) => sum + districtData[key].agree_votes, 0);
        const totalDisagreeVotes = regionKeys.reduce((sum, key) => sum + districtData[key].disagree_votes, 0);
        
        return {
            turnout_rate: maxRate,
            agree_votes: totalAgreeVotes,
            disagree_votes: totalDisagreeVotes,
            valid_votes: totalVotes,
            agree_rate: (totalAgreeVotes / totalVotes) * 100,
            disagree_rate: (totalDisagreeVotes / totalVotes) * 100,
            is_overlapping: true,
            legislators: regionKeys.map(key => key.split('_')[1])
        };
    },
    
    // 获取地区所有立委数据（用于悬停显示）
    getAllLegislatorsForRegion(districtName, regionName) {
        // 处理简繁体转换，找到正确的数据
        const normalizedDistrictName = districtName.replace(/台/g, '臺').replace(/县/g, '縣').replace(/园/g, '園');
        const reverseNormalizedDistrictName = districtName.replace(/臺/g, '台').replace(/縣/g, '县').replace(/園/g, '园');
        
        const possibleDistrictNames = [districtName, normalizedDistrictName, reverseNormalizedDistrictName];
        let districtData = null;
        let actualDistrictName = null;
        
        for (const name of possibleDistrictNames) {
            if (this.overlappingData[name]) {
                districtData = this.overlappingData[name];
                actualDistrictName = name;
                break;
            }
        }
        
        if (!districtData) return [];
        
        const regionKeys = Object.keys(districtData).filter(key => key.startsWith(regionName));
        console.log(`🔍 重叠区域数据查找: ${actualDistrictName} - ${regionName}`);
        console.log(`🔍 找到的键:`, regionKeys);
        console.log(`🔍 原始数据:`, districtData);
        console.log(`🔍 所有键:`, Object.keys(districtData));
        console.log(`🔍 过滤条件: key.startsWith('${regionName}')`);
        
        const result = regionKeys.map(key => {
            const data = districtData[key];
            const legislatorName = key.split('_')[1];
            console.log(`🔍 处理键 ${key}, 立委: ${legislatorName}, 原始数据:`, data);
            
            // 确保数据是独立的副本，并且包含正确的立委信息
            const resultData = {
                ...data,
                legislator_name: legislatorName,
                // 确保使用正确的立委名称
                legislator: legislatorName,
                // 添加选区信息
                region: regionName
            };
            
            // 如果是市长数据，确保mayor字段正确设置
            if (data.mayor) {
                resultData.mayor = data.mayor;
            }
            
            console.log(`🔍 处理后数据:`, resultData);
            return resultData;
        });
        
        console.log(`🔍 最终结果:`, result);
        return result;
    },
    
    // 加载重叠区域配置
    async loadOverlappingConfigs() {
        try {
            const response = await fetch('./overlapping-configs.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const configs = await response.json();
            
            // 注册重叠区域数据
            Object.keys(configs).forEach(districtName => {
                this.registerDistrictData(districtName, configs[districtName]);
            });
            
            console.log('✅ 重叠区域配置加载完成');
            return true;
        } catch (error) {
            console.warn('⚠️ 重叠区域配置加载失败:', error);
            return false;
        }
    }
};

/**
 * 获取罢免数据（支持模式区分）
 * @param {string} districtName - 县市名称
 * @param {string} regionName - 区域名称
 * @param {string} currentMode - 当前模式 ('district' 或 'legislator')
 * @param {string} selectedLegislator - 选中的立委名称（立委模式时使用）
 * @returns {object|null} 罢免数据
 */
function getRecallDataForDisplay(districtName, regionName, currentMode = 'district', selectedLegislator = null) {
    // 检查是否为重叠区域
    const isOverlapping = window.overlappingDataManager.isOverlappingRegion(districtName, regionName);
    
    if (isOverlapping) {
        console.log(`🔍 重叠区域数据处理: ${districtName} - ${regionName}, 模式: ${currentMode}, 立委: ${selectedLegislator}`);
        
        if (currentMode === 'legislator' && selectedLegislator) {
            // 立委模式：返回特定立委的数据
            const data = window.overlappingDataManager.getOverlappingData(districtName, regionName, selectedLegislator);
            console.log(`✅ 立委模式数据:`, data);
            return data;
        } else {
            // 地区模式：返回综合数据
            const data = window.overlappingDataManager.getOverlappingData(districtName, regionName);
            console.log(`✅ 地区模式数据:`, data);
            return data;
        }
    } else {
        // 非重叠区域：使用原有逻辑
        const data = window.getRecallData(districtName, regionName);
        console.log(`✅ 非重叠区域数据:`, data);
        return data;
    }
}

/**
 * 获取地区所有立委数据（用于悬停显示）
 * @param {string} districtName - 县市名称
 * @param {string} regionName - 区域名称
 * @param {string} currentMode - 当前模式
 * @param {string} selectedLegislator - 选中的立委名称
 * @returns {array} 立委数据数组
 */
function getAllRecallDataForRegionWithMode(districtName, regionName, currentMode = 'district', selectedLegislator = null) {
    // 检查是否为重叠区域
    const isOverlapping = window.overlappingDataManager.isOverlappingRegion(districtName, regionName);
    
    if (isOverlapping) {
        if (currentMode === 'legislator' && selectedLegislator) {
            // 立委模式：只返回选中立委的数据
            const data = window.overlappingDataManager.getOverlappingData(districtName, regionName, selectedLegislator);
            return data ? [{
                ...data,
                legislator_name: selectedLegislator
            }] : [];
        } else {
            // 地区模式：返回该区域所有立委的数据
            return window.overlappingDataManager.getAllLegislatorsForRegion(districtName, regionName);
        }
    } else {
        // 非重叠区域：使用原有逻辑
        return getAllRecallDataForRegion(districtName, regionName);
    }
}

/**
 * 获取地区颜色（支持模式区分）
 * @param {string} regionName - 区域名称
 * @param {string} districtName - 县市名称
 * @param {string} currentMode - 当前模式
 * @param {string} selectedLegislator - 选中的立委名称
 * @returns {string} 颜色代码
 */
function getDistrictColorForMode(regionName, districtName, currentMode = 'district', selectedLegislator = null) {
    const currentParty = window.currentParty || 'kmt';
    
    // 如果是罢免模式
    if (currentParty === 'recall') {
        const recallData = getRecallDataForDisplay(districtName, regionName, currentMode, selectedLegislator);
        
        if (!recallData) return '#f0f0f0';
        
        // 根据当前模式使用不同的比率
        let rateToUse;
        let isTurnoutRate = true;
        
        if (currentMode === 'legislator' && selectedLegislator) {
            // 立委模式：使用同意票比率
            rateToUse = recallData.agree_rate;
            isTurnoutRate = false;
            console.log(`🎨 立委模式颜色映射: ${regionName}, 立委: ${selectedLegislator}, 同意率: ${rateToUse}%`);
        } else {
            // 地区模式：使用投票率
            rateToUse = recallData.turnout_rate;
            console.log(`🎨 地区模式颜色映射: ${regionName}, 投票率: ${rateToUse}%`);
        }
        
        return getRecallColorByRate(rateToUse, isTurnoutRate);
    }
    
    // 如果是获胜党票数排行模式
    if (currentParty === 'winner-ranking') {
        console.log(`🎯 获胜党票数排行模式：计算 ${regionName} 的颜色`);
        const electionData = getRealElectionData(regionName);
        
        console.log(`📊 ${regionName} 选举数据:`, electionData);
        
        if (!electionData) {
            console.log(`❌ ${regionName} 没有选举数据`);
            return '#f0f0f0';
        }
        
        const { kmt_votes, dpp_votes, tpp_votes, total_votes } = electionData;
        const votes = [kmt_votes, dpp_votes, tpp_votes];
        const parties = ['kmt', 'dpp', 'tpp'];
        const partyNames = ['中国国民党', '民主进步党', '台湾民众党'];
        const maxIndex = votes.indexOf(Math.max(...votes));
        const winnerParty = parties[maxIndex];
        const winnerVotes = votes[maxIndex];
        
        // 获胜党颜色配置（与winner-ranking.js保持一致）
        const winnerRankingConfig = {
            kmt_colors: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3"],
            dpp_colors: ["#E8F5E8", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50"],
            tpp_colors: ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#00897B"]
        };
        
        // 根据党派选择颜色系列
        let colors;
        switch (winnerParty) {
            case 'kmt':
                colors = winnerRankingConfig.kmt_colors;
                break;
            case 'dpp':
                colors = winnerRankingConfig.dpp_colors;
                break;
            case 'tpp':
                colors = winnerRankingConfig.tpp_colors;
                break;
            default:
                colors = winnerRankingConfig.kmt_colors;
        }
        
        // 计算当前地区所有获胜党票数的范围（用于颜色分档）
        const currentDistrict = window.districtMapState.currentDistrictName;
        const geoData = window.currentGeoData;
        
        if (geoData) {
            const allWinnerVotes = geoData.features.map(feature => {
                const regionData = getRealElectionData(feature.properties.name);
                if (regionData) {
                    const { kmt_votes, dpp_votes, tpp_votes } = regionData;
                    const votes = [kmt_votes, dpp_votes, tpp_votes];
                    return Math.max(...votes);
                }
                return 0;
            }).filter(votes => votes > 0);
            
            if (allWinnerVotes.length > 0) {
                const minVotes = Math.min(...allWinnerVotes);
                const maxVotes = Math.max(...allWinnerVotes);
                const range = maxVotes - minVotes;
                const levelSize = range / 5;
                const levels = [
                    minVotes,
                    minVotes + levelSize,
                    minVotes + levelSize * 2,
                    minVotes + levelSize * 3,
                    minVotes + levelSize * 4,
                    maxVotes
                ];
                
                // 确定颜色等级 (0-5)
                let colorIndex = 0;
                for (let i = 0; i < levels.length - 1; i++) {
                    if (winnerVotes >= levels[i] && winnerVotes <= levels[i + 1]) {
                        colorIndex = i;
                        break;
                    }
                }
                
                console.log(`✅ ${regionName} 获胜党: ${winnerParty}, 票数: ${winnerVotes}, 颜色等级: ${colorIndex}, 颜色: ${colors[colorIndex]}`);
                return colors[colorIndex];
            }
        }
        
        // 如果无法计算分档，使用默认颜色
        if (colors && colors.length > 2) {
            console.log(`⚠️ ${regionName} 使用默认颜色等级: ${colors[2]}`);
            return colors[2]; // 使用中等深度的颜色
        } else {
            // 如果colors未定义，使用默认的蓝色
            console.log(`⚠️ ${regionName} 使用默认蓝色: #64B5F6`);
            return '#64B5F6';
        }
    }
    
    // 普通选举模式
    const electionData = getRealElectionData(regionName);
    
    if (!electionData) return '#f0f0f0';
    
    // 使用全局的颜色映射函数
    if (window.getRegionColor) {
        return window.getRegionColor(regionName, currentParty);
    }
    
    // 如果没有全局函数，使用默认逻辑
    const rate = electionData[`${currentParty}_rate`];
    if (rate == null) {
        return '#f0f0f0';
    }
    
    // 转换为百分比
    const percentage = rate <= 1 ? rate * 100 : rate;
    
    // 根据得票率分配颜色层级
    if (percentage >= 55) return '#0052CC'; // 最深色 55%+
    if (percentage >= 45) return '#3399FF'; // 深色 45-55%
    if (percentage >= 35) return '#66C2FF'; // 中深色 35-45%
    if (percentage >= 25) return '#99D5FF'; // 中色 25-35%
    if (percentage >= 15) return '#CCE7FF'; // 浅色 15-25%
    return '#E6F3FF'; // 最浅色 0-15%
}

/**
 * 加载县市详细地图 - 主要入口函数
 */
window.loadDistrictMap = async function(districtName, districtCode) {
    console.log(`🚀 开始加载 ${districtName} 详细地图 (代码: ${districtCode})`);
    
    // 防止重复加载
    if (window.districtMapState.isLoading) {
        console.log('⚠️ 正在加载中，请稍候...');
        return;
    }
    
    window.districtMapState.isLoading = true;
    window.districtMapState.currentDistrictName = districtName;
    window.districtMapState.currentDistrictCode = districtCode;
    
    try {
        // 显示加载状态
        showLoadingState(true);
        
        // 加载重叠区域配置（如果还没有加载）
        if (Object.keys(window.overlappingDataManager.overlappingData).length === 0) {
            console.log('📥 正在加载重叠区域配置...');
            await window.overlappingDataManager.loadOverlappingConfigs();
        }
        
        // 加载县市JSON数据
        console.log(`📥 正在加载 towns-${districtCode}.json...`);
        const response = await fetch(`./towns/towns-${districtCode}.json`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const topology = await response.json();
        console.log(`✅ ${districtName} TopoJSON数据加载成功`);
        
        // 验证数据格式
        if (!topology.objects || !topology.objects.map) {
            throw new Error('数据格式错误：缺少必要字段');
        }
        
        // 转换为GeoJSON
        const geoData = topojson.feature(topology, topology.objects.map);
        console.log(`🔄 转换为GeoJSON成功，共 ${geoData.features.length} 个行政区`);
        
        // 保存当前GeoJSON数据到全局变量
        window.currentGeoData = geoData;
        
        // 渲染县市详细地图
        renderDistrictMap(geoData, districtName);
        
        // 更新UI状态
        updateUIState('district', districtName);
        
        // 更新排行榜为地区数据
        updateDistrictRanking(districtName, geoData);
        
        // 只在罢免模式下显示返回地区地图按钮
        const currentParty = window.currentParty || 'kmt';
        if (currentParty === 'recall') {
            showBackToRegionButton();
        } else {
            hideBackToRegionButton();
        }
        

        
        window.districtMapState.currentView = 'district';
        
    } catch (error) {
        console.error(`❌ 加载 ${districtName} 地图失败:`, error);
        alert(`加载 ${districtName} 地图失败：${error.message}`);
    } finally {
        window.districtMapState.isLoading = false;
        showLoadingState(false);
    }
};

/**
 * 渲染县市详细地图 - 复用taiwan-map.js的逻辑
 */
function renderDistrictMap(geoData, districtName) {
    console.log(`🎨 开始渲染 ${districtName} 详细地图`);
    
    // 复用taiwan-map.js的SVG设置
    const width = 800;
    const height = 600;
    const svg = d3.select("#taiwan-map")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");
    
    // 清除现有内容
    svg.selectAll('*').remove();
    
    // 为每个行政区添加模拟选举数据
    const districtData = {};
    geoData.features.forEach(feature => {
        const regionName = feature.properties.name;
        const electionData = getRealElectionData(regionName);
        feature.properties.electionData = electionData;
        
        // 收集地区数据用于获胜党票数排行
        if (electionData) {
            districtData[regionName] = {
                kmt_votes: electionData.kmt_votes,
                dpp_votes: electionData.dpp_votes,
                tpp_votes: electionData.tpp_votes,
                total_votes: electionData.total_votes,
                kmt_rate: electionData.kmt_rate,
                dpp_rate: electionData.dpp_rate,
                tpp_rate: electionData.tpp_rate
            };
        }
    });
    
    // 注册地区数据到获胜党票数排行管理器
    if (window.districtWinnerRankingManager && Object.keys(districtData).length > 0) {
        window.districtWinnerRankingManager.registerDistrictData(districtName, districtData);
        console.log(`✅ 注册地区数据到获胜党票数排行管理器: ${districtName}`);
    }
    
    // 设置投影 - 适配当前县市
    const projection = d3.geoMercator()
        .fitExtent(
            [[20, 20], [width - 20, height - 20]], 
            geoData
        );
    const path = d3.geoPath().projection(projection);
    
    // 绘制行政区 - 复用taiwan-map.js的样式
    const mapGroup = svg.append("g");
    const regions = mapGroup.selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "region district-region")
        .attr("data-region", d => d.properties.name)
        .attr("fill", d => {
            const regionName = d.properties.name;
            const currentParty = window.currentParty || 'kmt';
            
            // 如果是获胜党票数排行模式，使用专门的颜色函数
            if (currentParty === 'winner-ranking') {
                const currentDistrict = window.districtMapState?.currentDistrictName;
                const currentMode = window.districtMapState?.currentMode || 'district';
                const selectedLegislator = window.districtMapState?.selectedLegislator;
                
                if (currentDistrict) {
                    return getDistrictColorForMode(regionName, currentDistrict, currentMode, selectedLegislator);
                }
            }
            
            // 如果是罢免模式，使用罢免颜色函数
            if (currentParty === 'recall') {
                const currentMode = window.districtMapState?.currentMode || 'district';
                const selectedLegislator = window.districtMapState?.selectedLegislator;
                return getDistrictColorForMode(regionName, districtName, currentMode, selectedLegislator);
            } else {
                // 非罢免模式，使用正常的选举颜色函数
                return getDistrictColor(regionName);
            }
        })
        .attr("stroke", d => {
            const regionName = d.properties.name;
            const currentParty = window.currentParty || 'kmt';
            
            // 获取填充颜色
            let fillColor;
            if (currentParty === 'winner-ranking') {
                const currentDistrict = window.districtMapState?.currentDistrictName;
                const currentMode = window.districtMapState?.currentMode || 'district';
                const selectedLegislator = window.districtMapState?.selectedLegislator;
                
                if (currentDistrict) {
                    fillColor = getDistrictColorForMode(regionName, currentDistrict, currentMode, selectedLegislator);
                }
            } else if (currentParty === 'recall') {
                const currentMode = window.districtMapState?.currentMode || 'district';
                const selectedLegislator = window.districtMapState?.selectedLegislator;
                fillColor = getDistrictColorForMode(regionName, districtName, currentMode, selectedLegislator);
            } else {
                fillColor = getDistrictColor(regionName);
            }
            
            // 根据填充颜色设置边界颜色
            if (fillColor) {
                // 检查是否为蓝色系（国民党）
                if (fillColor.includes('#E3F2FD') || fillColor.includes('#BBDEFB') || 
                    fillColor.includes('#90CAF9') || fillColor.includes('#64B5F6') || 
                    fillColor.includes('#42A5F5') || fillColor.includes('#2196F3')) {
                    return '#2196F3'; // 蓝色边界
                }
                // 检查是否为绿色系（民进党）
                else if (fillColor.includes('#E8F5E8') || fillColor.includes('#C8E6C9') || 
                         fillColor.includes('#A5D6A7') || fillColor.includes('#81C784') || 
                         fillColor.includes('#66BB6A') || fillColor.includes('#4CAF50')) {
                    return '#4CAF50'; // 绿色边界
                }
                // 检查是否为青绿色系（民众党）
                else if (fillColor.includes('#E0F2F1') || fillColor.includes('#B2DFDB') || 
                         fillColor.includes('#80CBC4') || fillColor.includes('#4DB6AC') || 
                         fillColor.includes('#26A69A') || fillColor.includes('#00897B')) {
                    return '#00897B'; // 青绿色边界
                }
                // 检查是否为红色系（罢免）
                else if (fillColor.includes('#FFCDD2') || fillColor.includes('#EF9A9A') || 
                         fillColor.includes('#E57373') || fillColor.includes('#EF5350') || 
                         fillColor.includes('#F44336') || fillColor.includes('#D32F2F')) {
                    return '#D32F2F'; // 红色边界
                }
            }
            
            return '#ffffff'; // 默认白色边界
        })
        .attr("stroke-width", 2);
    
    // 添加交互事件 - 复用taiwan-map.js的交互逻辑
    addDistrictInteractions(regions);
    
    // 添加缩放和拖动功能 - 复用taiwan-map.js的逻辑
    setupDistrictMapZoom(svg, mapGroup);
    
    // 显示总体情况
    showDistrictDetail(null, null);
    
    console.log(`✅ ${districtName} 地图渲染完成`);
}

/**
 * 添加行政区交互事件 - 基于taiwan-map.js的addInteractions
 */
function addDistrictInteractions(selection) {
    const tooltip = d3.select('#tooltip');
    
    selection
        .on('mouseover', function(event, d) {
            const regionName = d.properties.name;
            const detail = d.properties.electionData;
            const currentParty = window.currentParty || 'kmt';
            
            // 高亮当前区域
            if (currentParty === 'winner-ranking') {
                // 获胜党票数排行模式下保持边界显示
                d3.select(this)
                    .style('filter', 'brightness(0.9)');
            } else {
                // 其他模式下隐藏边界以突出显示
                d3.select(this)
                    .style('stroke', 'none')
                    .style('filter', 'brightness(0.9)');
            }
            
            // 显示右侧详情面板
            showDistrictDetail(regionName, detail);
            
            // 显示工具提示 - 复用taiwan-map.js的样式
            if (detail) {
                const currentParty = window.currentParty || 'kmt';
                const currentDistrict = window.districtMapState?.currentDistrictName;
                
                let tooltipContent = '';
                
                if (currentParty === 'recall' && window.recallDataRegistry) {
                    // 使用统一框架处理罢免数据
                    const registeredDistricts = Object.keys(window.recallDataRegistry);
                    const currentDistrictNormalized = currentDistrict.replace(/臺/g, '台').replace(/縣/g, '县');
                    
                    for (const districtName of registeredDistricts) {
                        const districtNormalized = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
                        if (currentDistrictNormalized === districtNormalized || currentDistrict === districtName) {
                            tooltipContent = window.generateRecallTooltip(districtName, regionName);
                            break;
                        }
                    }
                } else {
                    // 普通选举模式
                    const partyConfig = window.partyConfig || {
                        kmt: { primary: '#0052CC' },
                        dpp: { primary: '#006600' },
                        tpp: { primary: '#006666' }
                    };
                    
                    tooltipContent = `
                        <div style="margin-bottom: 8px;">
                            <strong style="font-size: 1.1em;">${regionName}</strong>
                        </div>
                        <div><span style="color: ${partyConfig.kmt.primary};">国:</span> ${formatPercentage(detail.kmt_rate)}</div>
                        <div><span style="color: ${partyConfig.dpp.primary};">民:</span> ${formatPercentage(detail.dpp_rate)}</div>
                        <div><span style="color: ${partyConfig.tpp.primary};">众:</span> ${formatPercentage(detail.tpp_rate)}</div>
                        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 0.9em;">
                            <strong>${detail.winner.name} 获胜</strong>
                        </div>
                    `;
                }
                
                tooltip.html(tooltipContent).classed('show', true);
            }
        })
        .on('mousemove', function(event) {
            tooltip
                .style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 15) + 'px');
        })
        .on('mouseout', function() {
            // 恢复默认样式
            const currentParty = window.currentParty || 'kmt';
            
            if (currentParty === 'winner-ranking') {
                // 获胜党票数排行模式下，恢复边界显示
                const regionName = d3.select(this).attr('data-region');
                const currentDistrict = window.districtMapState?.currentDistrictName;
                const currentMode = window.districtMapState?.currentMode || 'district';
                const selectedLegislator = window.districtMapState?.selectedLegislator;
                
                let strokeColor = '#2196F3'; // 默认蓝色边界
                
                if (currentDistrict) {
                    const fillColor = getDistrictColorForMode(regionName, currentDistrict, currentMode, selectedLegislator);
                    
                    // 根据填充颜色设置边界颜色
                    if (fillColor) {
                        // 检查是否为蓝色系（国民党）
                        if (fillColor.includes('#E3F2FD') || fillColor.includes('#BBDEFB') || 
                            fillColor.includes('#90CAF9') || fillColor.includes('#64B5F6') || 
                            fillColor.includes('#42A5F5') || fillColor.includes('#2196F3')) {
                            strokeColor = '#2196F3'; // 蓝色边界
                        }
                        // 检查是否为绿色系（民进党）
                        else if (fillColor.includes('#E8F5E8') || fillColor.includes('#C8E6C9') || 
                                 fillColor.includes('#A5D6A7') || fillColor.includes('#81C784') || 
                                 fillColor.includes('#66BB6A') || fillColor.includes('#4CAF50')) {
                            strokeColor = '#4CAF50'; // 绿色边界
                        }
                        // 检查是否为青绿色系（民众党）
                        else if (fillColor.includes('#E0F2F1') || fillColor.includes('#B2DFDB') || 
                                 fillColor.includes('#80CBC4') || fillColor.includes('#4DB6AC') || 
                                 fillColor.includes('#26A69A') || fillColor.includes('#00897B')) {
                            strokeColor = '#00897B'; // 青绿色边界
                        }
                    }
                }
                
                d3.select(this)
                    .style('stroke', strokeColor)
                    .style('stroke-width', '2px')
                    .style('filter', 'none');
            } else {
                // 其他模式下，恢复边界显示
                const regionName = d3.select(this).attr('data-region');
                let strokeColor = '#ffffff'; // 默认白色边界
                let fillColor;
                
                if (currentParty === 'recall') {
                    const currentMode = window.districtMapState?.currentMode || 'district';
                    const selectedLegislator = window.districtMapState?.selectedLegislator;
                    fillColor = getDistrictColorForMode(regionName, window.districtMapState?.currentDistrictName, currentMode, selectedLegislator);
                } else {
                    fillColor = getDistrictColor(regionName);
                }
                
                // 根据填充颜色设置边界颜色
                if (fillColor) {
                    // 检查是否为蓝色系（国民党）
                    if (fillColor.includes('#E3F2FD') || fillColor.includes('#BBDEFB') || 
                        fillColor.includes('#90CAF9') || fillColor.includes('#64B5F6') || 
                        fillColor.includes('#42A5F5') || fillColor.includes('#2196F3')) {
                        strokeColor = '#2196F3'; // 蓝色边界
                    }
                    // 检查是否为绿色系（民进党）
                    else if (fillColor.includes('#E8F5E8') || fillColor.includes('#C8E6C9') || 
                             fillColor.includes('#A5D6A7') || fillColor.includes('#81C784') || 
                             fillColor.includes('#66BB6A') || fillColor.includes('#4CAF50')) {
                        strokeColor = '#4CAF50'; // 绿色边界
                    }
                    // 检查是否为青绿色系（民众党）
                    else if (fillColor.includes('#E0F2F1') || fillColor.includes('#B2DFDB') || 
                             fillColor.includes('#80CBC4') || fillColor.includes('#4DB6AC') || 
                             fillColor.includes('#26A69A') || fillColor.includes('#00897B')) {
                        strokeColor = '#00897B'; // 青绿色边界
                    }
                    // 检查是否为红色系（罢免）
                    else if (fillColor.includes('#FFCDD2') || fillColor.includes('#EF9A9A') || 
                             fillColor.includes('#E57373') || fillColor.includes('#EF5350') || 
                             fillColor.includes('#F44336') || fillColor.includes('#D32F2F')) {
                        strokeColor = '#D32F2F'; // 红色边界
                    }
                }
                
                d3.select(this)
                    .style('stroke', strokeColor)
                    .style('stroke-width', '2px')
                    .style('filter', 'none');
            }
            
            // 隐藏工具提示
            tooltip.classed('show', false);
            
            // 显示总体情况
            showDistrictDetail(null, null);
        })
        .on('click', function(event, d) {
            const regionName = d.properties.name;
            console.log(`📍 点击行政区: ${regionName}`);
            
            // 高亮选中的区域
            d3.selectAll('.district-region').style('stroke-width', '1.5px');
            d3.select(this).style('stroke-width', '3px');
        });
}

/**
 * 返回台湾地图
 */
window.backToTaiwan = async function() {
    console.log('🔙 返回台湾地图');
    
    if (window.districtMapState.isLoading) {
        return;
    }
    
    // 检查是否在立委模式下
    if (window.districtMapState.currentMode === 'legislator' && window.districtMapState.selectedLegislator) {
        console.log('🔄 当前在立委模式下，重置立委选择');
        
        // 重置立委选择
        window.districtMapState.currentMode = 'district';
        window.districtMapState.selectedLegislator = null;
        
        // 重置立委下拉菜单
        const dropdown = document.getElementById('legislator-dropdown');
        if (dropdown) {
            dropdown.value = '';
        }
        
        // 隐藏立委详细数据面板
        hideLegislatorDetail();
        
        // 重置地图显示为地区模式
        if (window.districtMapState.currentDistrictName) {
            const districtName = window.districtMapState.currentDistrictName;
            console.log(`🔄 重置地图显示为地区模式: ${districtName}`);
            
            // 更新地图颜色为地区模式
            const regions = d3.select("#taiwan-map").selectAll('.district-region');
            
            regions
                .transition()
                .duration(500)
                .attr("fill", d => {
                    const regionName = d.properties.name;
                    return getDistrictColorForMode(regionName, districtName, 'district');
                });
            
            // 更新图例为地区模式
            updateDistrictLegendLabels();
            
            // 更新排行榜为地区数据
            const geoData = window.currentGeoData;
            if (geoData) {
                updateDistrictRanking(districtName, geoData);
            }
            
            console.log('✅ 立委选择已重置');
            return;
        }
    }
    
    try {
        showLoadingState(true);
        
        const currentParty = window.currentParty || 'kmt';
        
        // 如果是获胜党票数排行模式，需要特殊处理
        if (currentParty === 'winner-ranking') {
            console.log('🎯 当前为获胜党票数排行模式，调用专门的初始化函数');
            
            // 调用taiwan-map.js的渲染函数
            if (window.renderTaiwanMap) {
                await window.renderTaiwanMap();
                console.log('✅ 台湾地图恢复成功');
            }
            
            // 立即调用获胜党票数排行的更新函数
            if (window.updateMapForWinnerRanking) {
                window.updateMapForWinnerRanking();
            }
            if (window.generateWinnerRanking) {
                window.generateWinnerRanking();
            }
            if (window.updateOverallStatsForWinnerRanking) {
                window.updateOverallStatsForWinnerRanking();
            }
            
            // 隐藏图例（获胜党票数排行模式下不显示图例）
            const legendContainer = document.querySelector('.map-legend');
            if (legendContainer) {
                legendContainer.style.display = 'none';
            }
            
            // 更新UI状态（确保返回按钮被隐藏）
            updateUIState('taiwan');
            
            console.log('✅ 获胜党票数排行模式初始化完成');
        } else {
            // 其他模式使用原有的逻辑
            // 调用taiwan-map.js的渲染函数
            if (window.renderTaiwanMap) {
                await window.renderTaiwanMap();
                console.log('✅ 台湾地图恢复成功');
            }
            
            // 更新UI状态
            updateUIState('taiwan');
            
            // 更新图例颜色 - 确保在罢免模式下显示正确的图例
            if (window.updateLegendColors) {
                window.updateLegendColors(currentParty);
            }
        }
        
        // 恢复全台排行榜
        console.log('🔍 backToTaiwan - 调用 updateRankingDisplay');
        console.log('🔍 backToTaiwan - currentParty:', currentParty);
        console.log('🔍 backToTaiwan - window.currentParty:', window.currentParty);
        
        // 检查排行榜标题元素
        const rankingTitle = document.getElementById('ranking-title');
        console.log('🔍 backToTaiwan - rankingTitle 元素:', rankingTitle);
        if (rankingTitle) {
            console.log('🔍 backToTaiwan - 当前排行榜标题:', rankingTitle.textContent);
        }
        
        // 如果不是获胜党票数排行模式，使用原有的更新逻辑
        if (currentParty !== 'winner-ranking') {
            if (window.updateRankingDisplay) {
                // 延迟调用以确保状态更新完成
                setTimeout(() => {
                    window.updateRankingDisplay();
                    console.log('✅ backToTaiwan - updateRankingDisplay 调用完成');
                    
                    // 再次检查排行榜标题是否更新
                    if (rankingTitle) {
                        console.log('🔍 backToTaiwan - 更新后排行榜标题:', rankingTitle.textContent);
                    }
                }, 100);
            } else {
                console.log('❌ backToTaiwan - updateRankingDisplay 函数不存在');
            }
        }
        
        // 根据当前政党模式控制全台统计面板和得票分析面板的显示
        const overallStatsPanel = document.querySelector('.panel-section:first-child');
        const voteAnalysisPanel = document.querySelector('.panel-section:last-child');
        
        if (currentParty === 'recall') {
            // 在大罢免模式下隐藏全台统计面板和得票分析面板
            if (overallStatsPanel) {
                overallStatsPanel.style.display = 'none';
            }
            if (voteAnalysisPanel) {
                voteAnalysisPanel.style.display = 'none';
            }
        } else {
            // 在普通模式下显示全台统计面板和得票分析面板
            if (overallStatsPanel) {
                overallStatsPanel.style.display = 'block';
            }
            if (voteAnalysisPanel) {
                voteAnalysisPanel.style.display = 'block';
            }
        }
        
        // 隐藏返回地区地图按钮（返回台湾地图时）
        hideBackToRegionButton();
        
        // 确保返回按钮在所有模式下都被隐藏
        const backBtn = document.getElementById('back-to-region-btn');
        if (backBtn) {
            backBtn.style.display = 'none';
            console.log('✅ 返回按钮已隐藏');
        }
        
        // 特别处理获胜党票数排行模式
        if (currentParty === 'winner-ranking') {
            console.log('🎯 获胜党票数排行模式：确保返回按钮隐藏');
            // 强制隐藏返回按钮
            if (backBtn) {
                backBtn.style.display = 'none';
                console.log('✅ 获胜党票数排行模式下返回按钮已隐藏');
            }
        }
        
        // 重置状态
        window.districtMapState.currentView = 'taiwan';
        window.districtMapState.currentDistrictName = null;
        window.districtMapState.currentDistrictCode = null;
        
        console.log('🔍 backToTaiwan - 状态已重置，currentView:', window.districtMapState.currentView);
        
    } catch (error) {
        console.error('❌ 返回台湾地图失败:', error);
    } finally {
        showLoadingState(false);
    }
};

/**
 * 获取行政区颜色 - 基于真实得票率和当前选中的政党
 */
function getDistrictColor(regionName) {
    const currentParty = window.currentParty || 'kmt';
    console.log(`🔍 getDistrictColor: ${regionName}, currentParty: ${currentParty}`);
    
    // 如果是获胜党票数排行模式
    if (currentParty === 'winner-ranking') {
        console.log(`🎯 getDistrictColor: 获胜党票数排行模式 - ${regionName}`);
        const currentDistrict = window.districtMapState?.currentDistrictName;
        const currentMode = window.districtMapState?.currentMode || 'district';
        const selectedLegislator = window.districtMapState?.selectedLegislator;
        
        console.log(`📍 当前地区: ${currentDistrict}, 模式: ${currentMode}`);
        
        // 使用获胜党票数排行模式的颜色函数
        if (currentDistrict) {
            const color = getDistrictColorForMode(regionName, currentDistrict, currentMode, selectedLegislator);
            console.log(`✅ getDistrictColor: ${regionName} 颜色 = ${color}`);
            return color;
        }
        
        // 如果没有当前地区信息，返回默认颜色
        console.log(`⚠️ getDistrictColor: ${regionName} 没有当前地区信息，使用默认颜色`);
        return '#f8f9fa';
    }
    
    // 如果是大罢免模式，检查是否有大罢免数据
    if (currentParty === 'recall') {
        const currentDistrict = window.districtMapState?.currentDistrictName;
        const currentMode = window.districtMapState?.currentMode || 'district';
        const selectedLegislator = window.districtMapState?.selectedLegislator;
        
        // 使用新的模式区分颜色获取函数
        if (currentDistrict) {
            return getDistrictColorForMode(regionName, currentDistrict, currentMode, selectedLegislator);
        }
        
        // 其他县市暂时返回默认颜色
        return '#f8f9fa';
    }
    
    // 非罢免模式：使用正常的选举数据颜色
    // 获取真实选举数据
    const electionData = getRealElectionData(regionName);
    
    // 如果没有数据，返回默认颜色
    if (!electionData) {
        console.log(`⚠️ ${regionName} 没有选举数据，使用默认颜色`);
        return '#f8f9fa'; // 浅灰色
    }
    
    // 根据当前选择的政党获取对应的得票率
    let voteRate = 0;
    let partyName = '';
    
    if (currentParty === 'winner') {
        // 获胜党派模式
        const currentWinnerMode = window.currentWinnerMode || 'rate';
        
        if (currentWinnerMode === 'rate') {
            // 胜率模式
            voteRate = electionData.winner.rate;
            partyName = '获胜党派胜率';
        } else {
            // 党派模式
            voteRate = electionData.winner.rate;
            partyName = `${electionData.winner.name}`;
        }
    } else {
        // 普通政党模式
        switch(currentParty) {
            case 'kmt':
                voteRate = electionData.kmt_rate;
                partyName = '国民党';
                break;
            case 'dpp':
                voteRate = electionData.dpp_rate;
                partyName = '民进党';
                break;
            case 'tpp':
                voteRate = electionData.tpp_rate;
                partyName = '民众党';
                break;
            default:
                voteRate = electionData.kmt_rate;
                partyName = '国民党';
        }
    }
    
    // 如果voteRate是小数格式（0-1），转换为百分比格式
    if (voteRate <= 1) {
        voteRate = voteRate * 100;
    }
    
    // 根据政党返回对应颜色系列 - 使用与election-data.js相同的配色
    const colorMaps = {
        kmt: ['#E6F3FF', '#CCE7FF', '#99D5FF', '#66C2FF', '#3399FF', '#0052CC'],
        dpp: ['#E6FFE6', '#CCFFCC', '#99FF99', '#66FF66', '#33CC33', '#006600'],
        tpp: ['#E6FFFF', '#CCFFFF', '#99FFFF', '#66FFFF', '#33CCCC', '#006666'],
        winner: ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFC107', '#FF8F00']
    };
    
    let colors;
    if (currentParty === 'winner') {
        const currentWinnerMode = window.currentWinnerMode || 'rate';
        
        if (currentWinnerMode === 'rate') {
            // 胜率模式：使用金色
            colors = colorMaps.winner;
        } else {
            // 党派模式：使用获胜党派的颜色
            const winnerParty = electionData.winner.party;
            colors = colorMaps[winnerParty] || colorMaps.kmt;
        }
    } else {
        colors = colorMaps[currentParty] || colorMaps.kmt;
    }
    
    // 动态计算颜色分级 - 基于当前地区所有投票率范围
    const colorIndex = getDynamicColorIndex(voteRate, currentParty);
    
    console.log(`🎨 ${regionName} ${partyName}得票率: ${voteRate.toFixed(1)}%, 颜色索引: ${colorIndex}, 颜色: ${colors[colorIndex]}`);
    
    return colors[colorIndex];
}

/**
 * 动态计算颜色索引 - 基于当前地区所有投票率范围
 */
function getDynamicColorIndex(voteRate, party) {
    // 获取当前地区所有区域的投票率数据
    const currentDistrict = window.districtMapState.currentDistrictName;
    if (!currentDistrict) {
        console.warn('⚠️ 无法获取当前县市信息，使用默认分级');
        return getDefaultColorIndex(voteRate);
    }
    
    // 获取当前地区的数据源
    const districtInfo = window.getDistrictInfo ? window.getDistrictInfo(currentDistrict) : null;
    if (!districtInfo) {
        console.warn('⚠️ 无法获取地区配置信息，使用默认分级');
        return getDefaultColorIndex(voteRate);
    }
    
    const dataSource = window[districtInfo.dataKey];
    if (!dataSource) {
        console.warn('⚠️ 无法获取数据源，使用默认分级');
        return getDefaultColorIndex(voteRate);
    }
    
    // 收集当前地区所有区域的投票率
    const rates = [];
    Object.keys(dataSource).forEach(regionName => {
        const data = dataSource[regionName];
        let rate = 0;
        
        if (party === 'winner') {
            // 获胜党派模式 - 使用获胜党派的得票率
            const electionData = getRealElectionData(regionName);
            if (electionData && electionData.winner) {
                rate = electionData.winner.rate;
                if (rate <= 1) rate = rate * 100; // 转换为百分比
            }
        } else {
            // 普通政党模式
            switch(party) {
                case 'kmt':
                    rate = typeof data.kmt_rate === 'string' ? parseFloat(data.kmt_rate) : data.kmt_rate;
                    break;
                case 'dpp':
                    rate = typeof data.dpp_rate === 'string' ? parseFloat(data.dpp_rate) : data.dpp_rate;
                    break;
                case 'tpp':
                    rate = typeof data.tpp_rate === 'string' ? parseFloat(data.tpp_rate) : data.tpp_rate;
                    break;
            }
        }
        
        if (rate > 0) {
            rates.push(rate);
        }
    });
    
    if (rates.length === 0) {
        console.warn('⚠️ 没有有效的投票率数据，使用默认分级');
        return getDefaultColorIndex(voteRate);
    }
    
    // 计算投票率范围 - 最大值向下取整，最小值向上取整
    const minRate = Math.ceil(Math.min(...rates));
    const maxRate = Math.floor(Math.max(...rates));
    const range = maxRate - minRate;
    
    // 强制执行五种颜色分级，即使范围很小
    let step;
    if (range < 5) {
        // 如果范围太小，强制分为5个等级，每个等级至少0.1的差异
        step = Math.max(0.1, range / 4);
        console.log(`ℹ️ 投票率范围较小(${minRate}%-${maxRate}%)，强制分为5个等级，步长: ${step.toFixed(1)}%`);
    } else {
        step = range / 4; // 4个步长分成5个等级
    }
    
    // 计算五个等级的边界
    const boundaries = [];
    for (let i = 0; i <= 4; i++) {
        boundaries.push(minRate + i * step);
    }
    boundaries.push(maxRate); // 确保最大值包含在内
    
    console.log(`📊 ${currentDistrict} ${party}党投票率范围: ${minRate}%-${maxRate}%, 分级边界:`, boundaries.map(b => b.toFixed(1) + '%'));
    
    // 根据投票率确定颜色索引
    for (let i = 0; i < 5; i++) {
        if (voteRate >= boundaries[i] && voteRate < boundaries[i + 1]) {
            return i;
        }
    }
    
    // 如果投票率等于最大值，返回最高等级
    if (voteRate >= boundaries[4]) {
        return 4;
    }
    
    return 0;
}

/**
 * 默认颜色分级逻辑
 */
function getDefaultColorIndex(voteRate) {
    if (voteRate >= 40) return 4;      // 最深色 40%+
    else if (voteRate >= 35) return 3; // 深色 35-40%
    else if (voteRate >= 30) return 2; // 中深色 30-35%
    else if (voteRate >= 25) return 1; // 中色 25-30%
    else return 0;                     // 最浅色 0-25%
}

/**
 * 根据罢免同意票率获取颜色
 * @param {number} agreeRate - 同意票率
 * @returns {string} 颜色代码
 */
function getRecallColorByRate(rate, isTurnoutRate = false) {
    // 罢免颜色系列：从浅红到深红
    const recallColors = ['#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#D32F2F'];
    
    if (isTurnoutRate) {
        // 投票率分级：20%-70%
        if (rate >= 65) return recallColors[5];      // 最深色 65%+
        else if (rate >= 60) return recallColors[4]; // 深色 60-65%
        else if (rate >= 55) return recallColors[3]; // 中深色 55-60%
        else if (rate >= 50) return recallColors[2]; // 中色 50-55%
        else if (rate >= 40) return recallColors[1]; // 浅色 40-50%
        else return recallColors[0];                 // 最浅色 0-40%
    } else {
        // 同意率分级：20%-60%
        if (rate >= 50) return recallColors[5];      // 最深色 50%+
        else if (rate >= 45) return recallColors[4]; // 深色 45-50%
        else if (rate >= 40) return recallColors[3]; // 中深色 40-45%
        else if (rate >= 35) return recallColors[2]; // 中色 35-40%
        else if (rate >= 30) return recallColors[1]; // 浅色 30-35%
        else return recallColors[0];                 // 最浅色 0-30%
    }
}

/**
 * 生成单个立委的详细信息HTML
 */
function generateSingleLegislatorDetail(regionName, recallData) {
    const html = `
        <div class="detail-content">
            <div class="detail-title">${regionName}</div>
            <div class="detail-subtitle">立委选区</div>
            <div class="overlapping-legislators">
                <div class="legislator-item">
                    <div class="legislator-name">${recallData.legislator_name}</div>
                    <div class="legislator-stats">
                        <div class="stat-item">
                            <span class="stat-label">同意票:</span>
                            <span class="stat-value">${recallData.agree_votes.toLocaleString()}票 (${recallData.agree_rate.toFixed(1)}%)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">不同意票:</span>
                            <span class="stat-value">${recallData.disagree_votes.toLocaleString()}票 (${recallData.disagree_rate.toFixed(1)}%)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">投票率:</span>
                            <span class="stat-value">${recallData.turnout_rate.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

/**
 * 生成重叠区域的详细信息HTML
 */
function generateOverlappingRegionDetail(regionName, allRecallData) {
    console.log(`🔍 生成重叠区域详情: ${regionName}, 数据:`, allRecallData);
    
    let html = `
        <div class="detail-content">
            <div class="detail-title">${regionName}</div>
            <div class="detail-subtitle">多立委选区</div>
            <div class="overlapping-legislators">
    `;
    
    allRecallData.forEach((data, index) => {
        console.log(`🔍 处理立委数据 ${index}:`, data);
        console.log(`🔍 立委名称: ${data.legislator_name}, 同意票: ${data.agree_votes}, 同意率: ${data.agree_rate}%`);
        html += `
            <div class="legislator-item">
                <div class="legislator-name">${data.legislator_name}</div>
                <div class="legislator-stats">
                    <div class="stat-item">
                        <span class="stat-label">同意票:</span>
                        <span class="stat-value">${data.agree_votes.toLocaleString()}票 (${data.agree_rate.toFixed(1)}%)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">不同意票:</span>
                        <span class="stat-value">${data.disagree_votes.toLocaleString()}票 (${data.disagree_rate.toFixed(1)}%)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">投票率:</span>
                        <span class="stat-value">${data.turnout_rate.toFixed(1)}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">选区:</span>
                        <span class="stat-value">${data.region || '未知'}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    console.log(`🔍 生成的HTML:`, html);
    return html;
}

/**
 * 获取某个区域的所有立委罢免数据（用于重叠区域）
 */
function getAllRecallDataForRegion(districtName, regionName) {
    const allData = [];
    
    // 检查是否为重叠区域，如果是则使用新的数据管理器
    const isOverlapping = window.overlappingDataManager.isOverlappingRegion(districtName, regionName);
    if (isOverlapping) {
        return window.overlappingDataManager.getAllLegislatorsForRegion(districtName, regionName);
    }
    
    // 获取该地区的所有立委数据
    const legislators = window.getRecallLegislators(districtName);
    if (!legislators) return allData;
    
    // 获取该区域的罢免数据
    const recallData = window.getRecallData(districtName, regionName);
    if (!recallData || recallData.agree_votes === undefined) return allData;
    
    // 查找该区域对应的立委
    legislators.forEach(legislator => {
        if (legislator.regions.includes(regionName)) {
            allData.push({
                ...recallData,
                legislator_name: legislator.name
            });
        }
    });
    
    // 如果没有找到对应的立委，但有数据，创建一个默认条目
    if (allData.length === 0 && recallData.legislator) {
        allData.push({
            ...recallData,
            legislator_name: recallData.legislator
        });
    }
    
    // 特殊处理：查找包含该区域名称的所有数据（处理重叠区域的不同命名方式）
    if (allData.length <= 1) {
        const recallDataRegistry = window.recallDataRegistry;
        if (recallDataRegistry && recallDataRegistry[districtName]) {
            const districtData = recallDataRegistry[districtName];
            Object.keys(districtData).forEach(key => {
                const data = districtData[key];
                if (data && data.agree_votes !== undefined) {
                    // 检查区域名称是否匹配（支持部分匹配和不同命名方式）
                    const keyRegion = key.replace(/_.*$/, ''); // 移除后缀
                    const regionNameClean = regionName.replace(/_.*$/, ''); // 移除后缀
                    
                    if (key === regionName || 
                        keyRegion === regionName || 
                        regionNameClean === keyRegion ||
                        key.includes(regionName) || 
                        regionName.includes(keyRegion)) {
                        
                        // 检查是否已经添加过这个立委
                        const existingIndex = allData.findIndex(item => item.legislator_name === data.legislator);
                        if (existingIndex === -1) {
                            allData.push({
                                ...data,
                                legislator_name: data.legislator
                            });
                        }
                    }
                }
            });
        }
    }
    
    // 特殊处理台北市松山区的重叠情况
    if (districtName === '臺北市' && regionName === '松山區') {
        // 确保包含王鴻薇和徐巧芯的数据
        const recallDataRegistry = window.recallDataRegistry;
        if (recallDataRegistry && recallDataRegistry[districtName]) {
            const districtData = recallDataRegistry[districtName];
            
            // 添加王鴻薇的数据（如果还没有）
            if (!allData.find(item => item.legislator_name === '王鴻薇')) {
                const wangData = districtData['松山區'];
                if (wangData) {
                    allData.push({
                        ...wangData,
                        legislator_name: '王鴻薇'
                    });
                }
            }
            
            // 添加徐巧芯的数据（如果还没有）
            if (!allData.find(item => item.legislator_name === '徐巧芯')) {
                const xuData = districtData['松山區_徐巧芯'];
                if (xuData) {
                    allData.push({
                        ...xuData,
                        legislator_name: '徐巧芯'
                    });
                }
            }
        }
    }
    
    return allData;
}

// 暴露到全局
window.getAllRecallDataForRegion = getAllRecallDataForRegion;

/**
 * 获取真实选举数据（优先使用真实数据，否则生成模拟数据）
 */
function getRealElectionData(regionName) {
    // 通用的真实数据获取逻辑
    const realData = getRealDataByRegion(regionName);
    
    if (realData) {
        const totalVotes = realData.total_votes;
        const kmtVotes = realData.kmt_votes;
        const dppVotes = realData.dpp_votes;
        const tppVotes = realData.tpp_votes;
        
        // 处理得票率数据，统一转换为0-1格式
        let kmtRate, dppRate, tppRate;
        
        // 检查数据类型并统一处理
        if (typeof realData.kmt_rate === 'string') {
            // 如果是字符串格式（如台北市），转换为数值
            kmtRate = parseFloat(realData.kmt_rate) / 100;
            dppRate = parseFloat(realData.dpp_rate) / 100;
            tppRate = parseFloat(realData.tpp_rate) / 100;
        } else if (typeof realData.kmt_rate === 'function') {
            // 如果是getter函数（如台北市），调用函数获取值
            kmtRate = parseFloat(realData.kmt_rate()) / 100;
            dppRate = parseFloat(realData.dpp_rate()) / 100;
            tppRate = parseFloat(realData.tpp_rate()) / 100;
        } else {
            // 如果是数值格式（如新北市），直接转换为0-1格式
            kmtRate = realData.kmt_rate / 100;
            dppRate = realData.dpp_rate / 100;
            tppRate = realData.tpp_rate / 100;
        }
        
        const parties = [
            { name: '国民党', party: 'kmt', votes: kmtVotes, rate: kmtRate },
            { name: '民进党', party: 'dpp', votes: dppVotes, rate: dppRate },
            { name: '民众党', party: 'tpp', votes: tppVotes, rate: tppRate }
        ];
        
        const winner = parties.reduce((a, b) => a.votes > b.votes ? a : b);
        
        console.log(`📊 使用真实数据: ${regionName}`, {
            total: totalVotes,
            kmt: `${kmtVotes}票 (${(kmtRate*100).toFixed(1)}%)`,
            dpp: `${dppVotes}票 (${(dppRate*100).toFixed(1)}%)`,
            tpp: `${tppVotes}票 (${(tppRate*100).toFixed(1)}%)`,
            winner: winner
        });
        
        return {
            total_votes: totalVotes,
            kmt_votes: kmtVotes,
            dpp_votes: dppVotes,
            tpp_votes: tppVotes,
            kmt_rate: kmtRate,
            dpp_rate: dppRate,
            tpp_rate: tppRate,
            winner: winner
        };
    }
    
    // 如果没有真实数据，返回null
    console.log(`⚠️ 未找到 ${regionName} 的真实数据，返回null`);
    return null;
}

/**
 * 根据区域名称获取真实数据
 * @param {string} regionName - 区域名称
 * @returns {Object|null} 真实数据对象或null
 */
function getRealDataByRegion(regionName) {
    // 当前父级县市信息
    const currentDistrict = window.districtMapState.currentDistrictName;
    
    if (!currentDistrict) {
        console.warn('⚠️ 无法获取当前县市信息');
        return null;
    }
    
    console.log(`🔍 查找 ${regionName} 的真实数据，当前县市: ${currentDistrict}`);
    
    // 获取对应的数据源
    const districtInfo = window.getDistrictInfo ? window.getDistrictInfo(currentDistrict) : null;
    
    if (!districtInfo) {
        console.warn(`⚠️ 未找到 ${currentDistrict} 的配置信息`);
        return null;
    }
    
    console.log(`✅ 找到县市配置:`, districtInfo);
    
    // 尝试从对应的数据源获取数据
    const dataSource = window[districtInfo.dataKey];
    
    if (!dataSource) {
        console.warn(`⚠️ 数据源 ${districtInfo.dataKey} 未找到`);
        return null;
    }
    
    console.log(`✅ 找到数据源 ${districtInfo.dataKey}:`, dataSource);
    console.log(`🔍 查找区域 ${regionName} 的数据...`);
    
    if (dataSource[regionName]) {
        console.log(`✅ 从 ${districtInfo.dataKey} 获取 ${regionName} 的真实数据:`, dataSource[regionName]);
        return dataSource[regionName];
    }
    
    // 尝试处理可能的区域名称变体
    const regionVariants = [
        regionName,
        regionName.replace(/區/g, '区'),
        regionName.replace(/区/g, '區'),
        regionName.replace(/縣/g, '县'),
        regionName.replace(/县/g, '縣'),
        regionName.replace(/市/g, '市'),
        regionName.replace(/鄉/g, '乡'),
        regionName.replace(/乡/g, '鄉'),
        regionName.replace(/鎮/g, '镇'),
        regionName.replace(/镇/g, '鎮')
    ];
    
    for (const variant of regionVariants) {
        if (dataSource[variant]) {
            console.log(`✅ 通过变体名称找到数据: ${variant} -> ${regionName}`);
            return dataSource[variant];
        }
    }
    
    console.log(`ℹ️ 未找到 ${regionName} 的真实数据，可用区域:`, Object.keys(dataSource));
    return null;
}



/**
 * 设置地区地图的缩放和拖动功能
 */
function setupDistrictMapZoom(svg, mapGroup) {
    console.log('🔧 设置地区地图缩放功能...');
    
    // 缩放变换函数
    function zoomed(event) {
        mapGroup.attr("transform", event.transform);
    }
    
    // 创建缩放行为 - 复用taiwan-map.js的配置
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        // 只允许鼠标中键按下时触发平移
        .filter(event => {
            return event.type === 'mousedown' && event.button === 1;
        })
        .on("start", function(event) {
            // 阻止默认行为，包括页面滚动
            if (event.sourceEvent) {
                event.sourceEvent.preventDefault();
            }
        })
        .on("zoom", zoomed);
    
    // 将缩放行为应用到SVG画布上
    svg.call(zoom);
    
    // 禁用滚轮缩放
    svg.on("wheel.zoom", null);
    
    // 为缩放按钮添加点击事件
    d3.select("#zoom-in").on("click", function() {
        zoom.scaleBy(svg.transition().duration(250), 1.3);
    });
    
    d3.select("#zoom-out").on("click", function() {
        zoom.scaleBy(svg.transition().duration(250), 1 / 1.3);
    });
    
    console.log('✅ 地区地图缩放功能设置完成');
}

/**
 * 显示行政区详情
 */
function showDistrictDetail(regionName, data) {
    const detailDiv = document.getElementById('region-detail');
    if (!detailDiv) return;
    
    // 检查是否为大罢免模式
    const currentParty = window.currentParty || 'kmt';
    const currentDistrict = window.districtMapState?.currentDistrictName;
    const currentMode = window.districtMapState?.currentMode || 'district';
    const selectedLegislator = window.districtMapState?.selectedLegislator;
    
    if (currentParty === 'recall' && window.recallDataRegistry) {
        // 使用统一框架处理罢免详情
        const registeredDistricts = Object.keys(window.recallDataRegistry);
        const currentDistrictNormalized = currentDistrict.replace(/臺/g, '台').replace(/縣/g, '县');
        
        for (const districtName of registeredDistricts) {
            const districtNormalized = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
            if (currentDistrictNormalized === districtNormalized || currentDistrict === districtName) {
                // 检查是否有立委数据，如果有则显示总体情况面板并初始化下拉菜单
                const legislators = window.getRecallLegislators(districtName);
                if (legislators && legislators.length > 0) {
                    // 如果没有指定区域名称，显示总体情况
                    if (!regionName) {
                        // 显示总体情况面板
                        const overallPanel = window.generateOverallRecallPanel(districtName);
                        
                        detailDiv.innerHTML = `
                            <div class="recall-overview">
                                ${overallPanel}
                            </div>
                        `;
                        
                        // 初始化立委下拉菜单
                        initializeLegislatorDropdown(districtName);
                        return;
                    }
                    
                    // 使用新的模式区分函数获取数据
                    const allRecallData = getAllRecallDataForRegionWithMode(districtName, regionName, currentMode, selectedLegislator);
                    if (allRecallData.length > 1) {
                        // 显示重叠区域的详细信息
                        detailDiv.innerHTML = generateOverlappingRegionDetail(regionName, allRecallData);
                        return;
                    } else if (allRecallData.length === 1) {
                        // 显示单个立委的详细信息
                        detailDiv.innerHTML = generateSingleLegislatorDetail(regionName, allRecallData[0]);
                        return;
                    }
                    
                    // 显示总体情况面板
                    const overallPanel = window.generateOverallRecallPanel(districtName);
                    
                    detailDiv.innerHTML = `
                        <div class="recall-overview">
                            ${overallPanel}
                        </div>
                    `;
                    
                    // 初始化立委下拉菜单
                    initializeLegislatorDropdown(districtName);
                } else {
                    detailDiv.innerHTML = window.generateRecallDetail(districtName, regionName);
                }
                return;
            }
        }
    }
    
    if (!data) {
        detailDiv.innerHTML = `
            <div class="detail-content">
                <div class="detail-title">${regionName}</div>
                <div class="detail-stats">
                    <div class="detail-stat">
                        <div class="detail-stat-value">暂无数据</div>
                        <div class="detail-stat-label">选举数据</div>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    detailDiv.innerHTML = `
        <div class="detail-content">
            <div class="detail-title">${regionName}</div>
            <div class="detail-stats">
                <div class="detail-stat">
                    <div class="detail-stat-value">${data.total_votes.toLocaleString()}</div>
                    <div class="detail-stat-label">总投票数</div>
                </div>
                <div class="detail-stat">
                    <div class="detail-stat-value">${data.winner.name}</div>
                    <div class="detail-stat-label">获胜政党</div>
                </div>
            </div>
            <div class="party-votes" style="margin-top: 10px;">
                <div class="party-vote-item" style="display: flex; align-items: center; margin: 5px 0;">
                    <span class="party-color kmt-color" style="width: 12px; height: 12px; border-radius: 50%; margin-right: 8px;"></span>
                    <span style="font-size: 0.9rem;">国民党: ${formatPercentage(data.kmt_rate)}</span>
                </div>
                <div class="party-vote-item" style="display: flex; align-items: center; margin: 5px 0;">
                    <span class="party-color dpp-color" style="width: 12px; height: 12px; border-radius: 50%; margin-right: 8px;"></span>
                    <span style="font-size: 0.9rem;">民进党: ${formatPercentage(data.dpp_rate)}</span>
                </div>
                <div class="party-vote-item" style="display: flex; align-items: center; margin: 5px 0;">
                    <span class="party-color tpp-color" style="width: 12px; height: 12px; border-radius: 50%; margin-right: 8px;"></span>
                    <span style="font-size: 0.9rem;">民众党: ${formatPercentage(data.tpp_rate)}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * 更新UI状态
 */
function updateUIState(view, districtName = null) {
    const navigation = document.getElementById('map-navigation');
    const currentRegion = document.getElementById('current-region');
    const legendTitle = document.getElementById('legend-title');
    
    // 获取全台统计面板和得票分析面板
    const overallStatsPanel = document.querySelector('.panel-section:first-child');
    const voteAnalysisPanel = document.querySelector('.panel-section:last-child');
    const selectorControl = document.getElementById('legislator-selector-control');
    
    if (view === 'district') {
        // 显示导航栏
        if (navigation) {
            navigation.style.display = 'flex';
        }
        
        // 更新当前区域显示
        if (currentRegion) {
            currentRegion.textContent = districtName;
        }
        
        // 更新图例标题
        if (legendTitle) {
            const currentParty = window.currentParty || 'kmt';
            if (currentParty === 'recall') {
                // 检查是否有罢免数据
                if (window.recallDataRegistry) {
                    const registeredDistricts = Object.keys(window.recallDataRegistry);
                    const currentDistrictNormalized = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
                    
                    for (const registeredDistrict of registeredDistricts) {
                        const districtNormalized = registeredDistrict.replace(/臺/g, '台').replace(/縣/g, '县');
                        if (currentDistrictNormalized === districtNormalized || districtName === registeredDistrict) {
                            legendTitle.textContent = `${districtName} 同意罢免率`;
                            break;
                        }
                    }
                } else {
                    legendTitle.textContent = `${districtName} 大罢免参与情况`;
                }
                
                // 在大罢免模式下隐藏全台统计面板和得票分析面板
                if (overallStatsPanel) {
                    overallStatsPanel.style.display = 'none';
                }
                if (voteAnalysisPanel) {
                    voteAnalysisPanel.style.display = 'none';
                }
                
                // 在罢免模式下检查是否有立委数据，如果有则显示立委选择控件
                if (window.recallDataRegistry && window.recallDataRegistry[districtName]) {
                    const legislators = window.getRecallLegislators(districtName);
                    if (legislators && legislators.length > 0) {
                        if (selectorControl) {
                            selectorControl.style.display = 'flex';
                        }
                        // 初始化立委下拉菜单
                        initializeLegislatorDropdown(districtName);
                    } else {
                        if (selectorControl) {
                            selectorControl.style.display = 'none';
                        }
                        hideLegislatorDetail();
                    }
                } else {
                    if (selectorControl) {
                        selectorControl.style.display = 'none';
                    }
                    hideLegislatorDetail();
                }
            } else {
                legendTitle.textContent = `${districtName} 得票率图例`;
                
                // 在普通模式下显示全台统计面板和得票分析面板
                if (overallStatsPanel) {
                    overallStatsPanel.style.display = 'block';
                }
                if (voteAnalysisPanel) {
                    voteAnalysisPanel.style.display = 'block';
                }
                
                // 在非罢免模式下隐藏立委选择控件
                if (selectorControl) {
                    selectorControl.style.display = 'none';
                }
                hideLegislatorDetail();
            }
        }
        
        // 更新图例标签为地区专用的分级
        updateDistrictLegendLabels();
        
        // 只在罢免模式下显示返回按钮
        const currentParty = window.currentParty || 'kmt';
        if (currentParty === 'recall') {
            showBackToRegionButton();
        } else {
            hideBackToRegionButton();
        }
        
    } else {
        // 隐藏导航栏
        if (navigation) {
            navigation.style.display = 'none';
        }
        
        // 恢复图例标题 - 根据当前政党模式设置
        if (legendTitle) {
            const currentParty = window.currentParty || 'kmt';
            if (currentParty === 'recall') {
                legendTitle.textContent = '大罢免席位分级';
            } else {
                legendTitle.textContent = '得票率图例';
            }
        }
        
        // 恢复台湾地图的图例标签 - 根据当前政党模式设置
        const currentParty = window.currentParty || 'kmt';
        if (currentParty === 'recall') {
            // 罢免模式：显示罢免席位分级标签
            const legendLabels = document.querySelector('.legend-labels');
            if (legendLabels) {
                legendLabels.innerHTML = '<span>不参与</span><span>1席</span><span>2席</span><span>3-4席</span><span>5席+</span>';
            }
        } else {
            // 普通模式：恢复默认图例标签
            restoreMainMapLegendLabels();
        }
        
        // 恢复显示全台统计面板和得票分析面板
        if (overallStatsPanel) {
            overallStatsPanel.style.display = 'block';
        }
        if (voteAnalysisPanel) {
            voteAnalysisPanel.style.display = 'block';
        }
        
        // 隐藏立委选择控制区域和详细数据面板
        const selectorControl = document.getElementById('legislator-selector-control');
        if (selectorControl) {
            selectorControl.style.display = 'none';
        }
        hideLegislatorDetail();
        
        // 隐藏返回按钮（在台湾视图时）
        hideBackToRegionButton();
    }
}

/**
 * 更新地区排行榜显示
 */
function updateDistrictRanking(districtName, geoData) {
    console.log(`📊 更新 ${districtName} 地区排行榜`);
    
    const rankingList = document.getElementById('ranking-list');
    const rankingTitle = document.getElementById('ranking-title');
    if (!rankingList) return;
    
    const currentParty = window.currentParty || 'kmt';
    
    // 更新排行榜标题
    console.log('🔍 updateDistrictRanking - currentParty:', currentParty);
    console.log('🔍 updateDistrictRanking - districtName:', districtName);
    console.log('🔍 updateDistrictRanking - rankingTitle:', rankingTitle);
    
    if (currentParty === 'recall') {
        console.log('✅ 当前为罢免模式（地区视图）');
        if (rankingTitle) {
            rankingTitle.textContent = '🏆 投票率排行';
            console.log('✅ 设置为投票率排行（地区视图）');
            console.log('🔍 设置后的 rankingTitle.textContent:', rankingTitle.textContent);
        } else {
            console.log('❌ rankingTitle 元素不存在（地区视图）');
        }
    } else if (currentParty === 'winner-ranking') {
        console.log('✅ 当前为获胜党票数排行模式（地区视图）');
        if (rankingTitle) {
            rankingTitle.textContent = '🏆 获胜党票数排行';
            console.log('✅ 设置为获胜党票数排行（地区视图）');
        }
    } else {
        console.log('❌ 当前不是特殊模式，currentParty:', currentParty);
        if (rankingTitle) {
            rankingTitle.textContent = '🏆 得票率排行';
            console.log('✅ 设置为得票率排行（地区视图）');
            console.log('🔍 设置后的 rankingTitle.textContent:', rankingTitle.textContent);
        }
    }
    
    // 检查是否为大罢免模式
    if (currentParty === 'recall' && window.recallDataRegistry) {
        // 大罢免模式：使用罢免投票率排行
        const registeredDistricts = Object.keys(window.recallDataRegistry);
        const currentDistrictNormalized = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
        
        for (const registeredDistrict of registeredDistricts) {
            const registeredDistrictNormalized = registeredDistrict.replace(/臺/g, '台').replace(/縣/g, '县');
            
            if (currentDistrictNormalized === registeredDistrictNormalized || districtName === registeredDistrict) {
                console.log(`🎯 使用罢免投票率排行: ${registeredDistrict}`);
                
                // 生成罢免投票率排行
                const recallRanking = window.generateRecallRanking(registeredDistrict, 'turnout_rate');

                // 渲染罢免排行榜
                rankingList.innerHTML = recallRanking.map((item, index) => {
                    const color = '#D32F2F'; // 罢免红色
                    return `
                        <div class="ranking-item" data-region="${item.region}">
                            <div class="ranking-number ${index < 3 ? 'top-3' : ''}">${index + 1}</div>
                            <div class="ranking-region">${item.region}</div>
                            <div class="ranking-percentage" style="color: ${color}">
                                ${item.turnout_rate.toFixed(1)}%
                            </div>
                        </div>
                    `;
                }).join('');
                
                // 添加点击事件
                rankingList.querySelectorAll('.ranking-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const regionName = item.dataset.region;
                        // 在地区地图中高亮对应区域
                        highlightDistrictRegion(regionName);
                        
                        // 显示罢免详情
                        const recallDetail = window.generateRecallDetail(registeredDistrict, regionName);
                        const detailDiv = document.getElementById('region-detail');
                        if (detailDiv) {
                            detailDiv.innerHTML = recallDetail;
                        }
                    });
                });
                
                console.log(`✅ ${districtName} 罢免排行榜更新完成，共 ${recallRanking.length} 个区域`);
                return;
            }
        }
    }
    
    // 获胜党票数排行模式
    if (currentParty === 'winner-ranking') {
        console.log(`🎯 使用获胜党票数排行: ${districtName}`);
        
        // 生成获胜党票数排行数据
        const winnerRanking = geoData.features.map(feature => {
            const regionName = feature.properties.name;
            const electionData = getRealElectionData(regionName);
            
            // 如果没有数据，跳过这个地区
            if (!electionData) {
                console.log(`⚠️ ${regionName} 没有选举数据，跳过排行榜`);
                return null;
            }
            
            const { kmt_votes, dpp_votes, tpp_votes, total_votes } = electionData;
            const votes = [kmt_votes, dpp_votes, tpp_votes];
            const parties = ['kmt', 'dpp', 'tpp'];
            const partyNames = ['中国国民党', '民主进步党', '台湾民众党'];
            const maxIndex = votes.indexOf(Math.max(...votes));
            const winnerParty = parties[maxIndex];
            const winnerVotes = votes[maxIndex];
            
            return {
                region: regionName,
                winner: winnerParty,
                winner_name: partyNames[maxIndex],
                winner_votes: winnerVotes,
                winner_rate: (winnerVotes / total_votes * 100).toFixed(2),
                total_votes: total_votes,
                // 所有党派得票数据
                kmt_votes, dpp_votes, tpp_votes,
                kmt_rate: (kmt_votes / total_votes * 100).toFixed(2),
                dpp_rate: (dpp_votes / total_votes * 100).toFixed(2),
                tpp_rate: (tpp_votes / total_votes * 100).toFixed(2)
            };
        }).filter(item => item !== null).sort((a, b) => b.winner_votes - a.winner_votes);
        
        // 计算颜色分档（使用与winner-ranking.js相同的逻辑）
        const winnerVotes = winnerRanking.map(item => item.winner_votes);
        const minVotes = Math.min(...winnerVotes);
        const maxVotes = Math.max(...winnerVotes);
        const range = maxVotes - minVotes;
        const levelSize = range / 5;
        const levels = [
            minVotes,
            minVotes + levelSize,
            minVotes + levelSize * 2,
            minVotes + levelSize * 3,
            minVotes + levelSize * 4,
            maxVotes
        ];
        
        // 获胜党颜色配置（与winner-ranking.js保持一致）
        const winnerRankingConfig = {
            kmt_colors: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3"],
            dpp_colors: ["#E8F5E8", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50"],
            tpp_colors: ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#00897B"]
        };
        
        // 根据票数和党派获取颜色
        function getDistrictWinnerColor(winner, votes) {
            // 确定颜色等级 (0-5)
            let colorIndex = 0;
            for (let i = 0; i < levels.length - 1; i++) {
                if (votes >= levels[i] && votes <= levels[i + 1]) {
                    colorIndex = i;
                    break;
                }
            }
            
            // 根据党派选择颜色系列
            let colors;
            switch (winner) {
                case 'kmt':
                    colors = winnerRankingConfig.kmt_colors;
                    break;
                case 'dpp':
                    colors = winnerRankingConfig.dpp_colors;
                    break;
                case 'tpp':
                    colors = winnerRankingConfig.tpp_colors;
                    break;
                default:
                    colors = winnerRankingConfig.kmt_colors;
            }
            
            return colors[colorIndex];
        }
        
        // 渲染获胜党票数排行榜（使用与winner-ranking.js相同的风格）
        rankingList.innerHTML = winnerRanking.map((item, index) => {
            // 根据获胜党和得票数设置颜色
            const bgColor = getDistrictWinnerColor(item.winner, item.winner_votes);
            const partyColor = getPartyColor(item.winner, 5);
            
            return `
                <div class="ranking-item winner-ranking-item" data-region="${item.region}" 
                     style="background-color: ${bgColor}; border-left: 4px solid ${partyColor};">
                    <div class="ranking-number ${index < 3 ? 'top-3' : ''}">${index + 1}</div>
                    <div class="ranking-info">
                        <div class="ranking-name">${item.region}</div>
                        <div class="ranking-district">
                            <span class="winner-party" style="color: ${partyColor};">${item.winner_name}</span>
                            <span class="winner-votes">${item.winner_votes.toLocaleString()}票</span>
                        </div>
                    </div>
                    <div class="ranking-percentage">${item.winner_rate}%</div>
                </div>
            `;
        }).join('');
        
        // 添加点击事件
        rankingList.querySelectorAll('.ranking-item').forEach(item => {
            item.addEventListener('click', () => {
                const regionName = item.dataset.region;
                // 在地区地图中高亮对应区域
                highlightDistrictRegion(regionName);
                
                // 显示区域详情
                const electionData = getRealElectionData(regionName);
                showDistrictDetail(regionName, electionData);
            });
        });
        
        console.log(`✅ ${districtName} 获胜党票数排行榜更新完成，共 ${winnerRanking.length} 个区域`);
        return;
    }
    
    // 普通选举模式：生成地区排行数据
    const districtRanking = geoData.features.map(feature => {
        const regionName = feature.properties.name;
        const electionData = getRealElectionData(regionName);
        
        // 如果没有数据，跳过这个地区
        if (!electionData) {
            console.log(`⚠️ ${regionName} 没有选举数据，跳过排行榜`);
            return null;
        }
        
        let rate = 0;
        let partyName = '';
        
        if (currentParty === 'winner') {
            // 获胜党派模式
            const currentWinnerMode = window.currentWinnerMode || 'rate';
            
            if (currentWinnerMode === 'rate') {
                // 胜率模式
                rate = electionData.winner.rate;
                partyName = `${electionData.winner.name} ${(electionData.winner.rate * 100).toFixed(1)}%`;
            } else {
                // 党派模式
                rate = electionData.winner.rate;
                partyName = electionData.winner.name;
            }
        } else {
            // 普通政党模式
            switch(currentParty) {
                case 'kmt':
                    rate = electionData.kmt_rate;
                    partyName = '国民党';
                    break;
                case 'dpp':
                    rate = electionData.dpp_rate;
                    partyName = '民进党';
                    break;
                case 'tpp':
                    rate = electionData.tpp_rate;
                    partyName = '民众党';
                    break;
                default:
                    rate = electionData.kmt_rate;
                    partyName = '国民党';
            }
        }
        
        // 如果是小数格式，转换为百分比
        if (rate <= 1) {
            rate = rate * 100;
        }
        
        return {
            region: regionName,
            rate: rate,
            votes: electionData[`${currentParty}_votes`] || 0,
            total: electionData.total_votes,
            winner_party: electionData.winner?.party,
            winner_name: electionData.winner?.name
        };
    }).filter(item => item !== null).sort((a, b) => b.rate - a.rate);
    
    // 使用本地定义的getPartyColor函数
    
    // 渲染排行榜
    rankingList.innerHTML = districtRanking.map((item, index) => {
        let displayText = '';
        let color = getPartyColor(currentParty, 4);
        
        if (currentParty === 'winner') {
            const currentWinnerMode = window.currentWinnerMode || 'rate';
            
            if (currentWinnerMode === 'rate') {
                // 胜率模式：显示得票率
                displayText = `${item.rate.toFixed(1)}%`;
                color = '#FF8F00'; // 金色
            } else {
                // 党派模式：显示获胜党派名称
                displayText = item.partyName || '获胜党派';
                // 根据获胜党派确定颜色
                const winnerParty = item.winner_party;
                if (winnerParty) {
                    const partyColors = {
                        kmt: '#0052CC',
                        dpp: '#006600',
                        tpp: '#006666'
                    };
                    color = partyColors[winnerParty] || '#FF8F00';
                }
            }
        } else {
            // 普通政党模式
            displayText = `${item.rate.toFixed(1)}%`;
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
            // 在地区地图中高亮对应区域
            highlightDistrictRegion(regionName);
            
            // 显示区域详情
            const electionData = getRealElectionData(regionName);
            showDistrictDetail(regionName, electionData);
        });
    });
    
    console.log(`✅ ${districtName} 排行榜更新完成，共 ${districtRanking.length} 个区域`);
}

/**
 * 高亮地区地图中的指定区域
 */
function highlightDistrictRegion(regionName) {
    const svg = d3.select("#taiwan-map");
    
    // 恢复所有区域样式
    svg.selectAll('.district-region')
       .style('stroke', '#ffffff')
       .style('stroke-width', '1.5px');
    
    // 高亮指定区域
    svg.selectAll('.district-region')
       .filter(d => d.properties.name === regionName)
       .style('stroke', '#ff6b6b')
       .style('stroke-width', '3px')
       .raise(); // 将高亮元素置于顶层
    
    console.log(`🎯 高亮区域: ${regionName}`);
}

/**
 * 更新地区地图的图例标签
 */
function updateDistrictLegendLabels() {
    const legendLabels = document.querySelector('.legend-labels');
    const legendContainer = document.querySelector('.map-legend');
    const legendTitle = document.getElementById('legend-title');
    if (!legendLabels || !legendContainer) return;

    const currentParty = window.currentParty || 'kmt';
    const currentDistrict = window.districtMapState.currentDistrictName;
    const currentMode = window.districtMapState.currentMode || 'district';
    const selectedLegislator = window.districtMapState.selectedLegislator;
    const currentWinnerMode = window.currentWinnerMode || 'rate';

    // 如果是获胜党派模式且是党派模式，隐藏图例
    if (currentParty === 'winner' && currentWinnerMode === 'party') {
        console.log('🎯 党派模式：隐藏图例');
        legendContainer.style.display = 'none';
        return;
    } else if (currentParty === 'winner-ranking') {
        // 获胜党票数排行模式：隐藏图例
        console.log('🎯 获胜党票数排行模式：隐藏图例');
        legendContainer.style.display = 'none';
        return;
    } else {
        console.log('🎯 显示图例');
        legendContainer.style.display = 'block';
    }

    // 如果是大罢免模式，显示罢免图例
    if (currentParty === 'recall' && window.recallDataRegistry) {
        const registeredDistricts = Object.keys(window.recallDataRegistry);
        const currentDistrictNormalized = currentDistrict.replace(/臺/g, '台').replace(/縣/g, '县');
        
        for (const districtName of registeredDistricts) {
            const districtNormalized = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
            
            if (currentDistrictNormalized === districtNormalized || currentDistrict === districtName) {
                // 根据当前模式更新图例标题
                if (legendTitle) {
                    if (currentMode === 'legislator' && selectedLegislator) {
                        legendTitle.textContent = '投票率图例';
                    } else {
                        legendTitle.textContent = '投票率图例';
                    }
                }
                
                // 获取罢免数据的投票率范围
                const recallRanking = window.generateRecallRanking(districtName, 'turnout_rate');
                if (recallRanking.length > 0) {
                    const minRate = Math.min(...recallRanking.map(item => item.turnout_rate));
                    const maxRate = Math.max(...recallRanking.map(item => item.turnout_rate));
                    legendLabels.innerHTML = `<span>${Math.floor(minRate)}%</span><span>${Math.ceil(maxRate)}%</span>`;
                    return;
                }
            }
        }
    }

    if (!currentDistrict) {
        legendLabels.innerHTML = `<span>0%</span><span>100%</span>`;
        return;
    }

    const boundaries = getDynamicLegendBoundaries(currentParty, currentDistrict);

    // 根据当前模式更新图例标题
    if (legendTitle) {
        if (currentParty === 'recall') {
            legendTitle.textContent = '同意罢免率图例';
        } else if (currentParty === 'winner') {
            legendTitle.textContent = '胜率图例';
        } else {
            legendTitle.textContent = '得票率图例';
        }
    }

    if (boundaries && boundaries.length === 2) {
        legendLabels.innerHTML = `<span>${boundaries[0]}%</span><span>${boundaries[1]}%</span>`;
    } else {
        legendLabels.innerHTML = `<span>0%</span><span>100%</span>`;
    }
}

/**
 * 获取动态图例边界
 */
function getDynamicLegendBoundaries(party, districtName) {
    // ...原有数据获取逻辑...
    const districtInfo = window.getDistrictInfo ? window.getDistrictInfo(districtName) : null;
    if (!districtInfo) return null;
    const dataSource = window[districtInfo.dataKey];
    if (!dataSource) return null;

    const rates = [];
    Object.keys(dataSource).forEach(regionName => {
        const data = dataSource[regionName];
        let rate = 0;
        
        if (party === 'winner') {
            // 获胜党派模式
            const electionData = getRealElectionData(regionName);
            if (electionData && electionData.winner) {
                rate = electionData.winner.rate;
                if (rate <= 1) rate = rate * 100; // 转换为百分比
            }
        } else {
            // 普通政党模式
            switch(party) {
                case 'kmt': rate = typeof data.kmt_rate === 'string' ? parseFloat(data.kmt_rate) : data.kmt_rate; break;
                case 'dpp': rate = typeof data.dpp_rate === 'string' ? parseFloat(data.dpp_rate) : data.dpp_rate; break;
                case 'tpp': rate = typeof data.tpp_rate === 'string' ? parseFloat(data.tpp_rate) : data.tpp_rate; break;
            }
        }
        
        if (rate > 0) rates.push(rate);
    });
    if (rates.length === 0) return null;

    let minRate = Math.min(...rates);
    let maxRate = Math.max(...rates);
    minRate = Math.floor(minRate);
    maxRate = Math.ceil(maxRate);

    // 保证最小在左最大在右
    if (minRate > maxRate) [minRate, maxRate] = [maxRate, minRate];

    return [minRate, maxRate];
}

/**
 * 恢复台湾主地图的图例标签
 */
function restoreMainMapLegendLabels() {
    const legendLabels = document.querySelector('.legend-labels');
    if (legendLabels) {
        legendLabels.innerHTML = `
            <span>0%</span>
            <span>20%</span>
            <span>40%</span>
            <span>60%+</span>
        `;
        console.log('✅ 主地图图例标签已恢复为: 0%, 20%, 40%, 60%+');
    }
}

/**
 * 显示/隐藏加载状态
 */
function showLoadingState(show) {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = show ? 'flex' : 'none';
    }
}

/**
 * 格式化百分比 - 兼容election-data.js的格式
 * 注意：electionData中的rate字段已经是百分比数值，不需要再乘以100
 */
function formatPercentage(rate) {
    // 检查数值范围来判断是否已经是百分比格式
    if (rate > 1) {
        // 已经是百分比数值（如62.67），直接格式化
        return rate.toFixed(1) + '%';
    } else {
        // 是小数格式（如0.6267），需要转换为百分比
        return (rate * 100).toFixed(1) + '%';
    }
}

// 绑定返回按钮事件
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('back-to-taiwan');
    if (backBtn) {
        backBtn.addEventListener('click', window.backToTaiwan);
        console.log('✅ 返回按钮事件绑定成功');
    } else {
        console.warn('⚠️ 未找到返回按钮元素');
    }
    
    // 初始化时根据当前政党模式设置面板的显示状态
    const currentParty = window.currentParty || 'kmt';
    const overallStatsPanel = document.querySelector('.panel-section:first-child');
    const voteAnalysisPanel = document.querySelector('.panel-section:last-child');
    const selectorControl = document.getElementById('legislator-selector-control');
    
    if (currentParty === 'recall') {
        if (overallStatsPanel) {
            overallStatsPanel.style.display = 'none';
        }
        if (voteAnalysisPanel) {
            voteAnalysisPanel.style.display = 'none';
        }
        console.log('✅ 大罢免模式下隐藏全台统计面板和得票分析面板');
    } else {
        // 在非罢免模式下隐藏立委选择控件
        if (selectorControl) {
            selectorControl.style.display = 'none';
        }
        hideLegislatorDetail();
    }
    
    // 初始化返回地区地图按钮
    initializeBackToRegionButton();
    

    
    // 验证关键函数是否正确暴露
    console.log('🔍 loadDistrictMap函数:', typeof window.loadDistrictMap);
    console.log('🔍 backToTaiwan函数:', typeof window.backToTaiwan);
    console.log('🔍 districtMapState:', window.districtMapState);
    
    console.log('🌟 district-map.js 初始化完成');
});

/**
 * 政党切换时更新地区排行榜
 */
window.updateDistrictRankingForPartySwitch = function() {
    console.log('🔄 政党切换 - 更新地区排行榜');
    console.log('🔍 updateDistrictRankingForPartySwitch - districtMapState:', window.districtMapState);
    console.log('🔍 updateDistrictRankingForPartySwitch - currentView:', window.districtMapState ? window.districtMapState.currentView : 'undefined');
    console.log('🔍 updateDistrictRankingForPartySwitch - currentDistrictName:', window.districtMapState ? window.districtMapState.currentDistrictName : 'undefined');
    
    if (window.districtMapState.currentView === 'district' && window.districtMapState.currentDistrictName) {
        console.log('✅ 当前在地区视图，开始更新地区排行榜');
        // 重新获取当前地区的数据来更新排行榜
        const svg = d3.select("#taiwan-map");
        const features = [];
        svg.selectAll('.district-region').each(function(d) {
            features.push(d);
        });
        
        console.log('🔍 找到地区数量:', features.length);
        
        if (features.length > 0) {
            const mockGeoData = { features: features };
            console.log('✅ 调用 updateDistrictRanking');
            updateDistrictRanking(window.districtMapState.currentDistrictName, mockGeoData);
            console.log('✅ 地区排行榜更新完成');
        } else {
            console.warn('⚠️ 未找到地区数据，无法更新排行榜');
        }
    } else {
        console.log('❌ 不在地区视图或没有地区名称');
        console.log('❌ currentView:', window.districtMapState ? window.districtMapState.currentView : 'undefined');
        console.log('❌ currentDistrictName:', window.districtMapState ? window.districtMapState.currentDistrictName : 'undefined');
    }
};

/**
 * 更新地区地图颜色（当政党切换时调用）
 */
window.updateDistrictMapColors = function(party) {
    console.log(`🎨 更新地区地图颜色为: ${party}党`);
    
    // 更新全局currentParty变量
    window.currentParty = party;
    
    // 获取全台统计面板和得票分析面板
    const overallStatsPanel = document.querySelector('.panel-section:first-child');
    const voteAnalysisPanel = document.querySelector('.panel-section:last-child');
    
    // 获取立委选择控制区域
    const selectorControl = document.getElementById('legislator-selector-control');
    
    // 根据政党模式控制面板的显示
    if (party === 'recall') {
        // 在大罢免模式下隐藏全台统计面板和得票分析面板
        if (overallStatsPanel) {
            overallStatsPanel.style.display = 'none';
        }
        if (voteAnalysisPanel) {
            voteAnalysisPanel.style.display = 'none';
        }
        

    } else {
        // 在普通模式下显示全台统计面板和得票分析面板
        if (overallStatsPanel) {
            overallStatsPanel.style.display = 'block';
        }
        if (voteAnalysisPanel) {
            voteAnalysisPanel.style.display = 'block';
        }
        
        // 在非罢免模式下隐藏立委选择控件和详细数据面板
        if (selectorControl) {
            selectorControl.style.display = 'none';
        }
        hideLegislatorDetail();
        

    }
    
    // 如果当前显示的是地区地图，则更新颜色
    if (window.districtMapState && window.districtMapState.currentView === 'district') {
        console.log('🔄 开始更新地区地图颜色...');
        
        const regions = d3.select("#taiwan-map").selectAll('.district-region');
        console.log('📍 找到地区数量:', regions.size());
        
        regions
            .transition()
            .duration(500)
            .attr("fill", d => {
                console.log(`🔄 updateDistrictMapColors: 正在更新 ${d.properties.name} 的颜色`);
                const color = getDistrictColor(d.properties.name);
                console.log(`🎨 更新 ${d.properties.name} 颜色为: ${color}`);
                return color;
            });
        
        // 更新图例标签
        updateDistrictLegendLabels();
        
        // 如果是获胜党票数排行模式，需要特殊处理
        if (party === 'winner-ranking') {
            console.log('🎯 获胜党票数排行模式：更新地区内部获胜党排行');
            
            // 更新地区内部获胜党排行
            if (window.districtWinnerRankingManager && window.districtMapState.currentDistrictName) {
                const districtName = window.districtMapState.currentDistrictName;
                if (window.generateDistrictWinnerRanking) {
                    window.generateDistrictWinnerRanking(districtName);
                }
                if (window.updateDistrictWinnerStats) {
                    window.updateDistrictWinnerStats(districtName);
                }
            }
            
            // 隐藏图例（获胜党票数排行模式下不显示图例）
            const legendContainer = document.querySelector('.map-legend');
            if (legendContainer) {
                legendContainer.style.display = 'none';
            }
        } else {
            // 其他模式：更新地区排行榜
            if (window.districtMapState && window.districtMapState.currentDistrictName) {
                const districtName = window.districtMapState.currentDistrictName;
                const geoData = window.currentGeoData;
                
                if (geoData && window.updateDistrictRanking) {
                    console.log(`🎯 更新地区排行榜: ${districtName} - ${party}模式`);
                    window.updateDistrictRanking(districtName, geoData);
                }
            }
            
            // 显示图例（非获胜党票数排行模式）
            const legendContainer = document.querySelector('.map-legend');
            if (legendContainer) {
                legendContainer.style.display = 'block';
            }
        }
        
        console.log('✅ 地区地图颜色和图例更新完成');
    } else {
        console.log('⚠️ 当前不在地区地图视图，跳过颜色更新');
    }
};

/**
 * 初始化罢免人员下拉菜单
 */
function initializeLegislatorDropdown(districtName) {
    const dropdown = document.getElementById('legislator-dropdown');
    const selectorControl = document.getElementById('legislator-selector-control');
    
    if (!dropdown || !selectorControl) return;
    
    // 显示下拉菜单控制区域
    selectorControl.style.display = 'flex';
    
    // 清空现有选项
    dropdown.innerHTML = '<option value="">选择罢免人员查看详细数据</option>';
    
    // 获取立委列表 - 处理地区名称标准化
    let legislators = window.getRecallLegislators(districtName);
    
    // 如果直接获取失败，尝试标准化名称
    if (!legislators || legislators.length === 0) {
        const normalizedDistrictName = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
        legislators = window.getRecallLegislators(normalizedDistrictName);
    }
    
    // 如果还是失败，尝试反向标准化
    if (!legislators || legislators.length === 0) {
        const reverseNormalizedDistrictName = districtName.replace(/台/g, '臺').replace(/县/g, '縣');
        legislators = window.getRecallLegislators(reverseNormalizedDistrictName);
    }
    
    // 特殊处理新竹市，包含市长数据
    if (districtName === '新竹市') {
        const hsinchuLegislators = window.hsinchuCityLegislators || [];
        const hsinchuMayors = window.hsinchuCityMayors || [];
        legislators = hsinchuLegislators.concat(hsinchuMayors);
    }
    
    if (!legislators || legislators.length === 0) {
        console.log(`⚠️ 未找到 ${districtName} 的罢免人员数据`);
        return;
    }
    
    // 添加罢免人员选项
    legislators.forEach(person => {
        const option = document.createElement('option');
        option.value = person.name;
        const position = person.district === '新竹市' && person.party === '民眾黨' ? '市長' : '立委';
        option.textContent = `${person.name} (${person.party} - ${position})`;
        dropdown.appendChild(option);
    });
    
    // 添加下拉菜单事件监听
    dropdown.addEventListener('change', function() {
        const selectedPerson = this.value;
        if (selectedPerson) {
            console.log(`🎯 选择罢免人员: ${selectedPerson}`);
            updateMapForLegislator(districtName, selectedPerson);
            showLegislatorDetail(districtName, selectedPerson);
            showBackToRegionButton(); // 显示返回按钮
        } else {
            // 重置地图显示
            resetMapDisplay(districtName);
            hideLegislatorDetail();
            hideBackToRegionButton(); // 隐藏返回按钮
        }
    });
    
    console.log(`✅ 罢免人员下拉菜单初始化完成，共 ${legislators.length} 个罢免人员`);
}

/**
 * 根据党派名称获取CSS类
 * @param {string} partyName - 党派名称
 * @returns {string} CSS类名
 */
function getPartyClass(partyName) {
    if (!partyName) return 'default';
    
    const normalizedParty = partyName.toLowerCase().replace(/\s+/g, '');
    
    // 国民党相关
    if (normalizedParty.includes('國民黨') || normalizedParty.includes('國民黨') || 
        normalizedParty.includes('kmt') || normalizedParty.includes('國民黨')) {
        return 'kmt';
    }
    
    // 民进党相关
    if (normalizedParty.includes('民進黨') || normalizedParty.includes('民主進步黨') || 
        normalizedParty.includes('dpp') || normalizedParty.includes('民進黨')) {
        return 'dpp';
    }
    
    // 民众党相关
    if (normalizedParty.includes('民眾黨') || normalizedParty.includes('台灣民眾黨') || 
        normalizedParty.includes('tpp') || normalizedParty.includes('民眾黨')) {
        return 'tpp';
    }
    
    // 其他党派
    return 'default';
}

/**
 * 显示罢免人员详细数据
 */
function showLegislatorDetail(districtName, legislatorName) {
    const detailPanel = document.getElementById('legislator-detail-panel');
    const detailContent = document.getElementById('legislator-detail-content');
    
    if (!detailPanel || !detailContent) return;
    
    // 获取立委列表 - 处理地区名称标准化
    let legislators = window.getRecallLegislators(districtName);
    
    // 如果直接获取失败，尝试标准化名称
    if (!legislators || legislators.length === 0) {
        const normalizedDistrictName = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
        legislators = window.getRecallLegislators(normalizedDistrictName);
    }
    
    // 如果还是失败，尝试反向标准化
    if (!legislators || legislators.length === 0) {
        const reverseNormalizedDistrictName = districtName.replace(/台/g, '臺').replace(/县/g, '縣');
        legislators = window.getRecallLegislators(reverseNormalizedDistrictName);
    }
    
    // 特殊处理新竹市，包含市长数据
    if (districtName === '新竹市') {
        const hsinchuLegislators = window.hsinchuCityLegislators || [];
        const hsinchuMayors = window.hsinchuCityMayors || [];
        legislators = hsinchuLegislators.concat(hsinchuMayors);
    }
    
    const selectedPerson = legislators ? legislators.find(l => l.name === legislatorName) : null;
    
    if (!selectedPerson) return;
    
    // 根据党派确定CSS类
    const partyClass = getPartyClass(selectedPerson.party);
    
    // 确定职位类型
    const position = selectedPerson.district === '新竹市' && selectedPerson.party === '民眾黨' ? '市長' : '立委';
    
    // 生成详细数据HTML
    const detailHTML = `
        <div class="legislator-detail-header ${partyClass}">
            <div class="legislator-name">${selectedPerson.name}</div>
            <div class="legislator-party">${selectedPerson.party}</div>
            <div class="legislator-district">${selectedPerson.district} - ${position}</div>
        </div>
        <div class="legislator-detail-stats">
            <div class="legislator-detail-item agree-rate">
                <div class="label">同意票率</div>
                <div class="value">${selectedPerson.agree_rate.toFixed(1)}%</div>
            </div>
            <div class="legislator-detail-item turnout-rate">
                <div class="label">投票率</div>
                <div class="value">${selectedPerson.turnout_rate.toFixed(1)}%</div>
            </div>
            <div class="legislator-detail-item total-votes">
                <div class="label">总有效票数</div>
                <div class="value">${selectedPerson.total_valid.toLocaleString()}</div>
            </div>
            <div class="legislator-detail-item agree-votes">
                <div class="label">同意票数</div>
                <div class="value">${selectedPerson.total_agree.toLocaleString()}</div>
            </div>
            <div class="legislator-detail-item disagree-votes">
                <div class="label">不同意票数</div>
                <div class="value">${selectedPerson.total_disagree.toLocaleString()}</div>
            </div>
            <div class="legislator-detail-item regions">
                <div class="label">所属选区</div>
                <div class="value">${selectedPerson.regions.join('、')}</div>
            </div>
        </div>
    `;
    
    detailContent.innerHTML = detailHTML;
    detailPanel.style.display = 'block';
    
    console.log(`✅ 显示罢免人员详细数据: ${legislatorName}`);
}

/**
 * 隐藏罢免人员详细数据
 */
function hideLegislatorDetail() {
    const detailPanel = document.getElementById('legislator-detail-panel');
    if (detailPanel) {
        detailPanel.style.display = 'none';
    }
}

/**
 * 重置地图显示
 */
function resetMapDisplay(districtName) {
    console.log(`🔄 重置地图显示为地区模式: ${districtName}`);
    
    // 重置为地区模式
    window.districtMapState.currentMode = 'district';
    window.districtMapState.selectedLegislator = null;
    
    // 更新地图颜色为地区模式
    const regions = d3.select("#taiwan-map").selectAll('.district-region');
    
    regions
        .transition()
        .duration(500)
        .attr("fill", d => {
            const regionName = d.properties.name;
            const currentParty = window.currentParty || 'kmt';
            
            // 如果是获胜党票数排行模式，使用专门的颜色函数
            if (currentParty === 'winner-ranking') {
                const currentDistrict = window.districtMapState?.currentDistrictName;
                const currentMode = window.districtMapState?.currentMode || 'district';
                const selectedLegislator = window.districtMapState?.selectedLegislator;
                
                if (currentDistrict) {
                    return getDistrictColorForMode(regionName, currentDistrict, currentMode, selectedLegislator);
                }
            }
            
            // 如果是罢免模式，使用罢免颜色函数
            if (currentParty === 'recall') {
                const currentMode = window.districtMapState?.currentMode || 'district';
                const selectedLegislator = window.districtMapState?.selectedLegislator;
                return getDistrictColorForMode(regionName, districtName, currentMode, selectedLegislator);
            } else {
                // 非罢免模式，使用正常的选举颜色函数
                return getDistrictColor(regionName);
            }
        });
    
    // 更新图例为地区模式
        updateDistrictLegendLabels();
    
    // 更新排行榜为地区数据
    const geoData = window.currentGeoData;
    if (geoData) {
        updateDistrictRanking(districtName, geoData);
    }
    
    // 恢复排行榜标题
    const rankingTitle = document.getElementById('ranking-title');
    if (rankingTitle) {
        rankingTitle.innerHTML = '🏆 得票率排行';
    }
    
    console.log(`✅ 地图已重置为地区模式`);
}

/**
 * 返回到当前城市的地区视图
 */
function returnToDistrictView() {
    console.log(`🔄 返回到当前城市的地区视图`);
    
    // 获取当前城市信息
    const currentDistrictName = window.districtMapState.currentDistrictName;
    const currentDistrictCode = window.districtMapState.currentDistrictCode;
    
    if (!currentDistrictName || !currentDistrictCode) {
        console.log('⚠️ 没有当前城市信息，无法返回地区视图');
        return;
    }
    
    // 重置为地区模式
    window.districtMapState.currentMode = 'district';
    window.districtMapState.selectedLegislator = null;
    
    console.log(`🔄 重新加载 ${currentDistrictName} 地区地图`);
    
    // 重新加载当前城市的地图
    if (window.loadDistrictMap) {
        window.loadDistrictMap(currentDistrictName, currentDistrictCode);
    }
    
    console.log(`✅ 已返回到 ${currentDistrictName} 地区视图`);
}

/**
 * 根据选中的立委更新地图显示
 */
function updateMapForLegislator(districtName, legislatorName) {
    // 更新全局状态
    window.districtMapState.currentMode = 'legislator';
    window.districtMapState.selectedLegislator = legislatorName;
    
    console.log(`🗺️ 更新地图显示罢免人员选区: ${legislatorName}, 模式: ${window.districtMapState.currentMode}`);
    
    // 获取立委列表 - 处理地区名称标准化
    let legislators = window.getRecallLegislators(districtName);
    
    // 如果直接获取失败，尝试标准化名称
    if (!legislators || legislators.length === 0) {
        const normalizedDistrictName = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
        legislators = window.getRecallLegislators(normalizedDistrictName);
    }
    
    // 如果还是失败，尝试反向标准化
    if (!legislators || legislators.length === 0) {
        const reverseNormalizedDistrictName = districtName.replace(/台/g, '臺').replace(/县/g, '縣');
        legislators = window.getRecallLegislators(reverseNormalizedDistrictName);
    }
    
    // 特殊处理新竹市，包含市长数据
    if (districtName === '新竹市') {
        const hsinchuLegislators = window.hsinchuCityLegislators || [];
        const hsinchuMayors = window.hsinchuCityMayors || [];
        legislators = hsinchuLegislators.concat(hsinchuMayors);
    }
    
    const selectedPerson = legislators ? legislators.find(l => l.name === legislatorName) : null;
    
    if (!selectedPerson) return;
    
    // 检查是否在罢免模式下
    const isRecallMode = window.currentParty === 'recall';
    
    // 更新地图颜色，只高亮该立委的选区
    const regions = d3.select("#taiwan-map").selectAll('.district-region');
    
    regions
        .transition()
        .duration(500)
        .attr("fill", d => {
            const regionName = d.properties.name;
            
            // 检查该区域是否属于选中的立委
            const isSelectedPersonRegion = selectedPerson.regions.includes(regionName);
            
            if (isSelectedPersonRegion) {
                // 该立委的选区：使用同意票比率颜色
                return getDistrictColorForMode(regionName, districtName, 'legislator', legislatorName);
            } else {
                // 其他选区：显示为灰色
                return '#f0f0f0';
            }
        });
    
    // 在罢免模式下选择立委时，更新图例为投票率
    if (isRecallMode) {
        updateLegendForRecallTurnout(districtName, legislatorName);
    }
    
    // 更新排行榜为该立委的选区排行
    updateRankingForLegislator(districtName, legislatorName);
}

/**
 * 在罢免模式下更新图例为投票率
 */
function updateLegendForRecallTurnout(districtName, legislatorName) {
    const legendLabels = document.querySelector('.legend-labels');
    const legendContainer = document.querySelector('.map-legend');
    const legendTitle = document.getElementById('legend-title');
    if (!legendLabels || !legendContainer) return;
    
    // 获取立委列表 - 处理地区名称标准化
    let legislators = window.getRecallLegislators(districtName);
    
    // 如果直接获取失败，尝试标准化名称
    if (!legislators || legislators.length === 0) {
        const normalizedDistrictName = districtName.replace(/臺/g, '台').replace(/縣/g, '县');
        legislators = window.getRecallLegislators(normalizedDistrictName);
    }
    
    // 如果还是失败，尝试反向标准化
    if (!legislators || legislators.length === 0) {
        const reverseNormalizedDistrictName = districtName.replace(/台/g, '臺').replace(/县/g, '縣');
        legislators = window.getRecallLegislators(reverseNormalizedDistrictName);
    }
    
    // 特殊处理新竹市，包含市长数据
    if (districtName === '新竹市') {
        const hsinchuLegislators = window.hsinchuCityLegislators || [];
        const hsinchuMayors = window.hsinchuCityMayors || [];
        legislators = hsinchuLegislators.concat(hsinchuMayors);
    }
    
    const selectedPerson = legislators ? legislators.find(l => l.name === legislatorName) : null;
    
    if (!selectedPerson) return;
    
    // 更新图例标题为同意票比率
    if (legendTitle) {
        legendTitle.textContent = '同意票比率图例';
    }
    
    // 收集该罢免人员所有选区的同意票比率数据
    const agreeRates = [];
    selectedPerson.regions.forEach(regionName => {
        // 使用新的数据获取函数
        const recallData = getRecallDataForDisplay(districtName, regionName, 'legislator', legislatorName);
        
        if (recallData && recallData.agree_rate !== undefined) {
            agreeRates.push(recallData.agree_rate);
        }
    });
    
    if (agreeRates.length > 0) {
        const minRate = Math.min(...agreeRates);
        const maxRate = Math.max(...agreeRates);
        legendLabels.innerHTML = `<span>${Math.floor(minRate)}%</span><span>${Math.ceil(maxRate)}%</span>`;
        console.log(`✅ 罢免模式下立委选择：图例已更新为同意票比率 (${Math.floor(minRate)}%-${Math.ceil(maxRate)}%)`);
    } else {
        legendLabels.innerHTML = `<span>0%</span><span>100%</span>`;
    }
}

/**
 * 更新立委选区排行榜
 */
function updateRankingForLegislator(districtName, legislatorName) {
    const rankingList = document.getElementById('ranking-list');
    const rankingTitle = document.getElementById('ranking-title');
    if (!rankingList) return;
    
    // 更新排行榜标题为仇恨值排行榜
    if (rankingTitle) {
        rankingTitle.innerHTML = '🔥 仇恨值排行榜';
    }
    
    // 获取仇恨值排行榜数据
    const hatredRanking = window.getHatredRanking();
    const selectedLegislatorData = window.getLegislatorHatredData(legislatorName);
    const selectedLegislatorRank = window.getLegislatorHatredRank(legislatorName);
    
    if (!hatredRanking || hatredRanking.length === 0) {
        console.log('❌ 未找到仇恨值排行榜数据');
        return;
    }
    
    // 渲染仇恨值排行榜
    rankingList.innerHTML = hatredRanking.map((item, index) => {
        const isSelected = item.name === legislatorName;
        const color = isSelected ? '#FF5722' : '#D32F2F'; // 选中的立委用橙色高亮
        const rankClass = index < 3 ? 'top-3' : '';
        const selectedClass = isSelected ? 'selected-legislator' : '';
        
        return `
            <div class="ranking-item ${selectedClass}" data-legislator="${item.name}">
                <div class="ranking-number ${rankClass}">${index + 1}</div>
                <div class="ranking-info">
                    <div class="ranking-name">${item.name}</div>
                    <div class="ranking-district">${item.district}</div>
                </div>
                <div class="ranking-percentage" style="color: ${color}">
                    ${(item.agree_rate * 100).toFixed(1)}%
                </div>
                ${isSelected ? '<div class="selected-indicator">👑</div>' : ''}
            </div>
        `;
    }).join('');
    
    // 添加点击事件
    rankingList.querySelectorAll('.ranking-item').forEach(item => {
        item.addEventListener('click', () => {
            const legislatorName = item.dataset.legislator;
            const legislatorData = window.getLegislatorHatredData(legislatorName);
            
            if (legislatorData) {
                // 显示立委详细信息
            const detailDiv = document.getElementById('region-detail');
            if (detailDiv) {
                    detailDiv.innerHTML = `
                        <div class="detail-content">
                            <div class="detail-title">${legislatorData.name}</div>
                            <div class="detail-subtitle">${legislatorData.district}</div>
                            <div class="detail-stats">
                                <div class="stat-item">
                                    <span class="stat-label">仇恨值排名:</span>
                                    <span class="stat-value">第${window.getLegislatorHatredRank(legislatorData.name)}名</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">同意票率:</span>
                                    <span class="stat-value">${(legislatorData.agree_rate * 100).toFixed(1)}%</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">同意票数:</span>
                                    <span class="stat-value">${legislatorData.agree_votes.toLocaleString()}票</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">不同意票数:</span>
                                    <span class="stat-value">${legislatorData.disagree_votes.toLocaleString()}票</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">投票率:</span>
                                    <span class="stat-value">${legislatorData.turnout_rate}%</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        });
    });
    
    // 显示选中立委的排名信息
    if (selectedLegislatorData && selectedLegislatorRank) {
        console.log(`✅ ${legislatorName} 仇恨值排行榜更新完成`);
        console.log(`📊 ${legislatorName} 在仇恨值排行榜中排名第 ${selectedLegislatorRank} 位`);
        console.log(`📈 同意票率: ${(selectedLegislatorData.agree_rate * 100).toFixed(1)}%`);
    }
}

/**
 * 更新获胜党派模式（新增函数）
 */
window.updateWinnerMode = function(mode) {
    console.log(`🔄 更新获胜党派模式为: ${mode}`);
    
    // 更新全局currentWinnerMode变量
    window.currentWinnerMode = mode;
    
    // 如果当前显示的是地区地图，则更新颜色
    if (window.districtMapState && window.districtMapState.currentView === 'district') {
        console.log('🔄 开始更新地区地图获胜党派模式...');
        
        const regions = d3.select("#taiwan-map").selectAll('.district-region');
        console.log('📍 找到地区数量:', regions.size());
        
        regions
            .transition()
            .duration(500)
            .attr("fill", d => {
                console.log(`🔄 updateDistrictRankingForPartySwitch: 正在更新 ${d.properties.name} 的颜色`);
                const color = getDistrictColor(d.properties.name);
                console.log(`🎨 更新 ${d.properties.name} 颜色为: ${color}`);
                return color;
            });
        
        // 更新图例标签
        updateDistrictLegendLabels();
        
        // 特殊处理：如果切换到党派模式，确保图例被隐藏
        if (mode === 'party') {
            console.log('🎯 切换到党派模式，确保图例隐藏');
            const legendContainer = document.querySelector('.map-legend');
            if (legendContainer) {
                legendContainer.style.display = 'none';
            }
        }
        
        console.log('✅ 地区地图获胜党派模式更新完成');
    } else {
        console.log('⚠️ 当前不在地区地图视图，跳过获胜党派模式更新');
    }
};

/**
 * 初始化返回地区地图按钮
 */
function initializeBackToRegionButton() {
    const backBtn = document.getElementById('back-to-region-btn');
    const regionBackBtn = backBtn?.querySelector('.region-back-btn');
    
    if (!backBtn || !regionBackBtn) return;
    
    regionBackBtn.addEventListener('click', function() {
        console.log('🔄 返回地区视图');
        
        // 隐藏返回按钮
        backBtn.style.display = 'none';
        
        // 隐藏立委详细数据面板
        hideLegislatorDetail();
        
        // 重置立委下拉菜单
        const dropdown = document.getElementById('legislator-dropdown');
        if (dropdown) {
            dropdown.value = '';
        }
        
        // 返回到当前城市的地区视图
        returnToDistrictView();
    });
    
    console.log('✅ 返回地区地图按钮初始化完成');
}

/**
 * 显示返回地区地图按钮
 */
function showBackToRegionButton() {
    const backBtn = document.getElementById('back-to-region-btn');
    if (backBtn) {
        backBtn.style.display = 'block';
        console.log('✅ 显示返回地区地图按钮');
    }
}

/**
 * 隐藏返回地区地图按钮
 */
function hideBackToRegionButton() {
    const backBtn = document.getElementById('back-to-region-btn');
    if (backBtn) {
        backBtn.style.display = 'none';
        console.log('✅ 隐藏返回地区地图按钮');
    }
}

// 暴露函数到全局
window.showBackToRegionButton = showBackToRegionButton;
window.hideBackToRegionButton = hideBackToRegionButton;

// 为党派切换时的地区排行榜更新函数
window.updateDistrictRankingForPartySwitch = function() {
    console.log('🎯 党派切换时的地区排行榜更新');
    
    if (window.districtMapState && window.districtMapState.currentView === 'district') {
        const districtName = window.districtMapState.currentDistrictName;
        const geoData = window.currentGeoData;
        const currentParty = window.currentParty || 'kmt';
        
        console.log(`🎯 更新地区排行榜: ${districtName} - ${currentParty}模式`);
        
        if (geoData && districtName) {
            // 更新地区排行榜
            updateDistrictRanking(districtName, geoData);
            
            // 如果是获胜党票数排行模式，需要特殊处理
            if (currentParty === 'winner-ranking') {
                console.log('🎯 获胜党票数排行模式：更新地区内部获胜党排行');
                
                // 更新地区内部获胜党排行
                if (window.districtWinnerRankingManager) {
                    if (window.generateDistrictWinnerRanking) {
                        window.generateDistrictWinnerRanking(districtName);
                    }
                    if (window.updateDistrictWinnerStats) {
                        window.updateDistrictWinnerStats(districtName);
                    }
                }
            }
            
            console.log('✅ 地区排行榜更新完成');
        } else {
            console.log('❌ 缺少地区数据或地区名称');
        }
    } else {
        console.log('❌ 当前不在地区视图');
    }
};


