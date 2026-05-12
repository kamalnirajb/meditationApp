import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";
import icons from "../constants/icons";

const About = () => {
    const router = useRouter();

    const infoRows = [
        { label: "App Name", value: "MeditationApp" },
        { label: "Version", value: "1.0.0" },
        { label: "Platform", value: "iOS · Android · Web" },
        { label: "Built With", value: "Expo SDK 51 / React Native" },
    ];

    const teamRows = [
        { label: "Developer", value: "Niraj Kumar" },
        { label: "Contact", value: "niraj@mobilelearning.io" },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "About",
                    headerTitleStyle: { fontFamily: FONT.bold, color: COLORS.primary },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Text style={styles.backText}>← Back</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Logo + tagline */}
                <View style={styles.hero}>
                    <View style={styles.logoBox}>
                        <Image source={icons.menu} style={styles.logo} />
                    </View>
                    <Text style={styles.appName}>MeditationApp</Text>
                    <Text style={styles.tagline}>
                        Find calm, focus, and balance — one breath at a time.
                    </Text>
                </View>

                {/* App info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Info</Text>
                    <View style={styles.card}>
                        {infoRows.map((item, index) => (
                            <View key={item.label} style={[styles.row, index > 0 && styles.borderTop]}>
                                <Text style={styles.label}>{item.label}</Text>
                                <Text style={styles.value}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Team */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Team</Text>
                    <View style={styles.card}>
                        {teamRows.map((item, index) => (
                            <View key={item.label} style={[styles.row, index > 0 && styles.borderTop]}>
                                <Text style={styles.label}>{item.label}</Text>
                                <Text style={styles.value}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About the App</Text>
                    <View style={[styles.card, styles.descCard]}>
                        <Text style={styles.desc}>
                            MeditationApp is designed to help you build a consistent mindfulness
                            practice. Whether you are new to meditation or an experienced
                            practitioner, our curated library of guided sessions — from mindful
                            breathing to body scans and loving-kindness — gives you the tools to
                            reduce stress, improve focus, and cultivate inner peace.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default About;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightWhite },
    scroll: { paddingBottom: 40 },
    backBtn: { paddingHorizontal: SIZES.small },
    backText: { fontFamily: FONT.medium, color: COLORS.primary, fontSize: SIZES.medium },
    hero: {
        alignItems: "center",
        paddingTop: SIZES.xxLarge,
        paddingBottom: SIZES.xLarge,
        paddingHorizontal: SIZES.medium,
    },
    logoBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.medium,
        marginBottom: SIZES.medium,
    },
    logo: { width: 50, height: 50, resizeMode: "contain" },
    appName: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginBottom: 6,
    },
    tagline: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.gray,
        textAlign: "center",
    },
    section: { marginTop: SIZES.large, paddingHorizontal: SIZES.medium },
    sectionTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.small,
        color: COLORS.gray,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: SIZES.small,
    },
    card: { backgroundColor: "#fff", borderRadius: SIZES.small, ...SHADOWS.small },
    descCard: { padding: SIZES.medium },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
    },
    borderTop: { borderTopWidth: 1, borderTopColor: COLORS.gray2 },
    label: { fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.secondary },
    value: { fontFamily: FONT.regular, fontSize: SIZES.medium, color: COLORS.gray },
    desc: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        lineHeight: 24,
    },
});
