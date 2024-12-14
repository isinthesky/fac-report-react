import Logger from './browserLogger';

export interface APILogMetadata {
  method: string;
  url: string;
  params?: any;
  data?: any;
  duration?: number;
  status?: number;
  response?: any;
  error?: any;
}

class APILogger {
  static logRequest(metadata: APILogMetadata) {
    Logger.info('API Request', {
      method: metadata.method,
      url: metadata.url,
      params: this.sanitizeData(metadata.params),
      data: this.sanitizeData(metadata.data),
      timestamp: new Date().toISOString(),
    });
  }

  static logResponse(metadata: APILogMetadata) {
    Logger.info('API Response', {
      method: metadata.method,
      url: metadata.url,
      status: metadata.status,
      duration: `${metadata.duration}ms`,
      response: this.sanitizeData(metadata.response),
      timestamp: new Date().toISOString(),
    });

    // 응답 시간 모니터링
    if (metadata.duration && metadata.duration > 1000) {
      Logger.warn('Slow API Response', {
        method: metadata.method,
        url: metadata.url,
        duration: `${metadata.duration}ms`,
      });
    }
  }

  static logError(metadata: APILogMetadata) {
    Logger.error('API Error', {
      method: metadata.method,
      url: metadata.url,
      status: metadata.status,
      error: metadata.error?.message || metadata.error,
      stack: metadata.error?.stack,
      timestamp: new Date().toISOString(),
    });
  }

  private static sanitizeData(data: any) {
    if (!data) return data;
    
    const sensitiveFields = ['password', 'token', 'authorization'];
    const sanitized = { ...data };

    Object.keys(sanitized).forEach(key => {
      if (sensitiveFields.includes(key.toLowerCase())) {
        sanitized[key] = '******';
      }
    });

    return sanitized;
  }

  // 성능 메트릭 수집
  static collectMetrics(metadata: APILogMetadata) {
    if (!metadata.duration) return;

    // 커스텀 메트릭 수집 로직
    const metrics = {
      endpoint: metadata.url,
      method: metadata.method,
      duration: metadata.duration,
      timestamp: Date.now(),
      status: metadata.status || 0
    };

    // 로컬 스토리지에 메트릭 저장 (임시 저장소로 사용)
    const storedMetrics = JSON.parse(localStorage.getItem('api_metrics') || '[]');
    storedMetrics.push(metrics);
    if (storedMetrics.length > 1000) storedMetrics.shift(); // 최대 1000개 저장
    localStorage.setItem('api_metrics', JSON.stringify(storedMetrics));
  }

  // 성능 메트릭 분석
  static analyzeMetrics() {
    const metrics = JSON.parse(localStorage.getItem('api_metrics') || '[]');
    if (metrics.length === 0) return;

    const analysis = metrics.reduce((acc: any, curr: any) => {
      const endpoint = curr.endpoint;
      if (!acc[endpoint]) {
        acc[endpoint] = {
          count: 0,
          totalDuration: 0,
          maxDuration: 0,
          errorCount: 0
        };
      }

      acc[endpoint].count++;
      acc[endpoint].totalDuration += curr.duration;
      acc[endpoint].maxDuration = Math.max(acc[endpoint].maxDuration, curr.duration);
      if (curr.status >= 400) acc[endpoint].errorCount++;

      return acc;
    }, {});

    // 분석 결과 로깅
    Object.entries(analysis).forEach(([endpoint, stats]: [string, any]) => {
      Logger.info('API Metrics Analysis', {
        endpoint,
        averageDuration: stats.totalDuration / stats.count,
        maxDuration: stats.maxDuration,
        errorRate: (stats.errorCount / stats.count) * 100,
        totalCalls: stats.count
      });
    });
  }
}

// 주기적으로 메트릭 분석 실행 (예: 1시간마다)
setInterval(() => {
  APILogger.analyzeMetrics();
}, 3600000);

export default APILogger;