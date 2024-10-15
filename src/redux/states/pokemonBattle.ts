import { createSlice } from '@reduxjs/toolkit';
import { PokemonModel, PokemonsBattle } from '../../core/models/pokemon';
import { persistLocalStorage } from '../../core/utils';

export const EmptyPokemonListState: PokemonsBattle = {
    pokemons: [],
    isLoading: false,
  };

export const pokemonBattleSlice = createSlice({
    name: 'pokemonsBattle',
    initialState: localStorage.getItem('pokemonsBattle') ? JSON.parse(localStorage.getItem('pokemonsBattle') as string) : EmptyPokemonListState,
    reducers: {
        startLoadingPokemonsButtle: (state ) => {
            state.isLoading = true;
        },
        setPokemonsButtle: ( state, action ) => {
            state.isLoading = false;
            const dataStorage = localStorage.getItem('pokemonsBattle');
    
            if (dataStorage) {
                const parsedData = JSON.parse(dataStorage);
                const data = isArrayOrObject(parsedData);
                state.pokemons = data || [];
            } else {
                persistLocalStorage<PokemonModel[]>('pokemonsBattle', action.payload.pokemons);
                state.pokemons = Array.isArray(action.payload.pokemons) ? action.payload.pokemons : [];
            }
        },
        deletePokemonButtle: (state, action) => {
            state.isLoading = false;
            state.pokemons = state.pokemons.filter((pokemon: PokemonModel) => pokemon.id !== action.payload);
            persistLocalStorage<PokemonModel[]>('pokemonsBattle', state.pokemons);
        },
        addPokemonButtle: (state, action) => {
            state.isLoading = false;

            if (!state.pokemons) {
                state.pokemons = [];
            }

            if (state.pokemons && state.pokemons.length >= 6) {
                return;
            }

            const exists = state.pokemons.some((pokemon: PokemonModel) => pokemon.id === action.payload.id);
            if (exists) {
                return;
            }
            state.pokemons = [...state.pokemons, action.payload];
            persistLocalStorage<PokemonModel[]>('pokemonsBattle', state.pokemons);
        }
    }
});

const isArrayOrObject = (data: any) => {
    if (Array.isArray(data)) {
        return data;
    } else {
        return Object.values(data);
    }
    
}


export const { startLoadingPokemonsButtle, setPokemonsButtle, deletePokemonButtle, addPokemonButtle } = pokemonBattleSlice.actions;

export default pokemonBattleSlice.reducer;