export type FishTime = "morning" | "afternoon" | "evening" | "night" | "any";

export type Fish = {
  name: string;
  times: FishTime[];
  water: string[];
  bait: string[];
  skillTier: string;
  depthZone: string;
  bestEquipment: string[];
};

export const fishTable: Fish[] = [
  { name: "Sardine", times: ["any"], water: ["pond", "lake", "lake shallows", "sea", "sea shallows", "any"], bait: ["grain of wheat", "corn kernel"], skillTier: "Beginner (1+)", depthZone: "Any", bestEquipment: ["Net", "Rod (any)"] },
  { name: "Minnow", times: ["any"], water: ["pond", "lake", "lake shallows", "sea shallows", "cave pond", "cave lake"], bait: ["dough ball", "grain of wheat"], skillTier: "Beginner (1+)", depthZone: "Any", bestEquipment: ["Net", "Pole", "Light rod"] },
  { name: "Roach", times: ["morning", "afternoon"], water: ["pond", "lake", "lake shallows", "sea shallows"], bait: ["grain of wheat", "dough ball"], skillTier: "Beginner (1+)", depthZone: "Shallow", bestEquipment: ["Net", "Pole", "Light rod"] },
  { name: "Perch", times: ["morning", "evening"], water: ["pond", "lake", "lake shallows", "sea shallows"], bait: ["wurm", "minnow"], skillTier: "Beginner (1+)", depthZone: "Shallow", bestEquipment: ["Net", "Pole", "Spear", "Light rod"] },
  { name: "Carp", times: ["afternoon"], water: ["pond", "lake", "sea"], bait: ["dough ball", "corn kernel"], skillTier: "Beginner (1+)", depthZone: "Bottom", bestEquipment: ["Pole", "Light rod", "Medium rod", "Professional rod"] },
  { name: "Trout", times: ["morning", "evening"], water: ["pond", "lake"], bait: ["fly", "wurm"], skillTier: "Beginner (1+)", depthZone: "Any", bestEquipment: ["Medium rod", "Deep water rod"] },
  { name: "Clam", times: ["any"], water: ["any"], bait: ["none"], skillTier: "Beginner (1+)", depthZone: "Bottom", bestEquipment: ["Net (any rod)"] },
  { name: "Herring", times: ["afternoon", "evening"], water: ["lake", "sea"], bait: ["sardine", "bit of fish"], skillTier: "Beginner (5+)", depthZone: "Any", bestEquipment: ["Light rod", "Medium rod"] },
  { name: "Pike", times: ["morning", "night"], water: ["lake"], bait: ["roach", "perch"], skillTier: "Intermediate (20+)", depthZone: "Any", bestEquipment: ["Light rod", "Medium rod"] },
  { name: "Catfish", times: ["night"], water: ["lake", "sea"], bait: ["wurm", "bit of fish"], skillTier: "Intermediate (20+)", depthZone: "Bottom", bestEquipment: ["Spear", "Medium rod", "Deep water rod"] },
  { name: "Smallmouth Bass", times: ["morning", "afternoon"], water: ["lake", "sea"], bait: ["wurm", "grub"], skillTier: "Intermediate (20+)", depthZone: "Any", bestEquipment: ["Pole", "Light rod"] },
  { name: "Salmon", times: ["morning", "evening"], water: ["lake", "sea"], bait: ["fly", "wurm"], skillTier: "Intermediate (25+)", depthZone: "Any", bestEquipment: ["Spear", "Light rod", "Medium rod"] },
  { name: "Loach", times: ["night"], water: ["cave pond", "cave lake"], bait: ["minnow", "grub"], skillTier: "Intermediate (25+)", depthZone: "Bottom", bestEquipment: ["Pole", "Spear", "Medium rod"] },
  { name: "Wurmfish", times: ["any"], water: ["cave sea"], bait: ["grub", "minnow"], skillTier: "Intermediate (30+)", depthZone: "Any", bestEquipment: ["Light rod", "Medium rod"] },
  { name: "Snook", times: ["evening", "night"], water: ["sea"], bait: ["perch", "minnow"], skillTier: "Advanced (40+)", depthZone: "Any", bestEquipment: ["Medium rod", "Deep water rod"] },
  { name: "Octopus", times: ["night"], water: ["sea (special tiles)"], bait: ["bit of fish", "sardine"], skillTier: "Advanced (50+)", depthZone: "Bottom", bestEquipment: ["Deep water rod", "Professional rod"] },
  { name: "Dorado", times: ["afternoon", "evening"], water: ["sea (special tiles)"], bait: ["fly", "bit of fish"], skillTier: "Advanced (50+)", depthZone: "Top", bestEquipment: ["Deep water rod", "Professional rod"] },
  { name: "Tuna", times: ["afternoon"], water: ["sea (special tiles)"], bait: ["sardine", "bit of fish"], skillTier: "Advanced (60+)", depthZone: "Any", bestEquipment: ["Deep water rod", "Professional rod"] },
  { name: "Sailfish", times: ["morning", "afternoon"], water: ["sea (special tiles)"], bait: ["fly", "bit of fish"], skillTier: "Expert (70+)", depthZone: "Top", bestEquipment: ["Professional rod"] },
  { name: "Marlin", times: ["afternoon"], water: ["sea (special tiles)"], bait: ["bit of fish", "sardine"], skillTier: "Expert (70+)", depthZone: "Top", bestEquipment: ["Professional rod"] },
  { name: "Blue Shark", times: ["any"], water: ["sea (special tiles)"], bait: ["bit of fish", "roach"], skillTier: "Expert (70+)", depthZone: "Any", bestEquipment: ["Professional rod"] },
  { name: "White Shark", times: ["any"], water: ["sea (special tiles)"], bait: ["bit of fish", "perch"], skillTier: "Expert (70+)", depthZone: "Any", bestEquipment: ["Professional rod"] },
];
