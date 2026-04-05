import { ButtonHTMLAttributes } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]",
    secondary: "bg-[color:var(--secondary)] text-[color:var(--secondary-foreground)]",
  };

  return (
    <ShadcnButton
      className={clsx("rounded-md px-6 py-3 font-semibold", variantClasses[variant], className)}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
}