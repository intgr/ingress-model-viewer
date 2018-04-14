import Constants from '../constants';
import Entity from '../entity';
import Inventory from '../drawable/inventory';
import { vec4 } from 'gl-matrix';

// Set to 'old' if 1.128.0 or older; otherwise 'new'
export var ASSET_VERSION = 'new';

// TODO: Deprecate in favor of a proper scene graph
var InventoryItems = {};

export function createItemEntity(name, color, rotation) {

  class entitybase extends Entity {
    constructor(engine) {
      super(engine);
      this.addDrawable(name, new Inventory[name]());
      this.addDrawable(name + 'Xm', new Inventory[name + 'Xm']());
      this.drawables[name].uniforms.u_color0 = vec4.clone(Constants.qualityColors[color]);
    }
  }
  entitybase.rotation = rotation || 30;

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
FlipCardAda.rotation = 40;

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
FlipCardJarvis.rotation = 40;

class ExtraShield extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('ExtraShield', new Inventory.ExtraShield());
    this.addDrawable('ResShieldXm', new Inventory.ResShieldXm());
    this.drawables.ExtraShield.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}
ExtraShield.rotation = 120;

InventoryItems.ExtraShield = ExtraShield;

class InterestCapsule extends Entity {
  constructor(engine) {
    super(engine);
    this.addDrawable('InterestCapsule', new Inventory.InterestCapsule());
    if (ASSET_VERSION === 'new') {
      this.addDrawable('InterestCapsuleXm', new Inventory.InterestCapsuleXm());
    }
    else {
      this.addDrawable('CapsuleXm', new Inventory.CapsuleXm());
    }
    this.drawables.InterestCapsule.uniforms.u_color0 = vec4.clone(Constants.qualityColors.VERY_RARE);
  }
}
InterestCapsule.rotation = 195;
InventoryItems.InterestCapsule = InterestCapsule;

class PortalKey extends Entity {
  constructor(engine){
    super(engine);
    this.addDrawable('PortalKey', new Inventory.PortalKeyResourceUnit());
  }
}
PortalKey.rotation = 300;

InventoryItems.PortalKeyResourceUnit = PortalKey;

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
  Locker.rotation = 56;
  return Locker;
}

InventoryItems = {
  "XMP Burster L8": createItemEntity('Xmp', 'L8', 45),
  "XMP Burster L7": createItemEntity('Xmp', 'L7', 45),
  "XMP Burster L6": createItemEntity('Xmp', 'L6', 45),
  "XMP Burster L5": createItemEntity('Xmp', 'L5', 45),
  "XMP Burster L4": createItemEntity('Xmp', 'L4', 45),
  "XMP Burster L3": createItemEntity('Xmp', 'L3', 45),
  "XMP Burster L2": createItemEntity('Xmp', 'L2', 45),
  "XMP Burster L1": createItemEntity('Xmp', 'L1', 45),
  "Ultra Strike L8": createItemEntity('Ultrastrike', 'L8', 320),
  "Ultra Strike L7": createItemEntity('Ultrastrike', 'L7', 320),
  "Ultra Strike L6": createItemEntity('Ultrastrike', 'L6', 320),
  "Ultra Strike L5": createItemEntity('Ultrastrike', 'L5', 320),
  "Ultra Strike L4": createItemEntity('Ultrastrike', 'L4', 320),
  "Ultra Strike L3": createItemEntity('Ultrastrike', 'L3', 320),
  "Ultra Strike L2": createItemEntity('Ultrastrike', 'L2', 320),
  "Ultra Strike L1": createItemEntity('Ultrastrike', 'L1', 320),
  "Resonator L8": createItemEntity('Resonator', 'L8', 15),
  "Resonator L7": createItemEntity('Resonator', 'L7', 15),
  "Resonator L6": createItemEntity('Resonator', 'L6', 15),
  "Resonator L5": createItemEntity('Resonator', 'L5', 15),
  "Resonator L4": createItemEntity('Resonator', 'L4', 15),
  "Resonator L3": createItemEntity('Resonator', 'L3', 15),
  "Resonator L2": createItemEntity('Resonator', 'L2', 15),
  "Resonator L1": createItemEntity('Resonator', 'L1', 15),
  "Power Cube L8": createItemEntity('PowerCube', 'L8', 60),
  "Power Cube L7": createItemEntity('PowerCube', 'L7', 60),
  "Power Cube L6": createItemEntity('PowerCube', 'L6', 60),
  "Power Cube L5": createItemEntity('PowerCube', 'L5', 60),
  "Power Cube L4": createItemEntity('PowerCube', 'L4', 60),
  "Power Cube L3": createItemEntity('PowerCube', 'L3', 60),
  "Power Cube L2": createItemEntity('PowerCube', 'L2', 60),
  "Power Cube L1": createItemEntity('PowerCube', 'L1', 60),
  "Lawson Power Cube": createItemEntity('BoostedPowerCube', 'VERY_RARE', 336),
  "Circle-K Power Cube": createItemEntity('BoostedPowerCubeK', 'VERY_RARE', 246),
  "Portal Shield Common": createItemEntity('ResShield', 'COMMON', 120),
  "Portal Shield Rare": createItemEntity('ResShield', 'RARE', 120),
  "Portal Shield Very Rare": createItemEntity('ResShield', 'VERY_RARE', 120),
  "Link Amp Rare": createItemEntity('LinkAmp', 'RARE', 42),
  "Link Amp Very Rare": createItemEntity('LinkAmp', 'VERY_RARE', 42),
  "SoftBank Ultra Link": createItemEntity('UltraLinkAmp', 'VERY_RARE', 37),
  "Heat Sink Common": createItemEntity('HeatSink', 'COMMON', 30),
  "Heat Sink Rare": createItemEntity('HeatSink', 'RARE', 30),
  "Heat Sink Very Rare": createItemEntity('HeatSink', 'VERY_RARE', 30),
  "Multi-hack Common": createItemEntity('MultiHack', 'COMMON', 60),
  "Multi-hack Rare": createItemEntity('MultiHack', 'RARE', 60),
  "Multi-hack Very Rare": createItemEntity('MultiHack', 'VERY_RARE', 60),
  "Force Amp": createItemEntity('ForceAmp', 'RARE', 65),
  "Turret": createItemEntity('Turret', 'RARE', 310),
  "ITO EN Transmuter–": createItemEntity('TransmuterAttack', 'VERY_RARE', 20),
  "ITO EN Transmuter+": createItemEntity('TransmuterDefense', 'VERY_RARE', 150),
  "Capsule": createItemEntity('Capsule', 'RARE', 75),
  "ADA Refactor": FlipCardAda,
  "JARVIS Virus": FlipCardJarvis,
  "Portal Key": PortalKey,
  "Key Locker Green": createKeyCapsule('green'),
  "Key Locker Blue": createKeyCapsule('blue'),
  "Key Locker White": createKeyCapsule('white'),
  "Key Locker Red": createKeyCapsule('red'),
  "Key Locker Yellow": createKeyCapsule('yellow')
};

if (ASSET_VERSION === 'old') {
  InventoryItems["MUFG Capsule"] = InterestCapsule;
  InventoryItems["AXA Shield"] = ExtraShield;
}
else {
  InventoryItems["Quantum Capsule"] = InterestCapsule;
  InventoryItems["Aegis Shield"] = ExtraShield;
}

export default InventoryItems;
