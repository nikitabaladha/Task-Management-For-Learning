export const handleApiError = (error: any): string => {
  const errorData = error.response?.data;
  
  if (errorData?.errors && Array.isArray(errorData.errors)) {
    return errorData.errors.join(", ");
  }
  
  if (errorData?.message) {
    return errorData.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return "An unexpected error occurred";
};