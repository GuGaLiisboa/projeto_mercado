import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

const bannerData = [
    { id: 1, image: "https://www.designi.com.br/images/preview/10028327.jpg" },
    { id: 2, image: "https://www.designi.com.br/images/preview/11675613.jpg" },
    { id: 3, image: "https://www.designi.com.br/images/preview/10020281.jpg" },
];

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
            sliderWidth={430}
            itemWidth={375}
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
        height: 150,
        resizeMode: "cover",
    },
});

export default BannerSlider;
