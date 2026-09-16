import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [role, setRole] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Smart School Van</Text>
        <Text style={styles.subtitle}>Safety & Transport System</Text>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.selectText}>Select Your Role to Continue</Text>

        {/* Parent Option */}
        <TouchableOpacity
          style={[styles.roleCard, { backgroundColor: "#F39C12" }]}
          onPress={() => setRole("Parent")}
        >
          <Text style={styles.roleTitle}>👨‍👩‍👧 Parent</Text>
          <Text style={styles.roleDesc}>
            Track van live & monitor student safety
          </Text>
        </TouchableOpacity>

        {/* Driver Option */}
        <TouchableOpacity
          style={[styles.roleCard, { backgroundColor: "#2C3E50" }]}
          onPress={() => setRole("Driver")}
        >
          <Text style={styles.roleTitle}>🚍 Driver</Text>
          <Text style={styles.roleDesc}>Start route & manage attendance</Text>
        </TouchableOpacity>

        {/* Selected Role Display */}
        {role && (
          <View style={styles.selectedBox}>
            <Text style={styles.selectedText}>Selected Role: {role}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  subtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 5,
  },
  cardContainer: {
    width: "100%",
  },
  selectText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 20,
    textAlign: "center",
  },
  roleCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  roleDesc: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 5,
    opacity: 0.9,
  },
  selectedBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#E8F8F5",
    borderRadius: 10,
    alignItems: "center",
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27AE60",
  },
});
