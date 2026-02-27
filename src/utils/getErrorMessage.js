import toast from "react-hot-toast";

function extractMessage(data) {
  if (!data) return null;

  // If backend returned plain string
  if (typeof data === "string") return data;

  // Standard DRF / many backends
  if (typeof data.detail === "string") return data.detail;

  // Common API format
  if (typeof data.message === "string") return data.message;

  // If backend returns array of errors
  if (Array.isArray(data)) {
    return extractMessage(data[0]);
  }

  // If object with validation errors
  if (typeof data === "object") {
    for (const key in data) {
      const value = data[key];

      if (Array.isArray(value)) {
        return extractMessage(value[0]);
      }

      if (typeof value === "string") {
        return value;
      }

      if (typeof value === "object") {
        return extractMessage(value);
      }
    }
  }

  return null;
}

export function handleApiError(error, showToast = true) {
  let message = "Something went wrong";

  // Network error (no response from server)
  if (!error?.response) {
    message = error?.message || "Network error. Please check your connection.";
  } else {
    const status = error.response.status;

    // Server errors (500+)
    if (status >= 500) {
      message = "Server error. Please try again later.";
    } else {
      const extracted = extractMessage(error.response.data);
      if (extracted) message = extracted;
    }
  }

  if (showToast) {
    toast.error(message);
  }

  return message;
}
