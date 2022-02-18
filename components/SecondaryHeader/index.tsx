import { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import routes from "routes";
import Typography from "components/Typography";

function getNavItems(currentRoute: string) {
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
  const ref = useRef<HTMLLIElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const navItems = getNavItems(route);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (navItems.find((i) => i.label === "Overview")?.active) {
        setIndicatorPosition(0);
      }

      if (navItems.find((i) => i.label === "Moves")?.active) {
        setIndicatorPosition(ref.current.clientWidth);
      }

      if (navItems.find((i) => i.label === "Assists")?.active) {
        setIndicatorPosition(ref.current.clientWidth * 2);
      }
    }
  }, [ref, route, navItems]);

  return (
    <div className="secondary-header">
      <nav className="secondary-header-nav">
        <ul className="secondary-header-nav-list">
          {navItems.map((item, i) => (
            <li key={item.label} ref={i === 0 ? ref : undefined} className="secondary-header-nav-list-item">
              <Link href={item.path(cid)}>
                <a
                  className={cn({
                    ["secondary-header-nav-list-item-selected"]: item.active,
                  })}
                >
                  <Typography color={item.active ? "blue" : "white"} uppercase variant="subheading1">
                    {item.label}
                  </Typography>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        {mounted && <span style={{ left: indicatorPosition }} className="nav-list-indicator" />}
      </nav>
    </div>
  );
}

export default SecondaryHeader;
