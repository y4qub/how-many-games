export interface getMatchlist {
  matches: Array<Match>,
  startIndex: number,
  endIndex: number,
  totalGames: number
}

interface Match {
  platformId: string,
  gameId: number,
  champion: number,
  queue: number,
  season: number,
  timestamp: number,
  role: string,
  lane: string
}
