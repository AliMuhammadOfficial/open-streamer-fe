
export const getDeviceById = async (deviceId: string, kind: MediaDeviceKind): Promise<MediaDeviceInfo | undefined> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.find(device => device.deviceId === deviceId && device.kind === kind);
};

export const getDefaultDeviceId = async (kind: MediaDeviceKind): Promise<string | undefined> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const defaultDevice = devices.find(device => device.kind === kind);
  return defaultDevice?.deviceId;
};

export const createMediaStreamTrack = async (
  kind: 'audio' | 'video',
  deviceId?: string,
  additionalConstraints?: MediaTrackConstraints
): Promise<MediaStreamTrack> => {
  const constraints: MediaStreamConstraints = {
    [kind]: {
      deviceId: deviceId ? { exact: deviceId } : undefined,
      ...additionalConstraints,
    },
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  return stream.getTracks()[0];
};

export const replaceTrack = (stream: MediaStream, newTrack: MediaStreamTrack): void => {
  const oldTrack = stream.getTracks().find(track => track.kind === newTrack.kind);
  if (oldTrack) {
    stream.removeTrack(oldTrack);
    oldTrack.stop();
  }
  stream.addTrack(newTrack);
};

export const toggleTrack = (stream: MediaStream, kind: 'audio' | 'video', enabled: boolean): void => {
  stream.getTracks()
    .filter(track => track.kind === kind)
    .forEach(track => { track.enabled = enabled; });
};

export const applyConstraints = async (
  stream: MediaStream,
  kind: 'audio' | 'video',
  constraints: MediaTrackConstraints
): Promise<void> => {
  const track = stream.getTracks().find(t => t.kind === kind);
  if (track) {
    await track.applyConstraints(constraints);
  }
};