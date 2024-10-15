import { createSlice } from '@reduxjs/toolkit';
import { PokemonsDetails, PokemonModel } from '../../core/models/pokemon';

export const EmptyPokemonListState: PokemonsDetails = {
    pokemons: [],
    isLoading: false,
    page: 0
  };

export const pokemonsDetailsSlice = createSlice({
    name: 'pokemonsDetails',
    initialState: EmptyPokemonListState,
    reducers: {
        startLoadingPokemonsDetails: (state ) => {
            state.isLoading = true;
        },
        setPokemonsDetails: ( state, action ) => {
            state.isLoading = false;
            state.page = action.payload.page;
            const newPokemons = action.payload.pokemons.filter((newPokemon: PokemonModel) => {
            return !state.pokemons.some(existingPokemon => existingPokemon.id === newPokemon.id);
            });
            state.pokemons = [...state.pokemons, ...newPokemons];
        }
    }
});


export const { startLoadingPokemonsDetails, setPokemonsDetails } = pokemonsDetailsSlice.actions;

export default pokemonsDetailsSlice.reducer;