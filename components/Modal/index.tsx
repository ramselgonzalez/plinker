import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";

interface IPortalProps {
  children: React.ReactNode;
  selector: string;
}

function Portal({ children, selector }: IPortalProps) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  if (!mounted) {
    return null;
  }

  if (!ref.current) {
    return null;
  }

  return ReactDOM.createPortal(children, ref.current);
}

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  open?: boolean;
}

function Modal(props: IModalProps) {
  const { children, open, onClose } = props;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    if (!open) {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <Portal selector="#modal">
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40">
            <motion.div
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1] bg-black/40"
            />
            {children}
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default Modal;
