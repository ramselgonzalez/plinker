import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import SecondaryHeader from "components/SecondaryHeader";
import Typography from "components/Typography";

function Layout({ children }: { children: React.ReactNode }) {
  const { route } = useRouter();
  return (
    <div className="flex">
      <header className="fixed z-10 flex h-14 w-full border-b border-b-neutral-500 bg-neutral-900">
        <nav className="mx-auto my-0 w-full xl:w-xl ">
          <div className="inline-block p-4">
            <Link href="/">
              <a>
                <Typography className="uppercase" variant="h4">
                  Plinker
                </Typography>
              </a>
            </Link>
          </div>
        </nav>
      </header>
      {route !== "/" ? <SecondaryHeader /> : <div className="hidden h-12 xl:block" />}
      {children}
    </div>
  );
}

export default Layout;
