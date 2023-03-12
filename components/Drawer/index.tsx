// packages
import React from "react";
import cn from "classnames";
import { motion } from "framer-motion";
// components
import { ChevronLeft, ChevronRight } from "components/Icon";
import Modal from "components/Modal";
import Typography from "components/Typography";

interface IDrawerProps extends React.ComponentPropsWithoutRef<"div"> {
  heading: string;
  position?: "left" | "right";
  onClose: () => void;
  open?: boolean;
}

function Drawer(props: IDrawerProps) {
  const { children, heading, className, onClose, open, position = "left" } = props;
  return (
    <Modal onClose={onClose} open={open}>
      <motion.div
        animate={{ [position]: 0 }}
        className={cn(
          "fixed h-full w-3/4 max-w-[300px] overflow-y-auto bg-neutral-800 shadow-lg shadow-black/90 duration-300",
          {
            [`${className}`]: className,
          }
        )}
        exit={{ [position]: "-100%" }}
        initial={{ [position]: "-100%" }}
        transition={{ duration: 0.05 }}
      >
        <div className="flex h-14 items-center border-b border-neutral-600 px-4">
          <button
            className={cn("flex w-full items-center gap-4", {
              ["justify-between"]: position === "left",
            })}
            onClick={onClose}
          >
            {position === "right" && <ChevronRight />}
            <Typography className="uppercase" variant="h4">
              {heading}
            </Typography>
            {position === "left" && <ChevronLeft />}
          </button>
        </div>
        {children}
      </motion.div>
    </Modal>
  );
}

export default Drawer;
