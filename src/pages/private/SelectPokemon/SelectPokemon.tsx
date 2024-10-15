import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getPokemonsDetail } from '../../../redux/services/pokemon.service';
import { CustomSelect } from '../../../core/components';
import { PokemonModel } from '../../../core/models/pokemon';
import { FaPlus } from 'react-icons/fa';
import { addPokemonButtle } from '../../../redux/states/pokemonBattle';
import { useNavigate } from 'react-router-dom';
import { Options } from '../../../core/models/select';

const SelectPokemon = () => {

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  
  const { pokemons = [] } = useSelector((state: any) => state.pokemonList );
  const { pokemons: pokemonDetails, isLoading: isLoadingDetail  } = useSelector((state: any) => state.pokemonsDetails );

  useEffect(() => {
    dispatch( getPokemons(151) );    
  }, [])

  useEffect(() => { 
    dispatch( getPokemonsDetail(page) );   

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [page])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 50
    ) {
      // Si llega al final del scroll, incrementa la página
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSelect = (e: Options) => {
    const number = e?.url?.split('/').slice(-2, -1)[0];
    navigate(`/dashboard/view-pokemon/${number}`);
}

const handleAddPokemon = (event: React.MouseEvent<HTMLButtonElement>, pokemon: PokemonModel ) => {
  event.stopPropagation();
  dispatch(addPokemonButtle(pokemon));
}

const handleViewDetail = (pokemon: PokemonModel) => {
  navigate(`/dashboard/view-pokemon/${pokemon.id}`);
}

  return (
    <div className='w-[80%] m-auto'>
      <div className='flex flex-col justify-center items-center'>
        <div className='min-w-96 m-auto mb-4'>
          <CustomSelect disabled={false} onChange={handleSelect} label="Que pokemon buscas*" name="unit" options={pokemons} value={''} />
        </div>
        <section className='grid grid-cols-2 lg:grid-cols-4 gap-5 w-full'>
            {
              !isLoadingDetail && pokemonDetails.map( (pokemon: PokemonModel) => (
                <div className='flex flex-col cursor-pointer' key={`${pokemon.name}-${pokemon.id}`} onClick={() => handleViewDetail(pokemon)}>
                  <div className='w-full h-full border border-gray-3 shadow-4 rounded-2xl relative flex justify-center items-center'>
                    <img src={pokemon.image} alt={pokemon.name} className=' object-cover' />
                    <div className='absolute top-3 right-3'>
                      <button onClick={(event) => handleAddPokemon(event, pokemon)} className="w-8 h-8 rounded-full bg-primary2 flex justify-center items-center text-white">
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <p className='font-extrabold mt-3'>{ pokemon.name }</p>
                </div>
              ))
            } {
              isLoadingDetail && <p>Cargando...</p>
            }
          </section>
      </div>
    </div>
  )
}

export default SelectPokemon