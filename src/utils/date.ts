import { formatDistanceToNow, parseISO, format } from "date-fns";

export const getDateDistance = (date: string) =>
  formatDistanceToNow(parseISO(date || new Date().toISOString()), {
    addSuffix: true,
  });

export const formatDate = (
  date: string,
  formatDate: "long" | "short" = "long"
) => {
  const parseDate = parseISO(date);
  if (formatDate === "short") {
    return format(parseDate, "MMMM dd, yyyy zz");
  }

  return format(parseDate, "EEEE, MMMM d, yyyy h:mm a zz");
};
