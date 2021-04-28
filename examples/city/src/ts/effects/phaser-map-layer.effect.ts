import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { MapLayerComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserMapLayerEffectState {}

export const phaserMapLayerEffect = createEffect<
  PhaserMapLayerEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserMapLayerEffectState = {};
  const phaserService = PhaserService.getInstance();
  let preloaded = false;

  const afterPreload = () => {
    for (const [entities, [mapLayers]] of query(MapLayerComponent)) {
      for (let i = 0; i < entities.length; i++) {
        console.debug(
          "afterPreload MapLayerComponent",
          entities[i],
          mapLayers[i]
        );
        phaserService.createMapLayer(entities[i], mapLayers[i]);
      }
    }
  };

  return () => {
    if (
      world.state.currentTickData.step === PhaserSceneMethod.update &&
      !preloaded
    ) {
      afterPreload();
      preloaded = true;
    }

    return state;
  };
}, effectOptions);
