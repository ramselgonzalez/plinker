// components
import { ChevronRight, ChevronLeft } from "./Icon";
import Link from "./Link";
import Typography from "./Typography";

export type PageFooterLinkType = {
  heading: string;
  href: string;
  subheading: string;
};

interface PageFooterProps {
  nextRoute?: PageFooterLinkType;
  previousRoute?: PageFooterLinkType;
}

export default function PageFooter(props: PageFooterProps) {
  const { nextRoute, previousRoute } = props;
  return (
    <footer className="mt-8 hidden border-t border-neutral-800 py-8 md:flex">
      {previousRoute && (
        <Link
          href={previousRoute.href}
          className="hover mr-auto flex items-center gap-4 rounded-2xl py-2 px-4 hover:no-underline"
          color="white"
        >
          <ChevronLeft />
          <div>
            <Typography className="-mb-1 uppercase" color="gray" variant="h4">
              {previousRoute.subheading}
            </Typography>
            <Typography className="uppercase" variant="h3">
              {previousRoute.heading}
            </Typography>
          </div>
        </Link>
      )}
      {nextRoute && (
        <Link
          href={nextRoute.href}
          className="hover ml-auto flex items-center gap-4 rounded-2xl py-2 px-4 hover:no-underline"
          color="white"
        >
          <div>
            <Typography className="-mb-1 uppercase" color="gray" variant="h4">
              {nextRoute.subheading}
            </Typography>
            <Typography className="uppercase" variant="h3">
              {nextRoute.heading}
            </Typography>
          </div>
          <ChevronRight />
        </Link>
      )}
    </footer>
  );
}
