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
      <nav className="relative my-0 mx-auto h-full w-full xl:w-xl" aria-label="Character Navigation Tabs">
        <ul className="flex h-full w-full items-center">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={cn("box-content h-full w-1/3 md:w-40", {
                ["-mb-px border-b border-cyan-300"]: tab.active,
              })}
            >
              <Link
                href={tab.path(cid)}
                className="flex h-full items-center justify-center uppercase duration-300 ease-out hover:bg-neutral-800 focus:bg-neutral-800"
                variant="h4"
                color={tab.active ? "aqua" : "white"}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SecondaryHeader;
