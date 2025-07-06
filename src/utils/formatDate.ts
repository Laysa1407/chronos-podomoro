import { format } from "date-fns";

export function formatDate(timesTamp: number) {
  const date = new Date(timesTamp);

  return format(date, "dd/MM/yyyy HH:mm");
}
