import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const Card = (props) => {
  const { title, description, price, image, yearBuilt, id } = props;
  // console.log(title.length);
  // console.log(title);
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("HomeDetails", {
          currHouseId: id,
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>

            {title > 30 ? title.slice(0, 10) + "...." : title}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: image }} style={styles.image}>
            <Text style={styles.price}>{"$ " + price}</Text>

            <View style={styles.year}>
              <Text style={styles.yearText}>{yearBuilt}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {description > 100
              ? description.slice(0, 100) + "..."
              : description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 300,
    margin: 10,
  },
  titleContainer: {
    height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  imageContainer: {
    width: "100%",
    height: "65%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 30,
    color: "#fff",
    margin: 10,
  },
  year: {
    margin: 10,
    backgroundColor: "#2652B0",
    height: 28,
    width: 80,
    borderRadius: 7,
  },
  yearText: {
   
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
  },
  description: {
    margin: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "gray",
  },
});

export default Card;
