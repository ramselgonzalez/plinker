import { motion } from "framer-motion";
import { useRouter } from "next/router";
import routes from "routes";

interface ContainerProps extends React.ComponentPropsWithoutRef<"main"> {}

const variants = {
  enter: (direction: number) => {
    return {
      x: "100%",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: "-100%",
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
  const { children, className } = props;
  const router = useRouter();
  const cid = router.query.cid as string;

  let classes = "page-container";
  if (className) {
    classes = classes + " " + className;
  }

  return (
    <motion.div
      style={{ overflowX: "hidden" }}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      transition={spring}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
          router.push(routes.moves(cid));
        }
      }}
      variants={variants}
      className={classes}
    >
      {children}
    </motion.div>
  );
}

export default Container;
