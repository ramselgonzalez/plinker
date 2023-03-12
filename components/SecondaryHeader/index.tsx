import { useRouter } from "next/router";
import cn from "classnames";
import Link from "components/Link";
import routes from "routes";

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
    {
      path: routes.trials,
      label: "Trials",
      active: [routes.trials(), routes.trial()].includes(currentRoute),
    },
  ];
}

function SecondaryHeader() {
  const { route, query } = useRouter();
  const cid = query.cid as string;
  const tabs = getNavTabs(route);
  return (
    <div className="fixed top-14 z-10 flex h-12 w-full border-b border-b-neutral-500 bg-neutral-900">
      <nav className="relative mx-auto h-full w-full xl:w-xl">
        <ul className="relative flex h-full items-center overflow-x-scroll md:overflow-x-visible">
          {tabs.map((tab) => (
            <li
              className={cn("box-content h-full w-38 flex-shrink-0", {
                ["border-b border-cyan-300"]: tab.active,
              })}
              key={tab.label}
            >
              <Link
                className="flex h-full items-center justify-center uppercase duration-300 ease-out hover:bg-neutral-800 focus:bg-neutral-800"
                color={tab.active ? "aqua" : "white"}
                href={tab.path(cid)}
                variant="h4"
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="pointer-events-none absolute left-0 h-full w-8 bg-gradient-to-r from-neutral-900 md:hidden" />
      <div className="pointer-events-none absolute right-0 h-full w-8 bg-gradient-to-l from-neutral-900 md:hidden" />
    </div>
  );
}

export default SecondaryHeader;
