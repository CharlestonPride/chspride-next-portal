import Link from "next/link";
import { ReactNode } from "react";
import { string } from "yup";
import { ThemeColors } from "../types";

type ButtonProps = {
  color: ThemeColors;
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type LinkButtonProps = ButtonProps & {
  href: string;
};

const Button = ({
  color,
  children,
  className,
  type = "button",
  onClick,
}: ButtonProps) => (
  <button
    type={type}
    className={className + " btn btn-" + color}
    onClick={onClick}
  >
    {children}
  </button>
);

const LinkButton = ({
  color,
  children,
  href,
  className,
  type = "button",
}: LinkButtonProps) => (
  <Link href={href} passHref>
    <button type={type} className={className + " btn btn-" + color}>
      {children}
    </button>
  </Link>
);

const GradientButton = ({
  color,
  children,
  className,
  type = "button",
  onClick,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={className + " btn bg-gradient-" + color}
    onClick={onClick}
  >
    {children}
  </button>
);

const LinkGradientButton = ({
  color,
  children,
  href,
  className,
  type = "button",
}: LinkButtonProps) => (
  <Link href={href} passHref>
    <button type={type} className={className + " btn bg-gradient-" + color}>
      {children}
    </button>
  </Link>
);

const OutlineButton = ({
  color,
  children,
  className,
  type = "button",
  onClick,
}: ButtonProps) => (
  <button
    type={type}
    className={className + " btn btn-outline-" + color}
    onClick={onClick}
  >
    {children}
  </button>
);

const LinkOutlineButton = ({
  color,
  children,
  href,
  className,
  type = "button",
}: LinkButtonProps) => (
  <Link href={href} passHref>
    <button type={type} className={className + " btn btn-outline-" + color}>
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
