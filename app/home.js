import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage"
import ScreenHeaderBtn from "./ScreenHeaderBtn";
import Welcome from "./Welcome";
import PopularMeditation from "./PopularMeditation";
import DailyMeditation from "./DailyMeditation";
import DrawerMenu from "./DrawerMenu";

const Home = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async () => {
        const user = await AsyncStorage.getItem("userDetails");
        setUserDetails(user);
    };

    const parsedUser = userDetails ? JSON.parse(userDetails) : null;

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScreenHeaderBtn onMenuPress={() => setDrawerOpen(true)} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            flex: 1,
                            padding: SIZES.medium,
                        }}
                        testID="screensDisplay"
                    >
                        <Welcome userDetails={parsedUser} />
                        <PopularMeditation />
                        <DailyMeditation />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <DrawerMenu
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                userDetails={parsedUser}
            />
        </View>
    );
};

export default Home;
