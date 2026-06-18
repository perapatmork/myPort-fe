const pricingTiers = [
  {
    id: 1,
    name: 'Scripting',
    price: 99,
    currency: 'Baht',
    period: 'per project',
    description: 'เขียน Script Roblox ,System Roblox ,ระบบเกม Roblox และอื่น ๆ',
    features: [
      'System scripts',
      'Game mechanics',
      'Custom gameplay features',
      'เชื่อม WebHook และ API',

    ],
    highlighted: false,
    icon: '⚡',
  },
  {
    id: 2,
    name: '3D Modeling',
    price: 99,
    currency: 'Baht',
    period: 'per project',
    description: 'ปั้นโมเดล 3D สำหรับเกม Roblox หรือแพลตฟอร์มอื่น ๆ',
    features: [
      // 'Advanced Lua scripting',
    ],
    highlighted: false,
    icon: '🔥',
  },
  {
    id: 3,
    name: 'Off Commission',
    price: 0,
    currency: 'Baht',
    period: 'per project',
    description: 'ออกแบบ Ui /Ux ตาม  Style',
    features: [
      // 'Full game development',

    ],
    highlighted: false,
    icon: '👑',
  },
];

export default pricingTiers;
