import axios from "axios";
import { useEffect, useState } from "react"



export const usePokemonInfo = (id) => {
    
    const [loading,setLoading] = useState(true);
    const [pokedata,setPokedata] = useState({});


    const getData = async()=>{

        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        setPokedata(resp.data);
        setLoading(false);
    }


    useEffect(()=>{
        getData()
    },[])

    return{
        loading,
        pokedata
    }



}