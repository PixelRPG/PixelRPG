import { createWorld } from "@javelin/ecs";
import { WorldGameData, Player } from "../types";
import {
  AssetAtlasComponent,
  AssetMapComponent,
  AssetTilesetComponent,
  TilesetComponent,
  PlayerComponent,
  PositionComponent,
  SpriteComponent,
  MapLayerComponent,
  AnimationComponent,
  VelocityComponent,
  DepthComponent,
  TextComponent,
  ScrollfactorComponent,
  CollisionComponent,
} from "../components";
import { phaserSystem } from "../systems";
import { mapObjectTopic } from "../topics";

export class GameWorld {
  world = createWorld<WorldGameData>({
    topics: [mapObjectTopic],
    systems: [phaserSystem],
  });

  spawnPlayer(playerData: Player) {
    const playerAssetAtlasComponent = this.world.component(
      AssetAtlasComponent,
      "tuxemon-misa",
      "./assets/atlas/tuxemon-misa/tuxemon-misa.png",
      "./assets/atlas/tuxemon-misa/tuxemon-misa.json"
    );
    const playerSpriteComponent = this.world.component(SpriteComponent, {
      key: "tuxemon-misa",
      frame: "misa-front",
      scale: { x: 2, y: 2 },
      size: { height: 15, width: 12 },
      offset: { x: 0, y: 20 },
    });

    const playerPositionComponent = this.world.component(PositionComponent);

    const playerVelocityComponent = this.world.component(VelocityComponent, {
      speed: 175,
      x: 0,
      y: 0,
    });

    const playerCollisionVelocityComponent = this.world.component(
      CollisionComponent
    );

    const playerComponent = this.world.component(PlayerComponent, playerData);

    this.world.spawn(
      playerAssetAtlasComponent,
      playerSpriteComponent,
      playerPositionComponent,
      playerVelocityComponent,
      playerCollisionVelocityComponent,
      playerComponent
    );
  }

  constructor() {
    // MAP

    const assetMapComponent = this.world.component(AssetMapComponent, {
      key: "map",
      url: "./assets/tilemaps/tuxemon-town.json",
    });
    const assetMapEntry = this.world.spawn(assetMapComponent);

    const assetTilesetComponent = this.world.component(AssetTilesetComponent, {
      key: "tiles",
      url: "./assets/tilesets/tuxmon-sample-32px-extruded.png",
    });
    this.world.spawn(assetTilesetComponent);

    const tilesetComponent = this.world.component(TilesetComponent, {
      key: "tiles",
      name: "tuxmon-sample-32px-extruded",
      assetMapEntry: assetMapEntry,
    });
    const tilesetEntry = this.world.spawn(tilesetComponent);

    const mapLayer1Component = this.world.component(MapLayerComponent, {
      name: "Below Player",
      x: 0,
      y: 0,
      depth: -10,
      assetMapEntry,
      tilesetEntry,
    });
    const mapLayer1DepthComponent = this.world.component(DepthComponent, -10);
    this.world.spawn(mapLayer1Component, mapLayer1DepthComponent);

    const mapLayerWorldComponent = this.world.component(MapLayerComponent, {
      name: "World",
      x: 0,
      y: 0,
      depth: 0,
      assetMapEntry,
      tilesetEntry,
      collides: true,
      collisionProperty: "collides",
    });
    const mapLayerWorldDepthComponent = this.world.component(DepthComponent, 0);
    const mapLayerWorldCollisionComponent = this.world.component(
      CollisionComponent
    );
    this.world.spawn(
      mapLayerWorldComponent,
      mapLayerWorldDepthComponent,
      mapLayerWorldCollisionComponent
    );

    const mapLayer3Component = this.world.component(MapLayerComponent, {
      name: "Above Player",
      x: 0,
      y: 0,
      depth: 10,
      assetMapEntry,
      tilesetEntry,
    });
    const mapLayer3DepthComponent = this.world.component(DepthComponent, 10);
    this.world.spawn(mapLayer3Component, mapLayer3DepthComponent);

    // ANIMATIONS

    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    const animationLeftWalk = this.world.component(AnimationComponent, {
      key: "misa-left-walk",
      frames: {
        atlasKey: "tuxemon-misa",
        prefix: "misa-left-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      },
      frameRate: 10,
      repeat: -1,
    });
    this.world.spawn(animationLeftWalk);

    const animationRightWalk = this.world.component(AnimationComponent, {
      key: "misa-right-walk",
      frames: {
        atlasKey: "tuxemon-misa",
        prefix: "misa-right-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      },
      frameRate: 10,
      repeat: -1,
    });
    this.world.spawn(animationRightWalk);

    const animationFrontWalk = this.world.component(AnimationComponent, {
      key: "misa-front-walk",
      frames: {
        atlasKey: "tuxemon-misa",
        prefix: "misa-front-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      },
      frameRate: 10,
      repeat: -1,
    });
    this.world.spawn(animationFrontWalk);

    const animationBackWalk = this.world.component(AnimationComponent, {
      key: "misa-back-walk",
      frames: {
        atlasKey: "tuxemon-misa",
        prefix: "misa-back-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      },
      frameRate: 10,
      repeat: -1,
    });
    this.world.spawn(animationBackWalk);

    // PLAYER
    this.spawnPlayer({ name: "Player 1", playerNumber: 1 });
    this.spawnPlayer({ name: "Player 2", playerNumber: 2 });
    this.spawnPlayer({ name: "Player 3", playerNumber: 3 });
    // this.spawnPlayer({ name: "Player 4", playerNumber: 4 });

    // TEXT

    // Help text that has a "fixed" position on the screen
    const textComponent = this.world.component(TextComponent, {
      text: 'Arrow keys to move\nPress "D" to show hitboxes',
      style: {
        font: "18px monospace",
        color: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff",
      },
    });
    const textPositionComponent = this.world.component(
      PositionComponent,
      16,
      16
    );
    const scrollfactorComponent = this.world.component(ScrollfactorComponent, {
      x: 0,
      y: 0,
    });
    const textDepthComponent = this.world.component(DepthComponent, 30);
    this.world.spawn(
      textComponent,
      textPositionComponent,
      scrollfactorComponent,
      textDepthComponent
    );
  }
}
