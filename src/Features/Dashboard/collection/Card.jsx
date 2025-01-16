import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Card = ({ className, ...props }) => {
  function cn(...inputs) {
    return twMerge(clsx(...inputs));
  }

  return (
    <div
      className={cn(
        "rounded-xl relative border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  );
};

export default Card;
