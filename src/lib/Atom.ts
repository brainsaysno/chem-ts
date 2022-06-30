import { AtomSymbol, Color, type AtomInterface, type PositionInterface } from './Atom.types';

class Atom {
	symbol: AtomSymbol;
	children: Atom[];
	width: number;
	height: number;
	pos: PositionInterface;
	sketch: any;
	links: Link[];
	color: Color;
	parentLinkAngle: number | null;
	maxLinks: number;
	constructor(symbol: AtomSymbol, color?: Color, parentLinkAngle?: number) {
		this.symbol = symbol;
		this.children = [];
		this.width = 1;
		this.height = 1;
		this.pos = {
			x: 200,
			y: 200
		};
		this.links = [];
		this.color = color || Color.Gray;
		this.parentLinkAngle = parentLinkAngle || null;
		this.maxLinks = 4;
	}

	draw(sketch: any): void {
		const textOffset = 5;

		sketch.fill(this.color);
		this.links.forEach((l) => l.draw(sketch));
		sketch.ellipse(this.pos.x, this.pos.y, this.width, this.height);
		/* Create p5 label with symbol */
		sketch.fill('black');
		sketch.text(this.symbol, this.pos.x + textOffset, this.pos.y - textOffset);
		this.children.forEach((n) => n.draw(sketch));
		console.log('drawing, ', this.pos.x, this.pos.y);
	}

	link(atom: Atom, strength?: LinkStrength): void {
		if (this.links.length >= this.maxLinks) return;
		this.children.push(atom);
		let angle = 360 / (this.children.length + (this.parentLinkAngle ? 1 : 0));
		const linkLength = 100;
		this.links = [];
		this.children.forEach((n, i) => {
			const radianAngle =
				(angle * (i + 1) * Math.PI) / 180 + (this.parentLinkAngle ? this.parentLinkAngle : 0);
			console.log('Radian Angle:', radianAngle, n.symbol);
			console.log('ParentAngle:', this.parentLinkAngle, n.symbol);
			n.pos = {
				x: this.pos.x + Math.cos(radianAngle) * linkLength,
				y: this.pos.y + Math.sin(radianAngle) * linkLength
			};
			n.parentLinkAngle = Math.PI + radianAngle;
			this.links.push(new Link(this, n, strength));
		});
	}

	fill(AtomType: AtomInterface) {
		while (this.links.length != this.maxLinks) {
			this.link(new AtomType());
		}
	}
}

enum LinkStrength {
	Single = 1,
	Double = 2,
	Triple = 3
}

class Link {
	sketch: any;
	atom1: Atom;
	atom2: Atom;
	strength: LinkStrength;
	constructor(atom1: Atom, atom2: Atom, strength?: LinkStrength) {
		this.atom1 = atom1;
		this.atom2 = atom2;
		this.strength = strength || LinkStrength.Single;
	}

	draw(sketch: any): void {
		/* Drawing method for double and triple links is not great, might change later */
		const separation = 1.5;
		switch (this.strength) {
			case LinkStrength.Single:
				sketch.line(this.atom1.pos.x, this.atom1.pos.y, this.atom2.pos.x, this.atom2.pos.y);
				break;
			case LinkStrength.Double:
				sketch.line(
					this.atom1.pos.x + separation,
					this.atom1.pos.y + separation,
					this.atom2.pos.x + separation,
					this.atom2.pos.y + separation
				);
				sketch.line(
					this.atom1.pos.x - separation,
					this.atom1.pos.y - separation,
					this.atom2.pos.x - separation,
					this.atom2.pos.y - separation
				);
				break;
			case LinkStrength.Triple:
				sketch.line(
					this.atom1.pos.x + separation,
					this.atom1.pos.y + separation,
					this.atom2.pos.x + separation,
					this.atom2.pos.y + separation
				);
				sketch.line(
					this.atom1.pos.x - separation,
					this.atom1.pos.y - separation,
					this.atom2.pos.x - separation,
					this.atom2.pos.y - separation
				);
				sketch.line(this.atom1.pos.x, this.atom1.pos.y, this.atom2.pos.x, this.atom2.pos.y);
				break;
		}
	}
}

class Hydrogen extends Atom {
	constructor() {
		super(AtomSymbol.Hydrogen, Color.Blue);

		this.width = this.width * 5;
		this.height = this.height * 5;
		this.draw = this.draw.bind(this);
		this.maxLinks = 1;
	}
}

class Carbon extends Atom {
	constructor() {
		super(AtomSymbol.Carbon, Color.Red);

		this.width = this.width * 10;
		this.height = this.height * 10;
		this.draw = this.draw.bind(this);
		this.maxLinks = 4;
	}
}

export { Atom, Hydrogen, Carbon };
