import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next box
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Backspace pressed on empty input -> focus previous box
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleVerify = () => {
    if (isOtpComplete) {
      router.push("/driver-dashboard" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F39C12" />

      {/* Top Header Card */}
      <View style={styles.topCard}>
        <View style={styles.subHeaderRow}>
          <Text style={{ fontSize: 14 }}>🚐</Text>
          <Text style={styles.subHeaderText}> DRIVER LOGIN</Text>
        </View>
        <Text style={styles.mainTitle}>Verify your code</Text>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        {/* Info Text */}
        <Text style={styles.sentText}>
          Code sent to <Text style={styles.phoneBold}>+94 77 123 4567</Text>
        </Text>
        <Text style={styles.hintText}>Hint: try 1 2 3 4</Text>

        {/* 4-Digit Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={[
                styles.otpBox,
                { borderColor: digit ? "#F39C12" : "#EAEAEA" },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Verify & Continue Button */}
        <TouchableOpacity
          style={[
            styles.verifyButton,
            { backgroundColor: isOtpComplete ? "#F39C12" : "#F7D08A" },
          ]}
          activeOpacity={0.8}
          disabled={!isOtpComplete}
          onPress={handleVerify}
        >
          <Text style={styles.buttonText}>Verify & Continue ✓</Text>
        </TouchableOpacity>

        {/* Change Number Link */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.changeNumberBtn}
        >
          <Text style={styles.changeNumberText}>← Change number</Text>
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
    fontSize: 32,
    fontWeight: "900",
    color: "#1A252C",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: "center",
  },
  sentText: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 4,
  },
  phoneBold: {
    fontWeight: "bold",
    color: "#1A252C",
  },
  hintText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#F39C12",
    marginBottom: 25,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  otpBox: {
    width: 62,
    height: 65,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A252C",
    elevation: 1,
  },
  verifyButton: {
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
  changeNumberBtn: {
    padding: 10,
  },
  changeNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F8C8D",
  },
});
