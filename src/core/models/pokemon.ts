export interface PokemonList {
    pokemons:  Result[];
    isLoading: boolean
}

export interface PokemonsDetails {
    pokemons:  PokemonModel[];
    isLoading: boolean,
    page:    number;
}

export interface PokemonsBattle {
    pokemons:  PokemonModel[];
    isLoading: boolean,
}

export interface Result {
    name: string;
    url:  string;
}

export interface PokemonModel {
    name: string;
    id: number;
    height: number;
    image: string;
    types: string[];
    baseStats: {
      attack: number;
      defense: number;
      specialAttack: number;
      specialDefense: number;
      speed: number;
    };
}