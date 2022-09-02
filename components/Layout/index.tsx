import { useState } from "react";
import { useRouter } from "next/router";
import characters from "db/index.json";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "components/Icon";
import Link from "components/Link";
import SecondaryHeader from "components/SecondaryHeader";
import Typography from "components/Typography";
import routes from "routes";
import Drawer from "components/Drawer";

function Layout({ children }: { children: React.ReactNode }) {
  const { route } = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex">
      <header className="fixed z-20 flex h-14 w-full border-b border-b-neutral-500 bg-neutral-900">
        <nav className="mx-auto my-0 flex w-full items-center gap-4 px-4 md:px-8 xl:w-xl">
          <button className="lg:hidden" onClick={() => setDrawerOpen(true)}>
            <Menu />
          </button>
          <Link href={routes.home} className="inline-block rounded-2xl uppercase" color="white" variant="h4">
            Plinker
          </Link>
          <ul className="ml-2 border-l border-neutral-500 pl-2">
            <li className="group relative hidden lg:block">
              <button className="hover flex cursor-pointer items-center gap-x-2 rounded-2xl py-2 px-4">
                <Typography className="uppercase" color="gray" component="p" variant="h4">
                  Characters
                </Typography>
                <ChevronDown />
              </button>
              <div className="absolute left-0 hidden group-focus-within:block group-hover:block">
                <ul className="paper mt-2 h-64 w-48 overflow-scroll py-4">
                  {characters.map((c) => (
                    <li key={c.id} className="hover:bg-neutral-700/50">
                      <Link
                        href={routes.overview(c.id)}
                        className="mx-1 block scroll-mb-2 rounded-2xl py-2 px-4 uppercase hover:no-underline"
                        color="white"
                        variant="h4"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <Drawer onClose={() => setDrawerOpen(false)} open={drawerOpen}>
        <div className="flex h-14 items-center justify-between gap-4 border-b border-neutral-600 px-4">
          <Typography variant="h4" className="uppercase">
            Characters
          </Typography>
          <button onClick={() => setDrawerOpen(false)}>
            <ChevronLeft />
          </button>
        </div>
        <ul className="-mt-2 px-5 py-4">
          {characters.map((c) => (
            <li key={c.id}>
              <Link
                className="mx-1 block py-2 uppercase"
                color="white"
                href={routes.overview(c.id)}
                onClick={() => setDrawerOpen(false)}
                variant="h4"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
      {route !== "/" ? <SecondaryHeader /> : <div className="hidden h-12 xl:block" />}
      {children}
    </div>
  );
}

export default Layout;
