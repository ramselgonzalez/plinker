import cn from "classnames";
import React from "react";
import Modal from "components/Modal";
import { AnimatePresence, motion } from "framer-motion";

interface IDrawerProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  position?: "left" | "right";
  onClose: () => void;
  open?: boolean;
}

function Drawer(props: IDrawerProps) {
  const { children, className, onClose, open, position = "left" } = props;
  return (
    <Modal onClose={onClose} open={open}>
      <motion.div
        className={cn("fixed h-full w-3/4 overflow-y-auto bg-neutral-800 shadow-lg shadow-black/90 duration-300", {
          [`${className}`]: className,
        })}
        initial={{ [position]: "-100%" }}
        animate={{ [position]: 0 }}
        exit={{ [position]: "-100%" }}
        transition={{ duration: 0.05 }}
      >
        {children}
      </motion.div>
    </Modal>
  );
}

export default Drawer;
