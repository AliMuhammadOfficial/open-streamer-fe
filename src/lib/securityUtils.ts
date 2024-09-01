export const sanitizeDeviceId = (deviceId: string): string => {
  return deviceId.replace(/[^a-zA-Z0-9\-_]/g, "");
};

export const validateConstraints = (
  constraints: IMediaStreamOptions
): boolean => {
  
  return (
    (typeof constraints.video === "boolean" ||
      typeof constraints.video === "object") &&
    (typeof constraints.audio === "boolean" ||
      typeof constraints.audio === "object")
  );
};
