import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View ,ScrollView} from 'react-native'
import { usePokemonInfo } from '../hooks/usePokemonInfo';
import Icon from 'react-native-vector-icons/Ionicons';

export const Detailscreen = ({navigation,route}) => {

    const {pokemon,bg} = route.params;
    const {pokedata,loading} = usePokemonInfo(pokemon.id)

    return (

        
        <View style={{flex:1}}>

                <Image
                    source={require('../assets/pokebackground.png')}
                    style={{
                        position:'absolute',
                        width:'100%',
                        height:'100%',
                        
                        
                    }}
                />

            <TouchableOpacity
                onPress={()=>navigation.popToTop()}
                style={styles.back}
            >
                     <Icon
                         name="arrow-back-outline"
                         size={50}
                         color="black"
                     />
            </TouchableOpacity>

            <View style={{
                ...styles.pokeView,
                backgroundColor:bg
                
            }}>
                <Text style={styles.title}>{pokemon.name}</Text>

                <Image
                    source={{
                        uri:pokemon.picture
                    }}
                    style={styles.img}
                
                />
               

            </View>
            
            {
                loading ? <ActivityIndicator size={100} color={bg} style={styles.activity}/> :

                <View>
                        <View style={styles.infocontainer}>
                            <Text style={styles.infotitle}>Tipos: </Text>
                            {
                                pokedata.types.map(({type}) => <Text style={{fontSize:19}} key={type.name}>  {type.name}</Text>)
                            }


                        </View>
                    
                        <View style={styles.infocontainer}>
                                <Text style={styles.infotitle}>Peso: </Text>
                                <Text style={{fontSize:19}}> {pokedata.weight} kg</Text>
                        </View>
                        
                        <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{backgroundColor:bg,marginTop:30}}
        
                        >
                            <Image source={{uri:pokedata.sprites.front_default}} style={styles.imgS}/>
                            <Image source={{uri:pokedata.sprites.back_default}} style={styles.imgS}/>
                            <Image source={{uri:pokedata.sprites.front_shiny}} style={styles.imgS}/>
                            <Image source={{uri:pokedata.sprites.back_shiny}} style={styles.imgS}/>

                        </ScrollView>
                </View>
            }
            


        </View>
    )
}


const styles = StyleSheet.create({

    pokeView:{
        width:350,
        height:350,
        borderRadius:1000,
        alignSelf:'center',
        marginTop:30,
        justifyContent:'center',
        alignItems:'center'
        
        
    },

    img:{
        width:200,
        height:200,
        
    },

    title:{
        fontSize:29,
        color:'white',
        fontWeight:'bold',
        lineHeight:40,
        top:-20

    },
    back:{
        left:20,
        top:20,
        
    },

    activity:{
        alignSelf:'center'
    },

    infotitle:{
        fontSize:24,
        textDecorationLine:'underline'
    },

    infocontainer:{
        flexDirection:'row',
        marginTop:30,
        alignItems:'center',
        marginLeft:50
    },
    imgS:{
        height:120,
        width:120
    }

})