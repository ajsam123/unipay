import toast from "react-hot-toast";

function getErrorMessage(error) {
  const response = error?.response?.data;

  let message = "Something went wrong";

  if (response) {
    if (typeof response === "string") {
      message = response;
    } else if (response.message) {
      message = response.message;
    } else {
      const firstKey = Object.keys(response)[0];
      message = response[firstKey]?.[0] || message;
    }
  }

  return message;
}

export function handleApiError(error, showToast = true) {
  const message = getErrorMessage(error);

  if (showToast) {
    toast.error(message);
  }

  return message;
}
