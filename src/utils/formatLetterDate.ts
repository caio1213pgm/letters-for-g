import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export function formatLetterDate(date: Date): string {
  return dayjs(date).locale("pt-br").format("D [de] MMMM [de] YYYY");
}
