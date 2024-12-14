import { logAPIRequest, logAPIResponse, logAPIError } from './apiLogger';

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
    logAPIRequest({
      method,
      url,
      params,
      body
    });

    // Execute API call
    const response = await apiCall();

    // Log success response
    logAPIResponse({
      method,
      url,
      status: response.status,
      response: response.data,
      duration: Date.now() - startTime
    });

    return response;
  } catch (error: any) {
    // Log error
    logAPIError({
      method,
      url,
      error,
      status: error.response?.status
    });

    throw error;
  }
};