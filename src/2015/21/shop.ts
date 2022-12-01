export interface Item {
    name: string;
    cost: number;
    damage: number;
    defense: number;
} 

export const weapons: Item[] = [
    { name: 'Dagger', cost: 8, damage: 4, defense: 0 },
    { name: 'Shortsword', cost: 10, damage: 5, defense: 0 },
    { name: 'Warhammer', cost: 25, damage: 6, defense: 0 },
    { name: 'Longsword', cost: 40, damage: 7, defense: 0 },
    { name: 'Greataxe', cost: 74, damage: 8, defense: 0 },
];

export const armor: Item[] = [
    { name: 'Leather', cost: 13, damage: 0, defense: 1 },
    { name: 'Chainmail', cost: 31, damage: 0, defense: 2 },
    { name: 'Splitmail', cost: 53, damage: 0, defense: 3 },
    { name: 'Bandedmail', cost: 75, damage: 0, defense: 4 },
    { name: 'Platemail', cost: 102, damage: 0, defense: 5 },
];

export const rings: Item[] = [
    { name: 'Damage +1', cost: 25, damage: 1, defense: 0 },
    { name: 'Damage +2', cost: 50, damage: 2, defense: 0 },
    { name: 'Damage +3', cost: 100, damage: 3, defense: 0 },
    { name: 'Defense +1', cost: 20, damage: 0, defense: 1 },
    { name: 'Defense +2', cost: 40, damage: 0, defense: 2 },
    { name: 'Defense +3', cost: 80, damage: 0, defense: 3 },
];

