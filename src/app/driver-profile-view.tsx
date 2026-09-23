import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverProfileViewScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A252C" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Dark Navy Profile Card */}
        <View style={styles.topHeaderCard}>
          <View style={styles.headerDecorationCircle} />

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>

          {/* Driver Avatar & Name */}
          <View style={styles.driverMainRow}>
            <View style={styles.avatarBorderBox}>
              <Text style={{ fontSize: 36 }}>👮</Text>
            </View>

            <View style={styles.driverMainDetails}>
              <Text style={styles.assignedLabel}>Assigned Driver</Text>
              <Text style={styles.driverName}>Budi Santoso</Text>

              <View style={styles.badgesRow}>
                <View style={styles.onDutyBadge}>
                  <Text style={styles.onDutyBadgeText}>On Duty</Text>
                </View>

                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingBadgeText}>⭐ 4.9</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Bar (Trips, Experience, Van) */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>312+</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>5 yrs</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>GV-204</Text>
              <Text style={styles.statLabel}>Van</Text>
            </View>
          </View>
        </View>

        {/* Contact & Vehicle Details Card */}
        <View style={styles.sectionContainer}>
          <Text style={styles.cardHeaderTitle}>Contact & Vehicle</Text>

          {/* Phone */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={{ fontSize: 18 }}>📞</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>+94 812-3456-7890</Text>
            </View>
          </View>

          {/* Van Plate */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={{ fontSize: 18 }}>🚐</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Van Plate</Text>
              <Text style={styles.infoValue}>GV-204</Text>
            </View>
          </View>

          {/* License */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={{ fontSize: 18 }}>🪪</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>License</Text>
              <Text style={styles.infoValue}>B1234ABC</Text>
            </View>
          </View>

          {/* School */}
          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <View style={styles.infoIconBox}>
              <Text style={{ fontSize: 18 }}>🏫</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>School</Text>
              <Text style={styles.infoValue}>Greenfield International School</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.callDriverBtn} activeOpacity={0.8}>
            <Text style={styles.callBtnText}>📞 Call Driver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.messageDriverBtn} activeOpacity={0.8}>
            <Text style={styles.messageBtnText}>💬 Message</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Report Button */}
        <TouchableOpacity style={styles.emergencyBtn} activeOpacity={0.8}>
          <Text style={styles.emergencyBtnText}>🚨 Report Emergency</Text>
        </TouchableOpacity>

        {/* Parent Reviews Section */}
        <Text style={styles.reviewsHeaderTitle}>Parent Reviews</Text>

        {/* Review 1 */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeaderRow}>
            <Text style={styles.reviewerName}>Mrs. Rahman</Text>
            <Text style={{ fontSize: 12 }}>⭐⭐⭐⭐⭐</Text>
          </View>
          <Text style={styles.reviewComment}>"Always on time, very careful driver."</Text>
        </View>

        {/* Review 2 */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeaderRow}>
            <Text style={styles.reviewerName}>Mr. Hassan</Text>
            <Text style={{ fontSize: 12 }}>⭐⭐⭐⭐⭐</Text>
          </View>
          <Text style={styles.reviewComment}>
            "Kids feel safe with him. Very professional."
          </Text>
        </View>

        {/* Review 3 */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeaderRow}>
            <Text style={styles.reviewerName}>Mrs. Mehta</Text>
            <Text style={{ fontSize: 12 }}>⭐⭐⭐⭐⭐</Text>
          </View>
          <Text style={styles.reviewComment}>
            "Reliable and friendly. Great communication."
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  topHeaderCard: {
    backgroundColor: "#1A252C",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    position: "relative",
    overflow: "hidden",
  },
  headerDecorationCircle: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  driverMainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  avatarBorderBox: {
    width: 72,
    height: 72,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#F39C12",
    backgroundColor: "#2C3E50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  driverMainDetails: {
    flex: 1,
  },
  assignedLabel: {
    fontSize: 11,
    color: "#7F8C8D",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  driverName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    marginVertical: 2,
  },
  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  onDutyBadge: {
    backgroundColor: "rgba(243, 156, 18, 0.2)",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  onDutyBadgeText: {
    color: "#F39C12",
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  ratingBadge: {
    backgroundColor: "rgba(46, 204, 113, 0.2)",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  ratingBadgeText: {
    color: "#2ECC71",
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 0.31,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    fontFamily: "monospace",
  },
  statLabel: {
    fontSize: 10,
    color: "#7F8C8D",
    fontWeight: "700",
    marginTop: 2,
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A252C",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FAF7F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoLabel: {
    fontSize: 11,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
    marginTop: 1,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 16,
  },
  callDriverBtn: {
    flex: 0.48,
    backgroundColor: "#F39C12",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  callBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
  },
  messageDriverBtn: {
    flex: 0.48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#1A252C",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  messageBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
  },
  emergencyBtn: {
    backgroundColor: "#FF3B30",
    marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  emergencyBtnText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  reviewsHeaderTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A252C",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  reviewHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
  },
  reviewComment: {
    fontSize: 12,
    color: "#7F8C8D",
    fontStyle: "italic",
    marginTop: 2,
  },
});