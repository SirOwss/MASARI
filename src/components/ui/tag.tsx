
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const tagVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default: "bg-gray-50 text-gray-600 ring-gray-500/10",
        primary: "bg-primary/10 text-primary ring-primary/20",
        secondary: "bg-secondary/10 text-secondary ring-secondary/20",
        destructive: "bg-destructive/10 text-destructive ring-destructive/20",
        outline: "bg-background text-foreground ring-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, onRemove, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(tagVariants({ variant }), className)}
        {...props}
      >
        <span className="text-xs">{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 inline-flex rounded-sm hover:bg-gray-200/60 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        )}
      </div>
    );
  }
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
