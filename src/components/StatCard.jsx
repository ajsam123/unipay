import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

const StatCard = ({
  title,
  description,
  value,
  icon: Icon,
  valueClassName = "",
  footer,
}) => {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>

        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>

      <CardContent>
        <div className={`text-3xl font-bold tracking-tight ${valueClassName}`}>
          {value}
        </div>
      </CardContent>

      {footer && (
        <CardFooter className="text-xs text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
