import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as houseAction from "../redux/actions/houseAction";

export default AddHomeScreen2 = ({ navigation, route }) => {
  let Title, Image, HomeType, Price, YearBuilt, Address, Description,id;
  
  if (route.params) {
    id = route.params.id,
    (Title = route.params.title),
      (Image = route.params.image),
      (HomeType = route.params.homeType),
      (Price = String(route.params.price)),
      (YearBuilt = String(route.params.yearBuilt)),
      (Address = route.params.address),
      (Description = route.params.description);
  } else {
    (Title = ""),
      (Image = ""),
      (HomeType = ""),
      (Price = ""),
      (YearBuilt = ""),
      (Address = ""),
      (Description = "");
  }

  const [title, setTitle] = useState(Title);
  const [image, setImage] = useState(Image);
  const [homeType, setHomeType] = useState(HomeType);
  const [price, setPrice] = useState(Price);
  const [yearBuilt, setYearBuilt] = useState(YearBuilt);
  const [address, setAddress] = useState(Address);
  const [description, setDescription] = useState(Description);
  const [enableshift, setenableShift] = useState(false);

  const [isLoading, setisLoading] = useState(false);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const dispatch = useDispatch();
  const values = {
    title: "",
    image: "",
    homeType: "",
    price: "",
    yearBuilt: "",
    address: "",
    description: "",
  };

  const updateToDataBase = () => {
    fetch(`http://10.0.2.2:3000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
        homeType,
        price,
        yearBuilt,
        address,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setisLoading(false);
        navigation.navigate("Home List");
        console.log("Updated Sucessfully");
      })
      .catch((err) => {
        setisLoading(false);
        console.log(err);
      });
  };
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.form}>
            {/* Home Title */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Title: </Text>
              <TextInput
                autoCapitalize="words"
                style={styles.input}
                placeholder="Title"
                value={title}
                onFocus={() => setenableShift(true)}
                onS
                onChangeText={(val) => setTitle(val)}
              />
              {/* <Text style={styles.error}>
                {props.touched.title && props.errors.title}
              </Text> */}
            </View>

            {/* Home Image */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Image URL: </Text>
              <TextInput
                style={styles.input}
                placeholder="Image Address"
                value={image}
                onFocus={() => setenableShift(true)}
                onChangeText={(val) => setImage(val)}
              />
              {/* <Text style={styles.error}>
                {props.touched.image && props.errors.image}
              </Text> */}
            </View>

            {/* Home Type */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Home Type: </Text>
              <TextInput
                style={styles.input}
                placeholder="Eg. Bunglow"
                value={homeType}
                onFocus={() => setenableShift(true)}
                onChangeText={(val) => setHomeType(val)}
              />
              {/* <Text style={styles.error}>
                {props.touched.homeType && props.errors.homeType}
              </Text> */}
            </View>

            {/* Home Price */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Price: </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="100000"
                value={price}
                onChangeText={(val) => setPrice(val)}
                onFocus={() => setenableShift(true)}
              />
              {/* <Text style={styles.error}>
                {props.touched.price && props.errors.price}
              </Text> */}
            </View>

            {/* Year Built */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Year Built: </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="2000"
                value={yearBuilt}
                onChangeText={(val) => setYearBuilt(val)}
                onFocus={() => setenableShift(true)}
              />
              {/* <Text style={styles.error}>
                {props.touched.yearBuilt && props.errors.yearBuilt}
              </Text> */}
            </View>

            {/*Adress */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Address </Text>
              <TextInput
                style={styles.input}
                value={address}
                placeholder="Model town, Punjab"
                onChangeText={(val) => setAddress(val)}
                onFocus={() => setenableShift(true)}
              />
              {/* <Text style={styles.error}>
                {props.touched.address && props.errors.address}
              </Text> */}
            </View>

            {/* Description */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description </Text>
              <TextInput
                style={styles.input}
                onFocus={() => setenableShift(true)}
                value={description}
                onChangeText={(val) => setDescription(val)}
                placeholder="Description"
              />
              {/* <Text style={styles.error}>
                {props.touched.description && props.errors.description}
              </Text> */}
            </View>

            {route.params ? (
              <View style={styles.buttonContainer}>
                <Button
                  title="Update Details"
                  onPress={() => {
                    updateToDataBase();
                  }}
                />
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <Button
                  title="Add Home"
                  onPress={() => {
                    setisLoading(true);
                    values.title = title;
                    values.image = image;
                    values.homeType = homeType;
                    values.yearBuilt = yearBuilt;
                    values.price = price;
                    values.address = address;
                    values.description = description;

                    dispatch(houseAction.createHouseData(values))
                      .then(() => {
                        console.log("Data Added sucessfully");
                        setisLoading(false);
                        Alert.alert("Created Sucessfully");
                        navigation.navigate("Home List");
                      })
                      .catch((err) => {
                        console.log(err);
                        setisLoading(false);
                        Alert.alert("An error occurred. Try Agian");
                      });
                  }}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
  },
  formGroup: {
    width: "100%",
  },
  label: {
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  error: {
    color: "red",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
