/**
 * 🌐 ADVANCED VECTOR DATABASE & SEMANTIC SEARCH
 * Multi-modal retrieval with hybrid search and reranking
 * 
 * Features:
 * - Semantic embeddings generation
 * - Hybrid BM25 + Vector search
 * - Cross-encoder reranking
 * - Vector store management
 * - Real-time indexing
 * - Query expansion
 */

interface VectorEmbedding {
  id: string;
  text: string;
  embedding: number[];
  metadata: Record<string, any>;
  timestamp: Date;
}

interface SearchResult {
  id: string;
  text: string;
  relevance: number;
  score: number;
  metadata: Record<string, any>;
  explanation: string;
}

interface HybridSearchOptions {
  topK?: number;
  weights?: {
    bm25: number;
    vector: number;
  };
  minRelevance?: number;
  useReranking?: boolean;
}

/**
 * 🚀 VECTOR DATABASE WITH SEMANTIC SEARCH
 */
export class AdvancedVectorDatabase {
  private vectorStore: Map<string, VectorEmbedding> = new Map();
  private bm25Index: Map<string, Set<string>> = new Map(); // Word to doc IDs
  private vectorIndex: VectorEmbedding[] = [];
  private embeddingDimension: number = 384;

  constructor() {
    this.initializeVectorStore();
  }

  /**
   * Initialize with sample embeddings
   */
  private initializeVectorStore(): void {
    const sampleDocs = [
      "User authentication with NextAuth.js and OAuth providers",
      "Real-time chat system with WebSocket and Redis",
      "PostgreSQL database with Prisma ORM",
      "Advanced caching strategies with TTL management",
      "Machine learning model serving and inference",
      "Vector search with semantic embeddings",
      "Quantum algorithms for optimization",
      "Autonomous agent for continuous improvement",
      "API rate limiting and request validation",
      "Security headers and CORS configuration",
    ];

    sampleDocs.forEach((doc, idx) => {
      const id = `doc_${idx}`;
      const embedding = this.generateEmbedding(doc);
      const vectorEmbedding: VectorEmbedding = {
        id,
        text: doc,
        embedding,
        metadata: { index: idx, source: "documentation" },
        timestamp: new Date(),
      };

      this.vectorStore.set(id, vectorEmbedding);
      this.vectorIndex.push(vectorEmbedding);
      this.indexBM25(doc, id);
    });

    console.log(`✅ Vector database initialized with ${sampleDocs.length} documents`);
  }

  /**
   * 🧠 GENERATE EMBEDDINGS - Simulated semantic embeddings
   */
  private generateEmbedding(text: string): number[] {
    const words = text.toLowerCase().split(/\W+/);
    const embedding = new Array(this.embeddingDimension).fill(0);

    // Simulate embedding based on word frequencies and positions
    for (let i = 0; i < words.length; i++) {
      const wordHash = this.hashWord(words[i]);
      for (let j = 0; j < this.embeddingDimension; j++) {
        embedding[j] +=
          Math.sin((wordHash + i) * (j + 1)) *
          Math.cos((wordHash - i) * (j + 1));
      }
    }

    // Normalize embedding
    const magnitude = Math.sqrt(
      embedding.reduce((sum, val) => sum + val * val, 0)
    );
    return embedding.map((val) => val / Math.max(magnitude, 1));
  }

  /**
   * 📚 INDEX DOCUMENT WITH BM25
   */
  private indexBM25(text: string, docId: string): void {
    const words = text.toLowerCase().split(/\W+/);
    const uniqueWords = new Set(words);

    for (const word of uniqueWords) {
      if (word.length > 2) {
        // Skip short words
        if (!this.bm25Index.has(word)) {
          this.bm25Index.set(word, new Set());
        }
        this.bm25Index.get(word)!.add(docId);
      }
    }
  }

  /**
   * 🔍 HYBRID SEARCH - BM25 + Vector Search
   */
  async hybridSearch(
    query: string,
    options: HybridSearchOptions = {}
  ): Promise<SearchResult[]> {
    const {
      topK = 10,
      weights = { bm25: 0.3, vector: 0.7 },
      minRelevance = 0.3,
      useReranking = true,
    } = options;

    // 1. Expand query
    const expandedQuery = this.expandQuery(query);

    // 2. BM25 Search
    const bm25Results = this.bm25Search(expandedQuery);

    // 3. Vector Search
    const queryEmbedding = this.generateEmbedding(query);
    const vectorResults = this.vectorSearch(queryEmbedding);

    // 4. Combine results
    const combinedResults = this.combineResults(
      bm25Results,
      vectorResults,
      weights
    );

    // 5. Apply reranking if enabled
    let finalResults = combinedResults;
    if (useReranking) {
      finalResults = await this.rerank(query, combinedResults);
    }

    // 6. Filter by minimum relevance and limit to topK
    return finalResults
      .filter((r) => r.relevance >= minRelevance)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, topK)
      .map((r) => ({
        ...r,
        explanation: this.explainRelevance(r, query),
      }));
  }

  /**
   * 🎯 SEMANTIC VECTOR SEARCH
   */
  private vectorSearch(queryEmbedding: number[]): SearchResult[] {
    const results: SearchResult[] = [];

    for (const doc of this.vectorIndex) {
      const similarity = this.cosineSimilarity(queryEmbedding, doc.embedding);

      if (similarity > 0.3) {
        results.push({
          id: doc.id,
          text: doc.text,
          relevance: similarity,
          score: similarity,
          metadata: doc.metadata,
          explanation: "",
        });
      }
    }

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  /**
   * 📖 BM25 KEYWORD SEARCH
   */
  private bm25Search(query: string): SearchResult[] {
    const queryWords = query.toLowerCase().split(/\W+/);
    const docScores = new Map<string, number>();

    // Count matching documents
    for (const word of queryWords) {
      const matchingDocs = this.bm25Index.get(word) || new Set();

      for (const docId of matchingDocs) {
        docScores.set(docId, (docScores.get(docId) || 0) + 1);
      }
    }

    const results: SearchResult[] = [];

    for (const [docId, score] of docScores.entries()) {
      const doc = this.vectorStore.get(docId);
      if (doc) {
        const normalizedScore = Math.min(1, score / queryWords.length);

        results.push({
          id: docId,
          text: doc.text,
          relevance: normalizedScore,
          score: normalizedScore,
          metadata: doc.metadata,
          explanation: "",
        });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * 🔄 QUERY EXPANSION
   */
  private expandQuery(query: string): string {
    const synonyms: Record<string, string[]> = {
      ai: ["artificial intelligence", "machine learning"],
      ml: ["machine learning", "deep learning"],
      api: ["application programming interface", "endpoint"],
      auth: ["authentication", "authorization"],
      db: ["database", "data store"],
      cache: ["caching", "memory store"],
      real: ["real-time", "live", "instant"],
    };

    let expanded = query;

    for (const [word, syns] of Object.entries(synonyms)) {
      if (query.includes(word)) {
        expanded += " " + syns.join(" ");
      }
    }

    return expanded;
  }

  /**
   * 🔀 COMBINE BM25 + VECTOR RESULTS
   */
  private combineResults(
    bm25Results: SearchResult[],
    vectorResults: SearchResult[],
    weights: { bm25: number; vector: number }
  ): SearchResult[] {
    const combined = new Map<string, SearchResult>();

    // Add BM25 results
    for (const result of bm25Results) {
      combined.set(result.id, {
        ...result,
        score: result.score * weights.bm25,
        relevance: result.score * weights.bm25,
      });
    }

    // Add/merge vector results
    for (const result of vectorResults) {
      if (combined.has(result.id)) {
        const existing = combined.get(result.id)!;
        existing.score += result.score * weights.vector;
        existing.relevance = existing.score / (weights.bm25 + weights.vector);
      } else {
        combined.set(result.id, {
          ...result,
          score: result.score * weights.vector,
          relevance: result.score * weights.vector,
        });
      }
    }

    return Array.from(combined.values()).sort(
      (a, b) => b.relevance - a.relevance
    );
  }

  /**
   * 🎯 RERANKING WITH CROSS-ENCODER
   */
  private async rerank(
    query: string,
    results: SearchResult[]
  ): Promise<SearchResult[]> {
    // Simulate cross-encoder reranking
    const reranked = results.map((result) => {
      // Calculate relevance based on overlap and semantic similarity
      const queryWords = new Set(query.toLowerCase().split(/\W+/));
      const resultWords = new Set(result.text.toLowerCase().split(/\W+/));

      const overlap = Array.from(queryWords).filter((w) =>
        resultWords.has(w)
      ).length;
      const jaccardSimilarity =
        overlap / (queryWords.size + resultWords.size - overlap);

      const rerankedScore = result.relevance * 0.6 + jaccardSimilarity * 0.4;

      return {
        ...result,
        score: rerankedScore,
        relevance: rerankedScore,
      };
    });

    return reranked.sort((a, b) => b.relevance - a.relevance);
  }

  /**
   * 📊 COSINE SIMILARITY
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      dotProduct += a[i] * b[i];
      magnitudeA += a[i] * a[i];
      magnitudeB += b[i] * b[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) return 0;

    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * 🧮 HASH WORD FOR EMBEDDING
   */
  private hashWord(word: string): number {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      const char = word.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * 💡 EXPLAIN RELEVANCE
   */
  private explainRelevance(result: SearchResult, query: string): string {
    const queryWords = query.toLowerCase().split(/\W+/);
    const resultWords = result.text.toLowerCase().split(/\W+/);
    const matches = queryWords.filter((w) => resultWords.includes(w));

    return `Matched ${matches.length} terms: ${matches.join(", ")}. Relevance: ${(result.relevance * 100).toFixed(1)}%`;
  }

  /**
   * 💾 ADD DOCUMENT
   */
  async addDocument(
    text: string,
    metadata: Record<string, any> = {}
  ): Promise<string> {
    const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const embedding = this.generateEmbedding(text);

    const vectorEmbedding: VectorEmbedding = {
      id,
      text,
      embedding,
      metadata,
      timestamp: new Date(),
    };

    this.vectorStore.set(id, vectorEmbedding);
    this.vectorIndex.push(vectorEmbedding);
    this.indexBM25(text, id);

    return id;
  }

  /**
   * 📊 GET VECTOR STORE STATS
   */
  getStats(): {
    totalDocuments: number;
    embeddingDimension: number;
    indexedWords: number;
    storageSize: number;
  } {
    return {
      totalDocuments: this.vectorStore.size,
      embeddingDimension: this.embeddingDimension,
      indexedWords: this.bm25Index.size,
      storageSize: this.vectorStore.size * this.embeddingDimension * 8, // bytes
    };
  }
}

export default AdvancedVectorDatabase;
