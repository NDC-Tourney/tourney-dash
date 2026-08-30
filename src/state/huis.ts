import { useQuery } from "@tanstack/react-query";
import { getAvatarUrl, preloadImage } from "~/util";

import type { output, ZodType } from "zod";
import {
  FlagsSchema,
  mappoolSchema,
  matchesSchema,
  supportersSchema,
  tournamentSchema,
  type Beatmap,
  type Match,
  type Player,
} from "~/schemas/huis";
import { useSettings } from "./dashboard";

const API_BASE = "https://api.tourney.huismetbenen.nl";

async function fetchAndParse<T extends ZodType>(
  url: string,
  schema: T,
  tournamentId: string,
): Promise<output<T>> {
  if (url.startsWith(API_BASE)) {
    url = url.replace(API_BASE, "");
  }

  console.log(`fetching ${url}`);

  const response = await fetch(`https://api.tourney.huismetbenen.nl/${url}`, {
    headers: { "x-tourney-id": tournamentId },
  });

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${await response.text()}`,
    );
  }

  const data = await response.json();
  return schema.parse(data);
}

async function fetchMatches(round: string = "current-week", tournamentId: string) {
  return fetchAndParse(`matches/list/${round}`, matchesSchema, tournamentId);
}

export function useMatchesQuery() {
  const [{ tournamentId }] = useSettings();

  const {
    data: matches,
    error,
    isPending,
  } = useQuery({
    queryKey: ["huis", "matches", "current-week", tournamentId],
    queryFn: () => fetchMatches("current-week", tournamentId),
  });

  const defaultAvatarUrl = getAvatarUrl("");

  const defaultPlayer: Player = {
    name: "???",
    avatarUrl: defaultAvatarUrl,
    supporters: [],
    pickemsRate: "0.00",
    winner: false,
  };

  const defaultCurrentMatch: Match = {
    uid: 0,
    roundName: "???",
    bracket: "???",
    player1: defaultPlayer,
    player2: defaultPlayer,
  };

  const unknownPlayer: Player = {
    ...defaultPlayer,
    name: "Unknown player",
  };

  const unknownCurrentMatch: Match = {
    ...defaultCurrentMatch,
    roundName: "Unknown round",
    player1: unknownPlayer,
    player2: unknownPlayer,
  };

  const [{ matchId }] = useSettings();
  const currentMatch =
    isPending || !matchId
      ? defaultCurrentMatch
      : (matches?.find((m) => m.uid === matchId) ?? unknownCurrentMatch);

  if (error) {
    console.error(error);
  }

  preloadImage(currentMatch.player1.avatarUrl);
  preloadImage(currentMatch.player2.avatarUrl);

  return { currentMatch, matches };
}

async function fetchMappool(roundAbbr: string | undefined, tournamentId: string) {
  return fetchAndParse(`mappools/get/${roundAbbr}`, mappoolSchema, tournamentId);
}

export function useMappoolQuery() {
  const [{ tournamentId }] = useSettings();
  const { currentMatch } = useMatchesQuery();
  const roundAbbr = currentMatch?.roundAbbr;

  const { data: mappool, error } = useQuery({
    enabled: !!roundAbbr,
    queryKey: ["huis", "mappool", roundAbbr, tournamentId],
    queryFn: () => {
      console.assert(roundAbbr, "roundAbbr is undefined (wtf)");
      return fetchMappool(roundAbbr, tournamentId);
    },
  });

  if (error) {
    console.error(error);
  }

  const mappoolGrouped: Record<Beatmap["modBracket"], Beatmap[]> = {
    NM: [],
    HD: [],
    HR: [],
    DT: [],
    TB: [],
  };

  for (const beatmap of mappool ?? []) {
    preloadImage(beatmap.bgUrl);
    mappoolGrouped[beatmap.modBracket].push(beatmap);
  }

  return {
    beatmaps: mappoolGrouped,
  };
}

async function fetchTournament(tournamentId: string) {
  return fetchAndParse(`tournament/get/${tournamentId}`, tournamentSchema, tournamentId);
}

export function useTournamentQuery() {
  const [{ tournamentId }] = useSettings();

  return useQuery({
    queryKey: ["huis", "tournament", tournamentId],
    queryFn: () => fetchTournament(tournamentId),
  });
}

async function fetchFlags(tournamentId: string) {
  return fetchAndParse(`assets/flags/tournament`, FlagsSchema, tournamentId);
}

export function useFlagsQuery() {
  const [{ tournamentId }] = useSettings();

  return useQuery({
    queryKey: ["huis", "flags", tournamentId],
    queryFn: () => fetchFlags(tournamentId),
  });
}

function useCurrentRoundMatchesQuery(
  currentRoundAcronym: string | undefined,
  tournamentId: string,
) {
  return useQuery({
    enabled: !!currentRoundAcronym,
    queryKey: ["huis", "matches", currentRoundAcronym, tournamentId],
    queryFn: () => {
      console.assert(
        currentRoundAcronym,
        "currentRoundAcronym is undefined (wtf)",
      );
      return fetchMatches(currentRoundAcronym, tournamentId);
    },
  });
}

export function useScheduleQuery() {
  const [{ tournamentId }] = useSettings();
  const tournament = useTournamentQuery();

  const now = Date.now();
  const currentRound = tournament.data?.rounds.find(
    (round) => round.endDate > now,
  );

  const { data: matches, error } = useCurrentRoundMatchesQuery(
    currentRound?.acronym,
    tournamentId,
  );

  if (error) {
    console.error(error);
  }

  if (!matches) {
    return {
      round: currentRound?.acronym ?? "???",
      upcoming: [],
      recent: [],
    };
  }

  const splitMatches: { upcoming: Match[]; recent: Match[] } = {
    upcoming: [],
    recent: [],
  };

  for (const match of matches) {
    preloadImage(match.player1.avatarUrl);
    preloadImage(match.player2.avatarUrl);

    if (match.date < now) {
      splitMatches.recent.unshift(match);
    } else {
      splitMatches.upcoming.push(match);
    }
  }

  return splitMatches;
}

function fetchSupporters(tournamentId: string) {
  return fetchAndParse("banners/list", supportersSchema, tournamentId);
}

export function useSupportersQuery() {
  const [{ tournamentId }] = useSettings();

  const { data: supporters, error } = useQuery({
    queryKey: ["huis", "supporters", tournamentId],
    queryFn: () => fetchSupporters(tournamentId),
  });

  if (error) {
    console.error(error);
  }

  if (!supporters) {
    return [];
  }

  supporters.forEach((s) => preloadImage(getAvatarUrl(s.userId)));

  return supporters;
}
