import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import * as Location from 'expo-location';

const Details = ({route, navigation}) => {

  const [house, setHouse] = useState(null);

  useEffect(() => {
    let {house} = route.params;
    setHouse(house);
    console.log(house)
  }, [house]);

  
  
  const header = () => {
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, alignItems: 'center', marginHorizontal: 25}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <IonIcons name='chevron-back' color='black' size={40} />
        </TouchableOpacity>
        <Text style={{fontSize: 24}}>Details</Text>
        <IonIcons name='ios-heart-outline' color='#03045E' size={40} />
      </View>
    )
  }

  const mainImage = () => {
      return(
        <View style={{width: 350, height: 190, marginTop: 26, marginHorizontal: 25}}>
          <ImageBackground
            source={house.image}
            resizeMode='cover'
            style={{flex: 1}}
            imageStyle={{borderRadius: 20}}
          >
            <View style={{justifyContent:'space-between', flex:1}}>
              <View style={{height: 60, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 16}}>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('LiveTour')}
                  style={{height: 30, width: 30, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 15, justifyContent:'center', alignItems: 'center'}}>
                  <IonIcons name='eye' color='#03045E ' size={16}/>
                </TouchableOpacity>
              </View>
              <View style={{height:70, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, justifyContent: 'space-between'}}>
                  <View style={{height: 30, width: 60, backgroundColor: '#fff',justifyContent:'center', alignItems: 'center', flexDirection:'row', borderRadius: 10}}>
                    <IonIcons name="star" color='#FFD233' size={16} />
                    <Text>4.2</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../assets/img/inside4.jpg')}
                      style={{height: 30, width: 35, marginHorizontal: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 10}}
                    />
                    <Image
                      source={require('../assets/img/inside5.jpg')}
                      style={{height: 30, width: 35,  marginHorizontal: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 10}}
                    />
                    <Image
                      source={require('../assets/img/inside6.jpg')}
                      style={{height: 30, width: 35,  marginRight: 20, marginLeft: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 10}}
                    />
                  </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )
  }

  const details = () => {
    return(
      <View>
        <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{house.name}</Text>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <IonIcons name="location-sharp" color='#000' size={18} />
              <Text style={{fontSize: 10}}>{house.adress}</Text>
            </View>
          </View>
          <View>
            <Text style={{fontSize: 16, color: '#00B4D8'}}>700€</Text>
            <Text style={{fontSize: 16, color: '#00B4D8'}}>/per month</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <View style={{flexDirection: 'row', marginRight: 20}}>
            <IonIcons name="bed" size={18} color='#A0A0A0' />
            <Text style={{color: '#A0A0A0'}}>3 Bedroom</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name="bath" size={18} color='#A0A0A0' />
            <Text style={{color: '#A0A0A0'}}>2 Bathroom</Text>
          </View>
        </View>
      </View>
    )
  }

  const owner = () => {
    return(
      <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Image 
            source={require('../assets/people/user4.png')}
            style={{height: 50, width: 50, borderRadius: 10}}
          />
          <View style={{justifyContent: 'center', marginLeft: 10}}>
            <Text style={{fontWeight: 'bold'}}>
              {house.owner}
            </Text>
            <Text style={{fontSize: 10}}>
              Owner
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{height: 40, width: 40, backgroundColor: '#E9E9E9', borderRadius: 10, justifyContent:'center', alignItems: 'center'}}>
            <IonIcons name='ios-mail' color='#00B4D8' size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{height: 40, width: 40, backgroundColor: '#E9E9E9', borderRadius: 10, marginLeft: 20, justifyContent:'center', alignItems: 'center'}}>
            <IonIcons name='call' color='#00B4D8' size={24} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const description = () => {
    return(
      <View style={{marginTop: 30}}>
          <Text style={{fontWeight: 'bold'}}>Description</Text>
          <Text style={{fontSize: 12, color: '#797979', letterSpacing: 2, lineHeight: 18}}>{house.description}</Text>
      </View>
    )
  }

  const location = () => {
    return(
      <View style={{marginTop: 30, marginBottom: 30 }}>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Location</Text>
        <Image
          source={require("../assets/img/map.png")}
          style={{width: 330, height: 190, borderWidth: 1, borderColor: '#000'}}
        />
      </View>
    )
  }

  if(house){
    return (
      <View style={{flex: 1 }}>
          {header()}
        <ScrollView style={styles.container}>
          {mainImage()}
          <View style={{paddingHorizontal: 30}}>
            {details()}
            {owner()}
            {description()}
            {location()}
          </View>
        </ScrollView>
      </View>
      
    )
  }else{
    return(<></>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Details