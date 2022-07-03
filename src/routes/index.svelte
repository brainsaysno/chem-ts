<script lang="ts">
	import '../app.css';

	import P5 from 'p5-svelte/P5.svelte';
	import type { Sketch } from 'p5-svelte/types';
	import { Atom, Carbon, Hydrogen } from '../lib/Atom';
	import { OrganicChain } from '$lib/helpers';

	const canvasWidth = 500;
	const canvasHeight = 500;

	const chain = new OrganicChain(2);
	chain.fill(Hydrogen);

	const sketch: Sketch = (p5) => {
		let startDragPosition = {
			x: 0,
			y: 0
		};
		p5.setup = () => {
			p5.createCanvas(canvasWidth, canvasHeight);
		};

		p5.draw = () => {
			p5.background(255);
			chain.draw(p5);
		};

		p5.mousePressed = (e: MouseEvent) => {
			startDragPosition = { x: p5.mouseX, y: p5.mouseY };
		};

		p5.mouseDragged = (e: MouseEvent) => {
			chain.translate(p5.mouseX - startDragPosition.x, p5.mouseY - startDragPosition.y);
			startDragPosition = { x: p5.mouseX, y: p5.mouseY };
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
