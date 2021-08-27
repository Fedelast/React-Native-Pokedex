import axios from "axios"
import { useEffect, useRef, useState } from "react";


export const usePokemonList = () => {

    const [loading,setLoading] = useState(true);
    const [pokeList,setPokeList] = useState([]);
    const page = useRef('https://pokeapi.co/api/v2/pokemon/?limit=40')

    const getPokemons = async()=>{

        
        const resp = await axios.get(page.current);

        page.current = resp.data.next;

        mapPokemons(resp.data.results)
    }


    const mapPokemons = (pokelista) =>{

        const pokeArr = pokelista.map((pokemon)=>{

            const urlParts = pokemon.url.split('/')
            const id = urlParts[urlParts.length - 2]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            
            return {
                name:pokemon.name,
                id,
                picture
            }
           
            

        })

        setPokeList([...pokeList,...pokeArr]);
        setLoading(false);

    }

    const getPokemonByname = async(name)=>{

        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if(resp.status === 200){
            setPokeList([{
                name:resp.data.name,
                id:resp.data.id,
                picture:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${resp.data.id}.png`
            }])
    
            setLoading(false)
        }
        
        

        
        

    }



    const backtoInital = () =>{

        page.current = 'https://pokeapi.co/api/v2/pokemon/?limit=40';
        getPokemons();
        setPokeList(...pokeList.splice(0,1));


    }


    useEffect(()=>{

        getPokemons();
    },[])



    return {
        loading,
        pokeList,
        getPokemons,
        getPokemonByname,
        backtoInital
    }





}
