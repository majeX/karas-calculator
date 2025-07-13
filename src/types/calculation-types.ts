// calculation-types.ts
// Pure calculation types - no React dependencies

/**
 * Type definition for clan quest points calculation
 * Each row represents a group with points earned and number of people
 */
export type PointsRows = Array<{ 
  points: number | '', 
  people: number | '' 
}>;