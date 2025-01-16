class NameMeaningNetwork {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
    this.initializeNetwork();
    this.loadVisualizationLibraries();
  }

  async initializeNetwork() {
    this.container = document.createElement('div');
    this.container.className = 'meaning-network-container';
    this.container.innerHTML = `
      <div class="network-header">
        <h3>名字含义关联网络 Name Meaning Network</h3>
        <div class="network-controls">
          <div class="view-options">
            <button class="view-btn active" data-view="semantic">语义关联</button>
            <button class="view-btn" data-view="cultural">文化联系</button>
            <button class="view-btn" data-view="usage">使用模式</button>
          </div>
          <div class="filter-options">
            <select id="relationship-filter">
              <option value="all">所有关系</option>
              <option value="semantic">语义关系</option>
              <option value="cultural">文化关系</option>
              <option value="usage">使用关系</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="network-visualization">
        <div id="network-graph"></div>
        <div class="network-legend"></div>
      </div>
      
      <div class="network-details">
        <div class="selected-node-info"></div>
        <div class="relationship-details"></div>
      </div>
      
      <div class="interaction-panel">
        <div class="search-panel">
          <input type="text" id="node-search" placeholder="搜索字符...">
          <button id="search-btn">搜索</button>
        </div>
        <div class="suggestion-panel"></div>
      </div>
    `;

    document.getElementById('name-analysis').appendChild(this.container);
    await this.loadNetworkData();
    this.bindEvents();
  }

  async loadVisualizationLibraries() {
    // Load D3.js for visualization
    await this.loadScript('https://d3js.org/d3.v7.min.js');
    this.initializeVisualization();
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadNetworkData() {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate meaning network data for Chinese name characters.
          
          interface NetworkData {
            nodes: Array<{
              id: string;
              character: string;
              type: string;
              meanings: string[];
              culturalContext: string[];
              usage: Array<{
                context: string;
                frequency: number;
              }>;
            }>;
            relationships: Array<{
              source: string;
              target: string;
              type: string;
              strength: number;
              description: string;
            }>;
          }
          
          {
            "nodes": [
              {
                "id": "智",
                "character": "智",
                "type": "wisdom",
                "meanings": ["wisdom", "intelligence"],
                "culturalContext": ["传统文化", "教育理想"],
                "usage": [
                  {
                    "context": "names",
                    "frequency": 0.8
                  }
                ]
              }
            ],
            "relationships": [
              {
                "source": "智",
                "target": "慧",
                "type": "semantic",
                "strength": 0.9,
                "description": "wisdom connection"
              }
            ]
          }`
        })
      });

      const networkData = await response.json();
      this.processNetworkData(networkData);
    } catch (error) {
      console.error('Error loading network data:', error);
    }
  }

  processNetworkData(data) {
    data.nodes.forEach(node => {
      this.nodes.set(node.id, node);
    });

    data.relationships.forEach(rel => {
      if (!this.edges.has(rel.source)) {
        this.edges.set(rel.source, new Set());
      }
      this.edges.get(rel.source).add(rel);
    });

    this.updateVisualization();
  }

  initializeVisualization() {
    const width = 800;
    const height = 600;
    
    this.svg = d3.select('#network-graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));
  }

  updateVisualization() {
    const nodeData = Array.from(this.nodes.values());
    const linkData = Array.from(this.edges.values())
      .flatMap(edgeSet => Array.from(edgeSet));

    // Clear previous visualization
    this.svg.selectAll('*').remove();

    // Create links
    const links = this.svg.append('g')
      .selectAll('line')
      .data(linkData)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.strength) * 2);

    // Create nodes
    const nodes = this.svg.append('g')
      .selectAll('g')
      .data(nodeData)
      .enter()
      .append('g')
      .call(d3.drag()
        .on('start', this.dragstarted.bind(this))
        .on('drag', this.dragged.bind(this))
        .on('end', this.dragended.bind(this)));

    // Add circles for nodes
    nodes.append('circle')
      .attr('r', 20)
      .attr('fill', d => this.getNodeColor(d.type));

    // Add text labels
    nodes.append('text')
      .text(d => d.character)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', 'white');

    // Update simulation
    this.simulation
      .nodes(nodeData)
      .on('tick', () => {
        links
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        nodes
          .attr('transform', d => `translate(${d.x},${d.y})`);
      });

    this.simulation.force('link')
      .links(linkData);

    // Add interactivity
    nodes.on('click', (event, d) => this.showNodeDetails(d));
    nodes.on('mouseover', (event, d) => this.highlightConnections(d));
    nodes.on('mouseout', () => this.resetHighlight());
  }

  getNodeColor(type) {
    const colors = {
      wisdom: '#3498db',
      virtue: '#2ecc71',
      nature: '#e67e22',
      culture: '#9b59b6',
      default: '#95a5a6'
    };
    return colors[type] || colors.default;
  }

  showNodeDetails(node) {
    const detailsContainer = this.container.querySelector('.selected-node-info');
    detailsContainer.innerHTML = `
      <div class="node-details">
        <h4>字符详情 Character Details</h4>
        <div class="character-info">
          <span class="large-character">${node.character}</span>
          <div class="meanings">
            <h5>含义 Meanings</h5>
            <ul>
              ${node.meanings.map(meaning => `<li>${meaning}</li>`).join('')}
            </ul>
          </div>
          <div class="cultural-context">
            <h5>文化背景 Cultural Context</h5>
            <ul>
              ${node.culturalContext.map(context => `<li>${context}</li>`).join('')}
            </ul>
          </div>
          <div class="usage-info">
            <h5>使用情况 Usage</h5>
            ${node.usage.map(use => `
              <div class="usage-item">
                <span class="context">${use.context}</span>
                <div class="frequency-bar">
                  <div class="bar-fill" style="width: ${use.frequency * 100}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  highlightConnections(node) {
    const connectedNodes = new Set();
    const relevantLinks = new Set();

    if (this.edges.has(node.id)) {
      this.edges.get(node.id).forEach(edge => {
        connectedNodes.add(edge.target);
        relevantLinks.add(edge);
      });
    }

    this.svg.selectAll('line')
      .attr('stroke-opacity', d => 
        relevantLinks.has(d) ? 1 : 0.1
      );

    this.svg.selectAll('circle')
      .attr('opacity', d =>
        d.id === node.id || connectedNodes.has(d.id) ? 1 : 0.3
      );
  }

  resetHighlight() {
    this.svg.selectAll('line')
      .attr('stroke-opacity', 0.6);
    
    this.svg.selectAll('circle')
      .attr('opacity', 1);
  }

  dragstarted(event) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  dragended(event) {
    if (!event.active) this.simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  async searchNode(query) {
    const searchResults = Array.from(this.nodes.values())
      .filter(node => 
        node.character.includes(query) ||
        node.meanings.some(meaning => meaning.includes(query))
      );

    this.showSearchResults(searchResults);
  }

  showSearchResults(results) {
    const suggestionPanel = this.container.querySelector('.suggestion-panel');
    suggestionPanel.innerHTML = `
      <div class="search-results">
        ${results.map(result => `
          <div class="result-item" data-id="${result.id}">
            <span class="result-character">${result.character}</span>
            <span class="result-meaning">${result.meanings[0]}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  updateNetworkView(view) {
    this.currentView = view;
    // Update visualization based on selected view
    this.updateVisualization();
  }

  bindEvents() {
    // View switching
    this.container.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.updateNetworkView(btn.dataset.view);
      });
    });

    // Search functionality
    const searchBtn = this.container.querySelector('#search-btn');
    const searchInput = this.container.querySelector('#node-search');

    searchBtn.addEventListener('click', () => {
      this.searchNode(searchInput.value);
    });

    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.searchNode(e.target.value);
      }
    });

    // Relationship filter
    const relationshipFilter = this.container.querySelector('#relationship-filter');
    relationshipFilter.addEventListener('change', () => {
      this.filterRelationships(relationshipFilter.value);
    });

    // Result item clicks
    this.container.querySelector('.suggestion-panel').addEventListener('click', (e) => {
      const resultItem = e.target.closest('.result-item');
      if (resultItem) {
        const nodeId = resultItem.dataset.id;
        const node = this.nodes.get(nodeId);
        if (node) {
          this.focusNode(node);
        }
      }
    });
  }

  focusNode(node) {
    // Center the visualization on the selected node
    const transform = d3.zoomIdentity
      .translate(400, 300)
      .scale(1);
    
    this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, transform);

    this.showNodeDetails(node);
    this.highlightConnections(node);
  }

  filterRelationships(type) {
    // Filter visible relationships based on type
    this.svg.selectAll('line')
      .style('display', d => 
        type === 'all' || d.type === type ? 'block' : 'none'
      );
  }
}

// Export the network visualization
export { NameMeaningNetwork };