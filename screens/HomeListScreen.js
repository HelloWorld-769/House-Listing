import React, { useEffect } from "react";

import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import Card from "../components/Card";
import { FloatingAction } from "react-native-floating-action";
import { useDispatch, useSelector } from "react-redux";
import * as houseActions from "../redux/actions/houseAction";
import { useState } from "react";

export default HomeListScreen = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.house);


  const fetchData = () => {
    setisLoading(true);
    dispatch(houseActions.fectchHousesData())
      .then(() => setisLoading(false))
      .catch(() => setisLoading(false));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <View style={styles.container}>
        <FlatList
          data={houses}
          keyExtractor={(item) => item._id}
          onRefresh={() => fetchData()}
          refreshing={isLoading}
          renderItem={({ item }) => {
            return (
              <Card
                navigation={navigation}
                title={item.title}
                address={item.address}
                homeType={item.homeType}
                description={item.description}
                price={item.price}
                image={item.image}
                yearBuilt={item.yearBuilt}
                id={item._id}
              />
            );
          }}
        />

        <FloatingAction
          position="right"
          animated={false}
          showBackgroud={false}
          onPressMain={() => {
            navigation.navigate("AddHome2");
          }}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
});
