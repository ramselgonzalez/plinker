import { useState } from "react";
import { useRouter } from "next/router";
import characters from "db/index.json";
import { ChevronDown } from "components/Icon";
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
      <header className="fixed z-20 flex h-14 w-full border-b border-b-neutral-500 bg-neutral-900 px-4">
        <nav className="mx-auto my-0 flex w-full items-center gap-4 xl:w-xl ">
          <button className="lg:hidden" onClick={() => setDrawerOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="text-neutral-50"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
        </div>
        <ul className="-mt-2 px-5 py-4">
          {characters.map((c) => (
            <li key={c.id}>
              <Link href={routes.overview(c.id)} className="mx-1 block py-2 uppercase" color="white" variant="h4">
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
