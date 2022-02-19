import { motion } from "framer-motion";

interface ContainerProps extends React.ComponentPropsWithoutRef<"main"> {
  custom?: number;
  handleSwipe?: (swipe: number) => void;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
    };
  },
};

const spring = {
  type: "spring",
  delay: 0,
  stiffness: 500,
  damping: 60,
  mass: 1,
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function Container(props: ContainerProps) {
  const { children, className, custom, handleSwipe } = props;

  let classes = "page-container";
  if (className) {
    classes = classes + " " + className;
  }

  return (
    <div style={{ position: "relative" }}>
      <motion.main
        custom={custom}
        initial="enter"
        animate="center"
        exit="exit"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        transition={spring}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            handleSwipe?.(1);
          } else if (swipe > swipeConfidenceThreshold) {
            handleSwipe?.(-1);
          }
        }}
        variants={variants}
        className={classes}
        style={{ position: "absolute" }}
      >
        {children}
      </motion.main>
    </div>
  );
}

export default Container;
