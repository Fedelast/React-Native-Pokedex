import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImageColors from 'react-native-image-colors';


export const Pokecard = ({pokemon}) => {

    const navigation = useNavigation();


    const [loading, setloading] = useState(true)
    const [bg,setBg] = useState('grey');
    const isMounted = useRef(true);

    useEffect(()=>{

        
        

        ImageColors.getColors(pokemon.picture,{fallback:'grey'})
        .then(colors =>{

            if(!isMounted.current){
                return
            }

            setBg(colors.dominant)
            setloading(false);
        })
        
        return ()=>{
            isMounted.current = false;
        }
    },[])





    return (
        <TouchableOpacity
            onPress={()=>navigation.navigate('detail',{pokemon,bg})}
        >

                <View style={{
                    ...styles.pokecard,
                    backgroundColor:bg
                }}>
                    {
                         loading  ? <ActivityIndicator size={30} color="white" style={styles.pokeImg}/> :
                        
                         <>
                        <Text style={styles.poketitle}>{pokemon.name}</Text>
                        <Text style={styles.pokeId} > # {pokemon.id}</Text>

                        <Image
                            source={{
                                uri:pokemon.picture
                            
                            }}
                            style={styles.pokeImg}
                        />
                        </>
                    }

                   

                </View>

            
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    pokecard:{
        width:160,
        height:180,
        marginHorizontal:15,
        marginVertical:15,
        padding:15,
        borderRadius:10

    },
    poketitle:{
        fontSize:19,
        color:'white',
        alignSelf:'center',
        fontWeight:'bold'
    },
    pokeImg:{
        width:100,
        height:100,
        alignSelf:'center',
        marginTop:12

    },
    pokeId:{
        backgroundColor:'white',
        width:50,
        alignItems:'center',
        alignContent:'center',
        borderRadius:15,
        position:'absolute',
        bottom:10,
        left:10


    }
})