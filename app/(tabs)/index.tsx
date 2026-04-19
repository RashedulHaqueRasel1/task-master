import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type ModalType = 'success' | 'error' | 'warning';

export default function TodoScreen() {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (type: ModalType, title: string, message: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleAddTodo = () => {
    if (todo.trim().length === 0) {
      showModal('error', 'Empty Task!', 'Please write something before adding a task.');
      return;
    }
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: todo,
      completed: false,
    };
    setTodoList([newTodo, ...todoList]);
    setTodo('');
    Keyboard.dismiss();
    showModal('success', 'Task Added!', 'Your new task has been added successfully.');
  };

  const toggleTodo = (id: string) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTodo = (id: string) => {
    const task = todoList.find(t => t.id === id);
    if (task && !task.completed) {
      showModal('warning', 'Task Not Completed!', 'You must complete the task before deleting it.');
      return;
    }
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoTextContainer}
        onPress={() => toggleTodo(item.id)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          item.completed && styles.checkboxCompleted
        ]}>
          {item.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <Text
          style={[
            styles.todoText,
            item.completed && styles.completedTodoText,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => deleteTodo(item.id)} 
        style={[
          styles.deleteButton,
          !item.completed && styles.deleteButtonDisabled
        ]}
      >
        <Ionicons 
          name="trash-outline" 
          size={20} 
          color={item.completed ? "#f87171" : "rgba(248, 113, 113, 0.3)"} 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      {/* Custom Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[
              styles.modalIconContainer,
              modalType === 'success' && styles.bgSuccess,
              modalType === 'error' && styles.bgError,
              modalType === 'warning' && styles.bgWarning,
            ]}>
              <Ionicons 
                name={
                  modalType === 'success' ? 'checkmark-circle' :
                  modalType === 'error' ? 'alert-circle' : 'warning'
                } 
                size={50} 
                color="#fff" 
              />
            </View>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={[
                styles.modalButton,
                modalType === 'success' && styles.bgSuccess,
                modalType === 'error' && styles.bgError,
                modalType === 'warning' && styles.bgWarning,
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <LinearGradient
        colors={['#6366f1', '#a855f7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerGreeting}>Hello, TaskMaster!</Text>
            <Text style={styles.headerTitle}>Your Tasks</Text>
          </View>
          <View style={styles.statsCircle}>
            <Text style={styles.statsText}>
              {todoList.filter(t => t.completed).length}/{todoList.length}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <FlatList
          data={todoList}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="layers-outline" size={80} color="#334155" />
              </View>
              <Text style={styles.emptyStateTitle}>All caught up!</Text>
              <Text style={styles.emptyStateText}>Add a task below to get started.</Text>
            </View>
          }
        />
      </View>

      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            placeholderTextColor="#94a3b8"
            value={todo}
            onChangeText={setTodo}
          />
          <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
            <LinearGradient
              colors={['#6366f1', '#a855f7']}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={28} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    paddingTop: 70,
    paddingHorizontal: 25,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGreeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    marginTop: 2,
  },
  statsCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 120,
  },
  todoItem: {
    backgroundColor: '#0f172a',
    padding: 18,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1e293b',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  todoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxCompleted: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  todoText: {
    fontSize: 17,
    color: '#f1f5f9',
    marginLeft: 15,
    fontWeight: '500',
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#64748b',
    fontWeight: '400',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
  },
  deleteButtonDisabled: {
    backgroundColor: 'rgba(248, 113, 113, 0.03)',
  },
  inputArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 25,
    padding: 6,
    paddingLeft: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
  },
  addButtonGradient: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  emptyStateTitle: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#0f172a',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bgSuccess: { backgroundColor: '#22c55e' },
  bgError: { backgroundColor: '#ef4444' },
  bgWarning: { backgroundColor: '#f59e0b' },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});