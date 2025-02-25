import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { Animation } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserAnimationEffectState = EmptyObject;

export const phaserAnimationEffect = createEffect<
  PhaserAnimationEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserAnimationEffectState = {};
  const phaserService = PhaserService.getInstance();
  const animationsQuery = createQuery(Animation);

  const onCreate = () => {
    for (const [entities, [animations]] of animationsQuery) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createAnimation(
          world.latestTickData.scene.anims,
          entities[i],
          animations[i]
        );
      }
    }
  };

  return () => {
    if (world.latestTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    return state;
  };
}, effectOptions);
