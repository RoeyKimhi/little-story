import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FlipPageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hard?: boolean;
}

const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(
  ({ children, hard = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-full w-full overflow-hidden bg-white", className)}
        data-density={hard ? "hard" : "soft"}
        {...props}
      >
        {children}
      </div>
    );
  },
);

FlipPage.displayName = "FlipPage";

export default FlipPage;
