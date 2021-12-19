import { relative } from 'path';
import { BTree } from '../../utils/b-tree';
import { Possible } from '../../utils/util-types';


type SNTuple = [number|SNTuple, number|SNTuple];
export type SNBTree = BTree<Possible<number>>;

const raw: SNTuple[] = [
    [[[4,5],[[0,6],[4,5]]],[3,[[5,0],[0,8]]]],
    [[8,3],2],
    [[4,[7,[5,6]]],[[[7,8],5],[[7,0],1]]],
    [[[1,8],[7,6]],[[8,6],[3,2]]],
    [[[4,[2,0]],[1,[7,0]]],9],
    [2,[[[2,3],5],[6,5]]],
    [9,[1,[0,3]]],
    [5,[5,[8,[8,4]]]],
    [5,[1,[4,[0,8]]]],
    [1,[[[6,1],9],2]],
    [7,[[6,1],[[7,8],[4,2]]]],
    [[[[6,6],[3,3]],[6,[7,6]]],4],
    [[[3,[9,8]],[[6,6],[9,3]]],[[[9,2],3],[[7,6],0]]],
    [[[[5,2],6],[9,[1,7]]],[[9,9],[9,[4,3]]]],
    [[[7,6],[9,5]],[[[6,3],[8,4]],[[4,0],8]]],
    [[[0,[1,9]],[8,[4,4]]],1],
    [[1,[1,[9,4]]],[5,[[9,3],9]]],
    [[[1,3],[[2,3],9]],[7,9]],
    [[8,[[6,9],[5,9]]],[5,[5,[9,4]]]],
    [[[[3,7],[8,0]],[4,[8,9]]],[[[3,8],[3,5]],[9,0]]],
    [[[0,5],[5,1]],[3,[0,[0,5]]]],
    [7,[[4,[1,6]],0]],
    [[3,[4,4]],[[[0,5],9],[8,[9,5]]]],
    [[8,[5,2]],[[[7,4],[3,2]],4]],
    [[[[6,4],[7,9]],5],[3,[[4,3],[4,3]]]],
    [[[[7,0],6],[6,7]],[[[9,7],[3,7]],[[4,1],[0,6]]]],
    [[6,[[1,0],[1,7]]],[3,[3,0]]],
    [[[2,[6,0]],4],[[3,9],[4,1]]],
    [[[0,[8,4]],[[8,7],5]],[1,6]],
    [[[[4,0],7],9],[6,[8,[9,3]]]],
    [[[[0,8],7],[5,[4,0]]],[5,[6,[8,7]]]],
    [[[1,4],[[9,7],4]],[[4,[6,4]],1]],
    [[5,[[8,6],9]],1],
    [[[[5,7],[8,3]],[[3,2],[1,9]]],[2,[1,2]]],
    [[[9,6],[1,5]],[8,6]],
    [3,1],
    [[2,[[2,0],4]],[[[3,4],1],3]],
    [[[[8,6],[5,9]],7],2],
    [[[[1,0],[8,5]],[[6,5],[0,0]]],[[[3,4],[4,6]],[[5,0],8]]],
    [[[[6,4],[9,4]],[[2,1],[2,2]]],[[[7,9],1],[[6,1],5]]],
    [2,[[4,4],5]],
    [[[[0,8],9],[8,6]],[[[9,7],[0,8]],[[9,3],7]]],
    [[[[2,0],[7,8]],[[8,5],[6,8]]],[7,[[1,1],[2,3]]]],
    [[9,[5,[4,7]]],[0,[9,2]]],
    [5,[[[7,5],3],[6,[5,3]]]],
    [[1,[5,1]],[[[0,3],[3,9]],3]],
    [7,[[0,[0,1]],[1,2]]],
    [[4,[8,0]],[3,[[2,4],7]]],
    [8,[[1,[8,9]],[0,0]]],
    [0,[[2,9],[[9,7],[5,3]]]],
    [[[6,[3,4]],[[0,6],[4,3]]],9],
    [[[[0,6],6],6],[[7,8],[[7,3],[5,0]]]],
    [[[7,[4,5]],[9,2]],[6,[[5,5],[0,2]]]],
    [[[6,8],[5,[0,8]]],[[1,[6,6]],[0,6]]],
    [[[[4,7],7],[2,7]],[[8,0],[[6,5],[2,0]]]],
    [8,[[4,9],[[8,8],2]]],
    [2,[[4,[5,8]],[[8,7],[0,9]]]],
    [[[[2,8],0],6],[[[4,4],0],[1,3]]],
    [1,[[[8,5],1],8]],
    [[3,3],[[[5,6],[6,2]],5]],
    [[9,2],[3,[[3,2],4]]],
    [[[[2,4],[6,3]],[[4,6],4]],[[[1,9],[0,4]],[[2,6],[9,0]]]],
    [[[4,[6,7]],[[8,4],[6,2]]],[[5,2],[[4,8],0]]],
    [[[6,0],[[3,2],5]],[[[9,0],[7,0]],5]],
    [[2,[9,3]],[[4,[4,6]],[9,6]]],
    [[3,[3,6]],[[[2,4],1],[9,[7,7]]]],
    [4,[1,[[3,6],[4,1]]]],
    [[3,7],[[5,6],6]],
    [[[0,8],4],[[3,5],[[6,2],6]]],
    [[[6,[8,9]],[5,[2,4]]],[4,[3,4]]],
    [5,[[[6,8],[5,7]],[5,[9,9]]]],
    [[[[9,5],6],3],[[[8,2],4],[1,8]]],
    [[9,[9,3]],[[[5,7],0],[[5,4],[7,4]]]],
    [[[[7,7],7],6],9],
    [[9,8],[2,[7,7]]],
    [[[[5,9],6],[8,[9,2]]],[[[8,5],[9,5]],[3,[8,3]]]],
    [[[4,[3,8]],[8,[4,3]]],[[0,5],[5,[4,5]]]],
    [[[0,5],[[7,7],5]],[[[2,7],[6,0]],[[7,9],[2,2]]]],
    [6,[2,8]],
    [[[2,7],7],[[[8,4],[3,9]],1]],
    [[[2,0],[[0,5],[9,4]]],[[7,[6,2]],9]],
    [[1,[[8,3],[3,4]]],1],
    [[[[2,0],9],3],[1,[7,[2,1]]]],
    [4,[[6,[5,7]],[[1,1],[0,5]]]],
    [[[6,[0,7]],[4,[8,6]]],3],
    [[[8,5],6],[1,[[6,0],4]]],
    [[[[6,5],[5,6]],[[0,1],[2,7]]],[[7,[7,6]],[[3,2],[4,0]]]],
    [[[5,[0,0]],0],5],
    [[[[7,2],[5,9]],2],[3,7]],
    [7,[[[1,1],4],[[4,4],2]]],
    [9,[[[9,1],1],3]],
    [[[[6,9],[3,9]],[7,[1,5]]],[[[5,0],6],[[5,9],8]]],
    [[7,[1,[2,1]]],[7,[[6,3],[7,1]]]],
    [3,[0,[1,3]]],
    [9,[[[6,6],6],[6,4]]],
    [[[2,[0,4]],1],[[9,[5,1]],[[9,6],[5,2]]]],
    [[[9,8],6],[0,[6,[0,5]]]],
    [[[7,3],[[9,9],0]],7],
    [[[7,5],[6,8]],[6,[[0,8],9]]],
    [[[2,[0,5]],[[2,9],[5,7]]],7],
];


export function parseSNTuple(val: number|SNTuple, parent?: SNBTree): SNBTree {
    if (typeof val === 'number') {
        return new BTree(val, {parent});
    }
    else {
        const n = new BTree(undefined, {parent});
        n.left = parseSNTuple(val[0], n);
        n.right = parseSNTuple(val[1], n);
        return n;
    }
}

export class SNNumber {
    constructor(
        public tree: SNBTree
    ) {
    }

    plus(num: SNNumber): SNNumber {
        return new SNNumber(parseSNTuple(this.toTuple(new BTree(undefined, { left: this.tree, right: num.tree}))))
        .reduce();
    }

    private replaceParentWith(parent: SNBTree, oldChild: SNBTree, newChild: SNBTree): void {
        if (parent.left === oldChild) {
            parent.left = newChild;
            oldChild.parent = undefined;
        }
        else {
            parent.right = newChild;
            oldChild.parent = undefined;
        }
    }

    private doExplode(current: SNBTree): boolean {
        if (current.parent && current.parent.depth === 4) {
            const exp = current.parent;
            const lSib = exp.left?.leafToLeft;
            const rSib = exp.right?.leafToRight;
            if (lSib) {
                lSib.value! += exp.left?.value ?? 0;
            }
            if (rSib) {
                rSib.value! += exp.right?.value ?? 0;
            }
            this.replaceParentWith(exp.parent!, exp, new BTree(0, {parent: exp.parent}));
            return true;
        }
        return false;
    }

    private doSplit(current: SNBTree): boolean {
        if ((current.value ?? 0) >= 10) {
            const spl = current;
            const replace = new BTree(undefined, {parent: current.parent});
            replace.left = new BTree(Math.floor(current.value! / 2.), {parent: replace});
            replace.right = new BTree(Math.ceil(current.value! / 2.), {parent: replace});
            this.replaceParentWith(spl.parent!, spl, replace);
            return true;
        }
        return false;
    }



    reduce(): SNNumber {
        const tree = parseSNTuple(this.toTuple(this.tree));
        let exit = false;
        while (!exit) {
            let exploded = false;
            let split = false;

            tree.forEachLtR((leaf) => {
                exploded = exploded || this.doExplode(leaf);
            })

            if (!exploded) {
                split = tree.someLeafLtR((leaf) => {
                    return this.doSplit(leaf);
                });
            }

            exit = !exploded && !split;
        }

        return new SNNumber(tree);
    }

    private mag(tree: SNBTree): number {
        if (tree.value !== undefined) {
            return tree.value;
        }
        else if (tree.left && tree.right) {
            return this.mag(tree.left) * 3 + this.mag(tree.right) * 2;
        }
        console.log(tree);
        throw new Error('unbalanced tree');
    }

    get magnitude(): number {
        return this.mag(this.tree);
    }

    private toTuple(tree: SNBTree): number|SNTuple {
        if (!tree) {
            return 'missing' as any;
        }
        if (tree.value !== undefined) {
            return tree.value;
        }
        else {
            return [this.toTuple(tree.left!), this.toTuple(tree.right!)];
        }
    }

    toString(): string {
        return JSON.stringify(this.toTuple(this.tree));
    }
}

export const input18 = raw.map((x) => new SNNumber(parseSNTuple(x)));