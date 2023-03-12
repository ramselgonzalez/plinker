// components
import Typography from "./Typography";

interface PageHeaderProps {
  heading: string;
  subheading: string;
}

export default function PageHeader(props: PageHeaderProps) {
  const { heading, subheading } = props;
  return (
    <header className="mb-2 md:mb-4">
      <Typography className="uppercase" color="aqua" component="p" variant="h3">
        {subheading}
      </Typography>
      <Typography className="uppercase" variant="h1">
        {heading}
      </Typography>
    </header>
  );
}
