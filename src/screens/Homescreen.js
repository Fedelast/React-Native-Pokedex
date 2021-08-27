import React, { useState } from 'react'
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Pokecard } from '../components/Pokecard'
import { usePokemonList } from '../hooks/usePokemonList'


export const Homescreen = () => {

    const [inputstate,setinputstate] = useState('')
    const {pokeList,loading,getPokemons,getPokemonByname,backtoInital} = usePokemonList()
    const [isSearching,setIssearching] = useState(false);


    const search = ()=>{

        if(inputstate.trim() === ''){
            return
        }else{
            getPokemonByname(inputstate.trim());
            setIssearching(true);
        }

        
    }

    const reset = ()=>{
        backtoInital();
        setIssearching(false);
    }

    if(loading){

        return(
            <ActivityIndicator
                color='blue'
                size={20}
            />
        )
    }



    return (
        
        <View style={{
            flex:1,
            alignItems:'center',
        }}>

                <Image
                    source={require('../assets/pokebackground.png')}
                    style={{
                        position:'absolute',
                        width:'100%',
                        height:'100%',
                        
                        
                    }}
                
                />  
                    {
                        !isSearching && 
                        <View>
                        <TextInput style={styles.input}
                            placeholder="Escribe el nombre de un pokemon"
                            onChangeText={(value)=>setinputstate(value)}
                        />
                        <TouchableOpacity style={styles.searchbtn} onPress={search}>

                            <Text style={{color:'white', fontWeight:'bold',fontSize:19}}>Buscar</Text>

                        </TouchableOpacity>

                        
                        </View>
                    }
                    

                    <FlatList 
                    data={pokeList}
                    renderItem={({item})=> <Pokecard pokemon={item}/>}
                    keyExtractor={(item)=> item.name}
                  
                    
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={{marginTop:30}}
                    ListFooterComponent={ !isSearching ? <Button title="MAS" onPress={getPokemons}/> : <Button title="Volver" onPress={reset}/>}

                   
                    
                    />

                    <Text style={{color:'black',alignSelf:'center',fontWeight:'bold'}}>© Made by Federico Lastra</Text>
        </View>
        
    )
}


const styles = StyleSheet.create({
    input:{
        backgroundColor:'white',
        borderRadius:15,
        width:300,
        marginTop:30,
        textAlign:'center'
        
    
    },
    searchbtn: {
        width:300,
        backgroundColor:'#2a9d8f',
        marginTop:10,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5

        
    }
})