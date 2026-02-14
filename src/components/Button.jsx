import React from "react";

const Button = ({
  children,
  onClick,
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  variant = "primary", // Default to primary
  className = "",
  ...buttonProps
}) => {
  // Function to return classes based on the variantsm
  const getVariantClasses = (variant) => {
    switch (variant) {
      case "secondary":
        return "bg-neutral-black-7 text-white hover:bg-neutral-black-9";
      case "stroke":
        return "border border-sidebar-primary text-primary hover:bg-sidebar-primary/10";
      case "ghost":
        return "bg-transparent text-primary-500 hover:bg-primary-50";
      case "black":
        return "bg-black dark:bg-white dark:text-black text-white hover:bg-neutral-black-9";
      case "signIn":
        return "bg-neutral-black-2 text-black hover:bg-neutral-black-9";
      case "red":
        return "text-destructive-foreground border border-destructive-foreground bg-transparent hover:bg-transparent";

      default:
        return "bg-primary text-white hover:bg-primary-400";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || isDisabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full transition hover:cursor-pointer h-10
        ${
          isDisabled
            ? "bg-neutral-black-5 text-neutral-black-8 cursor-not-allowed"
            : getVariantClasses(variant)
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
      {...buttonProps}
    >
      {isLoading ? (
        <span className="animate-spin border-2 border-neutral-black-2 border-t-transparent rounded-full w-4 h-4"></span>
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
