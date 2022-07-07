import cn from "classnames";

interface PageProps extends React.ComponentPropsWithoutRef<"div"> {}

function Page(props: PageProps) {
  const { children, className } = props;

  return (
    <main
      className={cn("my-0 mx-auto flex w-full px-4 md:px-8 xl:w-xl", {
        [`${className}`]: className,
      })}
    >
      {children}
    </main>
  );
}

export default Page;
