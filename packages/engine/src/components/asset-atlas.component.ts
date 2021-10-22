import { component, string, boolean } from "@javelin/ecs";

export const AssetAtlas = {
  key: string,
  url: string,
  xhrSettingsJsonUrl: string,
  loaded: boolean,
};

/**
 * An atlas is a way to pack multiple images together into one texture. I'm using it to load all
 * the player animations (walking left, walking right, etc.) in one image.
 * If you don't use an atlas, you can do the same thing with a spritesheet.
 *
 * @see https://labs.phaser.io/view.html?src=src\animation\create%20animation%20from%20texture%20atlas.js
 * @see https://labs.phaser.io/edit.html?src=src\animation\create%20animation%20from%20sprite%20sheet.js
 */
export const AssetAtlasComponent = component(AssetAtlas, { loaded: false });
