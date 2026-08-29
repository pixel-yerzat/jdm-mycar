// Exterior Colors
export const JDM_COLORS = [
  { kanji: '漆黒', name: 'Shikkoku Black', hex: '#07080a' },
  { kanji: '湾岸ブルー', name: 'Wangan Blue', hex: '#0e387a' },
  { kanji: '紅蓮', name: 'Guren Red', hex: '#c7001e' },
  { kanji: '白銀', name: 'Hakugin Silver', hex: '#c4cad4' },
  { kanji: 'スーパー白', name: 'Super White II', hex: '#f4f6fa' },
  { kanji: '黄金', name: 'Kogane Yellow', hex: '#e5a900' },
  { kanji: '翡翠', name: 'Hisui Jade Mica', hex: '#0a3d2e' },
  { kanji: '紫電', name: 'Shiden Purple', hex: '#3e154d' },
]

// Interior Leather & Upholstery Colors
export const INTERIOR_COLORS = [
  { kanji: '漆黒', name: 'Midnight Black', hex: '#121316' },
  { kanji: '深紅', name: 'Kyoto Crimson', hex: '#8a111a' },
  { kanji: 'タン', name: 'Tan Heritage', hex: '#9c6237' },
  { kanji: 'コニャック', name: 'Saddle Cognac', hex: '#b87431' },
  { kanji: 'グレー', name: 'Alcantara Grey', hex: '#2e333d' },
  { kanji: '白銀', name: 'Tokyo White', hex: '#e2e5eb' },
]

// Paint Finishes
export const FINISHES = [
  { id: 'metallic', name: 'Metallic', jp: 'メタリック', roughness: 0.2, metalness: 0.85 },
  { id: 'gloss', name: 'Gloss', jp: '光沢グロス', roughness: 0.1, metalness: 0.3 },
  { id: 'matte', name: 'Matte', jp: '艶消しマット', roughness: 0.75, metalness: 0.1 },
  { id: 'satin', name: 'Satin', jp: 'サテンシルク', roughness: 0.45, metalness: 0.5 },
]

// Wheel Rims Finishes
export const WHEEL_FINISHES = [
  { name: 'TE37 Bronze', jp: 'ブロンズ', hex: '#875d38', metalness: 0.85, roughness: 0.4 },
  { name: 'Super Chrome', jp: 'クローム銀', hex: '#d4d8e0', metalness: 0.95, roughness: 0.2 },
  { name: 'Advan Black', jp: '漆黒ブラック', hex: '#111317', metalness: 0.8, roughness: 0.25 },
  { name: 'BBS Gold', jp: 'ゴールド', hex: '#d4af37', metalness: 0.9, roughness: 0.3 },
  { name: 'Gunmetal', jp: 'ガンメタ', hex: '#484d56', metalness: 0.85, roughness: 0.35 },
]

// Brake Calipers
export const CALIPER_COLORS = [
  { name: 'Brembo Red', jp: 'レッド', hex: '#d91b1b' },
  { name: 'Endless Blue', jp: 'ブルー', hex: '#0066ff' },
  { name: 'Spoon Yellow', jp: 'イエロー', hex: '#ffd000' },
  { name: 'Project Mu Teal', jp: 'ミューティール', hex: '#00cbb0' },
  { name: 'Stealth Black', jp: 'ブラック', hex: '#141414' },
]

// Underglow Neons
export const UNDERGLOW_COLORS = [
  { name: 'Tokyo Cyan', jp: '東京シアン', hex: '#00f0ff' },
  { name: 'Akihabara Purple', jp: '秋葉原パープル', hex: '#d000ff' },
  { name: 'Shinjuku Red', jp: '新宿レッド', hex: '#ff003c' },
  { name: 'Shibuya Green', jp: '渋谷グリーン', hex: '#00ff66' },
  { name: 'Amber Gold', jp: '黄金アンバー', hex: '#ffaa00' },
  { name: 'OFF', jp: '消灯', hex: null },
]

// 3D Hotspots Annotations
export const HOTSPOTS = [
  { id: 'roofs', label: 'ROOF', position: [0, 1.35, -0.2], targetCam: [0, 2.2, 2.8] },
  { id: 'cockpit', label: 'INTERIOR', position: [0.35, 0.88, 0.2], targetCam: [0.55, 0.95, 0.6] },
  { id: 'lights', label: 'LIGHTS', position: [-0.65, 0.52, 1.88], targetCam: [-1.4, 0.9, 3.2] },
  { id: 'wheels', label: 'WHEEL', position: [0.95, 0.35, 1.25], targetCam: [2.4, 0.5, 1.8] },
  { id: 'spoiler', label: 'GT-WING', position: [0, 1.15, -1.98], targetCam: [0, 1.6, -3.8] },
]
