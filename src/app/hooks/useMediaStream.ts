import { useState, useEffect, useCallback } from 'react';

export const useMediaStream = (initialConstraints: IMediaStreamOptions) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getStream = useCallback(async (constraints: IMediaStreamOptions) => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setStream(null);
    }
  }, []);

  useEffect(() => {
    getStream(initialConstraints);
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [initialConstraints, getStream, stream]);

  const updateStream = useCallback((newConstraints: IMediaStreamOptions) => {
    getStream(newConstraints);
  }, [getStream]);

  return { stream, error, updateStream };
};