
import React, { useState } from "react";
import { View, SafeAreaView, Image, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const validateForm = () => {
        if (!email && !password) {
            Alert.alert("Validation Error", "Please fill in all fields.");
            return false;
        }
        if (!email) {
            Alert.alert("Validation Error", "Please enter your email.");
            return false;
        }
        if (!password) {
            Alert.alert("Validation Error", "Please enter your password.");
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        try {
            const stored = await AsyncStorage.getItem("userDetails");
            if (!stored) {
                Alert.alert("Error", "No account found. Please sign up first.");
                return false;
            }
            const parsedDetails = JSON.parse(stored);
            if (email === parsedDetails.email && password === parsedDetails.password) {
                await AsyncStorage.setItem("loginStatus", "true");
                return true;
            }
            Alert.alert("Error", "Incorrect email or password.");
            return false;
        } catch (error) {
            console.error("Error accessing AsyncStorage", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
            return false;
        }
    };

    const handleLoginPress = async () => {
        if (!validateForm()) return;
        const success = await handleLogin();
        if (success) {
            router.push("/home");
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <></>
                    ),
                    headerTitle: "",
                }}
            />
            <View style={{ padding: 20 }}>
                <View
                    style={{
                        padding: 20,
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: "#f0f0f0",
                        borderRadius: 50,
                        height: 90,
                        ...SHADOWS.medium,
                        shadowColor: COLORS.white,
                    }}
                >
                    <Image
                        source={icons.menu}
                        style={{
                            width: 50,
                            height: 50,
                            marginBottom: 20,
                        }}
                    />
                </View>

                {/* Form Component */}
                <View style={{ marginTop: 20 }}>
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                padding: 10,
                                borderRadius: 5,
                                marginBottom: 10,
                            }}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                        />
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                padding: 10,
                                borderRadius: 5,
                                marginBottom: 10,
                            }}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            placeholder="Password"
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            padding: 15,
                            borderRadius: 5,
                            alignItems: "center",
                        }}
                        onPress={handleLoginPress}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Additional Options */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 10,
                    }}
                >
                    <Text style={{ marginRight: 5 }}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => router.push("/signup")}>
                        <Text style={{ color: "blue" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
