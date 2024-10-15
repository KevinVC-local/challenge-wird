import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './states/user';
import pokemonListSliceReducer from './states/pokemonList';
import pokemonsDetailsSliceReducer from './states/pokemonsDetails';
import pokemonsBattleSliceReducer from './states/pokemonBattle';
import { UserInfo } from '../core/models/user.model';
import { PokemonList, PokemonsBattle, PokemonsDetails } from '../core/models/pokemon';

export interface AppStore {
  user: UserInfo;
  pokemonList: PokemonList,
  pokemonsDetails: PokemonsDetails,
  pokemonsBattle: PokemonsBattle,
}

export default configureStore<AppStore>({
  reducer: {
    user: userSliceReducer,
    pokemonList: pokemonListSliceReducer,
    pokemonsDetails: pokemonsDetailsSliceReducer,
    pokemonsBattle: pokemonsBattleSliceReducer,
  }, middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
