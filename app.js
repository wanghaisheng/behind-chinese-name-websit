// Main application class for managing name analysis
class NameAnalysisManager {
  constructor() {
    this.initializeComponents();
    this.bindEvents();
  }

  async initializeComponents() {
    // Initialize core analysis engines with enhanced capabilities
    this.linguisticAnalyzer = new LinguisticAnalysisEngine();
    this.culturalAnalyzer = new CulturalContextAnalysisEngine();
    this.semanticAnalyzer = new SemanticAnalysisEngine(); 
    this.modernAnalyzer = new ModernContextAnalysisEngine();

    // Initialize visualization components with improved rendering
    this.visualizer = new AdvancedVisualizationManager();
    this.recommendationEngine = new AIRecommendationEngine();
    this.meaningNetwork = new NameMeaningNetwork();

    // Initialize advanced components
    this.characterExplorer = new CharacterExplorer();
    this.strokeOrderComponent = new StrokeOrderComponent();
    
    await this.loadInitialData();
  }

  async loadInitialData() {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate initial analysis parameters for Chinese name analysis.
          
          interface InitialData {
            linguistic_parameters: {
              tone_patterns: string[];
              stroke_thresholds: number[];
              harmony_weights: Record<string, number>;
            };
            cultural_contexts: {
              historical_periods: string[];
              regional_styles: string[];
              modern_trends: string[];
            };
            semantic_categories: {
              meaning_types: string[];
              relationship_types: string[];
              usage_contexts: string[];
            };
          }
          
          Example response:
          {
            "linguistic_parameters": {
              "tone_patterns": ["平平", "平仄", "仄平", "仄仄"],
              "stroke_thresholds": [8, 15, 25],
              "harmony_weights": {
                "tone_balance": 0.4,
                "visual_balance": 0.3,
                "stroke_complexity": 0.3
              }
            },
            "cultural_contexts": {
              "historical_periods": ["古代", "近代", "现代"],
              "regional_styles": ["北方", "南方", "江浙"],
              "modern_trends": ["简约", "国际化", "传统复兴"]
            },
            "semantic_categories": {
              "meaning_types": ["品德", "自然", "理想", "文化"],
              "relationship_types": ["同义", "反义", "相关"],
              "usage_contexts": ["正式", "日常", "艺术"]
            }
          }`
        })
      });

      this.analysisParameters = await response.json();
      this.initializeAnalysisModules();
    } catch (error) {
      console.error('Error loading initial data:', error);
      this.analysisParameters = this.getDefaultParameters();
    }
  }

  getDefaultParameters() {
    return {
      linguistic_parameters: {
        tone_patterns: ["平平", "平仄", "仄平", "仄仄"],
        stroke_thresholds: [8, 15, 25],
        harmony_weights: {
          "tone_balance": 0.4,
          "visual_balance": 0.3,
          "stroke_complexity": 0.3
        }
      },
      cultural_contexts: {
        historical_periods: ["古代", "近代", "现代"],
        regional_styles: ["北方", "南方", "江浙"],
        modern_trends: ["简约", "国际化", "传统复兴"]
      },
      semantic_categories: {
        meaning_types: ["品德", "自然", "理想", "文化"],
        relationship_types: ["同义", "反义", "相关"],
        usage_contexts: ["正式", "日常", "艺术"]
      }
    };
  }

  initializeAnalysisModules() {
    // Initialize analysis modules with loaded parameters
    this.visualizer.initializeWithParameters(this.analysisParameters);
    this.meaningNetwork.initialize(this.analysisParameters.semantic_categories);
    this.characterExplorer.setParameters(this.analysisParameters);
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    // Stroke order controls
    document.querySelectorAll('.stroke-control-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleStrokeControl(e));
    });

    // Listen for name generation events
    document.addEventListener('nameGenerated', event => {
      this.updateAnalysis(event.detail.name);
    });
  }

  async updateAnalysis(name) {
    try {
      const [linguistic, cultural, semantic, modern] = await Promise.all([
        this.linguisticAnalyzer.advancedLinguisticAnalysis(name),
        this.culturalAnalyzer.comprehensiveCulturalAnalysis(name),
        this.semanticAnalyzer.deepSemanticAnalysis(name),
        this.modernAnalyzer.analyzeModernContext(name)
      ]);

      const recommendations = await this.recommendationEngine.generateRecommendations({
        name,
        linguistic,
        cultural,
        semantic,
        modern
      });

      this.updateDisplays({
        name_suggestions: {
          古典风格: { names: ["名1:解释1", "名2:解释2"] },
          现代风格: { names: ["名3:解释3", "名4:解释4"] },
          创意风格: { names: ["名5:解释5", "名6:解释6"] }
        },
        surname_options: ["姓1", "姓2"],
        注意事项: {
          key1: "value1",
          key2: "value2"
        },
        analysis: {
          音韵分析: {
            声母: {
              分析结果: {
                姓声母: { 声母: "声母1" },
                名声母: [{ 声母: "声母2" }]
              }
            },
            韵母: {
              分析结果: {
                姓韵母: { 韵母: "韵母1" },
                名韵母: [{ 韵母: "韵母2" }]
              }
            },
            声调: {
              分析结果: {
                姓声调: { 声调: "声调1" },
                名声调: [{ 声调: "声调2" }]
              }
            },
            音节流畅性: {
              分析结果: "流畅性1"
            }
          },
          笔画分析: {
            姓笔画数: {
              分析结果: {
                笔画数: 10
              }
            },
            名笔画数: {
              分析结果: [{ 笔画数: 15 }]
            },
            书写难易度: {
              分析结果: "难易度1"
            }
          },
          文化内涵: {
            文化寓意: {
              分析结果: [
                { 字: "字1", 寓意: "寓意1" },
                { 字: "字2", 寓意: "寓意2" }
              ]
            },
            典故引用: {
              分析结果: [
                { 字: "字3", 典故: "典故1" },
                { 字: "字4", 典故: "典故2" }
              ]
            }
          },
          性格特征分析: {
            分析结果: "性格特征1"
          },
          常见错误检查: {
            分析结果: {
              错误1: null,
              错误2: true
            }
          },
          其他建议: {
            五行八字: {
              分析结果: "五行八字1"
            },
            国际化考虑: {
              分析结果: "国际化考虑1"
            }
          },
          综合评价: {
            分析结果: "综合评价1"
          }
        },
        recommendations
      });
    } catch (error) {
      console.error('Analysis update error:', error);
      this.showError('Failed to update analysis');
    }
  }

  updateDisplays(data) {
    // Update name options in the result section
    const nameOptionsContainer = document.querySelector('.name-options');
    if (nameOptionsContainer && data.name_suggestions) {
      // Update classical names
      const classicalContainer = nameOptionsContainer.querySelector('.classical-names .names-grid');
      if (classicalContainer && data.name_suggestions.古典风格) {
        classicalContainer.innerHTML = data.name_suggestions.古典风格.names.map(name => {
          const [fullName, explanation] = name.split(':');
          return `
            <div class="name-option">
              <div class="name-characters">${fullName}</div>
              <div class="name-explanation">${explanation}</div>
            </div>
          `;
        }).join('');
      }

      // Update modern names
      const modernContainer = nameOptionsContainer.querySelector('.modern-names .names-grid');
      if (modernContainer && data.name_suggestions.现代风格) {
        modernContainer.innerHTML = data.name_suggestions.现代风格.names.map(name => {
          const [fullName, explanation] = name.split(':');
          return `
            <div class="name-option">
              <div class="name-characters">${fullName}</div>
              <div class="name-explanation">${explanation}</div>
            </div>
          `;
        }).join('');
      }

      // Update creative names
      const creativeContainer = nameOptionsContainer.querySelector('.creative-names .names-grid');
      if (creativeContainer && data.name_suggestions.创意风格) {
        creativeContainer.innerHTML = data.name_suggestions.创意风格.names.map(name => {
          const [fullName, explanation] = name.split(':');
          return `
            <div class="name-option">
              <div class="name-characters">${fullName}</div>
              <div class="name-explanation">${explanation}</div>
            </div>
          `;
        }).join('');
      }
    }

    // Update surname options
    const surnameContainer = document.querySelector('.surname-options');
    if (surnameContainer && data.surname_options) {
      surnameContainer.innerHTML = data.surname_options.map(option => `
        <div class="surname-option">
          <div class="surname-detail">${option}</div>
        </div>
      `).join('');
    }

    // Update cultural considerations
    const considerationsContainer = document.querySelector('.considerations-list');
    if (considerationsContainer && data.注意事项) {
      considerationsContainer.innerHTML = Object.entries(data.注意事项).map(([key, value]) => `
        <div class="consideration-item">
          <h5>${key}</h5>
          <p>${value}</p>
        </div>
      `).join('');
    }

    // Update analysis section with detailed analysis data
    if (data.analysis) {
      // Update linguistic analysis
      document.getElementById('initials').textContent = `姓：${data.analysis.音韵分析.声母.分析结果.姓声母.声母}, 名：${data.analysis.音韵分析.声母.分析结果.名声母[0].声母}`;
      document.getElementById('finals').textContent = `姓：${data.analysis.音韵分析.韵母.分析结果.姓韵母.韵母}, 名：${data.analysis.音韵分析.韵母.分析结果.名韵母[0].韵母}`;
      document.getElementById('tones').textContent = `姓：${data.analysis.音韵分析.声调.分析结果.姓声调.声调}声, 名：${data.analysis.音韵分析.声调.分析结果.名声调[0].声调}声`;
      document.getElementById('flow-analysis').textContent = data.analysis.音韵分析.音节流畅性.分析结果;

      // Update stroke analysis
      document.getElementById('surname-strokes').textContent = `${data.analysis.笔画分析.姓笔画数.分析结果.笔画数}画`;
      document.getElementById('given-name-strokes').textContent = `${data.analysis.笔画分析.名笔画数.分析结果[0].笔画数}画`;
      document.getElementById('writing-complexity').textContent = data.analysis.笔画分析.书写难易度.分析结果;

      // Update cultural analysis
      if (data.analysis.文化内涵) {
        const culturalMeanings = document.getElementById('cultural-meanings');
        culturalMeanings.innerHTML = data.analysis.文化内涵.文化寓意.分析结果.map(char => `
          <div class="meaning-item">
            <h4>"${char.字}"的寓意</h4>
            <p>${char.寓意}</p>
          </div>
        `).join('');

        const historicalReferences = document.getElementById('historical-references');
        historicalReferences.innerHTML = data.analysis.文化内涵.典故引用.分析结果.map(ref => `
          <div class="reference-item">
            <h4>"${ref.字}"的典故</h4>
            <p>${ref.典故}</p>
          </div>
        `).join('');
      }

      // Update character traits
      document.getElementById('character-traits').textContent = data.analysis.性格特征分析.分析结果;

      // Update error checks
      const errorList = document.getElementById('error-checks');
      errorList.innerHTML = Object.entries(data.analysis.常见错误检查.分析结果).map(([error, status]) => `
        <li class="check-item ${status === null ? 'no-error' : 'has-error'}">
          <i class="fas fa-${status === null ? 'check' : 'times'}-circle"></i>
          <span>${error}</span>
        </li>
      `).join('');

      // Update other recommendations
      document.getElementById('five-elements').textContent = data.analysis.其他建议.五行八字.分析结果;
      document.getElementById('international-considerations').textContent = data.analysis.其他建议.国际化考虑.分析结果;

      // Update overall assessment
      document.getElementById('overall-assessment').textContent = data.analysis.综合评价.分析结果;
    }
  }

  switchTab(tabId) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });

    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');

    // Load tab-specific content
    this.loadTabContent(tabId);
  }

  async loadTabContent(tabId) {
    const contentLoaders = {
      linguistic: () => this.loadLinguisticContent(),
      cultural: () => this.loadCulturalContent(),
      semantic: () => this.loadSemanticContent(),
      visual: () => this.loadVisualContent()
    };

    const loader = contentLoaders[tabId];
    if (loader) await loader();
  }

  loadLinguisticContent() {
    // Add implementation for loading linguistic content
  }

  loadCulturalContent() {
    // Add implementation for loading cultural content
  }

  loadSemanticContent() {
    // Add implementation for loading semantic content
  }

  loadVisualContent() {
    // Add implementation for loading visual content
  }

  handleStrokeControl(event) {
    const button = event.currentTarget;
    if (button.classList.contains('prev-stroke')) {
      this.strokeOrderComponent.showPreviousStroke();
    } else if (button.classList.contains('next-stroke')) {
      this.strokeOrderComponent.showNextStroke();
    } else if (button.classList.contains('play-strokes')) {
      this.strokeOrderComponent.playStrokeAnimation();
    } else if (button.classList.contains('stop-stroke-animation')) {
      this.strokeOrderComponent.stopAnimation();
    }
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'analysis-error';
    errorDiv.textContent = message;
    document.querySelector('.analysis-content').prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

class StrokeOrderComponent {
  constructor() {
    this.canvas = document.getElementById('stroke-order-canvas');
    this.ctx = this.canvas?.getContext('2d');
    this.currentStroke = 0;
    this.strokes = [];
    this.isPlaying = false;
    this.animationSpeed = 1000; // milliseconds per stroke
    this.initializeCanvas();
  }

  setAnimationSpeed(speed) {
    this.animationSpeed = speed;
  }

  initializeCanvas() {
    if (!this.ctx) return;
    this.ctx.strokeStyle = '#2c3e50';
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  setStrokes(strokes) {
    this.strokes = strokes;
    this.currentStroke = 0;
    this.redrawStrokes();
  }

  showPreviousStroke() {
    if (this.currentStroke > 0) {
      this.currentStroke--;
      this.redrawStrokes();
    }
  }

  showNextStroke() {
    if (this.currentStroke < this.strokes.length - 1) {
      this.currentStroke++;
      this.redrawStrokes();
    }
  }

  async playStrokeAnimation() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    for (let i = 0; i <= this.strokes.length; i++) {
      if (!this.isPlaying) break;
      this.currentStroke = i;
      this.redrawStrokes();
      await new Promise(resolve => setTimeout(resolve, this.animationSpeed));
    }

    this.isPlaying = false;
  }

  stopAnimation() {
    this.isPlaying = false;
  }

  redrawStrokes() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i <= this.currentStroke; i++) {
      this.drawStroke(this.strokes[i]);
    }
  }

  drawStroke(stroke) {
    if (!this.ctx || !stroke?.points?.length) return;
    this.ctx.beginPath();
    this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    stroke.points.slice(1).forEach(point => {
      this.ctx.lineTo(point.x, point.y);
    });
    this.ctx.stroke();
  }
}

// Support classes
class SemanticAnalysisEngine {
  async analyze(name) {
    // Implement semantic analysis logic
    return {
      meanings: [],
      associations: []
    };
  }

  async deepSemanticAnalysis(name) {
    // Implement deep semantic analysis logic
    return {
      meanings: [],
      associations: []
    };
  }
}

class CulturalContextAnalysisEngine {
  async analyze(name) {
    // Implement cultural analysis logic
    return {
      historical: '',
      modern: ''
    };
  }

  async comprehensiveCulturalAnalysis(name) {
    // Implement comprehensive cultural analysis logic
    return {
      historicalContext: '',
      modernSignificance: '',
      culturalFitScore: 0
    };
  }
}

class LinguisticAnalysisEngine {
  async analyze(name) {
    // Implement linguistic analysis logic
    return {
      phonetic: {
        pattern: '',
        harmony: 0
      },
      structure: {
        complexity: 0,
        balance: 0
      }
    };
  }

  async advancedLinguisticAnalysis(name) {
    // Implement advanced linguistic analysis logic
    return {
      tonePattern: '',
      phoneticHarmony: 0,
      strokeBalance: 0,
      visualHarmony: 0
    };
  }
}

class ModernContextAnalysisEngine {
  async analyzeModernContext(name) {
    // Implement modern context analysis logic
    return {
      // Add properties for modern context analysis
    };
  }

  async contextualRelevanceAnalysis(nameData) {
    // Implement contextual relevance analysis logic
  }
}

class AdvancedVisualizationManager {
  initializeWithParameters(parameters) {
    // Implement initialization of visualizer with parameters
  }

  renderSemanticVisualization(semanticData, networkContainer) {
    // Implement visualization update logic
  }

  renderVisualizations(data) {
    // Implement rendering of visualizations
  }
}

class AIRecommendationEngine {
  async generateRecommendations(data) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate personalized name recommendations based on the following analysis:
          ${JSON.stringify(data)}
          
          interface Recommendations {
            alternatives: string[];
            improvements: string[];
            style_variations: Array<{
              style: string;
              name: string;
              context: string;
            }>;
          }`,
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return {
        alternatives: [],
        improvements: [],
        style_variations: []
      };
    }
  }
}

class NameMeaningNetwork {
  initialize(parameters) {
    // Implement initialization of name meaning network
  }
}

class CharacterExplorer {
  setParameters(parameters) {
    // Implement setting of parameters for character explorer
  }
}

// Initialize manager when document is ready
document.addEventListener('DOMContentLoaded', () => {
  window.nameAnalysisManager = new NameAnalysisManager();
});