import { component, number } from "@javelin/ecs";

export const Position = {
  x: number,
  y: number,
};

/**
 * Set's the position of an entry directly.
 * If you want to align an entry to another one use the AlignPositionComponent instead.
 */
export const PositionComponent = component(Position);
