<script lang="ts">
	import P5 from 'p5-svelte';
	import { Hydrogen } from '../lib/Atom';

	const sketch = (p5: any) => {
		const hydrogen = new Hydrogen();
		let linked = [];
		for (let i = 0; i < 3; i++) {
			linked.push(new Hydrogen());
		}
		linked.forEach((l) => hydrogen.link(l));
		linked[0].link(new Hydrogen(), 2);
		linked[0].link(new Hydrogen(), 3);
		linked[0].link(new Hydrogen());

		p5.setup = () => {
			p5.createCanvas(400, 400);
			hydrogen.draw(p5);
		};

		/* 		p5.draw = () => {
			p5.clear();
		}; */
	};
</script>

<P5 {sketch} parentDivStyle="background-color:white" />
