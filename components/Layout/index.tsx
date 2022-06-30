import React from "react";
import { useRouter } from "next/router";
import characters from "db/index.json";
import Link from "components/Link";
import SecondaryHeader from "components/SecondaryHeader";
import Typography from "components/Typography";
import routes from "routes";

function Layout({ children }: { children: React.ReactNode }) {
  const { route } = useRouter();
  return (
    <div className="flex">
      <header className="fixed z-20 flex h-14 w-full border-b border-b-neutral-500 bg-neutral-900">
        <nav className="mx-auto my-0 flex w-full items-center xl:w-xl ">
          <Link href={routes.home} className="inline-block rounded-2xl px-4 uppercase" color="white" variant="h4">
            Plinker
          </Link>
          <ul className="ml-2 border-l border-neutral-500">
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
              <div className="duration-30 absolute left-0 hidden ease-out group-focus-within:block group-hover:block">
                <ul className="mt-1 h-64 w-48 overflow-scroll rounded-2xl bg-neutral-800/95 py-4">
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
      {route !== "/" ? <SecondaryHeader /> : <div className="hidden h-12 xl:block" />}
      {children}
    </div>
  );
}

export default Layout;
