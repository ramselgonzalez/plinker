import Link from "next/link";
import Typography from "components/Typography";

interface BottomNavigationProps {
  activeStep: number;
  totalSteps: number;
  back: string;
  next: string;
}

function BottomNavigation(props: BottomNavigationProps) {
  const { activeStep, back, next, totalSteps } = props;
  return (
    <nav className="bottom-navigation-container">
      <Link href={back}>
        <a className="bottom-navigation-link">
          <svg
            aria-hidden="true"
            className="tree-section-label-icon"
            height={16}
            fill="white"
            focusable="false"
            viewBox="0 0 24 24"
            transform="rotate(180)"
            width={16}
          >
            <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
          <Typography uppercase variant="subheading1">
            Back
          </Typography>
        </a>
      </Link>
      <Typography variant="subheading1">
        {activeStep} / {totalSteps}
      </Typography>
      <Link href={next}>
        <a className="bottom-navigation-link">
          <Typography uppercase variant="subheading1">
            Next
          </Typography>
          <svg
            aria-hidden="true"
            className="tree-section-label-icon"
            height={16}
            fill="white"
            focusable="false"
            viewBox="0 0 24 24"
            width={16}
          >
            <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </a>
      </Link>
    </nav>
  );
}

export default BottomNavigation;
