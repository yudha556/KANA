// components/ui/Button.jsx
import clsx from "clsx";

export default function Button({ children, size = "md", variant = "primary", ...props }) {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-15 py-4 text-xl",
    lg: "w-full py-3 text-lg",
    xl: "w-full py-6 text-3xl font-medium ",
  };

  const variantClasses = {
    primary: "bg-primary shadow-md text-white hover:bg-secondary",
    secondary: "bg-white shadow-md text-black hover:bg-gray-100",
  };

  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl  transition duration-200 shadow-md cursor-pointer ",
        sizeClasses[size],
        variantClasses[variant],
        props.className
      )}
    >
      {children}
    </button>
  );
}