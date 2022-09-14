import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import * as Location from 'expo-location'
import IonIcons from 'react-native-vector-icons/Ionicons';

const Profil = ({navigation}) => {

    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isLocating, setIsLocating] = useState(false);

    const handleGeoLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        //VERIFIER GEOLOC
        try{
            setIsLocating(true)
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);

            /* 
            Object {
                "coords": Object {
                    "accuracy": 20,
                    "altitude": 1118.5999755859375,
                    "altitudeAccuracy": 2.303252696990967,
                    "heading": 0,
                    "latitude": -21.4312273,
                    "longitude": 47.1126996,
                    "speed": 0,
                },
                "mocked": false,
                "timestamp": 1650009944189,
                }
            */

                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);
                setIsLocating(false);

        }catch(error){
            setErrorMsg("Problem de geoloc")
        }
        
      }
    let geoLocText = '';
    if(errorMsg){
        geoLocText = errorMsg
    }else if(latitude !== null && longitude !==null){
        geoLocText = 'OK'
    }
    
  return (
    <View style={{flex: 1 ,justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', flex: 1}} onPress={handleGeoLocation}>
            <IonIcons name='earth' size={60} />
        </TouchableOpacity>
        {
            isLocating && <ActivityIndicator size="large" color="black" />  
        }
        {
            geoLocText === 'OK' && (
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Map', {
                        latitude: latitude,
                        longitude: longitude
                    })}
                    style={{backgroundColor: 'red', alignItems:'center', justifyContent: 'center', flex: 0.7}}>
                    <Text>Geoloc</Text>
                </TouchableOpacity>
            )
                
        }
    </View>
  )
}

export default Profil;

const styles = StyleSheet.create({})