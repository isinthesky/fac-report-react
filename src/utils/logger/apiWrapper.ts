import APILogger from './apiLogger';

export const withLogging = async (
  apiCall: () => Promise<any>,
  method: string,
  url: string,
  params?: any,
  body?: any
) => {
  const startTime = Date.now();
  
  try {
    // Log request
    APILogger.logRequest({
      method,
      url,
      params,
      data: body
    });

    // Execute API call
    const response = await apiCall();

    // Log success response
    APILogger.logResponse({
      method,
      url,
      status: response.status,
      response: response.data,
      duration: Date.now() - startTime
    });

    return response;
  } catch (error: any) {
    // Log error
    APILogger.logError({
      method,
      url,
      error,
      status: error.response?.status
    });

    throw error;
  }
};