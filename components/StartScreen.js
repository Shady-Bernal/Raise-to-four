import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const StartScreen = ({ navigation }) => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔥 Raise To Four! 🔥</Text>
            <Text style={styles.subtitle}>Enter Your Names: </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Player 1 Name"
                value={player1}
                onChangeText={setPlayer1}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Player 2 Name"
                value={player2}
                onChangeText={setPlayer2}
            />
            <TouchableOpacity 
                style={styles.startButton} 
                onPress={() => navigation.navigate('Game', { player1, player2 })}
            >
                <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0047AB',
    },
    title: {
        fontSize: 25, // Bigger size for emphasis
        fontWeight: 'bold',
        color: '#FFD700', // Gold color for a premium look
        textShadowColor: 'rgba(0, 0, 0, 0.8)', 
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textTransform: 'uppercase', // Makes it all caps
        letterSpacing: 2, // Adds spacing between letters
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
         fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 15,
        overflow: 'hidden',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        marginBottom: 20,
    },
    input: {
        width: 250,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10,
        textAlign: 'center',
    },
    startButton: {
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StartScreen;
