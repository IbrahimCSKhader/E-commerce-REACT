export function extractApiErrors(error, fallbackMessage = "Something went wrong.") {
  const responseData = error?.response?.data;

  if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
    return responseData.errors.filter(Boolean);
  }

  if (
    typeof responseData?.message === "string" &&
    responseData.message.trim().length > 0
  ) {
    return [responseData.message.trim()];
  }

  if (typeof error?.message === "string" && error.message.trim().length > 0) {
    return [error.message.trim()];
  }

  return [fallbackMessage];
}

export function unwrapApiResponse(data) {
  if (data?.response !== undefined) {
    return data.response;
  }

  return data;
}
