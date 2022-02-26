import Link from "next/link";
import { ReactNode } from "react";
import { ThemeColors } from "../types";

type ButtonProps = {
  color: ThemeColors;
  children?: ReactNode;
  className?: string;
};

type LinkButtonProps = ButtonProps & {
  href: string;
};

const Button = ({ color, children, className }: ButtonProps) => (
  <button type="button" className={className + " btn btn-" + color}>
    {children}
  </button>
);

const LinkButton = ({ color, children, href, className }: LinkButtonProps) => (
  <Link href={href} passHref>
    <button type="button" className={className + " btn btn-" + color}>
      {children}
    </button>
  </Link>
);

const GradientButton = ({ color, children, className }: ButtonProps) => (
  <button type="button" className={className + " btn bg-gradient-" + color}>
    {children}
  </button>
);

const LinkGradientButton = ({
  color,
  children,
  href,
  className,
}: LinkButtonProps) => (
  <Link href={href} passHref>
    <button type="button" className={className + " btn bg-gradient-" + color}>
      {children}
    </button>
  </Link>
);

const OutlineButton = ({ color, children, className }: ButtonProps) => (
  <button type="button" className={className + " btn btn-outline-" + color}>
    {children}
  </button>
);

const LinkOutlineButton = ({
  color,
  children,
  href,
  className,
}: LinkButtonProps) => (
  <Link href={href} passHref>
    <button type="button" className={className + " btn btn-outline-" + color}>
      {children}
    </button>
  </Link>
);

export {
  Button,
  GradientButton,
  OutlineButton,
  LinkButton,
  LinkGradientButton,
  LinkOutlineButton,
};
