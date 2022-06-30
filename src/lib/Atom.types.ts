import type { Atom } from './Atom';

enum AtomSymbol {
	Hydrogen = 'H',
	Helium = 'He',
	Lithium = 'Li',
	Beryllium = 'Be',
	Boron = 'B',
	Carbon = 'C'
}

enum Color {
	Blue = 'blue',
	Red = 'red',
	Yellow = 'yellow',
	Gray = 'gray'
}

interface PositionInterface {
	x: number;
	y: number;
}

interface AtomInterface {
	new (): Atom;
}

export { AtomSymbol, Color };
export type { PositionInterface, AtomInterface };
