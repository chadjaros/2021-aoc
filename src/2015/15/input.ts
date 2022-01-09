const raw = `Sprinkles: capacity 5, durability -1, flavor 0, texture 0, calories 5
PeanutButter: capacity -1, durability 3, flavor 0, texture 0, calories 1
Frosting: capacity 0, durability -1, flavor 4, texture 0, calories 6
Sugar: capacity -1, durability 0, flavor 0, texture 2, calories 8`;

export interface Ingredient {
    name: string;
    capacity: number;
    durability: number;
    flavor: number;
    texture: number;
    calories: number;
}

export const input15 = raw.split('\n')
    .map((line) => {
        const splits = line.split(':').flatMap((s) => s.split(',').map((t) => t.trim())).flatMap((s) => s.split(' '));
        return {
            name: splits[0],
            capacity: parseInt(splits[2]),
            durability: parseInt(splits[4]),
            flavor: parseInt(splits[6]),
            texture: parseInt(splits[8]),
            calories: parseInt(splits[10]),
        }
    });