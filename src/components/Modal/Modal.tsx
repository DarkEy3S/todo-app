import cls from "./Modal.module.css";
import { type ReactNode, type SyntheticEvent, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import { IconClose } from "../icons.tsx";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalTitleID: string = useId();

  useScrollLock(isOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };
  const handleDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    // клик по backdrop (не по .modalContent)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <dialog
      onClick={handleDialogClick}
      className={cls.dialog}
      ref={dialogRef}
      onClose={onClose}
      onCancel={handleCancel}
      aria-labelledby={modalTitleID}
    >
      <div className={cls.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 id={modalTitleID} className={cls.modalCloseTitle}>
          {title}
        </h2>
        <button type={"button"} onClick={onClose} aria-label="Close" className={cls.modalCloseButton}>
          <IconClose />
        </button>
        {children}
      </div>
    </dialog>,
    document.body,
  );
};
