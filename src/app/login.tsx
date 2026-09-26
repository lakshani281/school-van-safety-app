import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    if (phoneNumber.length < 9) return;

    // Build international phone format (+94771234567)
    const formattedPhone = `+94${phoneNumber.replace(/^0/, "")}`;

    try {
      setLoading(true);

      // Simple navigation pass to OTP Screen for verification
      setTimeout(() => {
        setLoading(false);
        router.push({
          pathname: "/otp" as any,
          params: {
            phoneNumber: formattedPhone,
          },
        });
      }, 800);
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        "Error",
        "OTP කේතය යැවීමට නොහැකි විය. නැවත උත්සාහ කරන්න."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F39C12" />

      {/* Top Header Card */}
      <View style={styles.topCard}>
        <View style={styles.subHeaderRow}>
          <Text style={{ fontSize: 14 }}>🚐</Text>
          <Text style={styles.subHeaderText}> SAFE RIDE DRIVER</Text>
        </View>
        <Text style={styles.mainTitle}>Enter your mobile number</Text>
      </View>

      {/* Main Content Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>MOBILE NUMBER</Text>

        {/* Phone Input Box */}
        <View style={styles.inputRow}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.flagText}>🇱🇰</Text>
            <Text style={styles.codeText}>+94</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="77 123 4567"
            placeholderTextColor="#A0AAB0"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={9}
          />
        </View>

        <Text style={styles.helperText}>
          We'll send you a 6-digit verification code via SMS.
        </Text>

        {/* Send OTP Button */}
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: phoneNumber.length >= 9 ? "#F39C12" : "#F7D08A",
            },
          ]}
          activeOpacity={0.8}
          disabled={phoneNumber.length < 9 || loading}
          onPress={handleSendOtp}
        >
          {loading ? (
            <ActivityIndicator color="#1A252C" />
          ) : (
            <Text style={styles.buttonText}>Send OTP →</Text>
          )}
        </TouchableOpacity>

        {/* Back Link */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          disabled={loading}
        >
          <Text style={styles.backButtonText}>← Back to role select</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  topCard: {
    backgroundColor: "#F39C12",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 35,
  },
  subHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1A252C",
    letterSpacing: 1,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#1A252C",
    lineHeight: 36,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 35,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#7F8C8D",
    letterSpacing: 1,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  countryCodeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
  },
  flagText: {
    fontSize: 18,
    marginRight: 6,
  },
  codeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A252C",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    fontSize: 17,
    fontWeight: "600",
    color: "#1A252C",
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
  },
  helperText: {
    fontSize: 13,
    color: "#7F8C8D",
    marginBottom: 30,
    lineHeight: 18,
  },
  sendButton: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A252C",
  },
  backButton: {
    alignItems: "center",
    padding: 10,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F8C8D",
  },
});