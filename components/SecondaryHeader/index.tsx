import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function SecondaryHeader() {
  const { route } = useRouter();
  const ref = useRef<HTMLLIElement | null>(null);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  useEffect(() => {
    if (route === "/overview") {
      setIndicatorPosition(0);
    }

    if (route === "/moves" && ref.current) {
      setIndicatorPosition(ref.current.clientWidth || 0);
    }

    if (route === "/assists" && ref.current) {
      setIndicatorPosition(ref.current.clientWidth * 2 || 0);
    }

    if (route === "/combos" && ref.current) {
      setIndicatorPosition(ref.current.clientWidth * 3 || 0);
    }
  }, [ref, route]);

  return (
    <div className="secondary-header">
      <nav className="secondary-header-nav">
        <ul className="secondary-header-nav-list">
          <li ref={ref} className="secondary-header-nav-list-item">
            <Link href="/overview">
              <a className="typography--variant-subheading1 uppercase">Overview</a>
            </Link>
          </li>
          <li className="secondary-header-nav-list-item">
            <Link href="/moves">
              <a className="typography--variant-subheading1 uppercase">Moves</a>
            </Link>
          </li>
          <li className="secondary-header-nav-list-item">
            <Link href="/assists">
              <a className="typography--variant-subheading1 uppercase">Assists</a>
            </Link>
          </li>
          <li className="secondary-header-nav-list-item">
            <Link href="/combos">
              <a className="typography--variant-subheading1 uppercase">Combos</a>
            </Link>
          </li>
        </ul>
        <span style={{ left: indicatorPosition }} className="nav-list-indicator" />
      </nav>
    </div>
  );
}

export default SecondaryHeader;
