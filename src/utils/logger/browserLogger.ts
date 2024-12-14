type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
}

class BrowserLogger {
  private static instance: BrowserLogger;
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 1000;

  private constructor() {}

  static getInstance(): BrowserLogger {
    if (!BrowserLogger.instance) {
      BrowserLogger.instance = new BrowserLogger();
    }
    return BrowserLogger.instance;
  }

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private addToHistory(entry: LogEntry) {
    this.logHistory.push(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }
  }

  private createLogEntry(level: LogLevel, message: string, details?: any): LogEntry {
    return {
      timestamp: this.formatTimestamp(),
      level,
      message,
      details
    };
  }

  debug(message: string, details?: any) {
    const entry = this.createLogEntry('debug', message, details);
    this.addToHistory(entry);
    if (import.meta.env.DEV) {
      console.debug(`[${entry.timestamp}] [DEBUG] ${message}`, details || '');
    }
  }

  info(message: string, details?: any) {
    const entry = this.createLogEntry('info', message, details);
    this.addToHistory(entry);
    console.info(`[${entry.timestamp}] [INFO] ${message}`, details || '');
  }

  warn(message: string, details?: any) {
    const entry = this.createLogEntry('warn', message, details);
    this.addToHistory(entry);
    console.warn(`[${entry.timestamp}] [WARN] ${message}`, details || '');
  }

  error(message: string, details?: any) {
    const entry = this.createLogEntry('error', message, details);
    this.addToHistory(entry);
    console.error(`[${entry.timestamp}] [ERROR] ${message}`, details || '');

    // 운영환경에서는 에러 모니터링 서비스로 전송
    if (import.meta.env.PROD) {
      this.sendToErrorMonitoring(entry);
    }
  }

  private sendToErrorMonitoring(entry: LogEntry) {
    // Sentry나 다른 에러 모니터링 서비스로 전송하는 로직
    // 예: Sentry.captureException(entry);
  }

  getLogHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  clearHistory() {
    this.logHistory = [];
  }
}

export default BrowserLogger.getInstance();