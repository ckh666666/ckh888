/**
 * 大罢免数据统一框架
 * 简化罢免数据的添加和管理
 */

// 全局罢免数据注册表
window.recallDataRegistry = {};

/**
 * 注册罢免数据
 * @param {string} districtName - 县市名称
 * @param {Object} recallData - 罢免数据对象
 * @param {Object} options - 配置选项
 */
window.registerRecallData = function(districtName, recallData, options = {}) {
    const config = {
        type: 'legislator', // 'legislator' 或 'mayor' 或 'both'
        color: '#D32F2F',   // 参与罢免的颜色
        inactiveColor: '#9E9E9E', // 不参与罢免的颜色
        legislators: options.legislators || [], // 立委信息列表
        ...options
    };
    
    window.recallDataRegistry[districtName] = {
        data: recallData,
        config: config
    };
    
    console.log(`✅ 已注册 ${districtName} 的罢免数据`);
};

/**
 * 获取罢免数据
 * @param {string} districtName - 县市名称
 * @param {string} regionName - 地区名称
 * @returns {Object|null} 罢免数据
 */
window.getRecallData = function(districtName, regionName) {
    const registry = window.recallDataRegistry[districtName];
    if (!registry) return null;
    
    return registry.data[regionName] || null;
};

/**
 * 检查地区是否参与罢免
 * @param {string} districtName - 县市名称
 * @param {string} regionName - 地区名称
 * @returns {boolean}
 */
window.isRecallRegion = function(districtName, regionName) {
    const recallData = window.getRecallData(districtName, regionName);
    return recallData && recallData.isRecall;
};

/**
 * 获取罢免配置
 * @param {string} districtName - 县市名称
 * @returns {Object|null} 配置对象
 */
window.getRecallConfig = function(districtName) {
    const registry = window.recallDataRegistry[districtName];
    return registry ? registry.config : null;
};

/**
 * 获取立委列表
 * @param {string} districtName - 县市名称
 * @returns {Array} 立委列表
 */
window.getRecallLegislators = function(districtName) {
    const config = window.getRecallConfig(districtName);
    return config ? config.legislators : [];
};

/**
 * 自动生成立委信息列表
 * @param {string} districtName - 县市名称
 * @param {Object} recallData - 罢免数据对象
 * @returns {Array} 立委信息列表
 */
window.generateLegislatorsFromData = function(districtName, recallData) {
    const legislators = [];
    const legislatorMap = new Map();
    
    // 遍历所有地区数据，按立委分组
    Object.keys(recallData).forEach(regionName => {
        const regionData = recallData[regionName];
        if (regionData && regionData.legislator && regionData.isRecall) {
            const legislatorName = regionData.legislator;
            
            if (!legislatorMap.has(legislatorName)) {
                legislatorMap.set(legislatorName, {
                    name: legislatorName,
                    party: regionData.party || '未知',
                    district: regionData.district || `${districtName}選舉區`,
                    regions: [],
                    total_agree: 0,
                    total_disagree: 0,
                    total_valid: 0,
                    total_voters: 0,
                    total_eligible: 0
                });
            }
            
            const legislator = legislatorMap.get(legislatorName);
            legislator.regions.push(regionName);
            legislator.total_agree += regionData.agree_votes || 0;
            legislator.total_disagree += regionData.disagree_votes || 0;
            legislator.total_valid += regionData.valid_votes || 0;
            legislator.total_voters += regionData.total_voters || 0;
            legislator.total_eligible += regionData.total_eligible || 0;
        }
    });
    
    // 计算每个立委的统计数据
    legislatorMap.forEach(legislator => {
        if (legislator.total_eligible > 0) {
            legislator.turnout_rate = (legislator.total_voters / legislator.total_eligible) * 100;
        } else {
            legislator.turnout_rate = 0;
        }
        
        if (legislator.total_valid > 0) {
            legislator.agree_rate = (legislator.total_agree / legislator.total_valid) * 100;
            legislator.disagree_rate = (legislator.total_disagree / legislator.total_valid) * 100;
        } else {
            legislator.agree_rate = 0;
            legislator.disagree_rate = 0;
        }
    });
    
    return Array.from(legislatorMap.values());
};

/**
 * 生成立委选择界面
 * @param {string} districtName - 县市名称
 * @returns {string} HTML内容
 */
window.generateLegislatorSelector = function(districtName) {
    const legislators = window.getRecallLegislators(districtName);
    if (!legislators || legislators.length === 0) {
        return '';
    }
    
    let html = `
        <div class="legislator-selector">
            <h4 style="margin-bottom: 15px; color: #333;">选择立委查看详细数据：</h4>
            <div class="legislator-list">
    `;
    
    legislators.forEach((legislator, index) => {
        const isActive = index === 0 ? 'active' : '';
        html += `
            <div class="legislator-item ${isActive}" data-legislator="${legislator.name}" data-district="${districtName}">
                <div class="legislator-header">
                    <div class="legislator-name">${legislator.name}</div>
                    <div class="legislator-party">${legislator.party} - ${legislator.district}</div>
                </div>
                <div class="legislator-stats">
                    <div class="stat-item">
                        <span class="stat-label">同意票率:</span>
                        <span class="stat-value" style="color: #D32F2F;">${legislator.agree_rate.toFixed(1)}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">投票率:</span>
                        <span class="stat-value" style="color: #1976D2;">${legislator.turnout_rate.toFixed(1)}%</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    return html;
};

/**
 * 生成总体情况面板
 * @param {string} districtName - 县市名称
 * @returns {string} HTML内容
 */
window.generateOverallRecallPanel = function(districtName) {
    const legislators = window.getRecallLegislators(districtName);
    if (!legislators || legislators.length === 0) {
        return '';
    }
    
    // 计算总体数据
    const totalStats = {
        total_agree: 0,
        total_disagree: 0,
        total_valid: 0,
        avg_turnout_rate: 0,
        avg_agree_rate: 0,
        legislator_count: legislators.length
    };
    
    legislators.forEach(legislator => {
        totalStats.total_agree += legislator.total_agree;
        totalStats.total_disagree += legislator.total_disagree;
        totalStats.total_valid += legislator.total_valid;
        totalStats.avg_turnout_rate += legislator.turnout_rate;
        totalStats.avg_agree_rate += legislator.agree_rate;
    });
    
    totalStats.avg_turnout_rate /= legislators.length;
    totalStats.avg_agree_rate /= legislators.length;
    
    return `
        <div class="overall-recall-panel">
            <h4 style="margin-bottom: 15px; color: #333; border-bottom: 2px solid #D32F2F; padding-bottom: 5px;">
                📊 ${districtName} 罢免总体情况
            </h4>
            <div class="overall-stats-grid">
                <div class="overall-stat-item">
                    <div class="stat-number" style="color: #D32F2F;">${totalStats.legislator_count}</div>
                    <div class="stat-label">参与罢免立委数</div>
                </div>
                <div class="overall-stat-item">
                    <div class="stat-number" style="color: #1976D2;">${totalStats.total_valid.toLocaleString()}</div>
                    <div class="stat-label">总有效票数</div>
                </div>
                <div class="overall-stat-item">
                    <div class="stat-number" style="color: #D32F2F;">${totalStats.total_agree.toLocaleString()}</div>
                    <div class="stat-label">总同意票数</div>
                </div>
                <div class="overall-stat-item">
                    <div class="stat-number" style="color: #F57C00;">${totalStats.total_disagree.toLocaleString()}</div>
                    <div class="stat-label">总不同意票数</div>
                </div>
                <div class="overall-stat-item">
                    <div class="stat-number" style="color: #D32F2F;">${totalStats.avg_agree_rate.toFixed(1)}%</div>
                    <div class="stat-label">平均同意票率</div>
                </div>
                <div class="overall-stat-item">
                    <div class="stat-number" style="color: #1976D2;">${totalStats.avg_turnout_rate.toFixed(1)}%</div>
                    <div class="stat-label">平均投票率</div>
                </div>
            </div>
        </div>
    `;
};

/**
 * 生成罢免投票率排行数据
 * @param {string} districtName - 县市名称
 * @param {string} sortBy - 排序方式: 'agree_rate', 'disagree_rate', 'turnout_rate'
 * @returns {Array} 排行数据数组
 */
window.generateRecallRanking = function(districtName, sortBy = 'agree_rate') {
    const registry = window.recallDataRegistry[districtName];
    if (!registry) return [];
    
    const ranking = [];
    
    Object.keys(registry.data).forEach(regionName => {
        const data = registry.data[regionName];
        if (data && data.isRecall && data.agree_votes !== undefined) {
            ranking.push({
                region: regionName,
                agree_votes: data.agree_votes,
                disagree_votes: data.disagree_votes,
                valid_votes: data.valid_votes,
                total_voters: data.total_voters,
                total_eligible: data.total_eligible,
                turnout_rate: data.turnout_rate,
                agree_rate: data.agree_rate,
                disagree_rate: data.disagree_rate,
                legislator: data.legislator,
                party: data.party,
                district: data.district
            });
        }
    });
    
    // 根据指定字段排序
    if (sortBy === 'agree_rate') {
        ranking.sort((a, b) => b.agree_rate - a.agree_rate);
    } else if (sortBy === 'disagree_rate') {
        ranking.sort((a, b) => b.disagree_rate - a.disagree_rate);
    } else if (sortBy === 'turnout_rate') {
        ranking.sort((a, b) => b.turnout_rate - a.turnout_rate);
    }
    
    return ranking;
};

/**
 * 生成罢免工具提示内容
 * @param {string} districtName - 县市名称
 * @param {string} regionName - 地区名称
 * @returns {string} HTML内容
 */
window.generateRecallTooltip = function(districtName, regionName) {
    const recallData = window.getRecallData(districtName, regionName);
    const config = window.getRecallConfig(districtName);
    
    if (!recallData || !config) {
        return `
            <div style="margin-bottom: 8px;">
                <strong style="font-size: 1.1em;">${regionName}</strong>
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 0.9em;">
                <strong style="color: #9E9E9E;">不参与大罢免</strong>
            </div>
        `;
    }
    
    if (recallData.isRecall) {
        let content = `
            <div style="margin-bottom: 8px;">
                <strong style="font-size: 1.1em;">${regionName}</strong>
            </div>
        `;
        
        // 检查是否有多个立委（重叠区域）
        const allRecallData = window.getAllRecallDataForRegion ? window.getAllRecallDataForRegion(districtName, regionName) : [];
        
        if (allRecallData.length > 1) {
            // 多立委选区
            content += `<div style="margin-top: 5px; font-size: 0.9em; color: #FF6F00;"><strong>多立委选区</strong></div>`;
            
            // 显示所有立委信息
            allRecallData.forEach((data, index) => {
                content += `
                    <div style="margin-top: 5px; font-size: 0.85em; border-left: 3px solid #D32F2F; padding-left: 8px;">
                        <div style="font-weight: bold; color: #B71C1C;">${data.legislator_name}</div>
                        <div>同意: ${data.agree_rate.toFixed(1)}% | 投票率: ${data.turnout_rate.toFixed(1)}%</div>
                    </div>
                `;
            });
        } else if (allRecallData.length === 1) {
            // 单个立委选区
            const data = allRecallData[0];
            content += `
                <div style="margin-top: 5px; font-size: 0.85em; border-left: 3px solid #D32F2F; padding-left: 8px;">
                    <div style="font-weight: bold; color: #B71C1C;">${data.legislator_name}</div>
                    <div>同意: ${data.agree_rate.toFixed(1)}% | 投票率: ${data.turnout_rate.toFixed(1)}%</div>
                </div>
            `;
        } else {
            // 如果没有找到重叠数据，显示单个立委信息
            if (recallData.agree_votes !== undefined) {
                content += `
                    <div style="margin-top: 5px; font-size: 0.85em; border-left: 3px solid #D32F2F; padding-left: 8px;">
                        <div style="font-weight: bold; color: #B71C1C;">${recallData.legislator}</div>
                        <div>同意: ${recallData.agree_rate.toFixed(1)}% | 投票率: ${recallData.turnout_rate.toFixed(1)}%</div>
                    </div>
                `;
            }
        }
        
        content += `
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 0.9em;">
                <strong style="color: ${config.color};">参与大罢免</strong>
            </div>
        `;
        
        if (recallData.mayor) {
            content += `
                <div style="margin-top: 5px; font-weight: bold; color: #FF6F00;">
                    ${recallData.mayor}
                </div>
                <small style="color: #666;">${recallData.party} 市長</small>
            `;
        }
        
        content += '</div>';
        return content;
    } else {
        return `
            <div style="margin-bottom: 8px;">
                <strong style="font-size: 1.1em;">${regionName}</strong>
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 0.9em;">
                <strong style="color: ${config.inactiveColor};">不参与大罢免</strong>
            </div>
        `;
    }
};

/**
 * 生成罢免详情面板内容
 * @param {string} districtName - 县市名称
 * @param {string} regionName - 地区名称
 * @returns {string} HTML内容
 */
window.generateRecallDetail = function(districtName, regionName) {
    const recallData = window.getRecallData(districtName, regionName);
    const config = window.getRecallConfig(districtName);
    
    if (!recallData || !config) {
        return `
            <div class="detail-content">
                <div class="detail-title">${regionName}</div>
                <div style="margin-top: 15px; padding: 15px; background: #F5F5F5; border-radius: 5px; text-align: center;">
                    <strong style="color: #9E9E9E; font-size: 1.1rem;">
                        不参与大罢免
                    </strong>
                    <br>
                    <small style="color: #666; margin-top: 5px; display: block;">
                        该地区未参与2025年7月26日大罢免投票
                    </small>
                </div>
            </div>
        `;
    }
    
    if (recallData.isRecall) {
        let content = `
            <div class="detail-content">
                <div class="detail-title">${regionName}</div>
        `;
        
        // 如果有投票数据，显示详细投票信息
        if (recallData.agree_votes !== undefined) {
            content += `
                <div style="margin-top: 15px; padding: 15px; background: #FFEBEE; border-radius: 5px;">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <strong style="color: ${config.color}; font-size: 1.1rem;">
                            参与大罢免
                        </strong>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                        <div style="text-align: center; padding: 10px; background: #E3F2FD; border-radius: 5px;">
                            <div style="font-size: 1.2rem; font-weight: bold; color: #1976D2;">
                                ${recallData.agree_votes.toLocaleString()}
                            </div>
                            <div style="font-size: 0.9rem; color: #666;">同意票</div>
                            <div style="font-size: 0.8rem; color: #1976D2; font-weight: bold;">
                                ${recallData.agree_rate.toFixed(1)}%
                            </div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: #FFF3E0; border-radius: 5px;">
                            <div style="font-size: 1.2rem; font-weight: bold; color: #F57C00;">
                                ${recallData.disagree_votes.toLocaleString()}
                            </div>
                            <div style="font-size: 0.9rem; color: #666;">不同意票</div>
                            <div style="font-size: 0.8rem; color: #F57C00; font-weight: bold;">
                                ${recallData.disagree_rate.toFixed(1)}%
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; padding: 10px; background: #E8F5E8; border-radius: 5px;">
                        <div style="font-size: 1.1rem; font-weight: bold; color: #388E3C;">
                            投票率: ${recallData.turnout_rate.toFixed(1)}%
                        </div>
                        <div style="font-size: 0.8rem; color: #666;">
                            有效票: ${recallData.valid_votes.toLocaleString()}票
                        </div>
                    </div>
                </div>
            `;
        } else {
            content += `
                <div style="margin-top: 15px; padding: 15px; background: #FFEBEE; border-radius: 5px; text-align: center;">
                    <strong style="color: ${config.color}; font-size: 1.1rem;">
                        参与大罢免
                    </strong>
            `;
        }
        
        if (recallData.legislator) {
            const legislatorName = recallData.legislator_display || recallData.legislator;
            const partyInfo = recallData.party_display || `${recallData.party} 立法委員`;
            const districtInfo = recallData.district ? ` - ${recallData.district}` : '';
            content += `
                <br>
                <div style="margin-top: 10px; font-size: 1.2rem; font-weight: bold; color: #B71C1C;">
                    ${legislatorName}
                </div>
                <small style="color: #666; margin-top: 5px; display: block;">
                    ${partyInfo}${districtInfo}
                </small>
            `;
        }
        
        if (recallData.mayor) {
            content += `
                <div style="margin-top: 10px; font-size: 1.2rem; font-weight: bold; color: #FF6F00;">
                    ${recallData.mayor}
                </div>
                <small style="color: #666; margin-top: 5px; display: block;">
                    ${recallData.party} 市長
                </small>
            `;
        }
        
        content += '</div></div>';
        return content;
    } else {
        return `
            <div class="detail-content">
                <div class="detail-title">${regionName}</div>
                <div style="margin-top: 15px; padding: 15px; background: #F5F5F5; border-radius: 5px; text-align: center;">
                    <strong style="color: ${config.inactiveColor}; font-size: 1.1rem;">
                        不参与大罢免
                    </strong>
                    <br>
                    <small style="color: #666; margin-top: 5px; display: block;">
                        该地区未参与2025年7月26日大罢免投票
                    </small>
                </div>
            </div>
        `;
    }
};

/**
 * 获取罢免颜色
 * @param {string} districtName - 县市名称
 * @param {string} regionName - 地区名称
 * @returns {string} 颜色代码
 */
window.getRecallColor = function(districtName, regionName) {
    const config = window.getRecallConfig(districtName);
    if (!config) return '#f8f9fa';
    
    const isRecall = window.isRecallRegion(districtName, regionName);
    return isRecall ? config.color : config.inactiveColor;
};

console.log('✅ 大罢免数据框架已加载'); 