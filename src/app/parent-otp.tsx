import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
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

export default function ParentOtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const isOtpComplete = otp.every((digit) => digit.trim().length === 1);

  const handleOtpChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    // Auto-advance to next input field
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (isOtpComplete) {
      // Navigate to Parent Dashboard
      router.push("/parent-dashboard" as any);
    }
  };

  const handleChangeNumber = () => {
    router.back();
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
            <Text style={styles.headerTitle}>Verify your code</Text>
          </View>

          {/* Body Content */}
          <View style={styles.formContainer}>
            <Text style={styles.sentNoticeText}>
              Code sent to <Text style={styles.phoneNumberBold}>+94 77 123 4567</Text>
            </Text>
            <Text style={styles.hintText}>Hint: try 1 2 3 4</Text>

            {/* 4-Digit OTP Input Boxes */}
            <View style={styles.otpInputRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpBox,
                    digit ? styles.otpBoxFilled : null,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0}
                />
              ))}
            </View>

            {/* Verify & Continue Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.verifyBtn,
                isOtpComplete ? styles.verifyBtnActive : styles.verifyBtnDisabled,
              ]}
              disabled={!isOtpComplete}
              onPress={handleVerify}
            >
              <Text
                style={[
                  styles.verifyBtnText,
                  isOtpComplete
                    ? styles.verifyBtnTextActive
                    : styles.verifyBtnTextDisabled,
                ]}
              >
                Verify & Continue ✓
              </Text>
            </TouchableOpacity>

            {/* Change Number Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleChangeNumber}
              style={styles.changeNumberBtn}
            >
              <Text style={styles.changeNumberText}>← Change number</Text>
            </TouchableOpacity>
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
    paddingTop: 36,
    alignItems: "center",
  },
  sentNoticeText: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "500",
    textAlign: "center",
  },
  phoneNumberBold: {
    color: "#1A252C",
    fontWeight: "800",
  },
  hintText: {
    fontSize: 13,
    color: "#F39C12",
    fontWeight: "800",
    marginTop: 6,
    marginBottom: 28,
  },
  otpInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 32,
  },
  otpBox: {
    width: 62,
    height: 66,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    color: "#1A252C",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  otpBoxFilled: {
    borderColor: "#F39C12",
    backgroundColor: "#FFFDF9",
  },
  verifyBtn: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 2,
  },
  verifyBtnDisabled: {
    backgroundColor: "#FDE3B2",
  },
  verifyBtnActive: {
    backgroundColor: "#F39C12",
  },
  verifyBtnText: {
    fontSize: 16,
    fontWeight: "800",
  },
  verifyBtnTextDisabled: {
    color: "#B38640",
  },
  verifyBtnTextActive: {
    color: "#1A252C",
  },
  changeNumberBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  changeNumberText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7F8C8D",
  },
});