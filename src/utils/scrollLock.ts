let lockCount: number = 0;

export const lockScroll = () => {
  lockCount++;
  if (lockCount === 1) {
    const scrollbarWidth: number = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + "px";
    }
    document.body.style.overflow = "hidden";
  }
};

export const unlockScroll = () => {
  lockCount--;
  if (lockCount <= 0) {
    lockCount = 0;
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";
  }
};
