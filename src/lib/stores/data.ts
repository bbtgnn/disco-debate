import { DataStructure } from '$lib/classes/dataStructure';
import type { Block } from '$lib/classes/block';

import { writable as writablels } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

export const data = writablels<DataStructure>('data', new DataStructure());
export const selectedBlock = writable<Block | null>(null);
