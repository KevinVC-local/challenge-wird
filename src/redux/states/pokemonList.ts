import { createSlice } from '@reduxjs/toolkit';
import { PokemonList, Result } from '../../core/models/pokemon';

export const EmptyPokemonListState: PokemonList = {
    pokemons: [],
    isLoading: false,
  };

export const pokemonSlice = createSlice({
    name: 'pokemonList',
    initialState: EmptyPokemonListState,
    reducers: {
        startLoadingPokemons: (state ) => {
            state.isLoading = true;
        },
        setPokemons: ( state, action ) => {
            state.isLoading = false;
            state.pokemons = action.payload.pokemons.map((pokemon: Result) => ({
                value: pokemon.name,
                name: pokemon.name,
                key: `${pokemon.name}-${Math.random().toString(36).substring(2, 11)}`,
                selected: false,
                id: `${pokemon.name}-${Math.random().toString(36).substring(2, 11)}`,
                url: pokemon.url
            }));
        }
    }
});


export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;