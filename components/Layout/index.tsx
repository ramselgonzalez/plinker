import Link from "next/link";
import { useRouter } from "next/router";
import SecondaryHeader from "components/SecondaryHeader";

function Layout({ children }: { children: React.ReactNode }) {
  const { route } = useRouter();
  return (
    <div className="app-container">
      <header className="header">
        <Link href="/">
          <a className="typography-subheading1 uppercase">Plinker</a>
        </Link>
      </header>
      {route !== "/" ? <SecondaryHeader /> : <div className="secondary-header-offset" />}
      {children}
    </div>
  );
}

export default Layout;
