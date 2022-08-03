import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as houseAction from "../redux/actions/houseAction";

export default HomeDetailsScreen = (props) => {
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch();
  const id = props.route.params.currHouseId;
  console.log(id);
  const house = useSelector((state) =>
    state.house.houses.find((house) => house._id === id)
  );
  console.log(house);
  return (
    <ScrollView>
      {/* Title */}
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{house.title}</Text>
        </View>

        {/* Image */}
        <View>
          <Image source={{ uri: house.image }} style={styles.image} />
        </View>

        {/* Home Type */}
        <View style={styles.group}>
          <Text style={styles.label}>Home Type: </Text>
          <Text style={styles.value}>{house.homeType}</Text>
        </View>

        {/* Home Price */}
        <View style={styles.group}>
          <Text style={styles.label}>Price: </Text>
          <Text style={styles.value}>{"$ " + house.price}</Text>
        </View>

        {/* Home Year */}
        <View style={styles.group}>
          <Text style={styles.label}>Year Built: </Text>
          <Text style={styles.value}>{house.yearBuilt}</Text>
        </View>

        {/* Home Address */}
        <View style={styles.group}>
          <Text style={styles.label}>Address: </Text>
          <Text style={styles.value}>{house.address}</Text>
        </View>

        {/* Home Description */}
        <View style={styles.group}>
          <Text style={styles.label}>Description: </Text>
          <Text style={styles.value}>{house.description}</Text>
        </View>

        <View>
          {/* <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Delete",
                "Are you sure you want to delete it ?",
                [
                  {
                    text:"Cancel",
                    onPress :()=> console.log("Cancel Buton Pressed"),
                  },
                  {
                    text:"OK",
                    onPress:()=>{
                        return (
                          dispatch(houseAction.deleteHouseData(id)).then(() => {
                              console.log("DELETED DATA");
                              props.navigation.navigate("Home List");
                            })
                        );
                    }
                  }
                ]
                );

            }}
          >
            <Text> Delete</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("AddHome", {
                id,
                title: house.title,
                image: house.image,
                price: house.price,
                description: house.description,
                address: house.address,
                homeType: house.homeType,
                yearBuilt: house.yearBuilt,
              });
            }}
          >
            <Text> Edit </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  heading: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
  },
  image: {
    width: "100%",
    height: 200,
  },
  group: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
});
