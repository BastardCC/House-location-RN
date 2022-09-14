import React, {useState, useRef}  from 'react'
import {View, Text, Dimensions, StatusBar, FlatList, Image, StyleSheet, Animated, useWindowDimensions} from 'react-native'
import Paginator from '../components/Paginator'

const data = [
  {
    id: 1,
    image: require('../assets/img/inside6.jpg'),
    name: 'Kitchen'
  },
  {
    id: 2,
    image: require('../assets/img/inside4.jpg'),
    name: 'Bathroom'
  },
  {
    id: 3,
    image: require('../assets/img/inside5.jpg'),
    name: 'Bedroom'
  },

]

const LiveTour = () => {
  
  const {width} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const renderItem = ({item}) => {
    return(
      <View style={[styles.container, {width}]}>
        <Image 
          source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}
          
        />
        <View style={{flex: 0.2}}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </View>
    )
  }

  return(
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList 
          data={data}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{
            useNativeDriver: false
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={data} scrollX={scrollX}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.8,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 16,
    color: '#493D8A',
    textAlign: 'center'
  }
})

export default LiveTour