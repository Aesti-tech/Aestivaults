import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import styles from "../modules/Modal.module.css";
import { cloneElement, createContext, useContext, useState } from "react";
import useHandleClick from "../hooks/useHandleClick.js";

const Modalcontext = createContext();

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(Modalcontext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(Modalcontext);
  const ref = useHandleClick(close);
  if (name !== openName) return null;
  return createPortal(
    <div className={styles.overlay}>
      <div className={`${styles.modal} modal`} ref={ref}>
        <button className={styles.button} onClick={close}>
          <HiXMark />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <Modalcontext.Provider value={{ openName, close, open }}>
      {children}
    </Modalcontext.Provider>
  );
}

export default Modal;

Modal.Open = Open;
Modal.Window = Window;

export function useModal() {
  const context = useContext(Modalcontext);

  if (context === undefined)
    throw new Error(
      "you are trying to access the modal context outside its provider"
    );

  return context;
}
