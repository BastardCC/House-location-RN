import React from 'react'
import {Text, View, StatusBar, ImageBackground, StyleSheet,TouchableOpacity} from 'react-native'


const GetStarted = ({navigation}) => {
  return (
      <View style={styles.container}>
          <StatusBar 
                //backgroundColor={COLORS.white} 
                translucent={true} 
                barStyle='dark-content'
            />
          <ImageBackground
            source={require('../assets/img/getStarted.jpg')}
            resizeMode='cover'
            style={{flex: 1}}
          >
              <View style={styles.darkBackground}>
                <View style={styles.textContainer}>
                    <Text style={{fontSize: 24, color: '#232323', fontWeight: 'bold'}}>
                        Your Dream
                    </Text>
                    <Text>
                        Find Your Perfect dream space
                    </Text>
                    <Text>
                        with just two clicks
                    </Text>
                </View>
                <View style={{flex:1, justifyContent: 'flex-end',alignItems: 'center', marginBottom: '20%'}}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate('Home')}
                        onPress={() => navigation.navigate('Drawer')}
                        style={styles.button}>
                        <View>
                            <Text style={{color: 'white', fontSize: 20}}>Get Started</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
              </View>

          </ImageBackground>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    darkBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40%'
    },
    button: {
        backgroundColor: 'rgba(3,4,94,0.8)',
        alignItems:'center', 
        justifyContent:'center', 
        height: 60, 
        width: 330, 
        borderRadius:20 
    }
})

export default GetStarted