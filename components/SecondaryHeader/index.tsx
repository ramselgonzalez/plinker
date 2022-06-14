import { useRouter } from "next/router";
import Link from "next/link";
import routes from "routes";
import Typography from "components/Typography";
import classNames from "classnames";

function getNavTabs(currentRoute: string) {
  return [
    {
      path: routes.overview,
      label: "Overview",
      active: [routes.overview()].includes(currentRoute),
    },
    {
      path: routes.moves,
      label: "Moves",
      active: [routes.moves(), routes.move()].includes(currentRoute),
    },
    {
      path: routes.assists,
      label: "Assists",
      active: [routes.assists(), routes.assist()].includes(currentRoute),
    },
  ];
}

function SecondaryHeader() {
  const { route, query } = useRouter();
  const cid = query.cid as string;
  const tabs = getNavTabs(route);

  return (
    <div className="fixed top-14 z-10 flex h-12 w-full border-b border-b-neutral-500 bg-neutral-900">
      <nav className="relative my-0 mx-auto h-full w-full xl:w-xl">
        <ul className="flex h-full items-center">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={classNames("box-content h-full", {
                ["-mb-px border-b border-cyan-300"]: tab.active,
              })}
            >
              <Link href={tab.path(cid)}>
                <a className="flex h-full w-1/3 items-center justify-center duration-300 ease-out hover:bg-neutral-800 focus:bg-neutral-800 xl:w-40">
                  <Typography color={tab.active ? "aqua" : "white"} className="uppercase" component="p" variant="h4">
                    {tab.label}
                  </Typography>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SecondaryHeader;
