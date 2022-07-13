import { DataStructure } from '$lib/classes/dataStructure';
import { writable } from 'svelte-local-storage-store';

export const data = writable<DataStructure>('data', new DataStructure());
