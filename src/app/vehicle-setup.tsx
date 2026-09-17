import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VehicleSetupScreen() {
  const router = useRouter();
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const isFormValid =
    vehicleNumber.trim() !== "" && licenseNumber.trim() !== "";

  const handleCompleteSetup = () => {
    if (isFormValid) {
      router.push("/driver-dashboard" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A252C" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Dark Card with Step Progress Bar */}
        <View style={styles.topCard}>
          {/* Progress Bar Header - Step 2 Complete */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressStep, styles.activeStep]} />
            <View style={[styles.progressStep, styles.activeStep]} />
          </View>

          <Text style={styles.stepText}>Step 2 of 2</Text>
          <Text style={styles.mainTitle}>Vehicle & License</Text>
          <Text style={styles.subTitle}>Add your vehicle information</Text>
        </View>

        {/* Main Content Form */}
        <View style={styles.formContainer}>
          {/* Van Icon Placeholder */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBox}>
              <Text style={{ fontSize: 42 }}>🚐</Text>
            </View>
          </View>

          {/* Input 1: Van / Vehicle Number */}
          <Text style={styles.inputLabel}>Van / Vehicle Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. GV-204"
            placeholderTextColor="#A0AAB0"
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
            autoCapitalize="characters"
          />

          {/* Input 2: License Number */}
          <Text style={styles.inputLabel}>License Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. B1234ABC"
            placeholderTextColor="#A0AAB0"
            value={licenseNumber}
            onChangeText={setLicenseNumber}
            autoCapitalize="characters"
          />

          {/* Input 3: License Expiry Date */}
          <Text style={styles.inputLabel}>License Expiry Date</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateTextInput}
              placeholder="mm/dd/yyyy"
              placeholderTextColor="#A0AAB0"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <Text style={{ fontSize: 18, color: "#1A252C" }}>📅</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed Buttons (Back & Complete Setup) */}
      <View style={styles.bottomFooter}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.completeButton,
            { backgroundColor: isFormValid ? "#F39C12" : "#F7D08A" },
          ]}
          activeOpacity={0.8}
          disabled={!isFormValid}
          onPress={handleCompleteSetup}
        >
          <Text style={styles.buttonText}>✓ Complete Setup</Text>
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
  scrollContent: {
    paddingBottom: 110,
  },
  topCard: {
    backgroundColor: "#1A252C",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 35,
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  progressStep: {
    height: 4,
    borderRadius: 2,
    flex: 0.48,
  },
  activeStep: {
    backgroundColor: "#F39C12",
  },
  stepText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#A0AAB0",
    marginBottom: 6,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#A0AAB0",
    fontWeight: "500",
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 25,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatarBox: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "#FFF8E7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F39C12",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7F8C8D",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    fontWeight: "600",
    color: "#1A252C",
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    marginBottom: 20,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    marginBottom: 20,
  },
  dateTextInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    fontWeight: "600",
    color: "#1A252C",
  },
  bottomFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  backButton: {
    width: "32%",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#1A252C",
    backgroundColor: "#FFFFFF",
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1A252C",
  },
  completeButton: {
    width: "64%",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A252C",
  },
});
