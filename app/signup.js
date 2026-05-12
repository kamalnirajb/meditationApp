import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    Image,
    Alert,
    TextInput,
    Text,
    TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";


const SignUp = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const validateForm = () => {
        if (!userName && !email && !password) {
            Alert.alert("Validation Error", "Please fill in all fields.");
            return false;
        }
        if (!userName) {
            Alert.alert("Validation Error", "Please enter your username.");
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

    const handleRegister = async () => {
        try {
            const userDetails = { userName, email, password, token: "sample-token" };
            await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
            return true;
        } catch (error) {
            console.error("Error saving user details:", error);
            Alert.alert("Registration Error", "Something went wrong. Please try again.");
            return false;
        }
    };

    const handlePress = async () => {
        if (!validateForm()) return;
        const success = await handleRegister();
        if (success) {
            Alert.alert("Success", "Account created successfully!", [
                { text: "OK", onPress: () => router.push("/login") }
            ]);
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

            <View style={{ padding: 20 }} testID="signupContainer">
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
                    testID="imageIcon"
                >
                    <Image
                        source={icons.menu}
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    />
                </View>

                <View style={{ marginTop: 30 }} testID="formData">
                    <View style={{ marginBottom: 10 }} testID="userName">
                        <TextInput
                            style={{
                                borderColor: "#ccc",
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                marginBottom: 10,
                            }}
                            value={userName}
                            onChangeText={setUserName}
                            placeholder="UserName"
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 10 }} testID="email">
                    <TextInput
                        style={{
                            borderColor: "#ccc",
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                        }}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                    />
                </View>

                <View style={{ marginBottom: 20 }} testID="password">
                    <TextInput
                        style={{
                            borderColor: "#ccc",
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                        }}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder="Password"
                    />
                </View>



                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        padding: 15,
                        borderRadius: 5,
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                    onPress={handlePress}
                    testID="handleRegister"
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 5,
                    }}
                    testID="textData"
                >
                    <Text style={{ marginRight: 5 }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/login")}>
                        <Text style={{ color: "blue" }}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </SafeAreaView>
    )
}

export default SignUp;
