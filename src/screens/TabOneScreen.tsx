import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { db, firestore } from 'firebase';
import { onValue, ref, set } from 'firebase/database';
import { doc, onSnapshot, writeBatch } from 'firebase/firestore';
import { EditScreenInfo } from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export const TabOneScreen = () => {
  const [value, setValue] = useState(false);
  const [valueFirestore, setValueFirestore] = useState(false);

  const handleToggle = async () => {
    await set(ref(db, 'test'), !value);
  };

  const handleToggleFirestore = async () => {
    const batch = writeBatch(firestore);
    const testRef = doc(firestore, 'test', 'test');
    batch.set(testRef, { value: !valueFirestore });
    await batch.commit();
  };

  useEffect(() => {
    const starCountRef = ref(db, 'test');
    onValue(starCountRef, (snapshot) => {
      console.log(snapshot.val());
      const data = snapshot.val();
      setValue(data);
    });

    onSnapshot(doc(firestore, 'test', 'test'), (snapshot) => {
      console.log(snapshot.data());
      const data = snapshot.data();
      setValueFirestore(data?.value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>Value: {value ? 'On' : 'Off'}</Text>
      <Text>Value Firestore: {valueFirestore ? 'On' : 'Off'}</Text>

      <Button title={'Toggle'} onPress={handleToggle} />
      <Button title={'Toggle Firestore'} onPress={handleToggleFirestore} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/ screens/TabOneScreen.tsx" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
