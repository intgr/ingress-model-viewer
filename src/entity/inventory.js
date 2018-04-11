import Constants from '../constants';
import Entity from '../entity';
import Inventory from '../drawable/inventory';
import { vec4 } from 'gl-matrix';

// TODO: Deprecate in favor of a proper scene graph
var InventoryItems = {};

/*
var simple = {
  Xmp: 'L8',
  Ultrastrike: 'L8',
  ResShield: 'VERY_RARE',
  PowerCube: 'L8',
  BoostedPowerCube: 'VERY_RARE',
  BoostedPowerCubeK: 'VERY_RARE',
  LinkAmp: 'RARE',
  UltraLinkAmp: 'VERY_RARE',
  HeatSink: 'VERY_RARE',
  MultiHack: 'VERY_RARE',
  ForceAmp: 'RARE',
  Turret: 'RARE',
  Resonator: 'L8',
  Capsule: 'RARE'
};
*/

export function createItemEntity(name, color) {

  class entitybase extends Entity {
    constructor(engine) {
      super(engine);
      this.addDrawable(name, new Inventory[name]());
      this.addDrawable(name + 'Xm', new Inventory[name + 'Xm']());
      this.drawables[name].uniforms.u_color0 = vec4.clone(Constants.qualityColors[color]);
    }
  }

  return entitybase;
}

class FlipCardAda extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('FlipCardAda', new Inventory.FlipCardAda());
    this.addDrawable('FlipCardXm', new Inventory.FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = vec4.clone(Constants.teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color1 = vec4.clone(Constants.teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

class FlipCardJarvis extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('FlipCardJarvis', new Inventory.FlipCardJarvis());
    this.addDrawable('FlipCardXm', new Inventory.FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = vec4.clone(Constants.teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color1 = vec4.clone(Constants.teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

class ExtraShield extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('ExtraShield', new Inventory.ExtraShield());
    this.addDrawable('ResShieldXm', new Inventory.ResShieldXm());
    this.drawables.ExtraShield.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

InventoryItems.ExtraShield = ExtraShield;

class InterestCapsule extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('InterestCapsule', new Inventory.InterestCapsule());
    this.addDrawable('InterestCapsuleXm', new Inventory.InterestCapsuleXm());
    this.drawables.InterestCapsule.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

InventoryItems.InterestCapsule = InterestCapsule;

class QuantumCapsule extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('InterestCapsule', new Inventory.InterestCapsule());
    this.drawables.InterestCapsule.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}

InventoryItems.QuantumCapsule = QuantumCapsule;

class PortalKeyResourceUnit extends Entity {
  constructor(engine){
    super(engine);
    this.addDrawable('PortalKey', new Inventory.PortalKeyResourceUnit());
  }
}

InventoryItems.PortalKeyResourceUnit = PortalKeyResourceUnit;

function createKeyCapsule(color) {
  class Locker extends Entity {
    constructor(engine) {
      super(engine);
      this.addDrawable('KeyCapsule', new Inventory.KeyCapsule());
      this.addDrawable('KeyCapsuleXm', new Inventory.KeyCapsuleXm());
      this.drawables.KeyCapsule.uniforms.u_color0 = vec4.clone(Constants.keyCapsuleColors[color][0]);
      this.drawables.KeyCapsule.uniforms.u_color1 = vec4.clone(Constants.keyCapsuleColors[color][1]);
      this.drawables.KeyCapsuleXm.uniforms.u_teamColor = vec4.clone(Constants.xmColors.coreGlowChaotic);
      this.drawables.KeyCapsuleXm.uniforms.u_altColor = vec4.clone(Constants.xmColors.coreGlowChaoticAlt);
    }
  }
  return Locker;
}

InventoryItems = {
  "XMP Burster L8": createItemEntity('Xmp', 'L8'),
  "XMP Burster L4": createItemEntity('Xmp', 'L4'),
  "XMP Burster L1": createItemEntity('Xmp', 'L1'),
  "Ultra Strike L8": createItemEntity('Ultrastrike', 'L8'),
  "Ultra Strike L4": createItemEntity('Ultrastrike', 'L4'),
  "Ultra Strike L1": createItemEntity('Ultrastrike', 'L1'),
  "Power Cube L8": createItemEntity('PowerCube', 'L8'),
  "Power Cube L4": createItemEntity('PowerCube', 'L4'),
  "Power Cube L1": createItemEntity('PowerCube', 'L1'),
  "Lawson Power Cube": createItemEntity('BoostedPowerCube', 'VERY_RARE'),
  "Circle-K Power Cube": createItemEntity('BoostedPowerCubeK', 'VERY_RARE'),
  "Portal Shield Common": createItemEntity('ResShield', 'COMMON'),
  "Portal Shield Rare": createItemEntity('ResShield', 'RARE'),
  "Portal Shield Very Rare": createItemEntity('ResShield', 'VERY_RARE'),
  "AXA/Aegis Shield": ExtraShield,
  "ADA Refactor": FlipCardAda,
  "JARVIS Virus": FlipCardJarvis,
  "Key Locker Green": createKeyCapsule('green'),
  "Key Locker Blue": createKeyCapsule('blue'),
  "Key Locker White": createKeyCapsule('white'),
  "Key Locker Red": createKeyCapsule('red'),
  "Key Locker Yellow": createKeyCapsule('yellow'),
};

export default InventoryItems;
