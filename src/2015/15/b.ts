import { Series } from '../../ts-utils/series';
import { Ingredient, input15 } from './input';

const input = input15;

function calc(
    ingredients: Ingredient[],
    available: number,
    used: number[],
    all: Ingredient[]
): number {
    if (ingredients.length === 0) {
        const sums = {
            flavor: 0,
            texture: 0,
            capacity: 0,
            durability: 0,
            calories: 0,
        };

        used.forEach((ct, idx) => {
            sums.flavor += ct * all[idx].flavor;
            sums.texture += ct * all[idx].texture;
            sums.capacity += ct * all[idx].capacity;
            sums.durability += ct * all[idx].durability;
            sums.calories += ct * all[idx].calories;
        });

        if (sums.calories !== 500) {
            return 0;
        }

        if (
            sums.flavor < 0 ||
            sums.texture < 0 ||
            sums.capacity < 0 ||
            sums.durability < 0
        ) {
            return 0;
        }

        return sums.flavor * sums.texture * sums.capacity * sums.durability;
    }

    return Math.max(
        ...[...Series.range(available, 0)].map((toUse) => {
            return calc(
                ingredients.slice(1, ingredients.length),
                available - toUse,
                [...used, toUse],
                all
            );
        })
    );
}

console.log(calc(input, 100, [], input));
