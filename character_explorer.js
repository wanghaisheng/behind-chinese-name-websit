class CharacterExplorer {
  constructor() {
    this.currentCharacter = null;
    this.relatedCharacters = new Map();
    this.initializeExplorer();
    this.bindEvents();
  }

  async initializeExplorer() {
    this.container = document.createElement('div');
    this.container.className = 'character-explorer';
    this.container.innerHTML = `
      <div class="explorer-header">
        <h3>汉字探索 Character Explorer</h3>
        <div class="search-container">
          <input type="text" class="character-search" placeholder="输入汉字...">
          <button class="search-btn">搜索</button>
        </div>
      </div>
      <div class="explorer-content">
        <div class="main-character-display"></div>
        <div class="character-details"></div>
        <div class="related-characters"></div>
      </div>
      <div class="interactive-tools">
        <div class="stroke-order-tool"></div>
        <div class="radical-analysis"></div>
        <div class="usage-examples"></div>
      </div>
    `;

    document.getElementById('character-visualization').appendChild(this.container);
    await this.loadCharacterData();
  }

  async loadCharacterData() {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate comprehensive character data for Chinese name analysis.
          
          interface CharacterData {
            character: string;
            pinyin: string;
            meanings: string[];
            radicals: Array<{
              component: string;
              meaning: string;
            }>;
            strokes: Array<{
              points: Array<{x: number; y: number}>;
              type: string;
            }>;
            usage: {
              names: string[];
              compounds: string[];
              frequency: number;
            };
            cultural: {
              significance: string;
              historical_context: string;
              modern_usage: string;
            };
          }
          
          {
            "character": "智",
            "pinyin": "zhì",
            "meanings": ["wisdom", "intelligence"],
            "radicals": [
              {
                "component": "知",
                "meaning": "knowledge"
              }
            ],
            "strokes": [
              {
                "points": [{"x": 0, "y": 0}, {"x": 100, "y": 100}],
                "type": "horizontal"
              }
            ],
            "usage": {
              "names": ["智慧", "智勇"],
              "compounds": ["智力", "智者"],
              "frequency": 0.8
            },
            "cultural": {
              "significance": "传统文化中智慧的象征",
              "historical_context": "古代典籍中常用字",
              "modern_usage": "现代名字中表示聪明才智"
            }
          }`
        })
      });

      const characterData = await response.json();
      this.characterData = characterData;
    } catch (error) {
      console.error('Error loading character data:', error);
    }
  }

  async exploreCharacter(character) {
    this.currentCharacter = character;
    try {
      const data = await this.getCharacterData(character);
      this.updateDisplay(data);
      await this.loadRelatedCharacters(character);
    } catch (error) {
      console.error('Character exploration error:', error);
    }
  }

  async getCharacterData(character) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Analyze the Chinese character "${character}" in detail.
          
          interface CharacterAnalysis {
            meanings: string[];
            etymology: string;
            usage_frequency: number;
            common_names: string[];
            stroke_count: number;
            radical: string;
            related_characters: string[];
          }`,
          character
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Error getting character data:', error);
      return null;
    }
  }

  updateDisplay(data) {
    if (!data) return;

    const mainDisplay = this.container.querySelector('.main-character-display');
    mainDisplay.innerHTML = `
      <div class="character-card">
        <div class="character">${this.currentCharacter}</div>
        <div class="pinyin">${data.pinyin}</div>
        <div class="stroke-count">笔画：${data.stroke_count}</div>
      </div>
    `;

    const details = this.container.querySelector('.character-details');
    details.innerHTML = `
      <div class="meaning-section">
        <h4>含义 Meanings</h4>
        <ul>
          ${data.meanings.map(meaning => `<li>${meaning}</li>`).join('')}
        </ul>
      </div>
      <div class="etymology-section">
        <h4>字源 Etymology</h4>
        <p>${data.etymology}</p>
      </div>
      <div class="usage-section">
        <h4>常见名字 Common Names</h4>
        <div class="name-chips">
          ${data.common_names.map(name => `
            <span class="name-chip">${name}</span>
          `).join('')}
        </div>
      </div>
    `;

    this.updateStrokeOrderDisplay(data.stroke_count);
    this.updateRadicalAnalysis(data.radical);
  }

  async loadRelatedCharacters(character) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Find related characters for "${character}" in Chinese names.
          
          interface RelatedCharacters {
            similar_meaning: string[];
            common_combinations: string[];
            antonyms: string[];
          }`,
          character
        })
      });

      const relatedData = await response.json();
      this.updateRelatedCharacters(relatedData);
    } catch (error) {
      console.error('Error loading related characters:', error);
    }
  }

  updateRelatedCharacters(data) {
    const relatedContainer = this.container.querySelector('.related-characters');
    relatedContainer.innerHTML = `
      <div class="related-section">
        <h4>相关字符 Related Characters</h4>
        <div class="related-grid">
          <div class="similar-meaning">
            <h5>相近含义 Similar Meaning</h5>
            <div class="character-chips">
              ${data.similar_meaning.map(char => `
                <span class="character-chip" data-char="${char}">${char}</span>
              `).join('')}
            </div>
          </div>
          <div class="common-combinations">
            <h5>常见搭配 Common Combinations</h5>
            <div class="character-chips">
              ${data.common_combinations.map(combo => `
                <span class="character-chip">${combo}</span>
              `).join('')}
            </div>
          </div>
          <div class="antonyms">
            <h5>反义字 Antonyms</h5>
            <div class="character-chips">
              ${data.antonyms.map(char => `
                <span class="character-chip" data-char="${char}">${char}</span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  updateStrokeOrderDisplay(strokeCount) {
    const strokeContainer = this.container.querySelector('.stroke-order-tool');
    strokeContainer.innerHTML = `
      <div class="stroke-order">
        <h4>笔顺 Stroke Order</h4>
        <canvas id="stroke-canvas" width="200" height="200"></canvas>
        <div class="stroke-controls">
          <button class="prev-stroke">上一笔</button>
          <button class="next-stroke">下一笔</button>
          <button class="play-strokes">播放</button>
        </div>
      </div>
    `;
  }

  updateRadicalAnalysis(radical) {
    const radicalContainer = this.container.querySelector('.radical-analysis');
    radicalContainer.innerHTML = `
      <div class="radical-info">
        <h4>部首分析 Radical Analysis</h4>
        <div class="radical-card">
          <span class="radical">${radical}</span>
          <div class="radical-details">
            <p class="radical-meaning"></p>
            <p class="radical-examples"></p>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const searchBtn = this.container.querySelector('.search-btn');
    const searchInput = this.container.querySelector('.character-search');

    searchBtn.addEventListener('click', () => {
      const character = searchInput.value.trim();
      if (character) {
        this.exploreCharacter(character);
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const character = e.target.value.trim();
        if (character) {
          this.exploreCharacter(character);
        }
      }
    });

    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('character-chip')) {
        const character = e.target.dataset.char;
        if (character) {
          this.exploreCharacter(character);
        }
      }
    });

    // Stroke order controls
    const strokeControls = this.container.querySelector('.stroke-controls');
    if (strokeControls) {
      strokeControls.addEventListener('click', (e) => {
        if (e.target.classList.contains('prev-stroke')) {
          this.showPreviousStroke();
        } else if (e.target.classList.contains('next-stroke')) {
          this.showNextStroke();
        } else if (e.target.classList.contains('play-strokes')) {
          this.playStrokeAnimation();
        }
      });
    }
  }

  showPreviousStroke() {
    // Implement previous stroke logic
  }

  showNextStroke() {
    // Implement next stroke logic
  }

  async playStrokeAnimation() {
    // Implement stroke animation logic
  }
}

// Add to exports
export { CharacterExplorer };