class CulturalContextAnalyzer {
  constructor() {
    this.initializeAnalyzer();
    this.loadCulturalDatabase();
    this.bindEvents();
  }

  async initializeAnalyzer() {
    this.container = document.createElement('div');
    this.container.className = 'cultural-context-analyzer';
    this.container.innerHTML = `
      <div class="context-analyzer-header">
        <h3>文化内涵分析 Cultural Context Analysis</h3>
        <div class="era-selector">
          <select id="cultural-era-select">
            <option value="all">所有时期 All Eras</option>
            <option value="ancient">上古时期 Ancient</option>
            <option value="imperial">帝国时期 Imperial</option>
            <option value="modern">现代时期 Modern</option>
          </select>
        </div>
      </div>
      
      <div class="context-analysis-content">
        <div class="historical-timeline"></div>
        <div class="cultural-insights"></div>
        <div class="literary-references"></div>
      </div>
      
      <div class="cultural-visualization">
        <div class="meaning-network"></div>
        <div class="usage-patterns"></div>
        <div class="regional-variations"></div>
      </div>
      
      <div class="interactive-resources">
        <div class="cultural-elements"></div>
        <div class="naming-traditions"></div>
        <div class="modern-interpretations"></div>
      </div>
    `;

    document.getElementById('name-analysis').appendChild(this.container);
  }

  async loadCulturalDatabase() {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate comprehensive cultural context database for Chinese names.
          
          interface CulturalDatabase {
            eras: Array<{
              period: string;
              start_year: number;
              end_year: number;
              naming_conventions: string[];
              cultural_elements: Array<{
                element: string;
                significance: string;
                examples: string[];
              }>;
            }>;
            literary_sources: Array<{
              title: string;
              period: string;
              name_references: Array<{
                name: string;
                context: string;
                significance: string;
              }>;
            }>;
            regional_traditions: Array<{
              region: string;
              characteristics: string[];
              common_elements: string[];
              examples: string[];
            }>;
          }
          
          {
            "eras": [
              {
                "period": "上古时期",
                "start_year": -2100,
                "end_year": -221,
                "naming_conventions": ["以德命名", "以地命名"],
                "cultural_elements": [
                  {
                    "element": "五行",
                    "significance": "阴阳五行思想影响",
                    "examples": ["金华", "水清", "木华"]
                  }
                ]
              }
            ],
            "literary_sources": [
              {
                "title": "诗经",
                "period": "周朝",
                "name_references": [
                  {
                    "name": "关雎",
                    "context": "描述理想品德",
                    "significance": "代表高尚品格"
                  }
                ]
              }
            ],
            "regional_traditions": [
              {
                "region": "江南",
                "characteristics": ["婉约", "秀丽"],
                "common_elements": ["秀", "婉", "莲"],
                "examples": ["秀莲", "婉婷"]
              }
            ]
          }`
        })
      });

      this.culturalData = await response.json();
      this.renderTimeline();
    } catch (error) {
      console.error('Error loading cultural database:', error);
    }
  }

  async analyzeNameContext(name) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Analyze the cultural context of the Chinese name "${name}".
          
          interface NameCulturalAnalysis {
            historical_significance: Array<{
              era: string;
              relevance: string;
              cultural_elements: string[];
            }>;
            literary_connections: Array<{
              source: string;
              reference: string;
              meaning: string;
            }>;
            modern_interpretation: {
              contemporary_relevance: string;
              social_implications: string[];
              global_context: string;
            };
          }`,
          name
        })
      });

      const analysis = await response.json();
      this.displayAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing name context:', error);
    }
  }

  renderTimeline() {
    const timeline = this.container.querySelector('.historical-timeline');
    timeline.innerHTML = `
      <div class="timeline-container">
        ${this.culturalData.eras.map(era => `
          <div class="timeline-era" data-period="${era.period}">
            <div class="era-marker"></div>
            <div class="era-content">
              <h4>${era.period} (${era.start_year} - ${era.end_year})</h4>
              <div class="era-conventions">
                ${era.naming_conventions.map(convention => `
                  <div class="convention-tag">${convention}</div>
                `).join('')}
              </div>
              <div class="cultural-elements-list">
                ${era.cultural_elements.map(element => `
                  <div class="cultural-element">
                    <span class="element-name">${element.element}</span>
                    <span class="element-significance">${element.significance}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  displayAnalysis(analysis) {
    const insights = this.container.querySelector('.cultural-insights');
    insights.innerHTML = `
      <div class="analysis-container">
        <div class="historical-significance">
          <h4>历史意义 Historical Significance</h4>
          ${analysis.historical_significance.map(item => `
            <div class="significance-item">
              <div class="era-label">${item.era}</div>
              <div class="relevance">${item.relevance}</div>
              <div class="cultural-elements">
                ${item.cultural_elements.map(element => `
                  <span class="element-tag">${element}</span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="literary-connections">
          <h4>文学渊源 Literary Connections</h4>
          ${analysis.literary_connections.map(connection => `
            <div class="connection-item">
              <div class="source">${connection.source}</div>
              <div class="reference">${connection.reference}</div>
              <div class="meaning">${connection.meaning}</div>
            </div>
          `).join('')}
        </div>

        <div class="modern-context">
          <h4>现代诠释 Modern Interpretation</h4>
          <div class="contemporary-relevance">
            <p>${analysis.modern_interpretation.contemporary_relevance}</p>
          </div>
          <div class="social-implications">
            ${analysis.modern_interpretation.social_implications.map(implication => `
              <div class="implication-item">${implication}</div>
            `).join('')}
          </div>
          <div class="global-context">
            <p>${analysis.modern_interpretation.global_context}</p>
          </div>
        </div>
      </div>
    `;

    this.renderCulturalVisualization(analysis);
  }

  renderCulturalVisualization(analysis) {
    const meaningNetwork = this.container.querySelector('.meaning-network');
    meaningNetwork.innerHTML = `
      <div class="network-visualization">
        <h4>文化关联网络 Cultural Connection Network</h4>
        <div class="network-canvas">
          <!-- Network visualization will be rendered here -->
        </div>
      </div>
    `;

    this.initializeNetworkVisualization(analysis);
  }

  initializeNetworkVisualization(analysis) {
    // Implementation for interactive network visualization
    // This could use D3.js or another visualization library
  }

  bindEvents() {
    const eraSelect = this.container.querySelector('#cultural-era-select');
    eraSelect.addEventListener('change', (e) => {
      this.filterByEra(e.target.value);
    });

    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.timeline-era')) {
        const era = e.target.closest('.timeline-era').dataset.period;
        this.showEraDetails(era);
      }
    });

    // Listen for name analysis requests
    document.addEventListener('nameAnalysisRequested', (event) => {
      this.analyzeNameContext(event.detail.name);
    });
  }

  filterByEra(era) {
    const timelineItems = this.container.querySelectorAll('.timeline-era');
    timelineItems.forEach(item => {
      if (era === 'all' || item.dataset.period === era) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  async showEraDetails(era) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate detailed information about naming conventions in the "${era}" period.
          
          interface EraDetails {
            customs: string[];
            popular_elements: string[];
            social_context: string;
            examples: Array<{
              name: string;
              meaning: string;
              usage: string;
            }>;
          }`,
          era
        })
      });

      const details = await response.json();
      this.displayEraDetails(era, details);
    } catch (error) {
      console.error('Error showing era details:', error);
    }
  }

  displayEraDetails(era, details) {
    const culturalElements = this.container.querySelector('.cultural-elements');
    culturalElements.innerHTML = `
      <div class="era-details">
        <h4>${era}时期命名特点</h4>
        <div class="customs-section">
          <h5>命名习俗 Naming Customs</h5>
          <ul>
            ${details.customs.map(custom => `
              <li>${custom}</li>
            `).join('')}
          </ul>
        </div>
        <div class="elements-section">
          <h5>常用字元素 Common Elements</h5>
          <div class="element-tags">
            ${details.popular_elements.map(element => `
              <span class="element-tag">${element}</span>
            `).join('')}
          </div>
        </div>
        <div class="social-context">
          <h5>社会背景 Social Context</h5>
          <p>${details.social_context}</p>
        </div>
        <div class="examples-section">
          <h5>典型例子 Typical Examples</h5>
          ${details.examples.map(example => `
            <div class="example-item">
              <span class="example-name">${example.name}</span>
              <span class="example-meaning">${example.meaning}</span>
              <span class="example-usage">${example.usage}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Export the analyzer
export { CulturalContextAnalyzer };