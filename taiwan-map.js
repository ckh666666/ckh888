// ===== 台湾地圖渲染模組 (D3.js) =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已载入，开始执行地圖绘制...');

    // 检查核心函式库是否载入成功
    if (typeof d3 === 'undefined' || typeof topojson === 'undefined') {
        // ... (错误处理部分保持不变) ...
        return;
    }
    console.log(`✅ 函式库载入成功 (D3.js 版本: ${d3.version})`);

    // 检查选举数据是否存在 - 临时跳过检查以便调试
    if (typeof electionData === 'undefined' || electionData.length === 0) {
        console.warn('⚠️ 选举数据未加载，使用模拟数据继续');
        // 创建模拟数据以便继续执行
        window.electionData = [];
        window.getRegionDetail = function(regionName) {
            return {
                kmt_rate: Math.random() * 0.5 + 0.2,
                dpp_rate: Math.random() * 0.5 + 0.2,
                tpp_rate: Math.random() * 0.3 + 0.1,
                winner: { name: '模拟政党' }
            };
        };
        window.getRegionColor = function(regionName, party) {
            const colors = ['#E6F3FF', '#CCE7FF', '#99D5FF', '#66C2FF', '#3399FF', '#0052CC'];
            return colors[Math.floor(Math.random() * colors.length)];
        };
    } else {
        console.log('✅ 选举数据已载入');
    }

    // --- 地圖主要渲染函式 ---
    async function renderTaiwanMap() {
        try {
            // 1. 设置SVG画布尺寸
            const width = 800;
            const height = 600;
            const svg = d3.select("#taiwan-map")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("viewBox", `0 0 ${width} ${height}`)
                .attr("preserveAspectRatio", "xMidYMid meet");
            
            svg.selectAll('*').remove();

            // 2. 异步加载 TopoJSON 地理数据
            const topology = await d3.json("./counties.json");
            const geoData = topojson.feature(topology, topology.objects.map);
            
            // 保存台湾地图数据供district-map使用
            window.taiwanMapData = { topology, geoData };
            
            geoData.features.forEach(feature => {
                const regionName = feature.properties.name;
                const data = window.getRegionDetail(regionName);
                if (data) {
                    feature.properties.electionData = data;
                }
            });

            // 4. 设置地圖投影
            const projection = d3.geoMercator()
                .fitExtent(
                    [[20, 20 - 40], [width - 20, height - 20 - 40]],
                    geoData
                );
            const path = d3.geoPath().projection(projection);

            // 5. 绑定数据并绘制地圖路径
            const mapGroup = svg.append("g");
            const regions = mapGroup.selectAll("path").data(geoData.features).enter().append("path")
                .attr("d", path)
                .attr("class", "region")
                .attr("data-region", d => d.properties.name)
                .attr("fill", d => window.getRegionColor(d.properties.name, window.currentParty || 'kmt'))
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 0.5);

            // 6. 添加交互事件
            console.log('🎯 开始绑定交互事件，地区数量:', regions.size());
            addInteractions(regions);
            console.log('✅ 交互事件绑定完成');
            
            // --- 添加缩放和拖动功能 ---
            function zoomed(event) {
                mapGroup.attr("transform", event.transform);
            }

            const zoom = d3.zoom()
            .scaleExtent([1, 8])
            // --- 【修改】现在只允许鼠标中键按下时触发平移 ---
            .filter(event => {
                // 只在事件类型为“鼠标按下”且按键为“中键”时，才启动手势
                return event.type === 'mousedown' && event.button === 1;
            })
            .on("start", function(event) {
                    // event.sourceEvent 是引发D3事件的原始浏览器事件（如mousedown）
                    // 调用preventDefault()可以阻止它的所有默认行为，包括页面滚动
                    if (event.sourceEvent) {
                        event.sourceEvent.preventDefault();
                    }
                })
                .on("zoom", zoomed);
            
            // 将缩放行为应用到SVG画布上
            svg.call(zoom);
            
            // 【移除】我们不再需要之前单独添加的 mousedown 监听器了
            // svg.on("mousedown", function(event) { ... });
            
            // 为缩放按钮添加点击事件
            d3.select("#zoom-in").on("click", function() {
                zoom.scaleBy(svg.transition().duration(250), 1.3);
            });

            d3.select("#zoom-out").on("click", function() {
                zoom.scaleBy(svg.transition().duration(250), 1 / 1.3);
            });
            
            svg.on("wheel.zoom", null);
            
            console.log("✅ 地圖渲染完成，页面滚动已禁用！");

        } catch (error) {
            console.error("❌ 渲染地圖时发生错误:", error);
            displayErrorOnMap(`地圖资料载入或渲染失败: ${error.message}`);
        }
    }

    // --- 添加交互事件的函式 ---
    function addInteractions(selection) {
        const tooltip = d3.select('#tooltip');

        selection
            .on('mouseover', function(event, d) {
                const regionName = d.properties.name;
                const detail = d.properties.electionData;
                const currentParty = window.currentParty || 'kmt';

                // 高亮当前区域 - 所有模式都保持边界显示
                d3.select(this)
                    .style('stroke', '#333')
                    .style('stroke-width', '2px')
                    .style('filter', 'brightness(0.9)');

                // 显示右侧详情面板
                if (window.showRegionDetail) {
                    window.showRegionDetail(regionName);
                }

                // 显示工具提示
                if (detail) {
                    const partyConfig = window.partyConfig || {}; // 确保partyConfig可用
                    const currentParty = window.currentParty || 'kmt';
                    
                    let tooltipContent = '';
                    
                    if (currentParty === 'recall') {
                        // 大罢免模式
                        const recallRegions = window.recallRegions || [];
                        const recallSeats = window.recallSeats || {};
                        const isRecallRegion = recallRegions.includes(regionName);
                        const seats = recallSeats[regionName] || 0;
                        
                        let color = '#9E9E9E';
                        if (isRecallRegion) {
                            if (seats >= 5) {
                                color = '#B71C1C';
                            } else if (seats >= 3) {
                                color = '#D32F2F';
                            } else if (seats >= 2) {
                                color = '#E53935';
                            } else {
                                color = '#F44336';
                            }
                        }
                        
                        tooltipContent = `
                            <div style="margin-bottom: 8px;">
                                <strong style="font-size: 1.1em;">${regionName}</strong>
                            </div>
                            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 0.9em;">
                                <strong style="color: ${color};">
                                    ${isRecallRegion ? `参与大罢免 (${seats}席)` : '不参与大罢免'}
                                </strong>
                            </div>
                        `;
                    } else {
                        // 普通选举模式
                        tooltipContent = `
                            <div style="margin-bottom: 8px;">
                                <strong style="font-size: 1.1em;">${regionName}</strong>
                            </div>
                            <div><span style="color: ${partyConfig.kmt?.primary};">国:</span> ${formatPercentage(detail.kmt_rate)}</div>
                            <div><span style="color: ${partyConfig.dpp?.primary};">民:</span> ${formatPercentage(detail.dpp_rate)}</div>
                            <div><span style="color: ${partyConfig.tpp?.primary};">众:</span> ${formatPercentage(detail.tpp_rate)}</div>
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
                const currentParty = window.currentParty || 'kmt';
                
                if (currentParty === 'winner-ranking') {
                    // 获胜党票数排行模式：重新调用地图更新函数来恢复所有地区的边界颜色
                    if (window.updateMapForWinnerRanking) {
                        window.updateMapForWinnerRanking();
                    }
                } else {
                    // 其他模式：恢复默认样式
                    d3.select(this)
                        .style('stroke', '#ffffff')
                        .style('stroke-width', '0.5px')
                        .style('filter', 'none');
                }
                
                // 隐藏工具提示
                tooltip.classed('show', false);
            })
            .on('click', function(event, d) {
                const regionName = d.properties.name;
                const currentParty = window.currentParty || 'kmt';
                console.log('🖱️ 点击地区:', regionName);
                console.log('🔍 地区名称字符详情:', regionName.split('').map(c => c + '(' + c.charCodeAt(0) + ')').join(' '));
                
                // 大罢免模式下的特殊处理
                if (currentParty === 'recall') {
                    console.log('🎯 大罢免模式：检查地区是否参与大罢免');
                    
                    // 检查该地区是否参与大罢免
                    const recallRegions = window.recallRegions || [];
                    const isParticipating = recallRegions.some(region => {
                        // 处理可能的繁简体差异
                        const normalizedRegion = region.replace(/臺/g, '台').replace(/縣/g, '县');
                        const normalizedRegionName = regionName.replace(/臺/g, '台').replace(/縣/g, '县');
                        return normalizedRegion === normalizedRegionName || region === regionName;
                    });
                    
                    if (!isParticipating) {
                        console.log('❌ 该地区不参与大罢免:', regionName);
                        
                        // 显示不参与大罢免的提示
                        showRecallNotParticipatingMessage(regionName);
                        return;
                    }
                    
                    console.log('✅ 该地区参与大罢免:', regionName);
                }
                
                // 使用新的通用检测逻辑
                const districtInfo = window.getDistrictInfo ? window.getDistrictInfo(regionName) : null;
                
                console.log('🔍 调试信息:', {
                    regionName,
                    hasGetDistrictInfo: !!window.getDistrictInfo,
                    districtInfo,
                    districtMapping: window.districtMapping ? Object.keys(window.districtMapping) : null
                });
                
                if (districtInfo) {
                    console.log('🗺️ 准备加载详细地图:', districtInfo);
                    console.log('🔍 检查loadDistrictMap函数:', typeof window.loadDistrictMap);
                    
                    if (window.loadDistrictMap) {
                        console.log('✅ 调用loadDistrictMap函数');
                        window.loadDistrictMap(districtInfo.name, districtInfo.code);
                    } else {
                        console.error('❌ loadDistrictMap函数未定义');
                        alert('loadDistrictMap函数未定义，请检查district-map.js是否正确加载');
                    }
                } else {
                    console.log('🎯 点击不支持详细地图的县市:', regionName);
                    
                    // 保持原有高亮功能
                    if (window.highlightRegion) {
                        window.highlightRegion(regionName);
                    }
                }
            });
    }

    // --- 在SVG上显示错误讯息的辅助函式 ---
    function displayErrorOnMap(message) {
        const svg = d3.select('#taiwan-map')
            .attr("width", "100%")
            .attr("height", "300px");
        
        svg.selectAll('*').remove();
        
        svg.append('text')
            .attr('x', '50%')
            .attr('y', '50%')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('fill', '#e53e3e')
            .style('font-size', '16px')
            .text(message);
    }
    
    // --- 显示不参与大罢免提示的辅助函式 ---
    function showRecallNotParticipatingMessage(regionName) {
        // 创建或获取提示容器
        let messageContainer = document.getElementById('recall-not-participating-message');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'recall-not-participating-message';
            messageContainer.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 20px 30px;
                border-radius: 10px;
                font-size: 16px;
                z-index: 10000;
                text-align: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                max-width: 300px;
            `;
            document.body.appendChild(messageContainer);
        }
        
        // 设置提示内容
        messageContainer.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong>${regionName}</strong>
            </div>
            <div style="color: #ffcdd2; font-size: 14px;">
                该地区不参与大罢免
            </div>
            <div style="margin-top: 15px;">
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #2196F3; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                    确定
                </button>
            </div>
        `;
        
        // 3秒后自动消失
        setTimeout(() => {
            if (messageContainer && messageContainer.parentElement) {
                messageContainer.remove();
            }
        }, 3000);
    }
    
    // --- 定义全局可呼叫的更新函式 ---
    window.updateMapColors = function(party) {
        d3.select("#taiwan-map").selectAll('.region')
            .transition()
            .duration(500)
            .attr("fill", d => {
                return window.getRegionColor(d.properties.name, party);
            });
    };
    
    window.highlightRegion = function(regionName) {
        const svg = d3.select("#taiwan-map");
        const mapGroup = svg.select("g");

        // 恢复所有地区样式
        mapGroup.selectAll('.region')
           .style('stroke', '#ffffff')
           .style('stroke-width', '0.5px');
        
        // 高亮指定地区
        mapGroup.selectAll('.region')
           .filter(d => d.properties.name === regionName)
           .style('stroke', '#ff6b6b')
           .style('stroke-width', '3px')
           .raise(); // 将高亮元素置于顶层
    };

    // --- 将renderTaiwanMap暴露到全局供district-map使用 ---
    window.renderTaiwanMap = renderTaiwanMap;
    
    // --- 将showRecallNotParticipatingMessage暴露到全局供其他模块使用 ---
    window.showRecallNotParticipatingMessage = showRecallNotParticipatingMessage;
    
    // --- 启动地圖渲染 ---
    renderTaiwanMap();
});