import cn from "classnames";

interface PageProps extends React.ComponentPropsWithoutRef<"div"> {}

function Page(props: PageProps) {
  const { children, className } = props;

  return (
    <main
      className={cn("my-0 mx-auto flex w-full xl:w-xl xl:px-8", {
        [`${className}`]: className,
      })}
    >
      {children}
    </main>
  );
}

export default Page;
