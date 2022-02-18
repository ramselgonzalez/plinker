import Typography from "components/Typography";
import { AnimatePresence, motion } from "framer-motion";
import data from "data/index.json";
import List from "components/List";
import ListItem from "components/ListItem";
import Link from "next/link";

interface DrawerProps {
  closeDrawer: () => void;
  open: boolean;
}

function Drawer(props: DrawerProps) {
  const { open, closeDrawer } = props;
  return (
    <AnimatePresence>
      {open && (
        <div className="drawer-root">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            className="drawer-modal"
            onClick={closeDrawer}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="drawer-container"
          >
            <div className="drawer-header">
              <Link href="/">
                <a>
                  <Typography uppercase variant="subheading1">
                    Plinker
                  </Typography>
                </a>
              </Link>
            </div>
            <List>
              {data.map((c) => (
                <ListItem key={c.id}>
                  <Link href={`/${c.id}/overview`}>
                    <a className="drawer-link" onClick={closeDrawer}>
                      <Typography>{c.name}</Typography>
                    </a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Drawer;
