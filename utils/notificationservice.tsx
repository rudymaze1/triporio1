import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Register for push notifications
export async function registerForPushNotificationAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            Alert.alert("Failed to get push notification token!");
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Push notification token:", token);
    } else {
        Alert.alert("Must use a physical device for push notifications.");
    }

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}

// Main component
export default function NotificationSettingsPage() {
    const [notificationToken, setNotificationToken] = useState<string | null | undefined>(null);
    const [permissions, setPermissions] = useState<Notifications.NotificationPermissionsStatus | null>(null);


    useEffect(() => {
        // Set the notification handler
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        // Check notification permissions on load
        checkNotificationPermissions();
    }, []);

    // Function to check notification permissions
    const checkNotificationPermissions = async () => {
        const status = await Notifications.getPermissionsAsync();
        setPermissions(status);
    };

    // Function to register for notifications
    const handleRegisterForNotifications = async () => {
        const token = await registerForPushNotificationAsync();
        setNotificationToken(token);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification Settings</Text>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Notification Permissions</Text>
                <Text>Status: {permissions?.status || "Unknown"}</Text>
                <Text>
                    Can Receive Notifications:{" "}
                    {permissions?.granted ? "Yes" : "No"}
                </Text>
                <Button
                    title="Check Permissions"
                    onPress={checkNotificationPermissions}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Register for Notifications</Text>
                <Button
                    title="Register for Push Notifications"
                    onPress={handleRegisterForNotifications}
                />
                {notificationToken && (
                    <Text style={styles.token}>
                        Push Token: {notificationToken}
                    </Text>
                )}
            </View>

            {Platform.OS === "android" && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        Android Notification Channel
                    </Text>
                    <Button
                        title="Create Default Channel"
                        onPress={async () => {
                            await Notifications.setNotificationChannelAsync("default", {
                                name: "Default Channel",
                                importance: Notifications.AndroidImportance.HIGH,
                                sound: "default",
                                vibrationPattern: [0, 500, 500, 500],
                                lightColor: "#FF0000",
                            });
                            Alert.alert("Default channel created!");
                        }}
                    />
                </View>
            )}
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    section: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    token: {
        marginTop: 10,
        fontSize: 12,
        color: "#666",
    },
});

