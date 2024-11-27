import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

// Dados do banner
const bannerData = [
  { id: 1, image: "https://www.designi.com.br/images/preview/10028327.jpg" },
  { id: 2, image: "https://www.designi.com.br/images/preview/11675613.jpg" },
  { id: 3, image: "https://www.designi.com.br/images/preview/10020281.jpg" },
];

const { width } = Dimensions.get("window");

const BannerSlider = () => {
  const renderItem = ({ item }) => (
    <View style={styles.bannerContainer}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
    </View>
  );

  return (
    <Carousel
      data={bannerData}
      renderItem={renderItem}
      sliderWidth={width} // Ajusta o sliderWidth para a largura da tela
      itemWidth={width * 0.85} // O itemWidth será 85% da largura da tela
      autoplay={true}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});

export default BannerSlider;
