const nameGenerator = {
    advancedCharacterPool: {
        surnames: ['李', '张', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴', '海', '徐', '孟', '唐', '方'],
        characterTraits: {
            '活泼开朗': ['乐', '快', '悦', '欣', '欢', '笑', '畅', '朗', '明', '亮', '灿', '晴'],
            '温柔文静': ['柔', '静', '婉', '娴', '宁', '和', '雅', '淑', '温', '顺'],
            '聪明伶俐': ['慧', '颖', '睿', '聪', '悟', '明', '智', '敏', '捷', '锐'],
            '坚强勇敢': ['坚', '勇', '毅', '强', '壮', '刚', '毅', '勇', '猛', '烈'],
            '稳重踏实': ['稳', '重', '厚', '诚', '实', '厚', '朴', '稳', '踏', '扎'],
            '独立自主': ['立', '主', '自', '独', '行', '远', '达', '志', '坚', '定'],
            '乐观向上': ['欣', '乐', '朗', '旭', '阳', '晴', '光', '明', '进', '取'],
            '内敛含蓄': ['含', '谦', '默', '隐', '深', '沉', '敛', '蓄', '静', '远'],
            '富有同情心': ['慈', '善', '爱', '怜', '惠', '仁', '恻', '隐', '同', '情'],
            '富有创造力': ['创', '新', '奇', '构', '设', '想', '意', '巧', '妙', '新'],
            '思维敏捷': ['敏', '慧', '智', '捷', '思', '锐', '明', '悟', '巧', '精'],
            '热爱和平': ['和', '平', '静', '宁', '安', '祥', '康', '乐', '祥', '瑞'],
            '有领导力': ['领', '导', '望', '先', '峰', '志', '远', '大', '卓', '越'],
            '富有好奇心': ['奇', '妙', '探', '搜', '寻', '新', '异', '趣', '求', '知'],
            '意志坚定': ['志', '定', '毅', '坚', '决', '果', '敢', '担', '当', '真'],
            '热爱自由': ['翔', '飞', '逸', '放', '游', '远', '广', '阔', '开', '朗'],
            '有艺术天赋': ['艺', '美', '韵', '雅', '秀', '妙', '巧', '灵', '丽', '慧'],
            '内敛而深沉': ['深', '沉', '厚', '重', '远', '静', '谦', '敛', '蓄', '沉'],
            '富有洞察力': ['洞', '察', '明', '睿', '智', '观', '微', '知', '悟', '透'],
            '有探索精神': ['探', '索', '求', '究', '研', '新', '奇', '妙', '知', '识']
        },
        interestChars: {
            '绘画': ['彩', '墨', '画', '艺', '色', '美', '妙', '灵', '趣', '匠'],
            '音乐': ['音', '韵', '乐', '和', '律', '悦', '调', '和', '丽', '雅'],
            '运动': ['力', '动', '跃', '健', '速', '勇', '猛', '飞', '越', '强'],
            '科技': ['智', '科', '新', '创', '研', '探', '索', '明', '锐', '进'],
            '旅行': ['行', '游', '远', '路', '迹', '游', '历', '览', '阔', '野'],
            '文学': ['文', '学', '墨', '章', '句', '思', '韵', '妙', '言', '辞'],
            '艺术': ['艺', '美', '韵', '雅', '天', '灵', '巧', '妙', '创', '新']
        },
        culturalFactors: {
            familyTradition: {
                '航海': ['海', '洋', '航', '舟', '帆'],
                '军事': ['武', '军', '威', '战', '卫'],
                '学术': ['文', '学', '士', '博', '儒']
            },
            soundPatterns: {
                harmonious: ['伟', '娜', '丽', '华', '明'],
                balanced: ['平', '安', '泰', '和', '顺']
            },
            characterStructure: {
                simple: ['一', '丁', '山', '川', '天'],
                symmetrical: ['晨', '林', '炎', '鑫', '淼']
            },
            modernTrends: {
                popular: ['子涵', '雨桐', '梓轩', '浩然', '语嫣'],
                international: ['丹', '安', '明', '华', '林']
            },
            religiousAssociations: {
                buddhist: ['悟', '禅', '净', '慈', '法'],
                taoist: ['道', '玄', '清', '云', '真']
            },
            regionalFeatures: {
                northern: ['冰', '雪', '松', '岩', '北'],
                southern: ['江', '湖', '莲', '竹', '南']
            }
        }
    },

    generateChineseName(originalName, personalityTraits, familyBackground, interests, culturePref) {
        const strategies = {
            '传统': this.generateTraditionalName,
            '现代': this.generateModernName,
            '融合': this.generateFusionName
        };

        const nameGenerationStrategy = strategies[culturePref] || this.generateFusionName;
        return nameGenerationStrategy.call(this, originalName, personalityTraits, familyBackground, interests);
    },

    generateTraditionalName(originalName, personalityTraits, familyBackground, interests) {
        const surname = this.selectTraditionalSurname(familyBackground);
        const givenName = this.createTraditionalGivenName(personalityTraits, interests);
        
        return this.createNameResult(surname, givenName);
    },

    generateModernName(originalName, personalityTraits, familyBackground, interests) {
        const surname = this.selectModernSurname(familyBackground);
        const givenName = this.createModernGivenName(personalityTraits, interests);
        
        return this.createNameResult(surname, givenName);
    },

    generateFusionName(originalName, personalityTraits, familyBackground, interests) {
        const surname = this.selectFusionSurname(familyBackground);
        const givenName = this.createFusionGivenName(personalityTraits, interests);
        
        return this.createNameResult(surname, givenName);
    },

    selectTraditionalSurname(familyBackground) {
        const traditionalSurnameMap = {
            '航海': '海', 
            '军事': '武', 
            '学术': '学'
        };
        
        for (let [key, value] of Object.entries(traditionalSurnameMap)) {
            if (familyBackground.includes(key)) return value;
        }
        
        return this.advancedCharacterPool.surnames[
            Math.floor(Math.random() * this.advancedCharacterPool.surnames.length)
        ];
    },

    createTraditionalGivenName(personalityTraits, interests) {
        const traitChars = personalityTraits.flatMap(trait => 
            this.advancedCharacterPool.characterTraits[trait] || []
        );
        
        const interestChars = interests.flatMap(interest => 
            this.advancedCharacterPool.interestChars[interest] || []
        );
        
        const combinedChars = [...new Set([...traitChars, ...interestChars])];
        
        if (combinedChars.length === 0) {
            return '明' + '轩';
        }

        return combinedChars[Math.floor(Math.random() * combinedChars.length)] +
               combinedChars[Math.floor(Math.random() * combinedChars.length)];
    },

    createNameResult(surname, givenName) {
        return {
            fullName: `${surname}${givenName}`,
            surname: surname,
            givenName: givenName,
            styles: {
                '传统风格': `${surname}${givenName}`,
                '现代风格': `${surname}·${givenName}`,
                '优雅风格': `${surname}${givenName.split('').join('·')}`
            }
        };
    },

    selectModernSurname: function(familyBackground) { 
        return this.selectTraditionalSurname(familyBackground); 
    },
    
    createModernGivenName: function(personalityTraits, interests) { 
        return this.createTraditionalGivenName(personalityTraits, interests); 
    },
    
    selectFusionSurname: function(familyBackground) { 
        return this.selectTraditionalSurname(familyBackground); 
    },
    
    createFusionGivenName: function(personalityTraits, interests) { 
        return this.createTraditionalGivenName(personalityTraits, interests); 
    },

    suggestCombinations: function(personalityTraits, interests) {
        const suggestions = [];
        const traitChars = personalityTraits.flatMap(trait => 
            this.advancedCharacterPool.characterTraits[trait] || []
        );
        const interestChars = interests.flatMap(interest => 
            this.advancedCharacterPool.interestChars[interest] || []
        );

        for (let i = 0; i < Math.min(3, traitChars.length); i++) {
            for (let j = 0; j < Math.min(3, interestChars.length); j++) {
                suggestions.push({
                    combination: `${traitChars[i]}${interestChars[j]}`,
                    meaning: {
                        first: `${traitChars[i]} - represents ${personalityTraits[0]}`,
                        second: `${interestChars[j]} - inspired by ${interests[0]}`
                    }
                });
            }
        }

        return suggestions;
    },

    getPronunciation: function(characters) {
        const pinyinMap = {
            '李': 'Lǐ', '张': 'Zhāng', '王': 'Wáng', '刘': 'Liú',
            '乐': 'Lè', '慧': 'Huì', '明': 'Míng', '华': 'Huá',
            // Add more mappings as needed
        };
        
        return Array.from(characters).map(char => pinyinMap[char] || char).join(' ');
    },

    getNameVariations: function(surname, givenName) {
        return {
            formal: `${surname}${givenName}`,
            casual: givenName,
            westernOrder: `${givenName} ${surname}`,
            pinyinFull: `${this.getPronunciation(surname)}${this.getPronunciation(givenName)}`,
            stylized: `${surname}·${givenName}`
        };
    },

    generateCulturalInsights(name) {
        const culturalFactors = [
            {
                category: '文化含义 Cultural Meaning',
                description: this.analyzeCulturalMeaning(name)
            },
            {
                category: '音韵分析 Sound Analysis',
                description: this.analyzeSoundHarmony(name)
            },
            {
                category: '历史背景 Historical Context',
                description: this.exploreHistoricalContext(name)
            }
        ];

        return culturalFactors;
    },

    analyzeCulturalMeaning(name) {
        const meanings = {
            '慧': '智慧，通常体现学识和聪明才智',
            '勇': '勇气，体现坚强和无畏',
            '宁': '宁静，代表内心的平和与安宁'
        };

        const significantChars = Array.from(name).filter(char => meanings[char]);
        return significantChars.map(char => `${char}: ${meanings[char]}`).join('; ');
    },

    analyzeSoundHarmony(name) {
        const tones = {
            '1': '阴平',
            '2': '阳平',
            '3': '上声',
            '4': '去声'
        };

        return `名字音律平衡性分析：需要更复杂的语音算法`;
    },

    exploreHistoricalContext(name) {
        const historicalContexts = {
            '宝': '源于古代文学作品，常见于《红楼梦》等经典',
            '玉': '象征高尚品质，在中国文化中极其重要',
            '国': '反映爱国主义和民族认同感'
        };

        const historicalChars = Array.from(name).filter(char => historicalContexts[char]);
        return historicalChars.map(char => `${char}: ${historicalContexts[char]}`).join('; ');
    },

    suggestNameVariations(name, personalityTraits) {
        const variations = [
            {
                style: '传统风格 Traditional',
                format: name
            },
            {
                style: '现代风格 Modern',
                format: name.split('').join('·')
            },
            {
                style: '优雅风格 Elegant',
                format: `「${name}」`
            }
        ];

        const personalityModifiers = {
            '智慧': '智',
            '勇敢': '勇',
            '温和': '宁',
            '创新': '新'
        };

        const personalityAdditions = personalityTraits
            .map(trait => personalityModifiers[trait])
            .filter(Boolean);

        if (personalityAdditions.length) {
            variations.push({
                style: '个性变体 Personality Variant',
                format: `${name}${personalityAdditions.join('')}`
            });
        }

        return variations;
    }
};

function displayChineseName() {
    const originalName = '需要在这里传入原始英文名';
    const personalityTraits = ['活泼开朗', '智慧'];
    const familyBackground = '家族背景信息';
    const interests = ['绘画', '音乐'];
    const culturePref = '传统';
    
    const result = nameGenerator.generateChineseName(originalName, personalityTraits, familyBackground, interests, culturePref);
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>生成的中文名</h2>
        <p><strong>完整名字:</strong> ${result.fullName}</p>
        <p><strong>姓氏:</strong> ${result.surname}</p>
        <p><strong>名字:</strong> ${result.givenName}</p>
        <h3>不同风格的名字</h3>
        <ul>
            ${Object.entries(result.styles).map(([style, name]) => 
                `<li><strong>${style}:</strong> ${name}</li>`
            ).join('')}
        </ul>
        <h3>名字的发音</h3>
        <p><strong>姓氏:</strong> ${nameGenerator.getPronunciation(result.surname)}</p>
        <p><strong>名字:</strong> ${nameGenerator.getPronunciation(result.givenName)}</p>
        <h3>名字的变体</h3>
        <ul>
            ${Object.entries(nameGenerator.getNameVariations(result.surname, result.givenName)).map(([style, name]) => 
                `<li><strong>${style}:</strong> ${name}</li>`
            ).join('')}
        </ul>
        <h3>名字的组合</h3>
        <ul>
            ${nameGenerator.suggestCombinations(personalityTraits, interests).map(suggestion => 
                `<li><strong>组合:</strong> ${suggestion.combination}, 
                <strong>含义:</strong> ${suggestion.meaning.first}, ${suggestion.meaning.second}</li>`
            ).join('')}
        </ul>
        <h3>文化见解</h3>
        <ul>
            ${nameGenerator.generateCulturalInsights(result.fullName).map(factor => 
                `<li><strong>${factor.category}:</strong> ${factor.description}</li>`
            ).join('')}
        </ul>
        <h3>名字变体</h3>
        <ul>
            ${nameGenerator.suggestNameVariations(result.fullName, personalityTraits).map(variation => 
                `<li><strong>${variation.style}:</strong> ${variation.format}</li>`
            ).join('')}
        </ul>
    `;
}

window.onload = displayChineseName;

export default nameGenerator;