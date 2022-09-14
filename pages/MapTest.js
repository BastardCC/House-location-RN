import { Text, View,StyleSheet, Dimensions, Image, Switch, Animated, TextInput, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import MapView, {Callout, Circle, Marker} from 'react-native-maps'
import {getDistance, getPreciseDistance} from 'geolib';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { markers, mapDarkStyle, mapStandardStyle } from '../constants/mapData';
import { TouchableOpacity } from 'react-native-gesture-handler';

import StarRating from '../components/StartRating';

const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const MapTest = () => {

  const initialMapState = {
    markers,
    categories: [
      {
        name: 'Fastfood Center',
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name='food-fork-drink' size={18} />
      },
      {
        name: 'Restaurant',
        icon: <Ionicons style={styles.chipsIcon} name='ios-restaurant' size={18} />
      },
      {
        name: 'Dineouts',
        icon: <Ionicons style={styles.chipsIcon} name='md-restaurant' size={18} />
      },
      {
        name: 'Snacks Corner',
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name='food' size={18} />
      },
      {
        name: 'Hotel',
        icon: <Fontisto style={styles.chipsIcon} name='hotel' size={18} />
      },
    ],
    region: {
        latitude: -21.43120315957834, 
        longitude: 47.1127274556346,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    coordinate: {
      latitude: -21.43120315957834, 
      longitude: 47.1127274556346,
    }
  }

    const [state, setState] = useState(initialMapState);
    const [isEnabled, setIsEnabled] = useState(false);
    const [mapStyle, setMapStyle] = useState(mapStandardStyle);
    const [radius, setRadius] = useState('500');
    const [inputRadius, setInputRadius] = useState(radius);
    const [markersTaken, setMarkersTaken] = useState([])
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if(isEnabled == false){
            setMapStyle(mapDarkStyle)
        }else{
            setMapStyle(mapStandardStyle)
        }
    };

    const _map = useRef(null);
    const _scrollView = useRef(null);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);


    const distance = (start, end) => {
      let dis = getDistance(
        start,end
      );
      return dis;
    }

    useEffect(() => {
      state.markers.map(marker => (
        marker.distance = distance(state.region, marker.coordinate)
      ));
      console.log('RADIUS:'+radius);
      console.log('INPUT:'+inputRadius);

      let markersTaken = markers.filter(function(el) {
        return el.distance < radius
      });
      setMarkersTaken(markersTaken);

      console.log(markersTaken);

      mapAnimation.addListener(({value}) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3);
        if(index >= markersTaken.length){ //state.markers
          index = markersTaken.length - 1; //state.markers
        }
        if(index <= 0){
          index = 0;
        }

        clearTimeout(regionTimeout)

        const regionTimeout = setTimeout(() => {
            if(mapIndex !== index){
              mapIndex = index;
              const {coordinate} = markersTaken[index] //state.markers
              _map.current.animateToRegion(
                {
                  ...coordinate,
                  latitudeDelta: state.region.latitudeDelta,
                  longitudeDelta: state.region.longitudeDelta
                },
                350
              )
            }
          }, 10)
        })
      }, [radius, inputRadius]);

      const interpolations = markersTaken.map((marker, index) => { //state.markers
          const inputRange = [
            (index -1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index+1) * CARD_WIDTH),
          ];
    
          const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp'
          })
          return {scale};
      })

      const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;
        // const markerID = mapEventData._targetInst.return.index;
        let x= (markerID * CARD_WIDTH) + (markerID * 20);
        
        _scrollView.current.scrollTo({x: x, y: 0, animated: true})
      }

      const updateRadius = () => {
        setRadius(inputRadius)
      }
 
    return (
        <View>
            <View style={{width:30, backgroundColor:"transparent",position:'absolute',top:"15%",left:"90%",zIndex:10}}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <MapView
                ref={_map}
                style={styles.map}
                customMapStyle={mapStyle}
                initialRegion={state.region}
            >
              <Circle center={state.region} radius={parseInt(radius)} fillColor='rgba(132,193,255,0.3)' strokeColor='#B5B5B5' />
              <Marker coordinate={state.region} title='You are here' />
              {markersTaken.map((marker, index) => {
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].scale,
                    },
                  ],
                };
                  return(
                    <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                      <Animated.View style={[styles.markerWrap]}>
                        <Animated.Image
                          source={require('../assets/house-location-marker.png')}
                          style={[styles.marker, scaleStyle]}
                          resizeMode="cover"
                        />
                      </Animated.View>
                    </MapView.Marker>
                  )
              })}
            </MapView>
            <View style={styles.searchBox}>
              <TextInput
                keyboardType='numeric'
                placeholder='Search here'
                placeholderTextColor='#000'
                autoCapitalize='none'   
                style={{flex: 1, padding: 0}}
                onChangeText={(inputRadius) => setInputRadius(inputRadius)}
                value={inputRadius}
              />
              <TouchableOpacity onPress={() => updateRadius()}>
                <Ionicons name='ios-search' size={20} />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              height={50}
              style={styles.chipsScrollView}
              contentContainerStyle={{
                paddingRight: Platform.OS === 'android' ? 20 : 0
              }}
            >
              {state.categories.map((category, index) => (
                <TouchableOpacity style={styles.chipsItem} key={index}>
                  {category.icon}
                  <Text>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Animated.ScrollView
              ref={_scrollView}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={1}
              style={styles.scrollView}
              pagingEnabled
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment= 'center'
              contentContainerStyle= {{
                paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
              }}
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation
                    }
                  }
                }
              ],{
                useNativeDriver: true
              })}
            >
              {
                markersTaken.map((marker, index) => {
                    return(
                      <View style={styles.card} key={index}>
                        <Image
                          source={marker.image}
                          style={styles.cardImage}
                          resizeMode='cover'
                        />
                        <View style={styles.textContent}>
                          <Text numberOfLines={1} style={styles.cardTitle}>{marker.title}</Text>
                          <StarRating ratings={marker.rating} reviews={marker.review} />
                          <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                          <View style={styles.button}>
                            <TouchableOpacity
                              onPress={() => {}}
                              style={[styles.signIn, {
                                borderColor: "#FF6347",
                                borderWidth: 1
                              }]}
                            >
                              <Text style={[styles.textSign, {
                                color: '#FF6347'
                              }]}>See the house</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )

                })
              }
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1
    },
    map: {
      width: Dimensions.get('window').width,
      height: '100%'
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    name: {
        fontSize: 16,
        marginBottom: 5
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    image: {
        width: 120,
        height: 80
    },
    chipsIcon: {
      marginRight: 5
    },
    chipsScrollView: {
      position:'absolute', 
      // top: 90,
      top: Platform.OS === 'ios' ? 90 : 100, 
      paddingHorizontal:10
    },
    chipsItem: {
      flexDirection:"row",
      backgroundColor:'#fff', 
      borderRadius:20,
      padding:8,
      paddingHorizontal:20, 
      marginHorizontal:10,
      height:35,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    searchBox: {
      position:'absolute', 
      marginTop: Platform.OS === 'ios' ? 40 : 40, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '90%',
      alignSelf:'center',
      borderRadius: 5,
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    scrollView: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: 10
    },
    card: {
      elevation: 2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: {x: 2, y: -2},
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: 'hidden'
    },
    cardImage: {
      flex: 3,
      width: '100%',
      height: '100%',
      alignSelf: 'center'
    },
    textContent: {
      flex: 2,
      padding: 10
    },
    cardTitle: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    cardDescription: {
      fontSize: 12,
      color: '#444'
    },
    markerWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50
    },
    marker: {
      width: 30,
      height: 30
    },
    button: {
      alignItems: 'center',
      marginTop: 5
    },
    signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
  });

export default MapTest;