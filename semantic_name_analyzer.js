class SemanticNameAnalyzer {
  constructor() {
    this.semanticVectors = new Map();
    this.initializeSemanticModel();
  }

  async initializeSemanticModel() {
    try {
      // Simulate loading pre-trained semantic vectors
      const response = await fetch('/api/semantic_vectors');
      const vectorData = await response.json();
      this.loadSemanticVectors(vectorData);
    } catch (error) {
      console.error('Failed to load semantic vectors:', error);
      this.loadDefaultSemanticVectors();
    }
  }

  loadSemanticVectors(vectorData) {
    vectorData.forEach(item => {
      this.semanticVectors.set(item.character, item.vector);
    });
  }

  loadDefaultSemanticVectors() {
    // Predefined semantic vectors for common characters
    const defaultVectors = [
      { character: '慧', vector: [0.7, 0.2, 0.1, 0.6, 0.3] },
      { character: '智', vector: [0.8, 0.3, 0.2, 0.7, 0.4] },
      { character: '勇', vector: [0.2, 0.7, 0.6, 0.1, 0.5] },
      { character: '宁', vector: [0.5, 0.4, 0.3, 0.6, 0.2] }
    ];

    defaultVectors.forEach(item => {
      this.semanticVectors.set(item.character, item.vector);
    });
  }

  calculateSemanticSimilarity(name1, name2) {
    const vectors1 = Array.from(name1).map(char => 
      this.semanticVectors.get(char) || this.generateRandomVector()
    );
    
    const vectors2 = Array.from(name2).map(char => 
      this.semanticVectors.get(char) || this.generateRandomVector()
    );

    // Average vector representation
    const avgVector1 = this.averageVector(vectors1);
    const avgVector2 = this.averageVector(vectors2);

    return this.cosineSimilarity(avgVector1, avgVector2);
  }

  generateRandomVector(dimensions = 5) {
    return Array.from({ length: dimensions }, () => Math.random());
  }

  averageVector(vectors) {
    if (vectors.length === 0) return this.generateRandomVector();

    return vectors[0].map((_, i) => 
      vectors.reduce((sum, vector) => sum + vector[i], 0) / vectors.length
    );
  }

  cosineSimilarity(vector1, vector2) {
    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));

    return dotProduct / (magnitude1 * magnitude2);
  }

  analyzeSemanticsAndContext(name) {
    const semanticAnalysis = {
      characterBreakdown: this.analyzeCharacterSemantics(name),
      nameCompositionScore: this.calculateNameCompositionScore(name),
      semanticNetworkInsights: this.generateSemanticNetworkInsights(name)
    };

    return semanticAnalysis;
  }

  analyzeCharacterSemantics(name) {
    return Array.from(name).map(char => ({
      character: char,
      semanticVector: this.semanticVectors.get(char) || this.generateRandomVector(),
      potentialMeanings: this.extractCharacterMeanings(char)
    }));
  }

  extractCharacterMeanings(character) {
    const meaningDatabase = {
      '慧': ['智慧', '聪明', '通透', '明智'],
      '智': ['智力', '聪颖', '明智', '理性'],
      '勇': ['勇气', '勇敢', '胆识', '无畏'],
      '宁': ['宁静', '安宁', '平和', '淡定']
    };

    return meaningDatabase[character] || ['未知含义'];
  }

  calculateNameCompositionScore(name) {
    const characterVectors = Array.from(name).map(char => 
      this.semanticVectors.get(char) || this.generateRandomVector()
    );

    // Calculate semantic diversity
    const vectorDistances = characterVectors.reduce((distances, vector, index) => {
      if (index > 0) {
        const prevVector = characterVectors[index - 1];
        distances.push(this.cosineSimilarity(vector, prevVector));
      }
      return distances;
    }, []);

    // Calculate average semantic distance
    const semanticDiversityScore = vectorDistances.length > 0 
      ? vectorDistances.reduce((sum, dist) => sum + dist, 0) / vectorDistances.length
      : 0.5;

    return {
      semanticDiversityScore,
      interpretationScore: this.calculateInterpretationComplexity(name)
    };
  }

  calculateInterpretationComplexity(name) {
    const complexityFactors = Array.from(name).map(char => {
      const meanings = this.extractCharacterMeanings(char);
      return meanings.length;
    });

    const averageComplexity = complexityFactors.reduce((sum, factor) => sum + factor, 0) / complexityFactors.length;
    
    return Math.min(averageComplexity / 5, 1); // Normalize to 0-1 range
  }

  generateSemanticNetworkInsights(name) {
    const characterNetwork = Array.from(name).map(char => ({
      character: char,
      semanticConnections: this.findSemanticConnections(char)
    }));

    return {
      networkDensity: characterNetwork.length,
      characterConnections: characterNetwork
    };
  }

  findSemanticConnections(character) {
    // Simulate semantic network connections
    const semanticNetwork = {
      '慧': ['智', '明', '学'],
      '智': ['慧', '思', '知'],
      '勇': ['猛', 'brave', 'brave'],
      '宁': ['安', '静', '和']
    };

    return semanticNetwork[character] || [];
  }

  generateNameRecommendations(originalName, semanticAnalysis) {
    const recommendationCriteria = [
      {
        type: 'Semantic Diversity',
        score: semanticAnalysis.nameCompositionScore.semanticDiversityScore,
        recommendation: this.generateDiversityBasedRecommendation(semanticAnalysis)
      },
      {
        type: 'Interpretation Complexity',
        score: semanticAnalysis.nameCompositionScore.interpretationScore,
        recommendation: this.generateComplexityBasedRecommendation(semanticAnalysis)
      }
    ];

    return {
      originalName,
      semanticAnalysis,
      recommendations: recommendationCriteria
    };
  }

  generateDiversityBasedRecommendation(semanticAnalysis) {
    const diversityScore = semanticAnalysis.nameCompositionScore.semanticDiversityScore;
    
    if (diversityScore > 0.8) {
      return '语义丰富，概念多元 (Semantically Rich, Conceptually Diverse)';
    } else if (diversityScore > 0.5) {
      return '语义均衡，概念协调 (Semantically Balanced)';
    } else {
      return '语义单一，建议增加概念多样性 (Semantically Uniform, Consider Diversifying)';
    }
  }

  generateComplexityBasedRecommendation(semanticAnalysis) {
    const complexityScore = semanticAnalysis.nameCompositionScore.interpretationScore;
    
    if (complexityScore > 0.8) {
      return '高度复杂，多层次意义 (Highly Complex, Multi-layered Meaning)';
    } else if (complexityScore > 0.5) {
      return '适度复杂，意义丰富 (Moderately Complex, Rich Meaning)';
    } else {
      return '语义简单，可考虑深化 (Semantically Simple, Consider Deepening)';
    }
  }
}

class CharacterVisualizationSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
    this.loadStrokeData();
  }

  setupCanvas() {
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#2c3e50';
    this.ctx.lineWidth = 4;
  }

  async loadStrokeData() {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate stroke data for Chinese characters with cultural significance.
          
          interface StrokeData {
            character: string;
            strokes: Array<{
              points: Array<{x: number, y: number}>;
              type: string;
              order: number;
            }>;
            cultural_significance: string;
          }
          
          {
            "character": "德",
            "strokes": [
              {
                "points": [{"x": 50, "y": 50}, {"x": 150, "y": 50}],
                "type": "horizontal",
                "order": 1
              }
            ],
            "cultural_significance": "represents moral virtue"
          }
          `
        })
      });

      this.strokeData = await response.json();
    } catch (error) {
      console.error('Failed to load stroke data:', error);
      this.strokeData = {};
    }
  }

  async visualizeCharacter(character) {
    if (!this.strokeData[character]) {
      await this.loadStrokeData();
    }

    const data = this.strokeData[character];
    if (!data) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (const stroke of data.strokes) {
      await this.animateStroke(stroke);
    }

    return {
      canvas: this.canvas,
      culturalSignificance: data.cultural_significance
    };
  }

  async animateStroke(stroke) {
    return new Promise(resolve => {
      let progress = 0;
      const animate = () => {
        if (progress >= 1) {
          resolve();
          return;
        }

        this.ctx.beginPath();
        const points = stroke.points;
        for (let i = 0; i < points.length - 1; i++) {
          const current = points[i];
          const next = points[i + 1];
          
          const x = current.x + (next.x - current.x) * progress;
          const y = current.y + (next.y - current.y) * progress;
          
          if (i === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
        }
        this.ctx.stroke();

        progress += 0.05;
        requestAnimationFrame(animate);
      };

      animate();
    });
  }
}

class SemanticNetworkVisualizer {
  constructor() {
    this.initializeNetwork();
  }

  initializeNetwork() {
    this.network = {
      nodes: new Set(),
      edges: new Map()
    };
  }

  async buildNetwork(character) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate semantic network for the Chinese character "${character}".
          
          interface SemanticNetwork {
            nodes: Array<{
              id: string;
              type: string;
              meaning: string;
              weight: number;
            }>;
            edges: Array<{
              source: string;
              target: string;
              relationship: string;
              strength: number;
            }>;
          }
          
          {
            "nodes": [
              {
                "id": "德",
                "type": "character",
                "meaning": "virtue",
                "weight": 1.0
              }
            ],
            "edges": [
              {
                "source": "德",
                "target": "善",
                "relationship": "synonym",
                "strength": 0.8
              }
            ]
          }
          `
        })
      });

      const networkData = await response.json();
      this.processNetworkData(networkData);
      return networkData;
    } catch (error) {
      console.error('Failed to build semantic network:', error);
      return null;
    }
  }

  processNetworkData(data) {
    data.nodes.forEach(node => this.network.nodes.add(node));
    data.edges.forEach(edge => {
      if (!this.network.edges.has(edge.source)) {
        this.network.edges.set(edge.source, new Set());
      }
      this.network.edges.get(edge.source).add(edge);
    });
  }

  renderNetwork(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1000 1000');
    svg.classList.add('semantic-network');

    // Create force-directed layout
    const nodes = Array.from(this.network.nodes);
    const edges = Array.from(this.network.edges.values())
      .flatMap(edgeSet => Array.from(edgeSet));

    // Render nodes
    nodes.forEach(node => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', Math.random() * 1000);
      circle.setAttribute('cy', Math.random() * 1000);
      circle.setAttribute('r', node.weight * 20);
      circle.setAttribute('fill', this.getNodeColor(node.type));
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.textContent = node.id;
      text.setAttribute('x', circle.getAttribute('cx'));
      text.setAttribute('y', circle.getAttribute('cy'));
      
      svg.appendChild(circle);
      svg.appendChild(text);
    });

    // Render edges
    edges.forEach(edge => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      line.setAttribute('x1', sourceNode.x);
      line.setAttribute('y1', sourceNode.y);
      line.setAttribute('x2', targetNode.x);
      line.setAttribute('y2', targetNode.y);
      line.setAttribute('stroke', this.getEdgeColor(edge.relationship));
      line.setAttribute('stroke-width', edge.strength * 2);
      
      svg.appendChild(line);
    });

    container.appendChild(svg);
  }

  getNodeColor(type) {
    const colors = {
      character: '#3498db',
      concept: '#2ecc71',
      usage: '#e74c3c'
    };
    return colors[type] || '#95a5a6';
  }

  getEdgeColor(relationship) {
    const colors = {
      synonym: '#3498db',
      antonym: '#e74c3c',
      related: '#2ecc71'
    };
    return colors[relationship] || '#95a5a6';
  }

  updateNetworkLayout() {
    // Implement force-directed layout updates
    requestAnimationFrame(() => this.updateNetworkLayout());
  }
}

class CulturalContextVisualizer {
  constructor() {
    this.initializeVisualizer();
  }

  initializeVisualizer() {
    this.container = document.createElement('div');
    this.container.classList.add('cultural-context-visualizer');
  }

  async visualizeCulturalContext(character) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate cultural context visualization data for the Chinese character "${character}".
          
          interface CulturalContext {
            historical_periods: Array<{
              era: string;
              usage: string;
              significance: string;
              examples: string[];
            }>;
            modern_interpretations: Array<{
              context: string;
              meaning: string;
              popularity: number;
            }>;
            cultural_associations: Array<{
              category: string;
              associations: string[];
              significance: string;
            }>;
          }
          
          {
            "historical_periods": [
              {
                "era": "春秋战国",
                "usage": "文学作品",
                "significance": "代表道德品质",
                "examples": ["德政", "德治"]
              }
            ],
            "modern_interpretations": [
              {
                "context": "教育",
                "meaning": "道德教育",
                "popularity": 0.8
              }
            ],
            "cultural_associations": [
              {
                "category": "传统文化",
                "associations": ["仁义礼智信"],
                "significance": "儒家核心价值观"
              }
            ]
          }
          `
        })
      });

      const contextData = await response.json();
      this.renderCulturalContext(contextData);
      return contextData;
    } catch (error) {
      console.error('Failed to visualize cultural context:', error);
      return null;
    }
  }

  renderCulturalContext(data) {
    this.container.innerHTML = `
      <div class="cultural-context">
        <div class="historical-timeline">
          ${this.renderHistoricalTimeline(data.historical_periods)}
        </div>
        <div class="modern-interpretations">
          ${this.renderModernInterpretations(data.modern_interpretations)}
        </div>
        <div class="cultural-associations">
          ${this.renderCulturalAssociations(data.cultural_associations)}
        </div>
      </div>
    `;
  }

  renderHistoricalTimeline(periods) {
    return `
      <div class="timeline">
        ${periods.map(period => `
          <div class="timeline-item">
            <div class="era">${period.era}</div>
            <div class="usage">${period.usage}</div>
            <div class="significance">${period.significance}</div>
            <div class="examples">
              ${period.examples.map(example => `
                <span class="example">${example}</span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderModernInterpretations(interpretations) {
    return `
      <div class="interpretations">
        ${interpretations.map(interpretation => `
          <div class="interpretation">
            <div class="context">${interpretation.context}</div>
            <div class="meaning">${interpretation.meaning}</div>
            <div class="popularity-bar" style="width: ${interpretation.popularity * 100}%"></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderCulturalAssociations(associations) {
    return `
      <div class="associations">
        ${associations.map(association => `
          <div class="association-category">
            <h4>${association.category}</h4>
            <div class="association-items">
              ${association.associations.map(item => `
                <span class="association-item">${item}</span>
              `).join('')}
            </div>
            <div class="significance">${association.significance}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

class NameFactorsAnalyzer {
  constructor() {
    this.initializeFactorsDatabase();
  }

  async initializeFactorsDatabase() {
    // Initialize all naming factors
    this.namingFactors = {
      culturalMeanings: {
        '慧': { meaning: '智慧', description: '象征智慧和聪明', examples: ['慧子', '慧心'] },
        '勇': { meaning: '勇敢', description: '代表勇气和无畏', examples: ['勇军', '勇毅'] },
        '宁': { meaning: '平静', description: '象征内心的宁静与安宁', examples: ['宁静', '宁致'] }
      },
      familyTraditions: {
        prefixes: ['光', '耀', '承', '世'],
        patterns: ['辈分字配置', '家族传统用字'],
        examples: ['光宗耀祖', '承先启后']
      },
      phonetics: {
        tonePatterns: {
          '王伟': { analysis: '双阳平声，和谐统一', rating: 5 },
          '李娜': { analysis: '阳平上声搭配，音律优美', rating: 4 }
        }
      },
      characterStructures: {
        simple: ['丁', '一', '山', '川'],
        symmetrical: ['晨', '炎', '鑫', '林'],
        complex: ['馨', '魅', '瑶', '璃']
      }
    };
  }

  analyzeNameFactors(name) {
    return {
      culturalAnalysis: this.analyzeCulturalMeaning(name),
      structuralAnalysis: this.analyzeStructure(name),
      phoneticAnalysis: this.analyzePhonetics(name),
      traditionalFactors: this.analyzeTraditionalFactors(name)
    };
  }

  analyzeCulturalMeaning(name) {
    const analysis = [];
    Array.from(name).forEach(char => {
      const culturalInfo = this.namingFactors.culturalMeanings[char];
      if (culturalInfo) {
        analysis.push({
          character: char,
          meaning: culturalInfo.meaning,
          description: culturalInfo.description,
          examples: culturalInfo.examples
        });
      }
    });
    return analysis;
  }

  analyzeStructure(name) {
    return Array.from(name).map(char => {
      let structure = 'complex';
      if (this.namingFactors.characterStructures.simple.includes(char)) {
        structure = 'simple';
      } else if (this.namingFactors.characterStructures.symmetrical.includes(char)) {
        structure = 'symmetrical';
      }
      return {
        character: char,
        structure: structure,
        complexity: this.calculateComplexity(char)
      };
    });
  }

  analyzePhonetics(name) {
    const tonePattern = this.namingFactors.phonetics.tonePatterns[name];
    return {
      tonePattern: tonePattern || { analysis: '需要分析音律搭配', rating: 3 },
      harmony: this.calculatePhoneticHarmony(name)
    };
  }

  analyzeTraditionalFactors(name) {
    return {
      familyTradition: this.checkFamilyTradition(name),
      culturalReferences: this.findCulturalReferences(name),
      literaryConnections: this.analyzeLiteraryConnections(name)
    };
  }

  calculateComplexity(char) {
    // Implement character complexity calculation
    return {
      strokeCount: this.getStrokeCount(char),
      visualComplexity: this.assessVisualComplexity(char)
    };
  }

  calculatePhoneticHarmony(name) {
    // Implement phonetic harmony calculation
    return {
      toneBalance: this.calculateToneBalance(name),
      soundFlow: this.assessSoundFlow(name)
    };
  }

  checkFamilyTradition(name) {
    const familyPrefixes = this.namingFactors.familyTraditions.prefixes;
    const matches = familyPrefixes.filter(prefix => name.includes(prefix));
    return {
      hasTraditionalElements: matches.length > 0,
      matchedElements: matches
    };
  }

  findCulturalReferences(name) {
    // Implement cultural reference finding
    return {
      historical: this.findHistoricalReferences(name),
      modern: this.findModernReferences(name)
    };
  }

  analyzeLiteraryConnections(name) {
    // Implement literary connection analysis
    return {
      classicalReferences: this.findClassicalReferences(name),
      modernLiterature: this.findModernLiteraryReferences(name)
    };
  }

  // Helper methods
  getStrokeCount(char) {
    // Implement stroke count calculation
    return 0; // Placeholder
  }

  assessVisualComplexity(char) {
    // Implement visual complexity assessment
    return 'medium'; // Placeholder
  }

  calculateToneBalance(name) {
    // Implement tone balance calculation
    return 0.5; // Placeholder
  }

  assessSoundFlow(name) {
    // Implement sound flow assessment
    return 'harmonious'; // Placeholder
  }

  findHistoricalReferences(name) {
    // Implement historical reference finding
    return []; // Placeholder
  }

  findModernReferences(name) {
    // Implement modern reference finding
    return []; // Placeholder
  }

  findClassicalReferences(name) {
    // Implement classical reference finding
    return []; // Placeholder
  }

  findModernLiteraryReferences(name) {
    // Implement modern literary reference finding
    return []; // Placeholder
  }
}

class NameAnalysisDashboard {
  constructor() {
    this.initializeDashboard();
    this.bindEvents();
  }

  initializeDashboard() {
    this.container = document.getElementById('name-analysis');
    if (!this.container) return;
    
    this.setupFactorsSection();
    this.setupVisualization();
  }

  setupFactorsSection() {
    // Create container for analysis factors
    const factorsContainer = document.createElement('div');
    factorsContainer.className = 'factors-grid';
    
    // Add analysis factor categories
    const categories = [
      {
        title: '文化含义 Cultural Meaning',
        id: 'cultural-meaning',
        icon: '🎭',
        examples: [
          { char: '慧', meaning: '智慧', description: '象征智慧和聪明' },
          { char: '勇', meaning: '勇敢', description: '代表勇气和无畏' },
          { char: '宁', meaning: '平静', description: '象征内心的宁静与安宁' }
        ]
      },
      {
        title: '家族传统 Family Tradition',
        id: 'family-tradition',
        icon: '👪',
        examples: [
          { pattern: '光宗耀祖', description: '家族字辈中的"光"字' },
          { pattern: '世代相传', description: '家族传统用字规律' }
        ]
      },
      {
        title: '音韵搭配 Phonetic Harmony',
        id: 'phonetic-harmony',
        icon: '🎵',
        examples: [
          { name: '王伟', analysis: '双阳平声，和谐统一' },
          { name: '李娜', analysis: '阳平上声搭配，音律优美' }
        ]
      },
      // ... add more categories as needed
    ];

    categories.forEach(category => {
      const card = this.createFactorCard(category);
      factorsContainer.appendChild(card);
    });

    this.container.appendChild(factorsContainer);
  }

  createFactorCard(category) {
    const card = document.createElement('div');
    card.className = 'factor-card';
    card.innerHTML = `
      <h4>${category.icon} ${category.title}</h4>
      <div class="factor-content" id="${category.id}">
        ${this.generateExamplesHTML(category)}
      </div>
      <div class="factor-analysis" id="${category.id}-analysis"></div>
    `;
    return card;
  }

  generateExamplesHTML(category) {
    if (!category.examples) return '';

    return `
      <div class="examples-container">
        ${category.examples.map(example => `
          <div class="example-item">
            ${example.char ? `<span class="character">${example.char}</span>` : ''}
            ${example.name ? `<span class="name">${example.name}</span>` : ''}
            <div class="example-details">
              ${example.meaning ? `<div class="meaning">${example.meaning}</div>` : ''}
              ${example.description ? `<div class="description">${example.description}</div>` : ''}
              ${example.analysis ? `<div class="analysis">${example.analysis}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  setupVisualization() {
    const visualContainer = document.createElement('div');
    visualContainer.className = 'analysis-visualization';
    visualContainer.innerHTML = `
      <div class="visualization-tabs">
        <button class="tab-btn active" data-tab="structure">结构分析</button>
        <button class="tab-btn" data-tab="cultural">文化分析</button>
        <button class="tab-btn" data-tab="phonetic">音韵分析</button>
      </div>
      <div class="visualization-content">
        <div id="structure-vis" class="vis-panel active"></div>
        <div id="cultural-vis" class="vis-panel"></div>
        <div id="phonetic-vis" class="vis-panel"></div>
      </div>
    `;
    
    this.container.appendChild(visualContainer);
  }

  async analyzeName(name) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Analyze the Chinese name "${name}" considering cultural factors, traditions, and linguistics.
          
          interface NameAnalysis {
            cultural: {
              meaning: string;
              significance: string[];
              examples: Array<{char: string; meaning: string}>;
            };
            phonetic: {
              tonePattern: string;
              harmony: number;
              pronunciation: string;
            };
            structure: {
              complexity: number;
              balance: number;
              aesthetics: string;
            };
          }
          
          Example response:
          {
            "cultural": {
              "meaning": "智慧与勇气的结合",
              "significance": ["代表智慧", "象征勇气"],
              "examples": [
                {"char": "智", "meaning": "智慧"},
                {"char": "勇", "meaning": "勇敢"}
              ]
            },
            "phonetic": {
              "tonePattern": "阳平上声",
              "harmony": 0.8,
              "pronunciation": "zhì yǒng"
            },
            "structure": {
              "complexity": 0.7,
              "balance": 0.9,
              "aesthetics": "结构匀称"
            }
          }`
        })
      });

      const analysis = await response.json();
      this.updateAnalysisDisplay(analysis);
    } catch (error) {
      console.error('Name analysis error:', error);
    }
  }

  updateAnalysisDisplay(analysis) {
    // Update cultural analysis
    const culturalVis = document.getElementById('cultural-vis');
    if (culturalVis) {
      culturalVis.innerHTML = this.generateCulturalVisualization(analysis.cultural);
    }

    // Update phonetic analysis
    const phoneticVis = document.getElementById('phonetic-vis');
    if (phoneticVis) {
      phoneticVis.innerHTML = this.generatePhoneticVisualization(analysis.phonetic);
    }

    // Update structure analysis
    const structureVis = document.getElementById('structure-vis');
    if (structureVis) {
      structureVis.innerHTML = this.generateStructureVisualization(analysis.structure);
    }
  }

  generateCulturalVisualization(cultural) {
    return `
      <div class="cultural-analysis">
        <h3>文化分析 Cultural Analysis</h3>
        <div class="meaning-container">
          <h4>含义 Meaning</h4>
          <p>${cultural.meaning}</p>
        </div>
        <div class="significance-container">
          <h4>文化意义 Cultural Significance</h4>
          <ul>
            ${cultural.significance.map(sig => `<li>${sig}</li>`).join('')}
          </ul>
        </div>
        <div class="examples-container">
          <h4>字符示例 Character Examples</h4>
          ${cultural.examples.map(ex => `
            <div class="example-item">
              <span class="character">${ex.char}</span>
              <span class="meaning">${ex.meaning}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  generatePhoneticVisualization(phonetic) {
    return `
      <div class="phonetic-analysis">
        <h3>音韵分析 Phonetic Analysis</h3>
        <div class="tone-pattern">
          <h4>声调模式 Tone Pattern</h4>
          <p>${phonetic.tonePattern}</p>
        </div>
        <div class="harmony-meter">
          <h4>和谐度 Harmony</h4>
          <div class="meter">
            <div class="meter-fill" style="width: ${phonetic.harmony * 100}%"></div>
          </div>
          <span>${Math.round(phonetic.harmony * 100)}%</span>
        </div>
        <div class="pronunciation">
          <h4>拼音 Pinyin</h4>
          <p>${phonetic.pronunciation}</p>
        </div>
      </div>
    `;
  }

  generateStructureVisualization(structure) {
    return `
      <div class="structure-analysis">
        <h3>结构分析 Structure Analysis</h3>
        <div class="metrics-container">
          <div class="metric">
            <h4>复杂度 Complexity</h4>
            <div class="meter">
              <div class="meter-fill" style="width: ${structure.complexity * 100}%"></div>
            </div>
            <span>${Math.round(structure.complexity * 100)}%</span>
          </div>
          <div class="metric">
            <h4>平衡度 Balance</h4>
            <div class="meter">
              <div class="meter-fill" style="width: ${structure.balance * 100}%"></div>
            </div>
            <span>${Math.round(structure.balance * 100)}%</span>
          </div>
        </div>
        <div class="aesthetics">
          <h4>美学评价 Aesthetic Evaluation</h4>
          <p>${structure.aesthetics}</p>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Bind tab switching events
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const panels = document.querySelectorAll('.vis-panel');
        panels.forEach(p => p.classList.remove('active'));
        document.getElementById(`${tab.dataset.tab}-vis`).classList.add('active');
      });
    });

    // Listen for name analysis requests
    document.addEventListener('nameAnalysisRequested', event => {
      this.analyzeName(event.detail.name);
    });
  }
}

class SemanticNameGenerator {
  constructor() {
    this.semanticAnalyzer = new SemanticNameAnalyzer();
    this.characterVisualizationSystem = new CharacterVisualizationSystem();
    this.semanticNetworkVisualizer = new SemanticNetworkVisualizer();
    this.culturalContextVisualizer = new CulturalContextVisualizer();
    this.nameFactorsAnalyzer = new NameFactorsAnalyzer();
    this.initializeUI();
  }

  initializeUI() {
    const semanticAnalysisButton = document.getElementById('semantic-analysis-trigger');
    if (semanticAnalysisButton) {
      semanticAnalysisButton.addEventListener('click', () => this.triggerSemanticAnalysis());
    }
  }

  async triggerSemanticAnalysis() {
    const nameInput = document.getElementById('semantic-name-input');
    const name = nameInput.value;

    try {
      const semanticAnalysis = this.semanticAnalyzer.analyzeSemanticsAndContext(name);
      const recommendations = this.semanticAnalyzer.generateNameRecommendations(name, semanticAnalysis);
      const nameFactorsAnalysis = this.nameFactorsAnalyzer.analyzeNameFactors(name);
      
      this.displaySemanticAnalysis(recommendations, nameFactorsAnalysis);
    } catch (error) {
      console.error('Semantic Analysis Error:', error);
      this.displayErrorMessage(error);
    }
  }

  displaySemanticAnalysis(analysisResult, nameFactorsAnalysis) {
    const resultContainer = document.getElementById('semantic-analysis-result');
    
    resultContainer.innerHTML = `
      <div class="semantic-analysis-card">
        <h3>语义分析报告 Semantic Analysis Report</h3>
        
        <div class="character-breakdown">
          <h4>字符语义分解 Character Semantic Breakdown</h4>
          ${analysisResult.semanticAnalysis.characterBreakdown.map(charAnalysis => `
            <div class="character-semantic-item">
              <strong>${charAnalysis.character}</strong>
              <div class="potential-meanings">
                ${charAnalysis.potentialMeanings.join(', ')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="name-composition">
          <h4>名字语义构成 Name Composition</h4>
          <div class="composition-scores">
            <div class="score-item">
              语义多样性 Semantic Diversity: 
              ${(analysisResult.semanticAnalysis.nameCompositionScore.semanticDiversityScore * 100).toFixed(2)}%
            </div>
            <div class="score-item">
              解读复杂度 Interpretation Complexity: 
              ${(analysisResult.semanticAnalysis.nameCompositionScore.interpretationScore * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        <div class="semantic-recommendations">
          <h4>名字建议 Name Recommendations</h4>
          ${analysisResult.recommendations.map(rec => `
            <div class="recommendation-item">
              <strong>${rec.type}:</strong>
              ${rec.recommendation} (Score: ${(rec.score * 100).toFixed(2)}%)
            </div>
          `).join('')}
        </div>

        <div class="name-factors-analysis">
          <h4>名字因素分析 Name Factors Analysis</h4>
          <div class="cultural-analysis">
            <h5>文化含义 Cultural Meaning</h5>
            ${nameFactorsAnalysis.culturalAnalysis.map(analysis => `
              <div class="cultural-meaning-item">
                <strong>${analysis.character}</strong>
                <div class="meaning">${analysis.meaning}</div>
                <div class="description">${analysis.description}</div>
                <div class="examples">${analysis.examples.join(', ')}</div>
              </div>
            `).join('')}
          </div>

          <div class="structural-analysis">
            <h5>结构分析 Structural Analysis</h5>
            ${nameFactorsAnalysis.structuralAnalysis.map(analysis => `
              <div class="structural-item">
                <strong>${analysis.character}</strong>
                <div class="structure">${analysis.structure}</div>
                <div class="complexity">复杂度: ${analysis.complexity.strokeCount} 笔画, ${analysis.complexity.visualComplexity} 视觉复杂度</div>
              </div>
            `).join('')}
          </div>

          <div class="phonetic-analysis">
            <h5>音韵分析 Phonetic Analysis</h5>
            <div class="tone-pattern">音调模式: ${nameFactorsAnalysis.phoneticAnalysis.tonePattern.analysis}</div>
            <div class="harmony">和谐度: ${nameFactorsAnalysis.phoneticAnalysis.harmony.toneBalance} 音调平衡, ${nameFactorsAnalysis.phoneticAnalysis.harmony.soundFlow} 声音流畅度</div>
          </div>

          <div class="traditional-factors-analysis">
            <h5>传统因素分析 Traditional Factors Analysis</h5>
            <div class="family-tradition">家族传统: ${nameFactorsAnalysis.traditionalFactors.familyTradition.hasTraditionalElements ? '有传统元素' : '无传统元素'}</div>
            <div class="cultural-references">文化参考: ${nameFactorsAnalysis.traditionalFactors.culturalReferences.historical.length > 0 ? '历史参考' : '无历史参考'}</div>
            <div class="literary-connections">文学联系: ${nameFactorsAnalysis.traditionalFactors.literaryConnections.classicalReferences.length > 0 ? '经典参考' : '无经典参考'}</div>
          </div>
        </div>
      </div>
    `;
  }

  displayErrorMessage(error) {
    const resultContainer = document.getElementById('semantic-analysis-result');
    resultContainer.innerHTML = `
      <div class="error-message">
        <h3>分析出错 Analysis Error</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Initialize the Semantic Name Generator
document.addEventListener('DOMContentLoaded', () => {
  new SemanticNameGenerator();
});

export { 
  SemanticNameAnalyzer, 
  CharacterVisualizationSystem, 
  SemanticNetworkVisualizer, 
  CulturalContextVisualizer,
  NameFactorsAnalyzer,
  NameAnalysisDashboard
};