import { createPortal } from "react-dom";

// import styles from "./styles.module.css";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
}

export function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div >
      <div

        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
