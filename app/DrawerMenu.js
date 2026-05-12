import { useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "../constants/theme";
import icons from "../constants/icons";

const DRAWER_WIDTH = 280;

const DrawerMenu = ({ isOpen, onClose, userDetails }) => {
    const router = useRouter();
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isOpen ? 0 : -DRAWER_WIDTH,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [isOpen]);

    const navigate = (route) => {
        onClose();
        router.push(route);
    };

    const handleLogout = async () => {
        await AsyncStorage.setItem("loginStatus", "false");
        onClose();
        router.replace("/login");
    };

    const menuItems = [
        { label: "User Information", icon: icons.heart, route: "/user-information" },
        { label: "Account Settings", icon: icons.settings, route: "/account-settings" },
        { label: "Notifications", icon: icons.clock, route: "/notifications" },
        { label: "About", icon: icons.menu, route: "/about" },
    ];

    return (
        <View style={styles.overlay} pointerEvents={isOpen ? "auto" : "none"}>
            {isOpen && (
                <TouchableOpacity
                    style={styles.backdrop}
                    onPress={onClose}
                    activeOpacity={1}
                />
            )}
            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Hello, {userDetails?.userName || "User"}!
                    </Text>
                </View>

                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.label}
                        style={styles.menuItem}
                        onPress={() => navigate(item.route)}
                    >
                        <Image source={item.icon} style={styles.menuIcon} />
                        <Text style={styles.menuText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Image source={icons.left} style={styles.menuIcon} />
                    <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default DrawerMenu;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
        flexDirection: "row",
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    drawer: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: COLORS.lightWhite,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: SIZES.xLarge,
    },
    headerText: {
        color: "#fff",
        fontSize: 24,
        fontFamily: FONT.bold,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.xLarge,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray2,
    },
    menuIcon: {
        width: 22,
        height: 22,
        resizeMode: "contain",
        tintColor: COLORS.secondary,
        marginRight: SIZES.medium,
    },
    menuIconPlaceholder: {
        width: 22,
        height: 22,
        marginRight: SIZES.medium,
    },
    menuText: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS.secondary,
    },
    logoutText: {
        color: COLORS.tertiary,
    },
});
