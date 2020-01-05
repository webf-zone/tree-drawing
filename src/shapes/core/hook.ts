import { useRef, useEffect, EffectCallback } from 'preact/hooks';



export function useAnimationWhen(callback: EffectCallback, shouldRun: boolean, inputs: ReadonlyArray<unknown>) {

  const frameRef = useRef(0);
  const stopFn = useRef(() => {
    cancelAnimationFrame(frameRef.current);
  });

  const loop = () => {
    frameRef.current = requestAnimationFrame(() => {
      callback();
      loop();
    });
  };

  useEffect(() => {

    if (shouldRun) {
      loop();

      return () => cancelAnimationFrame(frameRef.current);
    }

    // No-op function
    return () => {};

  }, [shouldRun, ...inputs]);

  return stopFn;

}
