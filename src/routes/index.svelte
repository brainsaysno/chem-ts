<script lang="ts">
	import '../app.css';

	import P5 from 'p5-svelte';
	import { Hydrogen } from '../lib/Atom';

	const canvasWidth = 500;
	const canvasHeight = 500;

	const hydrogen = new Hydrogen();
	let linked = [];
	for (let i = 0; i < 3; i++) {
		linked.push(new Hydrogen());
	}
	linked.forEach((l) => hydrogen.link(l));
	linked[0].link(new Hydrogen(), 2);
	linked[0].link(new Hydrogen(), 3);
	linked[0].link(new Hydrogen());

	const sketch = (p5: any) => {
		p5.setup = () => {
			p5.createCanvas(canvasWidth, canvasHeight);
			hydrogen.draw(p5);
		};
	};
</script>

<main class="h-screen w-screen flex justify-center items-center flex-col gap-5">
	<div class="text-center">
		<h1 class="text-3xl font-bold">👨‍🔬 Chem TS 👩‍🔬</h1>
		<h2 class="text-md font-medium">
			A chemistry molecule visualization tool made with <a
				href="https://svelte.dev/"
				class="text-orange-500 font-semibold">Svelte</a
			>,
			<a href="https://p5js.org/" class="text-red-500 font-semibold">p5</a> and
			<a href="https://www.typescriptlang.org/" class="text-blue-500 font-semibold">TypeScript</a>.
		</h2>
	</div>
	<div class="w-100 h-100 bg-gray-200 border-2 border-black">
		<P5 {sketch} />
	</div>
</main>
