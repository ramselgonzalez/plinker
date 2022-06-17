import React from "react";
import { useRouter } from "next/router";
import characters from "data/index.json";
import Link from "next/link";
import SecondaryHeader from "components/SecondaryHeader";
import Typography from "components/Typography";
import routes from "routes";

function Layout({ children }: { children: React.ReactNode }) {
  const { route } = useRouter();
  return (
    <div className="flex">
      <header className="fixed z-20 flex h-14 w-full border-b border-b-neutral-500 bg-neutral-900">
        <nav className="mx-auto my-0 flex w-full items-center xl:w-xl ">
          <Link href="/">
            <a className="mr-2 inline-block border-r border-neutral-500 px-4">
              <Typography className="uppercase" variant="h4">
                Plinker
              </Typography>
            </a>
          </Link>
          <ul>
            <li className="group relative hidden lg:block">
              <button className="flex cursor-pointer items-center gap-x-2 rounded-2xl py-2 px-4 duration-300 ease-out hover:bg-neutral-800">
                <Typography className="uppercase" color="gray" component="p" variant="h4">
                  Characters
                </Typography>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
              <div className="duration-30 0 absolute left-0 hidden ease-out group-hover:block">
                <ul className="mt-1 h-60 w-48 overflow-scroll rounded-2xl bg-neutral-800/95 py-4 shadow-md">
                  {characters.map((c) => (
                    <li key={c.id} className="hover:bg-neutral-700/50">
                      <Link href={routes.overview(c.id)}>
                        <a className="no-underline">
                          <Typography className="py-2 px-4 uppercase" variant="h4">
                            {c.name}
                          </Typography>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      {route !== "/" ? <SecondaryHeader /> : <div className="hidden h-12 xl:block" />}
      {children}
    </div>
  );
}

export default Layout;
