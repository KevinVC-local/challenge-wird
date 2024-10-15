import { useDispatch, useSelector } from "react-redux";
import { PokemonModel } from "../models/pokemon";
import { FaTrash } from "react-icons/fa";
import { deletePokemonButtle } from "../../redux/states/pokemonBattle";
import { CustomButton } from ".";
import { clearLocalStorage } from "../utils";
import { PublicRoutes } from "../models/routes";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";

const SidebarBattle = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pokemons = [], isLoading } = useSelector((state: any) => state.pokemonsBattle );

  const handleDelete = (id: number) => {
    dispatch(deletePokemonButtle(id));
  };

  const handleLogout = () => {
    clearLocalStorage('user');
    clearLocalStorage('pokemonsBattle');
    navigate('/' + PublicRoutes.LOGIN, { replace: true });
}

  return (
    <div className="min-w-full md:min-w-96 flex flex-col relative lg:fixed">
      <p className="font-bold text-2xl text-center">LISTOS PARA EL COMBATE</p>
 
      <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full mt-5 '>
            {
              !isLoading && pokemons?.map( ({name , image, id}: PokemonModel) => (
                <div className='flex flex-col' key={`${name}-${id}`} >
                  <div className='w-full h-full border border-gray-3 shadow-4 rounded-2xl relative flex justify-center items-center'>
                    <img src={image} alt={name} className=' object-cover' />
                    <div className='absolute top-3 right-3'>
                      <button onClick={() => handleDelete(id)} className="w-8 h-8 rounded-full bg-primary2 flex justify-center items-center text-white">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className='font-extrabold mt-3'>{ name }</p>
                </div>
              ))
            }{
              isLoading && <p>Cargando...</p>
            }{
              !isLoading && pokemons.length === 0 && <p>No hay pokemones seleccionados</p>
            }
      </section>

      <div className='text-white text-2xl flex justify-center items-center mt-4'>
        <CustomButton label='Cerrar Sesión' color="white" icon={<CiLogin />} onClick={handleLogout} />
      </div>
    </div>
  )
}

export default SidebarBattle