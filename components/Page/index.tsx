import cn from "classnames";

function Page(props: JSX.IntrinsicElements["main"]) {
  const { children, className } = props;
  return <main className={cn("my-0 mx-auto flex w-full px-4 md:px-8 xl:w-xl", className)}>{children}</main>;
}

export default Page;
