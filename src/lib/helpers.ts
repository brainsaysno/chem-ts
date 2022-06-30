import { Atom, Carbon } from './Atom';
import type { AtomInterface } from './Atom.types';

class OrganicChain {
	mainChainLength: number;
	head: Atom;
	mainChain: Atom[];
	constructor(mainChainLength: number) {
		this.mainChainLength = mainChainLength;
		this.mainChain = [];
		this.head = new Carbon();
		this.mainChain.push(this.head);
		while (this.mainChain.length < this.mainChainLength) {
			let newAtom = new Carbon();
			this.head.link(newAtom);
			this.mainChain.push(newAtom);
		}
	}

	fill(AtomType: AtomInterface) {
		this.mainChain.forEach((atom: Atom) => {
			atom.fill(AtomType);
		});
	}

	draw(sketch: any) {
		this.head.draw(sketch);
	}
}

export { OrganicChain };