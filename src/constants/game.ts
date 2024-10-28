export enum GameType {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  EXPORT = "expert",
  CUSTOM = "custom",
}

export const typeInfo = {
  [GameType.BEGINNER]: { rows: 8, cols: 8, mines: 10 },
  [GameType.INTERMEDIATE]: { rows: 16, cols: 16, mines: 40 },
  [GameType.EXPORT]: { rows: 16, cols: 32, mines: 100 },
  [GameType.CUSTOM]: { rows: 8, cols: 8, mines: 10 },
};

export const gameTypes = [
  GameType.BEGINNER,
  GameType.INTERMEDIATE,
  GameType.EXPORT,
  GameType.CUSTOM,
];
