export class WebRTCError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "WebRTCError";
  }
}

export const handleWebRTCError = (error: unknown): WebRTCError => {
  if (error instanceof DOMException) {
    switch (error.name) {
      case "NotAllowedError":
        return new WebRTCError(
          "Permission denied to access media devices",
          "PERMISSION_DENIED"
        );
      case "NotFoundError":
        return new WebRTCError("No media devices found", "DEVICES_NOT_FOUND");
      case "NotReadableError":
        return new WebRTCError(
          "Media device is not accessible",
          "DEVICE_NOT_READABLE"
        );
      default:
        return new WebRTCError(
          `WebRTC error: ${error.message}`,
          "UNKNOWN_ERROR"
        );
    }
  }
  return new WebRTCError("Unknown WebRTC error occurred", "UNKNOWN_ERROR");
};
