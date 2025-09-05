import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  className?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("gradient-surface border-border", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {unit && <div className="text-sm text-muted-foreground">{unit}</div>}
        </div>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            changeType === "positive" && "text-status-safe",
            changeType === "negative" && "text-status-danger", 
            changeType === "neutral" && "text-muted-foreground"
          )}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}