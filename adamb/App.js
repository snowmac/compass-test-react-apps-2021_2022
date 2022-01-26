import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { Card, Paragraph, TextInput, Button } from 'react-native-paper';

// status: open, complete, deleted

export default function App() {
  const [item, setItem] = useState(''); 
  const [description, setDescription] =  useState(''); 
  const [todoListItems, setTodoListItems] = useState([
    {
      id: 1, 
      title: 'Mortgage',
      status: 'open',
      description: 'Pay you', 
      labels: ['pizza','woodys','cheese']
    }
  ]);

  const updateStatus = (id, status) => {
    let list = todoListItems; 
    for(var i = 0; i < todoListItems.length; i++) {
      if(todoListItems[i].id === id) {
        list[i].status = status; 
      }
    }

    setTodoListItems([...list])
  }


  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Todo List
      </Text>

      <TextInput label="Item" value={item} onChangeText={(text) => setItem(text)} />
      <TextInput label="Description" value={description} onChangeText={(e) => setDescription(e)} />

      <Button onPress={() => {
        setTodoListItems(
          [{
            id: todoListItems.length+1,
            title: item, 
            description,
            status: 'open'
          },
          ...todoListItems
          ]
        );

        setDescription('');
        setItem(''); 
      }}> Save </Button>


      {todoListItems.map((item) => {
        if(item.status !== 'open' && item.status !== 'completed') {
          return (<></>);
        }
        
        const styleToUse = item.status === 'completed' ? styles.completed : styles.todoItem; 
        const disableButton = item.status === 'completed';

        return (
        <Card style={styleToUse}>
          <Card.Title title={item.title} />
          <Card.Content>
            <Paragraph>
              {item.description}
            </Paragraph>

            <Paragraph style={styles.labels}>
              { item.labels ? item.labels.join(', ') : '' }
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button disabled={disableButton} onPress={() => updateStatus(item.id, 'completed') }>Done</Button>
            <Button disabled={disableButton} onPress={() => updateStatus(item.id,'deleted') }>Delete</Button>
          
          </Card.Actions>
        </Card>
        );
      })}           

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  labels: {
    fontSize: 12, 
    fontStyle: 'italic',
    color: '#C2B280',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todoItem: {
    marginTop: 10
  },
  completed: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    marginTop: 10
  },
});