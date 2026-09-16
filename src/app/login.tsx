import { useRouter } from "expo-router";
import { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F39C12" />

      {/* Top Header Card */}
      <View style={styles.topCard}>
        <View style={styles.subHeaderRow}>
          <Text style={{ fontSize: 14 }}>🚐</Text>
          <Text style={styles.subHeaderText}> DRIVER LOGIN</Text>
        </View>
        <Text style={styles.mainTitle}>Enter your mobile{"\n"}number</Text>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        {/* Phone Input Box */}
        <View style={styles.inputCard}>
          <Text style={styles.countryCode}>+94</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
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
          style={[
            styles.sendOtpButton,
            {
              backgroundColor: phoneNumber.length >= 9 ? "#F39C12" : "#F7D08A",
            },
          ]}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Send OTP →</Text>
        </TouchableOpacity>

        {/* Security Info Card */}
        <View style={styles.securityCard}>
          <Text style={{ fontSize: 20, marginRight: 12 }}>🔒</Text>
          <Text style={styles.securityText}>
            We'll send a one-time code via SMS.{"\n"}Your data is end-to-end
            encrypted and school-verified.
          </Text>
        </View>
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
    lineHeight: 38,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A252C",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#1A252C",
    fontWeight: "500",
  },
  sendOtpButton: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 25,
    elevation: 2,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A252C",
  },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: "#7F8C8D",
    lineHeight: 18,
  },
});
