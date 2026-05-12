import { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";

const AccountSettings = () => {
    const router = useRouter();
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);
    const [hapticFeedback, setHapticFeedback] = useState(true);

    const preferences = [
        { label: "Sound Effects", value: soundEnabled, onChange: setSoundEnabled },
        { label: "Dark Mode", value: darkMode, onChange: setDarkMode },
        { label: "Auto-play Meditations", value: autoPlay, onChange: setAutoPlay },
        { label: "Haptic Feedback", value: hapticFeedback, onChange: setHapticFeedback },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "Account Settings",
                    headerTitleStyle: { fontFamily: FONT.bold, color: COLORS.primary },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Text style={styles.backText}>← Back</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Preferences</Text>
                    <View style={styles.card}>
                        {preferences.map((item, index) => (
                            <View
                                key={item.label}
                                style={[styles.row, index > 0 && styles.borderTop]}
                            >
                                <Text style={styles.label}>{item.label}</Text>
                                <Switch
                                    value={item.value}
                                    onValueChange={item.onChange}
                                    trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
                                    thumbColor="#fff"
                                />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Meditation Timer</Text>
                    <View style={styles.card}>
                        {["5 minutes", "10 minutes", "15 minutes", "20 minutes", "30 minutes"].map(
                            (duration, index) => (
                                <TouchableOpacity
                                    key={duration}
                                    style={[styles.row, index > 0 && styles.borderTop]}
                                >
                                    <Text style={styles.label}>{duration}</Text>
                                </TouchableOpacity>
                            )
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountSettings;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightWhite },
    scroll: { paddingBottom: 40 },
    backBtn: { paddingHorizontal: SIZES.small },
    backText: { fontFamily: FONT.medium, color: COLORS.primary, fontSize: SIZES.medium },
    section: { marginTop: SIZES.xLarge, paddingHorizontal: SIZES.medium },
    sectionTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.small,
        color: COLORS.gray,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: SIZES.small,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: SIZES.small,
        ...SHADOWS.small,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
    },
    borderTop: { borderTopWidth: 1, borderTopColor: COLORS.gray2 },
    label: { fontFamily: FONT.regular, fontSize: SIZES.medium, color: COLORS.secondary },
});
