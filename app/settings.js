import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";
import icons from "../constants/icons";

const Settings = () => {
    const router = useRouter();

    const menuItems = [
        {
            label: "User Information",
            description: "Change your personal details",
            icon: icons.heart,
            route: "/user-information",
        },
        {
            label: "Account Settings",
            description: "App preferences and display options",
            icon: icons.settings,
            route: "/account-settings",
        },
        {
            label: "Notifications",
            description: "Manage reminders and alerts",
            icon: icons.clock,
            route: "/notifications",
        },
        {
            label: "About",
            description: "App details and developer info",
            icon: icons.menu,
            route: "/about",
        },
    ];

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.setItem("loginStatus", "false");
                    router.replace("/login");
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "Settings",
                    headerTitleStyle: { fontFamily: FONT.bold, color: COLORS.primary },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Text style={styles.backText}>← Back</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
                <Image source={icons.left} style={styles.backIcon} />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.section}>
                    <View style={styles.card}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.label}
                                style={[styles.row, index > 0 && styles.borderTop]}
                                onPress={() => router.push(item.route)}
                            >
                                <View style={styles.iconBox}>
                                    <Image source={item.icon} style={styles.icon} />
                                </View>
                                <View style={styles.textBlock}>
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                </View>
                                <Text style={styles.chevron}>›</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightWhite },
    scroll: { paddingBottom: 40 },
    backRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.medium,
    },
    backIcon: {
        width: 18,
        height: 18,
        resizeMode: "contain",
        tintColor: COLORS.primary,
        marginRight: 6,
    },
    backBtn: { paddingHorizontal: SIZES.small },
    backText: { fontFamily: FONT.medium, color: COLORS.primary, fontSize: SIZES.medium },
    section: { marginTop: SIZES.xLarge, paddingHorizontal: SIZES.medium },
    card: { backgroundColor: "#fff", borderRadius: SIZES.small, ...SHADOWS.small },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
    },
    borderTop: { borderTopWidth: 1, borderTopColor: COLORS.gray2 },
    iconBox: {
        width: 38,
        height: 38,
        borderRadius: SIZES.small / 2,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZES.medium,
    },
    icon: { width: 20, height: 20, resizeMode: "contain", tintColor: COLORS.primary },
    textBlock: { flex: 1 },
    label: { fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.secondary },
    description: { fontFamily: FONT.regular, fontSize: SIZES.small, color: COLORS.gray, marginTop: 2 },
    chevron: { fontSize: 22, color: COLORS.gray, marginLeft: SIZES.small },
    logoutBtn: {
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.small,
        paddingVertical: SIZES.medium,
        alignItems: "center",
        ...SHADOWS.small,
    },
    logoutText: { fontFamily: FONT.bold, fontSize: SIZES.medium, color: "#fff" },
});
