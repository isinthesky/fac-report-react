import APILogger from './apiLogger';

export const withAPILogging = async (
  apiCall: () => Promise<any>,
  method: string,
  url: string,
  params?: any,
  data?: any
) => {
  const startTime = Date.now();

  try {
    // Log the request
    APILogger.logRequest({
      method,
      url,
      params,
      data
    });

    // Execute the API call
    const response = await apiCall();
    const duration = Date.now() - startTime;

    // Log the success response
    APILogger.logResponse({
      method,
      url,
      status: response?.status,
      response: response?.data,
      duration
    });

    // Collect metrics
    APILogger.collectMetrics({
      method,
      url,
      status: response?.status,
      duration
    });

    return response;
  } catch (error: any) {
    const duration = Date.now() - startTime;

    // Log the error
    APILogger.logError({
      method,
      url,
      status: error.response?.status,
      error,
      duration
    });

    // Collect error metrics
    APILogger.collectMetrics({
      method,
      url,
      status: error.response?.status,
      duration,
      error
    });

    throw error;
  }
};