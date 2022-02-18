import Link from "next/link";
import { useRouter } from "next/router";
import Drawer from "components/Drawer";
import SecondaryHeader from "components/SecondaryHeader";
import React, { useState } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const { route } = useRouter();
  return (
    <div className="app-container">
      <DrawerProvider>
        {({ open, toggleDrawer }) => (
          <>
            <Drawer closeDrawer={toggleDrawer} open={open} />
            <header className="header">
              <button className="menu" onClick={toggleDrawer}>
                <span />
                <span />
                <span />
              </button>
              <Link href="/">
                <a className="typography-subheading1 uppercase">Plinker</a>
              </Link>
            </header>
          </>
        )}
      </DrawerProvider>
      {route !== "/" ? <SecondaryHeader /> : <div className="secondary-header-offset" />}
      {children}
    </div>
  );
}

export default Layout;

interface DrawerProviderProps {
  children: (options: { open: boolean; toggleDrawer: () => void }) => React.ReactNode;
}

function DrawerProvider(props: DrawerProviderProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen((open) => !open);
  }

  return <>{children({ open, toggleDrawer })}</>;
}
