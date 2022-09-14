import React from "react";
import {
  Text,
  Animated,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import IonIcons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const house1 = require("../assets/img/house1.jpg")

const nearData = [
  {
    id: 1,
    image: require("../assets/img/house1.jpg"),
    name: "Dreamsville House",
    adress: "Hoffmannweg 23, 45255 Essen",
    distance: "1.8km",
    owner: "Jane Damn",
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur officiis tempore atque perferendis praesentium eum quos laboriosam quia veritatis. Ut, qui.'
  },
  {
    id: 2,
    image: require("../assets/img/house2.jpg"),
    name: "Dreamsville House",
    adress: "Hoffmannweg 23, 45255 Essen",
    distance: "1.8km",
    owner: "Jane Damn",
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur officiis tempore atque perferendis praesentium eum quos laboriosam quia veritatis. Ut, qui.'
  },
  {
    id: 3,
    image: require("../assets/img/house3.jpg"),
    name: "Dreamsville House",
    adress: "Hoffmannweg 23, 45255 Essen",
    distance: "1.8km",
    owner: "Jane Damn",
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur officiis tempore atque perferendis praesentium eum quos laboriosam quia veritatis. Ut, qui.'
  },
  {
    id: 4,
    image: require("../assets/img/house4.jpg"),
    name: "Dreamsville House",
    adress: "Hoffmannweg 23, 45255 Essen",
    distance: "1.8km",
    owner: "Jane Damn",
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur officiis tempore atque perferendis praesentium eum quos laboriosam quia veritatis. Ut, qui.'
  },
];

const Home = ({ navigation }) => {
  const renderBest = () => {
    return (
      <View style={styles.bestContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Best for you</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#03045E" }}>
            More <IonIcons name="caret-down-outline" size={14} />
          </Text>
        </View>
        <View
          style={{ marginHorizontal: 20, marginTop: 10, flexDirection: "row" }}
        >
          <TouchableOpacity style={{ width: 90, height: 80 }}>
            <Image
              source={require("../assets/img/house4.jpg")}
              resizeMode="cover"
              style={{ width: 90, height: 80, borderRadius: 20 }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Milhouse house
            </Text>
            <Text style={{ color: "#00B4D8", fontWeight: "bold" }}>
              1200€/month
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#A0A0A0" }}>
                <IonIcons name="bed" />3 Bedroom
              </Text>
              <Text style={{ color: "#A0A0A0", marginLeft: 20 }}>
                <FontAwesome name="bath" />2 Bathroom
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ marginHorizontal: 20, marginTop: 10, flexDirection: "row" }}
        >
          <TouchableOpacity style={{ width: 90, height: 80 }}>
            <Image
              source={require("../assets/img/house4.jpg")}
              resizeMode="cover"
              style={{ width: 90, height: 80, borderRadius: 20 }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Milhouse house
            </Text>
            <Text style={{ color: "#00B4D8", fontWeight: "bold" }}>
              1200€/month
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#A0A0A0" }}>
                <IonIcons name="bed" />3 Bedroom
              </Text>
              <Text style={{ color: "#A0A0A0", marginLeft: 20 }}>
                <FontAwesome name="bath" />2 Bathroom
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ marginHorizontal: 20, marginTop: 10, flexDirection: "row" }}
        >
          <TouchableOpacity style={{ width: 90, height: 80 }}>
            <Image
              source={require("../assets/img/house4.jpg")}
              resizeMode="cover"
              style={{ width: 90, height: 80, borderRadius: 20 }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Milhouse house
            </Text>
            <Text style={{ color: "#00B4D8", fontWeight: "bold" }}>
              1200€/month
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#A0A0A0" }}>
                <IonIcons name="bed" />3 Bedroom
              </Text>
              <Text style={{ color: "#A0A0A0", marginLeft: 20 }}>
                <FontAwesome name="bath" />2 Bathroom
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderNearImage = () => {
    const renderItem = ({ item }) => {
      return (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", {
                house: item,
              })
            }
            style={{
              width: 224,
              height: 180,
              borderRadius: 15,
              marginHorizontal: 20,
            }}
          >
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={{ flex: 1 }}
              imageStyle={{ borderRadius: 15 }}
            >
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View
                  style={{
                    height: 55,
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 60,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderRadius: 10,
                      marginRight: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IonIcons
                      name="location-sharp"
                      fontSize={12}
                      color="white"
                    />
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {item.distance}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 55,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    justifyContent: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ color: "white", fontSize: 10 }}>
                    {item.adress}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <FlatList
        scrollEventThrottle={16}
        data={nearData}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <View style={{ marginLeft: 25 }}>
              <IonIcons
                name="menu-outline"
                color="black"
                size={40} 
              />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 24 }}>Home</Text>
          <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profil')}>
            <Image
              source={require("../assets/people/simpson.png")}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        
      >
        <View style={styles.textHeader}>
          <Text style={{ fontSize: 24 }}>Find</Text>
          <Text style={{ fontSize: 24 }}>
            Best place <Text style={{ color: "#03045E" }}>nearby...</Text>
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputSearch}
            placeholder="Search your favourite house ..."
          />
          <TouchableOpacity
          onPress={() => navigation.navigate('MapTest')}
            style={{
              backgroundColor: "#03045E",
              width: 55,
              height: 55,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonIcons name="filter" size={32} color="white" />
          </TouchableOpacity>
        </View>
      {/* END OF HEADER */}
      <View style={styles.nearContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Near from you
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#03045E" }}>
            More <IonIcons name="caret-down-outline" size={14} />
          </Text>
        </View>
        <View style={styles.nearImages}>{renderNearImage()}</View>
      </View>
      {renderBest()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 60,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 25,
  },
  textHeader: {
    marginLeft: 25,
    marginTop: 38,
  },
  searchContainer: {
    marginTop: 50,
    flexDirection: "row",
    marginHorizontal: 40,
  },
  inputSearch: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    color: "#424242",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  nearContainer: {
    marginTop: 40,
  },
  nearText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  nearImages: {
    marginTop: 20,
  },
  bestContainer: {
    marginTop: 20,
  },
});

export default Home;
