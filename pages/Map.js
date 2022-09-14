import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import MapView, {Marker} from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';

const Map = ({route}) => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        setLatitude(route.params.latitude);
        setLongitude(route.params.longitude);
        console.log(latitude);
        console.log(longitude);
    },[latitude, longitude])

    //WORLD PART
    const regionInfos = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const markerCoord = {
      latitude: latitude,
      longitude: longitude,
    }

        return (
          <View style={styles.container}>
              <StatusBar/>
            <MapView 
                initialRegion={regionInfos}
                style={styles.map}
            >
              <Marker 
                coordinate={markerCoord}
                title="Vous êtes ici"
              />
            </MapView>
          </View>
        )
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
})