import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ParentLoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const isPhoneValid = phoneNumber.trim().length >= 9;

  const handleSendOTP = () => {
    if (isPhoneValid) {
      router.push("/parent-otp" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F39C12" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Amber Rounded Header */}
          <View style={styles.headerCard}>
            <View style={styles.headerDecorationCircle} />
            <Text style={styles.badgeText}>🧑‍🧑‍🧒 PARENT LOGIN</Text>
            <Text style={styles.headerTitle}>Enter your mobile number</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Phone Number Input Box */}
            <View style={styles.inputCard}>
              <Text style={styles.countryCode}>+94</Text>
              <View style={styles.verticalDivider} />
              <TextInput
                style={styles.textInput}
                placeholder="7X XXX XXXX"
                placeholderTextColor="#A0AAB0"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </View>

            {/* Send OTP Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.sendOtpBtn,
                isPhoneValid ? styles.sendOtpBtnActive : styles.sendOtpBtnDisabled,
              ]}
              disabled={!isPhoneValid}
              onPress={handleSendOTP}
            >
              <Text
                style={[
                  styles.sendOtpBtnText,
                  isPhoneValid
                    ? styles.sendOtpBtnTextActive
                    : styles.sendOtpBtnTextDisabled,
                ]}
              >
                Send OTP →
              </Text>
            </TouchableOpacity>

            {/* Security Verification Info Card */}
            <View style={styles.securityInfoCard}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>🔒</Text>
              <Text style={styles.securityInfoText}>
                We'll send a one-time code via SMS. Your data is end-to-end
                encrypted and school-verified.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  headerCard: {
    backgroundColor: "#F39C12",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 44,
    position: "relative",
    overflow: "hidden",
  },
  headerDecorationCircle: {
    position: "absolute",
    right: -30,
    top: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2C3E50",
    letterSpacing: 1,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#1A252C",
    lineHeight: 38,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A252C",
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 14,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#1A252C",
  },
  sendOtpBtn: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    elevation: 2,
  },
  sendOtpBtnDisabled: {
    backgroundColor: "#FDE3B2",
  },
  sendOtpBtnActive: {
    backgroundColor: "#F39C12",
  },
  sendOtpBtnText: {
    fontSize: 16,
    fontWeight: "800",
  },
  sendOtpBtnTextDisabled: {
    color: "#B38640",
  },
  sendOtpBtnTextActive: {
    color: "#1A252C",
  },
  securityInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  securityInfoText: {
    flex: 1,
    fontSize: 12,
    color: "#7F8C8D",
    lineHeight: 18,
    fontWeight: "500",
  },
});