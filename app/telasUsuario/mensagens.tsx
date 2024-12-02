import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../../scripts/firebase-config";

const Mensagens = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const sortedMessages = Object.values(data).sort(
          (a, b) => b.timestamp - a.timestamp
        );
        setMessages(sortedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Caixa de Entrada</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() => openModal(item)}
          >
            <View style={styles.messageContent}>
              <Text style={styles.messageTitle}>{item.title}</Text>
              <Text style={styles.messageSender}>{item.sender}</Text>
              <Text style={styles.messageDate}>{formatTimestamp(item.timestamp)}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma mensagem disponível.</Text>
        }
      />

      {/* Modal para Detalhes da Mensagem */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMessage?.title}</Text>
            <Text style={styles.modalSender}>De: {selectedMessage?.sender}</Text>
            <Text style={styles.modalBody}>{selectedMessage?.content}</Text>
            <Button title="Fechar" onPress={closeModal} color="#FF8800" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  messageItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  messageContent: {
    flexDirection: "column",
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  messageSender: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  messageDate: {
    fontSize: 12,
    color: "#888",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalSender: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  modalBody: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Mensagens;
