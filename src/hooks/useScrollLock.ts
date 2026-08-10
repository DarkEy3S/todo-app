import { useEffect } from "react";
import { lockScroll, unlockScroll } from "../utils/scrollLock";

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [isLocked]);
};
