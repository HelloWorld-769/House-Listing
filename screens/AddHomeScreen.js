import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";

import React, {useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as houseAction from "../redux/actions/houseAction";
const formSchema = yup.object({
  title: yup.string().required().min(3).max(10),
  image: yup.string().required(),
  homeType: yup.string().required(),
  price: yup.number().required(),
  yearBuilt: yup.number().required(),
  address: yup.string().required().min(10).max(50),
  description: yup.string().required().min(10).max(100),
});

export default AddHomeScreen = ({ navigation, route }) => {
  //console.log(route);
  let Title, Image, HomeType, Price, YearBuilt, Address, Description;
  if (route.params) {
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
  const [isLoading, setisLoading] = useState(false);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // const UpdateFun=()=>{
  //   fetch(`http://10.0.2.2:3000/${id}`,{
  //     method:"PUT",
  //     headers:{
  //       "Content-Type": "application/json",
  //     },
  //     body:JSON.stringify({
  //         title,
  //         image,
  //         homeType,
  //         price,
  //         yearBuilt,
  //         address,
  //         description,
  //       }),
  //     });
  // }
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Formik
            initialValues={{
              title: Title,
              image: Image,
              homeType: HomeType,
              price: Price,
              yearBuilt: YearBuilt,
              address: Address,
              description: Description,
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              setisLoading(true);
              console.log(values);
              dispatch(houseAction.createHouseData(values))
                .then(() => {
                  setisLoading(false);
                  Alert.alert("Created Sucessfully");
                })
                .catch((err) => {
                  setisLoading(false);
                  console.log(err);
                  Alert.alert("An error occurred. Try Agian");
                });
            }}
          >
            {(props) => (
              <View style={styles.form}>
                {/* Home Title */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Title: </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("title")}
                    onBlur={props.handleBlur("title")}
                    value={props.values.title}
                  />
                  <Text style={styles.error}>
                    {props.touched.title && props.errors.title}
                  </Text>
                </View>

                {/* Home Image */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Image URL: </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("image")}
                    onBlur={props.handleBlur("image")}
                    value={props.values.image}
                  />
                  <Text style={styles.error}>
                    {props.touched.image && props.errors.image}
                  </Text>
                </View>

                {/* Home Type */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Home Type: </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("homeType")}
                    onBlur={props.handleBlur("homeType")}
                    value={props.values.homeType}
                  />
                  <Text style={styles.error}>
                    {props.touched.homeType && props.errors.homeType}
                  </Text>
                </View>

                {/* Home Price */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Price: </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={props.handleChange("price")}
                    onBlur={props.handleBlur("price")}
                    value={props.values.price}
                  />
                  <Text style={styles.error}>
                    {props.touched.price && props.errors.price}
                  </Text>
                </View>

                {/* Year Built */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Year Built: </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={props.handleChange("yearBuilt")}
                    onBlur={props.handleBlur("yearBuilt")}
                    value={props.values.yearBuilt}
                  />
                  <Text style={styles.error}>
                    {props.touched.yearBuilt && props.errors.yearBuilt}
                  </Text>
                </View>

                {/*Adress */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Address </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("address")}
                    onBlur={props.handleBlur("address")}
                    value={props.values.address}
                  />
                  <Text style={styles.error}>
                    {props.touched.address && props.errors.address}
                  </Text>
                </View>

                {/* Description */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Description </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange("description")}
                    onBlur={props.handleBlur("desription")}
                    value={props.values.description}
                  />
                  <Text style={styles.error}>
                    {props.touched.description && props.errors.description}
                  </Text>
                </View>

                {route.params ? (
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Update Details"
                      onPress={() => {
                        return dispatch(
                          houseAction.updateHouseData(route.params)
                        )
                          .then(() => {
                            console.log("Data Updated Sucessfully");
                          })
                          .catch((err) => {
                            console.log("Unabbel to Save the Data");
                            console.log(err);
                          });
                      }}
                    />
                  </View>
                ) : (
                  <View style={styles.buttonContainer}>
                    <Button title="Add Home" onPress={props.handleSubmit} />
                  </View>
                )}
              </View>
            )}
          </Formik>
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
