import { DataStructure } from '$lib/classes/dataStructure';
import { writable as writablels } from 'svelte-local-storage-store';

export const data = writablels<DataStructure>('data', new DataStructure());
