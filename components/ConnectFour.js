import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CELL_SIZE = Math.min(width * 0.1, 50);
const BOARD_WIDTH = CELL_SIZE * 9 + 16;

const ROWS = 6;
const COLS = 7;
const EMPTY_BOARD = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));

const ConnectFour = ({ route, navigation }) => {
    const { player1, player2 } = route.params;
    const [board, setBoard] = useState(EMPTY_BOARD);
    const [currentPlayer, setCurrentPlayer] = useState('red');
    const [winner, setWinner] = useState(null);
    const [scores, setScores] = useState({ red: 0, yellow: 0 });

    const dropPiece = (col) => {
        if (winner) return;
        const newBoard = board.map(row => [...row]);
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = currentPlayer;
                setBoard(newBoard);
                if (checkWinner(newBoard, row, col, currentPlayer)) {
                    setWinner(currentPlayer);
                    setScores(prevScores => ({
                        ...prevScores,
                        [currentPlayer]: prevScores[currentPlayer] + 1
                    }));
                } else {
                    setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
                }
                return;
            }
        }
    };

    const checkWinner = (board, row, col, player) => {
        return checkDirection(board, row, col, player, 1, 0) || 
               checkDirection(board, row, col, player, 0, 1) || 
               checkDirection(board, row, col, player, 1, 1) || 
               checkDirection(board, row, col, player, 1, -1);
    };

    const checkDirection = (board, row, col, player, rowDir, colDir) => {
        let count = 1;
        for (let i = 1; i < 4; i++) {
            if (board[row + i * rowDir]?.[col + i * colDir] === player) count++;
            else break;
        }
        for (let i = 1; i < 4; i++) {
            if (board[row - i * rowDir]?.[col - i * colDir] === player) count++;
            else break;
        }
        return count >= 4;
    };

    const resetGame = () => {
        setBoard(EMPTY_BOARD);
        setCurrentPlayer('red');
        setWinner(null);
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>⬅ Back</Text>
            </TouchableOpacity>

            {/* Scoreboard */}
            <View style={styles.scoreboard}>
                <Text style={[styles.scoreText, { color: 'red' }]}>{player1}: {scores.red}</Text>
                <Text style={[styles.scoreText, { color: 'yellow' }]}>{player2}: {scores.yellow}</Text>
            </View>

            {/* Header for Turn/Winner */}
            <Text style={styles.header}>
                {winner 
                    ? `🎉 ${winner === 'red' ? player1 : player2} Wins! 🎉` 
                    : `Your turn: ${currentPlayer === 'red' ? player1 : player2}`}
            </Text>

            {/* Game Board */}
            <View style={[styles.board, { width: BOARD_WIDTH }]}> 
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => (
                            <TouchableOpacity key={colIndex} style={[styles.cell, { width: CELL_SIZE, height: CELL_SIZE, borderRadius: CELL_SIZE / 2 }]} onPress={() => dropPiece(colIndex)}>
                                <View style={[styles.piece, cell === 'red' ? styles.red : cell === 'yellow' ? styles.yellow : null, { width: CELL_SIZE * 0.85, height: CELL_SIZE * 0.85, borderRadius: CELL_SIZE * 0.425 }]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>

            {/* Restart Game Button */}
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                <Text style={styles.resetText}>Restart Game</Text>
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
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    backText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0047AB',
    },
    scoreboard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
        marginBottom: 10,
        padding: 5,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginLeft: 10,
        
    },
    header: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    board: {
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 6,
    },
    piece: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    red: {
        backgroundColor: 'red',
    },
    yellow: {
        backgroundColor: 'yellow',
    },
    resetButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    resetText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
    },
});

export default ConnectFour;
