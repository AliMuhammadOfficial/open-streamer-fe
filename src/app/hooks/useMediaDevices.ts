import { useState, useEffect, useCallback } from 'react';

export const useMediaDevices = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const getDevices = useCallback(async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      setDevices(deviceList);
    } catch (error) {
      console.error('Error enumerating devices:', error);
    }
  }, []);

  useEffect(() => {
    getDevices();
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, [getDevices]);

  const filterDevices = useCallback((kind: MediaDeviceKind) => 
    devices.filter(device => device.kind === kind),
  [devices]);

  return {
    devices,
    cameras: filterDevices('videoinput'),
    microphones: filterDevices('audioinput'),
    speakers: filterDevices('audiooutput'),
  };
};