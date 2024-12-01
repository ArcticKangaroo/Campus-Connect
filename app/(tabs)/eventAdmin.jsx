import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, ToastAndroid, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TextInput, ActivityIndicator, useTheme, IconButton } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { firebaseDB } from '../../firebaseConfig';
import EditableImage from '../../components/EditableImage';

const EventAdmin = () => {
  const eventId = 'RaOugCIWbxNicp7gaJMK';
  const theme = useTheme();
  const router = useRouter();
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    fee: '',
    time: '',
    location: '',
    backgroundImage: '',
    society: '',
  });
  const [loading, setLoading] = useState(true);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        try {
          const eventDoc = await getDoc(doc(firebaseDB, 'events', eventId));
          if (eventDoc.exists()) {
            const data = eventDoc.data();
            setEventData(data);
            if (data.time) {
              const eventDate = data.time.toDate();
              setSelectedDate(eventDate);
              setSelectedTime({ hours: eventDate.getHours(), minutes: eventDate.getMinutes() });
            }
          }
        } catch (error) {
          console.error('Error fetching event data:', error);
        }
      }
      setLoading(false);
    };

    fetchEventData();
  }, [eventId]);

  const handleSave = async () => {
    try {
      const eventDocRef = doc(firebaseDB, 'events', eventId);
      const updatedEventData = {
        ...eventData,
        time: Timestamp.fromDate(new Date(selectedDate.setHours(selectedTime.hours, selectedTime.minutes))),
      };
      await updateDoc(eventDocRef, updatedEventData);
      ToastAndroid.show('Event updated', ToastAndroid.SHORT);
      router.push('/events');
    } catch (error) {
      ToastAndroid.show('Error: ' + error.message, ToastAndroid.SHORT);
    }
  };

  const handleDelete = async () => {
    try {
      if (eventId) {
        await deleteDoc(doc(firebaseDB, 'events', eventId));
        ToastAndroid.show('Event deleted', ToastAndroid.SHORT);
        router.push('/events');
      }
    } catch (error) {
      ToastAndroid.show('Error: ' + error.message, ToastAndroid.SHORT);
    }
  };

  const handleImageUpload = async (uri) => {
    try {
      const eventDocRef = doc(firebaseDB, 'events', eventId);
      await updateDoc(eventDocRef, { backgroundImage: uri });
      setEventData((prevData) => ({ ...prevData, backgroundImage: uri }));
    } catch (error) {
      console.error('Error updating image URL in Firestore:', error);
    }
  };

  const handleBackButton = () => {
    router.back();
  };

  const onDismissSingle = useCallback(() => {
    setDatePickerOpen(false);
  }, [setDatePickerOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setDatePickerOpen(false);
      setSelectedDate(params.date);
      const updatedDate = new Date(params.date);
      updatedDate.setHours(selectedTime.hours);
      updatedDate.setMinutes(selectedTime.minutes);
      setEventData((prevData) => ({ ...prevData, time: updatedDate.toISOString() }));
    },
    [selectedTime]
  );

  const onDismissTime = useCallback(() => {
    setTimePickerOpen(false);
  }, [setTimePickerOpen]);

  const onConfirmTime = useCallback(
    ({ hours, minutes }) => {
      setTimePickerOpen(false);
      setSelectedTime({ hours, minutes });
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours);
      updatedDate.setMinutes(minutes);
      setEventData((prevData) => ({ ...prevData, time: updatedDate.toISOString() }));
    },
    [selectedDate]
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  const screenHeight = Dimensions.get('window').height;
  const bannerHeight = screenHeight * 0.4;

  const eventDate = new Date(eventData.time);
  const isValidDate = !isNaN(eventDate.getTime());

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <IconButton
          icon={() => <Ionicons name="chevron-back" size={24} color="#fff" />}
          size={24}
          onPress={handleBackButton}
          style={styles.backButton}
        />
        <View style={[styles.bannerContainer, { height: bannerHeight }]}>
          <EditableImage
            imageUri={eventData.backgroundImage}
            setImageUri={handleImageUpload}
            editable={true}
            imagePath={`events/backgroundImages/${eventId}`}
          />
        </View>
        <View style={styles.container}>
          <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              mode="outlined"
              label="Event Name"
              value={eventData.name}
              onChangeText={(text) => setEventData({ ...eventData, name: text })}
              theme={{ roundness: 15 }}
            />
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              mode="outlined"
              label="Description"
              value={eventData.description}
              onChangeText={(text) => setEventData({ ...eventData, description: text })}
              multiline
              theme={{ roundness: 15 }}
            />
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              mode="outlined"
              label="Fee"
              value={eventData.fee.toString()}
              onChangeText={(text) => setEventData({ ...eventData, fee: parseFloat(text) })}
              keyboardType="numeric"
              theme={{ roundness: 15 }}
            />
            <View style={styles.row}>
              <Button onPress={() => setDatePickerOpen(true)} uppercase={false} mode="outlined" style={[styles.input, styles.halfInput]}>
                Date
              </Button>
              <Button onPress={() => setTimePickerOpen(true)} uppercase={false} mode="outlined" style={[styles.input, styles.halfInput]}>
                Time
              </Button>
            </View>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={datePickerOpen}
              onDismiss={onDismissSingle}
              date={isValidDate ? eventDate : new Date()}
              onConfirm={onConfirmSingle}
            />
            <TimePickerModal
              visible={timePickerOpen}
              onDismiss={onDismissTime}
              onConfirm={onConfirmTime}
              hours={selectedTime.hours}
              minutes={selectedTime.minutes}
            />
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              mode="outlined"
              label="Location"
              value={eventData.location}
              onChangeText={(text) => setEventData({ ...eventData, location: text })}
              theme={{ roundness: 15 }}
            />
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              mode="outlined"
              label="Society"
              value={eventData.society}
              onChangeText={(text) => setEventData({ ...eventData, society: text })}
              theme={{ roundness: 15 }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={[styles.buttonRow, { backgroundColor: theme.colors.background }]}>
        <Button
          mode="contained"
          onPress={handleSave}
          style={[styles.button, { marginRight: 8 }]}
          icon={() => <Ionicons name="save-outline" size={18} color={theme.colors.onPrimary} />}
        >
          Save
        </Button>
        {eventId && (
          <Button
            mode="contained"
            onPress={handleDelete}
            style={[styles.button, { backgroundColor: theme.colors.error }]}
            labelStyle={{ color: theme.colors.onError }}
            icon={() => <Ionicons name="trash-outline" size={18} color={theme.colors.onError} />}
          >
            Delete
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  bannerContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 15,
    elevation: 5,
    marginTop: -60,
  },
  input: {
    width: '100%',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  button: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    zIndex: 1,
  },
});

export default EventAdmin;