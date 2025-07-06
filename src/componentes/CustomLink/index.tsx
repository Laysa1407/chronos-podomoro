import { Link } from "react-router-dom";

type CustomLinkProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<"a">;

export function CustomLink({ href, children, ...props }: CustomLinkProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
