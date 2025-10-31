/**
 * Parallel Translation Service
 * Provides utilities for translating content to multiple languages concurrently
 */

export interface TranslationTask<T> {
  id: string
  language: string
  data: T
}

export interface TranslationResult<T> {
  id: string
  language: string
  data: T
  success: boolean
  error?: Error
  duration: number
  timestamp: Date
}

export interface ParallelTranslationConfig {
  /** Maximum number of concurrent translations (default: 3) */
  maxConcurrent: number
  /** Enable progress logging (default: true) */
  verbose: boolean
  /** Retry failed translations (default: 3) */
  maxRetries: number
  /** Delay between retries in ms (default: 1000) */
  retryDelayMs: number
  /** Timeout per translation in ms (default: 60000) */
  timeoutMs: number
}

export class ParallelTranslationService {
  private config: ParallelTranslationConfig

  constructor(config: Partial<ParallelTranslationConfig> = {}) {
    this.config = {
      maxConcurrent: config.maxConcurrent ?? 3,
      verbose: config.verbose ?? true,
      maxRetries: config.maxRetries ?? 3,
      retryDelayMs: config.retryDelayMs ?? 1000,
      timeoutMs: config.timeoutMs ?? 60000,
    }
  }

  private log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    if (!this.config.verbose) return

    const timestamp = new Date().toISOString()
    const prefix = {
      info: '📝',
      warn: '⚠️',
      error: '❌',
    }[level]

    console.log(`[${timestamp}] ${prefix} ${message}`)
  }

  /**
   * Create a timeout promise that rejects after specified ms
   */
  private createTimeoutPromise<T>(ms: number): Promise<T> {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms),
    )
  }

  /**
   * Execute a single translation with timeout and retries
   */
  private async executeWithRetry<T>(
    task: TranslationTask<T>,
    executor: (task: TranslationTask<T>) => Promise<T>,
  ): Promise<TranslationResult<T>> {
    const startTime = Date.now()
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        this.log(`[${task.language}] Attempt ${attempt}/${this.config.maxRetries}`)

        const result = await Promise.race([
          executor(task),
          this.createTimeoutPromise<T>(this.config.timeoutMs),
        ])

        const duration = Date.now() - startTime
        this.log(`[${task.language}] ✅ Success (${duration}ms)`)

        return {
          id: task.id,
          language: task.language,
          data: result,
          success: true,
          duration,
          timestamp: new Date(),
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))

        if (attempt < this.config.maxRetries) {
          const delay = this.config.retryDelayMs * attempt
          this.log(`[${task.language}] Retrying in ${delay}ms: ${lastError.message}`, 'warn')
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    const duration = Date.now() - startTime
    this.log(`[${task.language}] Failed after ${this.config.maxRetries} attempts`, 'error')

    return {
      id: task.id,
      language: task.language,
      data: null as unknown as T,
      success: false,
      error: lastError || new Error('Unknown error'),
      duration,
      timestamp: new Date(),
    }
  }

  /**
   * Execute multiple translation tasks in parallel with concurrency control
   */
  async translateInParallel<T>(
    tasks: TranslationTask<T>[],
    executor: (task: TranslationTask<T>) => Promise<T>,
  ): Promise<TranslationResult<T>[]> {
    const totalTasks = tasks.length
    let completed = 0

    this.log(
      `Starting parallel translation of ${totalTasks} tasks (max ${this.config.maxConcurrent} concurrent)`,
    )

    const results: TranslationResult<T>[] = []
    const queue = [...tasks]
    const inProgress = new Map<string, Promise<TranslationResult<T>>>()

    const processNext = async (): Promise<void> => {
      if (queue.length === 0 && inProgress.size === 0) {
        return
      }

      while (inProgress.size < this.config.maxConcurrent && queue.length > 0) {
        const task = queue.shift()!
        const promise = this.executeWithRetry(task, executor)
        inProgress.set(task.id, promise)

        promise.then((result) => {
          results.push(result)
          inProgress.delete(task.id)
          completed++
          this.log(`Progress: ${completed}/${totalTasks} tasks completed`)
          processNext()
        })
      }

      if (inProgress.size > 0) {
        await Promise.race(inProgress.values())
      }
    }

    await processNext()

    const successCount = results.filter((r) => r.success).length
    const failureCount = results.filter((r) => !r.success).length
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0)

    this.log(
      `Parallel translation completed: ${successCount}✅ / ${failureCount}❌ (${totalDuration}ms total)`,
    )

    return results
  }

  /**
   * Batch translate by grouping tasks and processing groups sequentially
   */
  async translateInBatches<T>(
    tasks: TranslationTask<T>[],
    executor: (task: TranslationTask<T>) => Promise<T>,
    batchSize: number = 5,
  ): Promise<TranslationResult<T>[]> {
    const batches = []
    for (let i = 0; i < tasks.length; i += batchSize) {
      batches.push(tasks.slice(i, i + batchSize))
    }

    this.log(`Processing ${tasks.length} tasks in ${batches.length} batches of ${batchSize}`)

    const allResults: TranslationResult<T>[] = []

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      this.log(`Processing batch ${batchIndex + 1}/${batches.length}`)
      const batchResults = await this.translateInParallel(batches[batchIndex], executor)
      allResults.push(...batchResults)
    }

    return allResults
  }

  /**
   * Create tasks from an array of languages and data
   */
  static createTasks<T>(
    languages: string[],
    data: T,
    idPrefix: string = 'translation',
  ): TranslationTask<T>[] {
    return languages.map((language, index) => ({
      id: `${idPrefix}-${language}-${index}`,
      language,
      data,
    }))
  }

  /**
   * Filter results by success/failure status
   */
  static filterResults<T>(
    results: TranslationResult<T>[],
    success: boolean,
  ): TranslationResult<T>[] {
    return results.filter((r) => r.success === success)
  }

  /**
   * Get results summary
   */
  static getSummary<T>(results: TranslationResult<T>[]): {
    total: number
    successful: number
    failed: number
    successRate: number
    averageDuration: number
  } {
    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length
    const avgDuration =
      results.length > 0 ? results.reduce((sum, r) => sum + r.duration, 0) / results.length : 0

    return {
      total: results.length,
      successful,
      failed,
      successRate: results.length > 0 ? (successful / results.length) * 100 : 0,
      averageDuration: avgDuration,
    }
  }
}
