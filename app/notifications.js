import { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    ScrollView,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";

const Notifications = () => {
    const router = useRouter();
    const [allNotifications, setAllNotifications] = useState(true);
    const [morningReminder, setMorningReminder] = useState(true);
    const [eveningReminder, setEveningReminder] = useState(false);
    const [weeklyGoal, setWeeklyGoal] = useState(true);

    const [morningTime, setMorningTime] = useState(() => {
        const d = new Date();
        d.setHours(8, 0, 0, 0);
        return d;
    });
    const [eveningTime, setEveningTime] = useState(() => {
        const d = new Date();
        d.setHours(20, 0, 0, 0);
        return d;
    });
    const [showMorningPicker, setShowMorningPicker] = useState(false);
    const [showEveningPicker, setShowEveningPicker] = useState(false);

    const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "Notifications",
                    headerTitleStyle: { fontFamily: FONT.bold, color: COLORS.primary },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Text style={styles.backText}>← Back</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Master toggle */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>App Notifications</Text>
                                <Text style={styles.subLabel}>Enable or disable all notifications</Text>
                            </View>
                            <Switch
                                value={allNotifications}
                                onValueChange={setAllNotifications}
                                trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
                                thumbColor="#fff"
                            />
                        </View>
                    </View>
                </View>

                {/* Reminders */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Reminders</Text>
                    <View style={styles.card}>
                        {/* Morning */}
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Morning Reminder</Text>
                                <Text style={styles.subLabel}>Start your day with meditation</Text>
                            </View>
                            <Switch
                                value={morningReminder && allNotifications}
                                onValueChange={setMorningReminder}
                                disabled={!allNotifications}
                                trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
                                thumbColor="#fff"
                            />
                        </View>
                        {morningReminder && allNotifications && (
                            <View style={[styles.timeRow, styles.borderTop]}>
                                <Text style={styles.timeLabel}>Time</Text>
                                <TouchableOpacity
                                    style={styles.timeBtn}
                                    onPress={() => setShowMorningPicker(!showMorningPicker)}
                                >
                                    <Text style={styles.timeText}>{formatTime(morningTime)}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {showMorningPicker && (
                            <DateTimePicker
                                value={morningTime}
                                mode="time"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={(_, date) => {
                                    setShowMorningPicker(Platform.OS === "ios");
                                    if (date) setMorningTime(date);
                                }}
                            />
                        )}

                        {/* Evening */}
                        <View style={[styles.row, styles.borderTop]}>
                            <View>
                                <Text style={styles.label}>Evening Reminder</Text>
                                <Text style={styles.subLabel}>Wind down before bed</Text>
                            </View>
                            <Switch
                                value={eveningReminder && allNotifications}
                                onValueChange={setEveningReminder}
                                disabled={!allNotifications}
                                trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
                                thumbColor="#fff"
                            />
                        </View>
                        {eveningReminder && allNotifications && (
                            <View style={[styles.timeRow, styles.borderTop]}>
                                <Text style={styles.timeLabel}>Time</Text>
                                <TouchableOpacity
                                    style={styles.timeBtn}
                                    onPress={() => setShowEveningPicker(!showEveningPicker)}
                                >
                                    <Text style={styles.timeText}>{formatTime(eveningTime)}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {showEveningPicker && (
                            <DateTimePicker
                                value={eveningTime}
                                mode="time"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={(_, date) => {
                                    setShowEveningPicker(Platform.OS === "ios");
                                    if (date) setEveningTime(date);
                                }}
                            />
                        )}

                        {/* Weekly goal */}
                        <View style={[styles.row, styles.borderTop]}>
                            <View>
                                <Text style={styles.label}>Weekly Goal Reminder</Text>
                                <Text style={styles.subLabel}>Stay on track each week</Text>
                            </View>
                            <Switch
                                value={weeklyGoal && allNotifications}
                                onValueChange={setWeeklyGoal}
                                disabled={!allNotifications}
                                trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
                                thumbColor="#fff"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notifications;

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
    card: { backgroundColor: "#fff", borderRadius: SIZES.small, ...SHADOWS.small },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
    },
    borderTop: { borderTopWidth: 1, borderTopColor: COLORS.gray2 },
    label: { fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.secondary },
    subLabel: { fontFamily: FONT.regular, fontSize: SIZES.small, color: COLORS.gray, marginTop: 2 },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        backgroundColor: COLORS.white,
    },
    timeLabel: { fontFamily: FONT.regular, fontSize: SIZES.medium, color: COLORS.gray },
    timeBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 6,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.small / 2,
    },
    timeText: { fontFamily: FONT.medium, color: "#fff", fontSize: SIZES.medium },
});
