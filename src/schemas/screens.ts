import z from "zod";

export const screenNames = [
  "start",
  "standby",
  "playerinfo",
  "versus",
  "scheduling",
  "mappool",
  "winnersbracket",
  "losersbracket",
  "winner",
] as const;

export const screenNameSchema = z.literal(screenNames);
export type ScreenName = z.infer<typeof screenNameSchema>;
