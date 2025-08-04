/**
 * 台湾22县市地区地图配置
 * 包含县市代码、数据文件映射等信息
 */

// 县市信息映射表
const districtMapping = {
    // 直辖市
    '台北市': { 
        code: '63000', 
        dataKey: 'taipeiRealData',
        dataFile: 'taipei-real-data.js',
        enabled: true 
    },
    '新北市': { 
        code: '65000', 
        dataKey: 'newtaipeiRealData',
        dataFile: 'newtaipei-real-data.js',
        recallDataKey: 'newtaipeiRecallData',
        enabled: true 
    },
    '桃园市': { 
        code: '68000', 
        dataKey: 'taoyuanRealData',
        dataFile: 'taoyuan-real-data.js',
        recallDataKey: 'taoyuanRecallData',
        enabled: true 
    },
    '台中市': { 
        code: '66000', 
        dataKey: 'taichungRealData',
        dataFile: 'taichung-real-data.js',
        recallDataKey: 'taichungRecallData',
        enabled: true 
    },
    '台南市': { 
        code: '67000', 
        dataKey: 'tainanRealData',
        dataFile: 'tainan-real-data.js',
        enabled: true 
    },
    '高雄市': { 
        code: '64000', 
        dataKey: 'kaohsiungRealData',
        dataFile: 'kaohsiung-real-data.js',
        enabled: true 
    },
    
    // 县
    '基隆市': { 
        code: '10017', 
        dataKey: 'keelungRealData',
        dataFile: 'keelung-real-data.js',
        recallDataKey: 'keelungRecallData',
        enabled: true 
    },
    '新竹市': { 
        code: '10018', 
        dataKey: 'hsinchuCityRealData',
        dataFile: 'hsinchu-city-real-data.js',
        recallDataKey: 'hsinchuCityRecallData',
        mayorRecallDataKey: 'hsinchuCityMayorRecallData',
        enabled: true 
    },
    '新竹县': { 
        code: '10004', 
        dataKey: 'hsinchuCountyRealData',
        dataFile: 'hsinchu-county-real-data.js',
        enabled: true 
    },
    '苗栗县': { 
        code: '10005', 
        dataKey: 'miaoliRealData',
        dataFile: 'miaoli-real-data.js',
        enabled: true 
    },
    '彰化县': { 
        code: '10007', 
        dataKey: 'changhuaRealData',
        dataFile: 'changhua-real-data.js',
        enabled: true 
    },
    '南投县': { 
        code: '10008', 
        dataKey: 'nantouRealData',
        dataFile: 'nantou-real-data.js',
        enabled: true
    },
    '云林县': { 
        code: '10009', 
        dataKey: 'yunlinRealData',
        dataFile: 'yunlinRecallData',
        enabled: true 
    },
    '嘉义市': { 
        code: '10020', 
        dataKey: 'chiayiCityRealData',
        dataFile: 'chiayi-city-real-data.js',
        enabled: true 
    },
    '嘉义县': { 
        code: '10010', 
        dataKey: 'chiayiCountyRealData',
        dataFile: 'chiayi-county-real-data.js',
        enabled: true 
    },
    '屏东县': { 
        code: '10013', 
        dataKey: 'pingtungRealData',
        dataFile: 'pingtung-real-data.js',
        enabled: true 
    },
    '宜兰县': { 
        code: '10002', 
        dataKey: 'yilanRealData',
        dataFile: 'yilan-real-data.js',
        enabled: true 
    },
    '花莲县': { 
        code: '10015', 
        dataKey: 'hualienRealData',
        dataFile: 'hualien-real-data.js',
        recallDataKey: 'hualienRecallData',
        enabled: true 
    },
    '台东县': { 
        code: '10014', 
        dataKey: 'taitungRealData',
        dataFile: 'taitung-real-data.js',
        recallDataKey: 'taitungRecallData',
        enabled: true 
    },
    '澎湖县': { 
        code: '10016', 
        dataKey: 'penghuRealData',
        dataFile: 'penghu-real-data.js',
        enabled: true 
    },
    '金门县': { 
        code: '09020', 
        dataKey: 'kinmenRealData',
        dataFile: 'kinmen-real-data.js',
        enabled: true 
    },
    '连江县': { 
        code: '09007', 
        dataKey: 'lienchiangRealData',
        dataFile: 'lienchiang-real-data.js',
        enabled: true 
    }
};

// 繁简体名称映射（处理可能的名称变体）
const regionNameVariants = {
    '臺北市': '台北市',
    '臺中市': '台中市',
    '臺南市': '台南市',
    '臺東縣': '台东县',
    '桃園市': '桃园市',
    '苗栗縣': '苗栗县',
    '彰化縣': '彰化县',
    '南投縣': '南投县',
    '雲林縣': '云林县',
    '嘉義市': '嘉义市',
    '嘉義縣': '嘉义县',
    '屏東縣': '屏东县',
    '宜蘭縣': '宜兰县',
    '花蓮縣': '花莲县',
    '臺東縣': '台东县',
    '澎湖縣': '澎湖县',
    '金門縣': '金门县',
    '連江縣': '连江县',
    '基隆市': '基隆市',
    '新竹市': '新竹市',
    '新竹縣': '新竹县',
    '苗栗縣': '苗栗县',
    '彰化縣': '彰化县',
    '南投縣': '南投县',
    '雲林縣': '云林县',
    // 可以根据需要添加更多变体
};

/**
 * 获取县市信息
 * @param {string} regionName - 地区名称
 * @returns {Object|null} 县市信息对象
 */
function getDistrictInfo(regionName) {
    // 标准化地区名称
    const normalizedName = regionNameVariants[regionName] || regionName;
    
    const info = districtMapping[normalizedName];
    if (info && info.enabled) {
        return {
            ...info,
            name: normalizedName
        };
    }
    
    return null;
}

/**
 * 检查是否支持该县市的详细地图
 * @param {string} regionName - 地区名称
 * @returns {boolean}
 */
function isDistrictSupported(regionName) {
    const info = getDistrictInfo(regionName);
    return info !== null;
}

/**
 * 获取所有已启用的县市列表
 * @returns {Array} 已启用的县市列表
 */
function getEnabledDistricts() {
    return Object.keys(districtMapping).filter(name => 
        districtMapping[name].enabled
    );
}

/**
 * 启用指定县市
 * @param {string} regionName - 地区名称
 */
function enableDistrict(regionName) {
    if (districtMapping[regionName]) {
        districtMapping[regionName].enabled = true;
        console.log(`✅ 已启用 ${regionName} 的详细地图功能`);
    }
}

/**
 * 批量启用县市
 * @param {Array} regionNames - 地区名称数组
 */
function enableDistricts(regionNames) {
    regionNames.forEach(name => enableDistrict(name));
}

// 导出到全局
window.districtMapping = districtMapping;
window.getDistrictInfo = getDistrictInfo;
window.isDistrictSupported = isDistrictSupported;
window.getEnabledDistricts = getEnabledDistricts;
window.enableDistrict = enableDistrict;
window.enableDistricts = enableDistricts;

console.log('🗺️ 县市配置模块加载完成');
console.log(`📊 当前已启用 ${getEnabledDistricts().length} 个县市:`, getEnabledDistricts()); 