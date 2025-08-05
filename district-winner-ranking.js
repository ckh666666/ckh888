// ===== 地区内部获胜党排行功能 =====

// 全局状态管理
window.districtWinnerRankingState = {
    currentDistrict: null,
    currentView: 'taiwan', // 'taiwan' 或 'district-ranking'
    districtRankingData: {},
    isLoading: false
};

// 地区内部获胜党数据管理器
window.districtWinnerRankingManager = {
    // 存储各地区内部数据
    districtData: {},
    
    // 注册地区内部数据
    registerDistrictData(districtName, data) {
        this.districtData[districtName] = data;
        console.log(`✅ 注册地区内部数据: ${districtName}`);
    },
    
    // 获取地区内部数据
    getDistrictData(districtName) {
        return this.districtData[districtName] || null;
    },
    
    // 计算地区内部获胜党数据
    calculateDistrictWinnerData(districtName) {
        const districtData = this.getDistrictData(districtName);
        if (!districtData) return [];
        
        return Object.keys(districtData).map(regionName => {
            const regionData = districtData[regionName];
            const { kmt_votes, dpp_votes, tpp_votes, total_votes } = regionData;
            const votes = [kmt_votes, dpp_votes, tpp_votes];
            const parties = ['kmt', 'dpp', 'tpp'];
            const partyNames = ['中国国民党', '民主进步党', '台湾民众党'];
            const maxIndex = votes.indexOf(Math.max(...votes));
            
            return {
                district: districtName,
                region: regionName,
                winner: parties[maxIndex],
                winner_name: partyNames[maxIndex],
                winner_votes: votes[maxIndex],
                winner_rate: (votes[maxIndex] / total_votes * 100).toFixed(2),
                total_votes: total_votes,
                // 所有党派得票数据
                kmt_votes, dpp_votes, tpp_votes,
                kmt_rate: (kmt_votes / total_votes * 100).toFixed(2),
                dpp_rate: (dpp_votes / total_votes * 100).toFixed(2),
                tpp_rate: (tpp_votes / total_votes * 100).toFixed(2)
            };
        });
    },
    
    // 计算地区内部颜色分档
    calculateDistrictColorLevels(districtName) {
        const winnerData = this.calculateDistrictWinnerData(districtName);
        if (winnerData.length === 0) return null;
        
        const winnerVotes = winnerData.map(item => item.winner_votes);
        const minVotes = Math.min(...winnerVotes);
        const maxVotes = Math.max(...winnerVotes);
        
        // 分五档
        const range = maxVotes - minVotes;
        const levelSize = range / 5;
        
        return {
            minVotes,
            maxVotes,
            levelSize,
            levels: [
                minVotes,
                minVotes + levelSize,
                minVotes + levelSize * 2,
                minVotes + levelSize * 3,
                minVotes + levelSize * 4,
                maxVotes
            ]
        };
    },
    
    // 根据票数和党派获取地区内部颜色
    getDistrictWinnerColor(districtName, winner, votes) {
        const colorLevels = this.calculateDistrictColorLevels(districtName);
        if (!colorLevels) return '#CCCCCC';
        
        const { levels } = colorLevels;
        
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
                colors = ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3"];
                break;
            case 'dpp':
                colors = ["#E8F5E8", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50"];
                break;
            case 'tpp':
                colors = ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#00897B"];
                break;
            default:
                colors = ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3"];
        }
        
        return colors[colorIndex];
    }
};

// 生成地区内部获胜党排行
function generateDistrictWinnerRanking(districtName) {
    const winnerData = districtWinnerRankingManager.calculateDistrictWinnerData(districtName);
    
    if (winnerData.length === 0) {
        console.warn(`❌ 未找到地区 ${districtName} 的内部数据`);
        return;
    }
    
    // 按获胜党得票数排序
    const sortedData = winnerData.sort((a, b) => b.winner_votes - a.winner_votes);
    
    const rankingList = document.getElementById('ranking-list');
    const rankingTitle = document.getElementById('ranking-title');
    
    if (rankingTitle) {
        rankingTitle.innerHTML = `🏆 ${districtName} - 地区获胜党得票排行`;
    }
    
    if (rankingList) {
        rankingList.innerHTML = '';
        
        sortedData.forEach((item, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = 'ranking-item district-winner-ranking-item';
            rankingItem.setAttribute('data-district', districtName);
            rankingItem.setAttribute('data-region', item.region);
            
            // 根据获胜党和得票数设置颜色
            const bgColor = districtWinnerRankingManager.getDistrictWinnerColor(districtName, item.winner, item.winner_votes);
            const partyColor = getPartyColor(item.winner, 5);
            
            rankingItem.style.backgroundColor = bgColor;
            rankingItem.style.borderLeft = `4px solid ${partyColor}`;
            
            rankingItem.innerHTML = `
                <div class="ranking-number ${index < 3 ? 'top-3' : ''}">${index + 1}</div>
                <div class="ranking-info">
                    <div class="ranking-name">${item.region}</div>
                    <div class="ranking-district">
                        <span class="winner-party" style="color: ${partyColor};">${item.winner_name}</span>
                        <span class="winner-votes">${formatNumber(item.winner_votes)}票</span>
                    </div>
                </div>
                <div class="ranking-percentage">${item.winner_rate}%</div>
            `;
            
            rankingItem.addEventListener('click', () => {
                showDistrictWinnerDetail(item);
            });
            
            rankingList.appendChild(rankingItem);
        });
    }
}

// 显示地区内部获胜党详细数据
function showDistrictWinnerDetail(winnerData) {
    const regionDetail = document.getElementById('region-detail');
    
    if (regionDetail) {
        const detailHTML = `
            <div class="detail-content">
                <div class="detail-title">${winnerData.district} - ${winnerData.region} - 获胜党详情</div>
                <div class="detail-stats">
                    <div class="detail-stat">
                        <div class="detail-stat-value" style="color: ${getPartyColor(winnerData.winner, 5)};">
                            ${winnerData.winner_name}
                        </div>
                        <div class="detail-stat-label">获胜党派</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${formatNumber(winnerData.winner_votes)}</div>
                        <div class="detail-stat-label">获胜票数</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${winnerData.winner_rate}%</div>
                        <div class="detail-stat-label">获胜率</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${formatNumber(winnerData.total_votes)}</div>
                        <div class="detail-stat-label">总投票数</div>
                    </div>
                </div>
                <div class="winner-breakdown">
                    <h4>各党派得票详情</h4>
                    <div class="party-breakdown">
                        <div class="party-item kmt">
                            <span class="party-name">中国国民党</span>
                            <span class="party-votes">${formatNumber(winnerData.kmt_votes)}票 (${winnerData.kmt_rate}%)</span>
                        </div>
                        <div class="party-item dpp">
                            <span class="party-name">民主进步党</span>
                            <span class="party-votes">${formatNumber(winnerData.dpp_votes)}票 (${winnerData.dpp_rate}%)</span>
                        </div>
                        <div class="party-item tpp">
                            <span class="party-name">台湾民众党</span>
                            <span class="party-votes">${formatNumber(winnerData.tpp_votes)}票 (${winnerData.tpp_rate}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        regionDetail.innerHTML = detailHTML;
    }
}

// 更新地区内部统计
function updateDistrictWinnerStats(districtName) {
    const winnerData = districtWinnerRankingManager.calculateDistrictWinnerData(districtName);
    
    if (winnerData.length === 0) return;
    
    const totalVotes = winnerData.reduce((sum, item) => sum + item.total_votes, 0);
    const validVotes = totalVotes;
    const turnoutRate = '71.86%'; // 使用实际投票率
    
    const totalVotesElement = document.getElementById('total-votes');
    const validVotesElement = document.getElementById('valid-votes');
    const turnoutRateElement = document.getElementById('turnout-rate');
    
    if (totalVotesElement) {
        totalVotesElement.textContent = formatNumber(totalVotes);
    }
    if (validVotesElement) {
        validVotesElement.textContent = formatNumber(validVotes);
    }
    if (turnoutRateElement) {
        turnoutRateElement.textContent = turnoutRate;
    }
}

// 显示地区内部获胜党排行界面
function showDistrictWinnerRanking(districtName) {
    console.log(`🎯 显示地区内部获胜党排行: ${districtName}`);
    
    // 更新状态
    window.districtWinnerRankingState.currentDistrict = districtName;
    window.districtWinnerRankingState.currentView = 'district-ranking';
    
    // 显示加载状态
    showLoadingState(true);
    
    // 更新UI状态
    updateUIForDistrictRanking(districtName);
    
    // 生成排行
    generateDistrictWinnerRanking(districtName);
    
    // 更新统计
    updateDistrictWinnerStats(districtName);
    
    // 隐藏加载状态
    setTimeout(() => {
        showLoadingState(false);
    }, 500);
    
    console.log(`✅ 地区内部获胜党排行已显示: ${districtName}`);
}

// 更新UI状态为地区排行模式
function updateUIForDistrictRanking(districtName) {
    // 更新导航
    const mapNavigation = document.getElementById('map-navigation');
    if (mapNavigation) {
        mapNavigation.style.display = 'flex';
        const currentRegion = document.getElementById('current-region');
        if (currentRegion) {
            currentRegion.textContent = `${districtName} - 地区获胜党排行`;
        }
    }
    
    // 在获胜党票数排行模式下隐藏返回按钮
    const backToRegionBtn = document.getElementById('back-to-region-btn');
    if (backToRegionBtn) {
        if (window.currentParty === 'winner-ranking') {
            backToRegionBtn.style.display = 'none';
        } else {
            backToRegionBtn.style.display = 'block';
        }
    }
    
    // 隐藏图例
    const legendContainer = document.querySelector('.map-legend');
    if (legendContainer) {
        legendContainer.style.display = 'none';
    }
}

// 返回台湾地图视图
function returnToTaiwanView() {
    console.log('🎯 返回台湾地图视图');
    
    // 更新状态
    window.districtWinnerRankingState.currentView = 'taiwan';
    window.districtWinnerRankingState.currentDistrict = null;
    
    // 隐藏导航
    const mapNavigation = document.getElementById('map-navigation');
    if (mapNavigation) {
        mapNavigation.style.display = 'none';
    }
    
    // 隐藏返回按钮
    const backToRegionBtn = document.getElementById('back-to-region-btn');
    if (backToRegionBtn) {
        backToRegionBtn.style.display = 'none';
    }
    
    // 根据当前模式决定是否显示图例
    const legendContainer = document.querySelector('.map-legend');
    if (legendContainer) {
        // 如果是获胜党票数排行模式，隐藏图例
        if (window.currentParty === 'winner-ranking') {
            legendContainer.style.display = 'none';
        } else {
            legendContainer.style.display = 'block';
        }
    }
    
    // 恢复台湾地图排行
    generateWinnerRanking();
    updateMapForWinnerRanking();
    updateOverallStatsForWinnerRanking();
    
    console.log('✅ 已返回台湾地图视图');
}

// 初始化地区内部获胜党排行功能
function initializeDistrictWinnerRanking() {
    console.log('🎯 初始化地区内部获胜党排行功能');
    
    // 为台湾地图上的地区添加点击事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('region') && window.currentParty === 'winner-ranking') {
            const regionName = e.target.getAttribute('data-region');
            console.log(`🎯 点击地区: ${regionName}`);
            
            // 检查是否有该地区的内部数据
            const districtData = districtWinnerRankingManager.getDistrictData(regionName);
            if (districtData) {
                showDistrictWinnerRanking(regionName);
            } else {
                console.log(`⚠️ 地区 ${regionName} 暂无内部数据`);
            }
        }
    });
    
    // 初始化返回按钮（只在获胜党票数排行模式下）
    const backToRegionBtn = document.querySelector('.region-back-btn');
    if (backToRegionBtn) {
        // 移除可能存在的旧事件监听器
        backToRegionBtn.removeEventListener('click', returnToTaiwanView);
        // 添加新的事件监听器
        backToRegionBtn.addEventListener('click', function(e) {
            // 只在获胜党票数排行模式下处理点击事件
            if (window.currentParty === 'winner-ranking') {
                e.preventDefault();
                e.stopPropagation();
                returnToTaiwanView();
            }
        });
    }
    
    console.log('✅ 地区内部获胜党排行功能已初始化');
}

// 暴露函数到全局供其他模块使用
window.generateDistrictWinnerRanking = generateDistrictWinnerRanking;
window.updateDistrictWinnerStats = updateDistrictWinnerStats;
window.showDistrictWinnerRanking = showDistrictWinnerRanking;
window.returnToTaiwanView = returnToTaiwanView;
window.districtWinnerRankingManager = districtWinnerRankingManager;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 初始化地区内部获胜党排行功能');
    initializeDistrictWinnerRanking();
}); 