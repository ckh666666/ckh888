// ===== 获胜党排行功能 =====

// 计算获胜党数据
function calculateWinnerData() {
    return electionData.map(region => {
        const { kmt_votes, dpp_votes, tpp_votes, region: regionName, total_votes } = region;
        const votes = [kmt_votes, dpp_votes, tpp_votes];
        const parties = ['kmt', 'dpp', 'tpp'];
        const partyNames = ['中国国民党', '民主进步党', '台湾民众党'];
        const maxIndex = votes.indexOf(Math.max(...votes));
        
        return {
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
}

// 获胜党配置 - 根据党派使用不同颜色
const winnerRankingConfig = {
    name: "获胜党排行",
    shortName: "RANKING",
    // 国民党蓝色系
    kmt_colors: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3"],
    // 民进党绿色系
    dpp_colors: ["#E8F5E8", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50"],
    // 民众党青绿色系
    tpp_colors: ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#00897B"],
    primary: "#9C27B0"
};

// 计算颜色分档
function calculateColorLevels() {
    const winnerData = calculateWinnerData();
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
}

// 根据票数和党派获取颜色
function getWinnerColor(winner, votes) {
    const colorLevels = calculateColorLevels();
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

// 生成获胜党排行
function generateWinnerRanking() {
    const winnerData = calculateWinnerData();
    
    // 按获胜党得票数排序
    const sortedData = winnerData.sort((a, b) => b.winner_votes - a.winner_votes);
    
    const rankingList = document.getElementById('ranking-list');
    const rankingTitle = document.getElementById('ranking-title');
    
    if (rankingTitle) {
        rankingTitle.innerHTML = '🏆 获胜党得票排行';
    }
    
    if (rankingList) {
        rankingList.innerHTML = '';
        
        sortedData.forEach((item, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = 'ranking-item winner-ranking-item';
            rankingItem.setAttribute('data-region', item.region);
            
            // 根据获胜党和得票数设置颜色
            const bgColor = getWinnerColor(item.winner, item.winner_votes);
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
                showWinnerDetail(item);
            });
            
            rankingList.appendChild(rankingItem);
        });
    }
}

// 显示获胜党详细数据
function showWinnerDetail(winnerData) {
    const regionDetail = document.getElementById('region-detail');
    
    if (regionDetail) {
        const detailHTML = `
            <div class="detail-content">
                <div class="detail-title">${winnerData.region} - 获胜党详情</div>
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

// 更新地图颜色为获胜党排行模式
function updateMapForWinnerRanking() {
    if (typeof d3 === 'undefined') {
        console.warn('D3.js未加载，无法更新地图颜色');
        return;
    }
    
    const winnerData = calculateWinnerData();
    
    // 更新地图颜色
    d3.selectAll('.region').each(function() {
        const regionName = d3.select(this).attr('data-region');
        console.log('地图地区名称:', regionName);
        
        // 尝试直接匹配
        let winnerInfo = winnerData.find(item => item.region === regionName);
        
        // 如果没找到，尝试通过regionNameMap查找
        if (!winnerInfo) {
            const simplifiedName = Object.keys(regionNameMap).find(key => regionNameMap[key] === regionName);
            if (simplifiedName) {
                winnerInfo = winnerData.find(item => item.region === simplifiedName);
            }
        }
        
        // 如果还是没找到，尝试反向映射
        if (!winnerInfo) {
            const traditionalName = regionNameMap[regionName];
            if (traditionalName) {
                winnerInfo = winnerData.find(item => item.region === traditionalName);
            }
        }
        
        if (winnerInfo) {
            const fillColor = getWinnerColor(winnerInfo.winner, winnerInfo.winner_votes);
            
            // 根据填充颜色设置边界颜色（与地区模式一致）
            let strokeColor = '#ffffff'; // 默认白色边界
            
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
            
            console.log(`地区: ${regionName}, 获胜党: ${winnerInfo.winner}, 得票数: ${winnerInfo.winner_votes}, 颜色: ${fillColor}, 边界: ${strokeColor}`);
            
            d3.select(this)
                .style('fill', fillColor)
                .style('stroke', strokeColor)
                .style('stroke-width', '2px')
                .style('cursor', 'pointer'); // 添加指针样式，表示可点击
        } else {
            console.warn(`未找到地区 ${regionName} 的获胜党数据`);
        }
    });
    
    // 隐藏图例
    hideLegendForWinnerRanking();
}

// 隐藏获胜党排行图例
function hideLegendForWinnerRanking() {
    const legendContainer = document.querySelector('.map-legend');
    if (legendContainer) {
        legendContainer.style.display = 'none';
    }
}

// 初始化获胜党排行功能
function initializeWinnerRanking() {
    // 添加事件监听器
    document.querySelectorAll('.party-btn[data-party="winner-ranking"]').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('🎯 点击获胜党排行按钮');
            
            // 移除其他按钮的active状态
            document.querySelectorAll('.party-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 隐藏获胜模式控制
            const winnerModeControls = document.getElementById('winner-mode-controls');
            if (winnerModeControls) {
                winnerModeControls.style.display = 'none';
            }
            
            // 更新当前党派
            currentParty = 'winner-ranking';
            window.currentParty = 'winner-ranking';
            
            // 生成排行
            generateWinnerRanking();
            
            // 检查当前是否在地区模式
            if (window.districtMapState && window.districtMapState.currentView === 'district') {
                console.log('🎯 当前在地区模式，调用地区地图更新函数');
                // 在地区模式下，调用地区地图更新函数
                if (window.updateDistrictMapColors) {
                    window.updateDistrictMapColors('winner-ranking');
                }
            } else {
                console.log('🎯 当前在全岛模式，调用全岛地图更新函数');
                // 在全岛模式下，调用全岛地图更新函数
                updateMapForWinnerRanking();
            }
            
            // 更新统计
            updateOverallStatsForWinnerRanking();
            
            // 隐藏返回按钮（获胜党票数排行模式下不显示返回按钮）
            if (window.hideBackToRegionButton) {
                window.hideBackToRegionButton();
            }
            
            console.log('✅ 获胜党排行功能已激活');
        });
    });
}

// 更新获胜党排行统计
function updateOverallStatsForWinnerRanking() {
    const winnerData = calculateWinnerData();
    
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 初始化获胜党排行功能');
    initializeWinnerRanking();
});

// 暴露函数到全局供其他模块使用
window.generateWinnerRanking = generateWinnerRanking;
window.updateMapForWinnerRanking = updateMapForWinnerRanking;
window.updateOverallStatsForWinnerRanking = updateOverallStatsForWinnerRanking;
window.hideLegendForWinnerRanking = hideLegendForWinnerRanking;
window.calculateWinnerData = calculateWinnerData;
window.getWinnerColor = getWinnerColor;

// 处理从获胜党票数排行模式切换出来的函数
window.exitWinnerRankingMode = function() {
    console.log('🔄 退出获胜党票数排行模式');
    
    // 恢复地图颜色为默认状态
    const regions = d3.select("#taiwan-map").selectAll('.region');
    regions
        .transition()
        .duration(500)
        .attr("fill", d => {
            const regionName = d.properties.name;
            // 使用默认的颜色获取函数
            return window.getRegionColor ? window.getRegionColor(regionName, window.currentParty || 'kmt') : '#f8f9fa';
        })
        .style('stroke', '#ffffff')
        .style('stroke-width', '0.5px')
        .style('cursor', 'default');
    
    // 显示图例
    const legendContainer = document.querySelector('.map-legend');
    if (legendContainer) {
        legendContainer.style.display = 'block';
    }
    
    // 隐藏返回按钮（退出获胜党票数排行模式时）
    if (window.hideBackToRegionButton) {
        window.hideBackToRegionButton();
    }
    
    console.log('✅ 获胜党票数排行模式已退出');
}; 