import { Link } from "expo-router";
import { Image } from "expo-image";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={style.container}>
      <Text style={style.heading}>
        Edit app/index.tsx to edit this screen123.
      </Text>

      <Link href={"/about"}>About</Link>

      {/* <Image
        source={{ uri: "https://picsum.photos/200/300" }}
        style={{ width: 100, height: 100 }}
      /> */}

      <Image
        source={require("@/assets/images/react-logo.png")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  heading: {
    fontSize: 20,
    color: "white",
  },
});
