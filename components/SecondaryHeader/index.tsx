import { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

function getActiveState(currentRoute: string, routes: Array<string>) {
  return routes.includes(currentRoute);
}

function SecondaryHeader() {
  const { route, query } = useRouter();
  const ref = useRef<HTMLLIElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (getActiveState(route, ["/[cid]/overview"])) {
        setIndicatorPosition(0);
      }

      if (getActiveState(route, ["/[cid]/moves", "/[cid]/[mid]"])) {
        setIndicatorPosition(ref.current.clientWidth);
      }

      if (getActiveState(route, ["/[cid]/assists", "/assist"])) {
        setIndicatorPosition(ref.current.clientWidth * 2);
      }

      if (getActiveState(route, ["/trials", "/trial"])) {
        setIndicatorPosition(ref.current.clientWidth * 3);
      }
    }
  }, [ref, route]);

  return (
    <div className="secondary-header">
      <nav className="secondary-header-nav">
        <ul className="secondary-header-nav-list">
          <li ref={ref} className="secondary-header-nav-list-item">
            <Link href={`/${query.cid}/overview`}>
              <a
                className={cn("typography-subheading1 uppercase", {
                  ["secondary-header-nav-list-item-selected"]: getActiveState(route, ["/[cid]/overview"]),
                })}
              >
                Overview
              </a>
            </Link>
          </li>
          <li className="secondary-header-nav-list-item">
            <Link href={`/${query.cid}/moves`}>
              <a
                className={cn("typography-subheading1 uppercase", {
                  ["secondary-header-nav-list-item-selected"]: getActiveState(route, ["/[cid]/moves", "/[cid]/[mid]"]),
                })}
              >
                Moves
              </a>
            </Link>
          </li>
          <li className="secondary-header-nav-list-item">
            <Link href={`/${query.cid}/assists`}>
              <a
                className={cn("typography-subheading1 uppercase", {
                  ["secondary-header-nav-list-item-selected"]: getActiveState(route, ["/[cid]/assists", "/assist"]),
                })}
              >
                Assists
              </a>
            </Link>
          </li>
        </ul>
        {mounted && <span style={{ left: indicatorPosition }} className="nav-list-indicator" />}
      </nav>
    </div>
  );
}

export default SecondaryHeader;
