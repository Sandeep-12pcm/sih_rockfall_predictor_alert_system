import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border",
  {
    variants: {
      status: {
        safe: "status-safe",
        caution: "status-caution", 
        warning: "status-warning",
        danger: "status-danger",
        critical: "status-critical",
      },
    },
    defaultVariants: {
      status: "safe",
    },
  }
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  label: string;
  showDot?: boolean;
}

export function StatusIndicator({
  className,
  status,
  label,
  showDot = true,
  ...props
}: StatusIndicatorProps) {
  return (
    <div className={cn(statusVariants({ status }), className)} {...props}>
      {showDot && (
        <div 
          className={cn(
            "w-2 h-2 rounded-full",
            status === "safe" && "bg-status-safe",
            status === "caution" && "bg-status-caution",
            status === "warning" && "bg-status-warning", 
            status === "danger" && "bg-status-danger",
            status === "critical" && "bg-status-critical"
          )}
        />
      )}
      <span>{label}</span>
    </div>
  );
}