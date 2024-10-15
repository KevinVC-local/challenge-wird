import { PokemonModel, Result } from "../../core/models/pokemon";
import { pokemonApi } from "../apis/pokemon.api";
import { setPokemons, startLoadingPokemons } from "../states/pokemonList";
import axios from 'axios';
import { setPokemonsDetails, startLoadingPokemonsDetails } from "../states/pokemonsDetails";
import { setPokemonsButtle, startLoadingPokemonsButtle } from "../states/pokemonBattle";


export const getPokemons = ( limit: number ) => {
    return async( dispatch: any, _getState: any ) => {
        dispatch( startLoadingPokemons() );

        const { data } = await pokemonApi.get(`/pokemon?limit=${limit}&offset=0`);

        dispatch( setPokemons({ pokemons: data.results  }) );
    }
}

export const getPokemonsDetail = (page = 0) => {
    return async( dispatch: any, _getState: any ) => {

        if (page > 6) {
            return;
        }
        const { data } = await pokemonApi.get(`/pokemon?limit=20&offset=${ page * 20 }`);
        dispatch( startLoadingPokemonsDetails() );
        
        const pokemonDetailsPromises = data.results.map((pokemon: Result) =>
            axios.get(pokemon.url)
        );

        const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);

        const pokemonDetails: PokemonModel[] = pokemonDetailsResponses.map((response: any) => {
            const data = response.data;
            return {
              name: data.name,
              id: data.id,
              height: data.height,
              image: data.sprites.front_default,
              types: data.types.map((typeInfo: any) => typeInfo.type.name),
              baseStats: {
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                specialAttack: data.stats[3].base_stat,
                specialDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
              },
            };
          });

          dispatch( startLoadingPokemonsButtle() );
          const shuffledPokemons = pokemonDetails.sort(() => 0.5 - Math.random());
          const selectedPokemons = shuffledPokemons.slice(0, 6); // Tomar los primeros 6

          dispatch( setPokemonsButtle({ pokemons: selectedPokemons }) );
          

          dispatch( setPokemonsDetails({ pokemons: pokemonDetails, page: page + 1 }) );
    }
}

export const getPokemonById = async (id : number) => {
    const { data } = await pokemonApi.get(`/pokemon/${id}`);
    return data;
}