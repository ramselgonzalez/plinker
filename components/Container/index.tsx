import { motion } from "framer-motion";
import useMediaQuery from "hooks/useMediaQuery";
interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

const variants = {
  hidden: { opacity: 0, x: 0, y: -100 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 100, y: 0 },
};

const mobileVariants = {
  hidden: { opacity: 0, x: 0, y: 200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 100 },
};

function Container(props: ContainerProps) {
  const { children, className } = props;
  const isMobile = useMediaQuery("(max-width: 480px)");
  let classes = "page-container";
  if (className) {
    classes = classes + " " + className;
  }

  const motionProps = {
    variants: isMobile ? mobileVariants : variants,
    initial: "hidden",
    animate: "enter",
    exit: "exit",
    transition: { type: "linear" },
  };

  return <main className={classes}>{children}</main>;
}

export default Container;
