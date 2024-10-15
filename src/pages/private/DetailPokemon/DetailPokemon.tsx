import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonById } from "../../../redux/services/pokemon.service";
import { PokemonModel } from "../../../core/models/pokemon";
import { FaArrowLeft } from "react-icons/fa";
import { CustomButton } from "../../../core/components";
import { useDispatch } from "react-redux";
import { addPokemonButtle } from "../../../redux/states/pokemonBattle";

const DetailPokemon = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailPokemon, setDetailPokemon] = useState<PokemonModel>()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDetailPokemon();
  }, [id]);

  const getDetailPokemon = async () => {
    try {
      const pokemonById = await getPokemonById(parseInt(id as string));
      const dataFilter = {
        name: pokemonById.name,
        id: pokemonById.id,
        height: pokemonById.height,
        image: pokemonById.sprites.front_default,
        types: pokemonById.types.map((typeInfo: any) => typeInfo.type.name),
        baseStats: {
          attack: pokemonById.stats[1].base_stat,
          defense: pokemonById.stats[2].base_stat,
          specialAttack: pokemonById.stats[3].base_stat,
          specialDefense: pokemonById.stats[4].base_stat,
          speed: pokemonById.stats[5].base_stat,
        },
      }
      setDetailPokemon(dataFilter);
      setLoading(true);
      
    } catch (error) {
      console.log('object');
    }
  }

  const handleAddPokemon = () => {
    dispatch(addPokemonButtle(detailPokemon));
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center justify-center" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <p className="mr-3">Volver</p>
        </div>
        <CustomButton onClick={handleAddPokemon} label={"Agregar a Lista"}  />
      </div>
      {
        !loading && <p>Cargando...</p>
      }
      {
        loading && 
        <div className="flex flex-col w-full">
          <img src={detailPokemon?.image} alt="image-pokemon" srcSet="" className="min-h-80 w-auto" />
          <div className="flex flex-col justify-center items-center">
            <ul>
              <li className="font-semibold">Nombre: <span className="font-normal">{detailPokemon?.name}</span> </li>
              <li className="font-semibold">Altura: <span className="font-normal">{detailPokemon?.height}</span> </li>
              <li className="font-semibold">Tipo: <span className="font-normal">{detailPokemon?.types}</span> </li>
              <li className="font-semibold">Ataque: <span className="font-normal">{detailPokemon?.baseStats.attack}</span> </li>
              <li className="font-semibold">Defensa: <span className="font-normal">{detailPokemon?.baseStats.defense}</span> </li>
              <li className="font-semibold">Defensa Especial: <span className="font-normal">{detailPokemon?.baseStats.specialDefense}</span> </li>
              <li className="font-semibold">Ataque Especial: <span className="font-normal">{detailPokemon?.baseStats.specialAttack}</span> </li>
              <li className="font-semibold">Velocidad: <span className="font-normal">{detailPokemon?.baseStats.speed}</span> </li>
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default DetailPokemon