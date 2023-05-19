import { useCallback, useEffect, useId } from "react";

const ModalContainer = ({ visible, children, onClose }) => {
  const containerId = useId();

  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleClick = ({ target }) => {
    if (target.id === containerId) handleClose();
  };

  useEffect(() => {
    const closeModal = ({ key }) => key === "Escape" && handleClose();

    document.addEventListener("keydown", closeModal);
    return () => document.removeEventListener("keydown", closeModal);
  }, [handleClose]);

  if (!visible) return null;

  return (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default ModalContainer;
