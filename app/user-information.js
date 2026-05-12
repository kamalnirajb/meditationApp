import { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";

const UserInformation = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const load = async () => {
            const stored = await AsyncStorage.getItem("userDetails");
            if (stored) {
                const parsed = JSON.parse(stored);
                setUserName(parsed.userName || "");
                setEmail(parsed.email || "");
            }
        };
        load();
    }, []);

    const handleSaveProfile = async () => {
        if (!userName || !email) {
            Alert.alert("Validation Error", "Username and email cannot be empty.");
            return;
        }
        try {
            const stored = await AsyncStorage.getItem("userDetails");
            const existing = stored ? JSON.parse(stored) : {};
            await AsyncStorage.setItem(
                "userDetails",
                JSON.stringify({ ...existing, userName, email })
            );
            Alert.alert("Success", "Profile updated successfully.");
        } catch {
            Alert.alert("Error", "Failed to update profile. Please try again.");
        }
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert("Validation Error", "Please fill in all password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Validation Error", "New passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert("Validation Error", "Password must be at least 6 characters.");
            return;
        }
        try {
            const stored = await AsyncStorage.getItem("userDetails");
            const existing = stored ? JSON.parse(stored) : {};
            if (existing.password !== currentPassword) {
                Alert.alert("Error", "Current password is incorrect.");
                return;
            }
            await AsyncStorage.setItem(
                "userDetails",
                JSON.stringify({ ...existing, password: newPassword })
            );
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            Alert.alert("Success", "Password changed successfully.");
        } catch {
            Alert.alert("Error", "Failed to change password. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "User Information",
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
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    <View style={styles.card}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={userName}
                            onChangeText={setUserName}
                            placeholder="Username"
                        />
                        <Text style={[styles.label, styles.mt]}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
                            <Text style={styles.saveBtnText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Change Password</Text>
                    <View style={styles.card}>
                        <Text style={styles.label}>Current Password</Text>
                        <TextInput
                            style={styles.input}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="Current password"
                            secureTextEntry
                        />
                        <Text style={[styles.label, styles.mt]}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="New password"
                            secureTextEntry
                        />
                        <Text style={[styles.label, styles.mt]}>Confirm New Password</Text>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirm new password"
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
                            <Text style={styles.saveBtnText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserInformation;

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
        padding: SIZES.medium,
        ...SHADOWS.small,
    },
    label: {
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.secondary,
        marginBottom: 4,
    },
    mt: { marginTop: SIZES.medium },
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.small / 2,
        padding: SIZES.small,
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    saveBtn: {
        marginTop: SIZES.large,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.small / 2,
        paddingVertical: SIZES.medium,
        alignItems: "center",
    },
    saveBtnText: { fontFamily: FONT.bold, color: "#fff", fontSize: SIZES.medium },
});
