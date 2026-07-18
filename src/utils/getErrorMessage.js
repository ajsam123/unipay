import toast from "react-hot-toast";

function extractMessage(data) {
  if (!data) return null;

  // Plain string
  if (typeof data === "string") {
    return data;
  }

  // Prioritize common message fields
  if (typeof data.message === "string") {
    return data.message;
  }

  if (Array.isArray(data.message) && data.message.length) {
    return extractMessage(data.message[0]);
  }

  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.detail) && data.detail.length) {
    return extractMessage(data.detail[0]);
  }

  // If it's an array
  if (Array.isArray(data)) {
    return extractMessage(data[0]);
  }

  // Validation errors
  if (typeof data === "object") {
    const ignoredKeys = ["success", "code"];

    for (const key in data) {
      if (ignoredKeys.includes(key)) continue;

      const value = data[key];

      if (Array.isArray(value) && value.length) {
        return extractMessage(value[0]);
      }

      if (typeof value === "string") {
        return value;
      }

      if (typeof value === "object") {
        const nested = extractMessage(value);
        if (nested) return nested;
      }
    }
  }

  return null;
}

export function handleApiError(error, showToast = true) {
  let message = "Something went wrong";

  // No response = network error
  if (!error?.response) {
    message = error?.message || "Network error. Please check your connection.";
  } else {
    const { status, data } = error.response;

    if (status >= 500) {
      message = "Server error. Please try again later.";
    } else {
      const extracted = extractMessage(data);
      if (extracted) {
        message = extracted;
      }
    }
  }

  if (showToast) {
    toast.error(message);
  }

  return message;
}
