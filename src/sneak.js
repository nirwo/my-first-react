import React, { useState, useEffect } from 'react';

function SnakeGame() {
    const [snake, setSnake] = useState([[0, 0]]);
    const [food, setFood] = useState([5, 5]);
    const [dir, setDir] = useState([0, 1]);

    const keyMap = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
    };

    useEffect(() => {
        const move = () => {
            const head = [...snake[0]]; // copy head
            head[0] += dir[0];
            head[1] += dir[1];
            const newSnake = [head, ...snake.slice(0, -1)];
            setSnake(newSnake);
        };

        const intervalId = setInterval(move, 200);
        return () => clearInterval(intervalId);
    }, [snake, dir]);

    useEffect(() => {
        const handleKeydown = (e) => {
            setDir(keyMap[e.key]);
        };

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    return (
        <div>
            {snake.map((part, i) => (
                <div key={i} style={{position: 'absolute', top: `${part[1]}em`, left: `${part[0]}em`, width: '1em', height: '1em', backgroundColor: 'green'}} />
            ))}
            <div style={{position: 'absolute', top: `${food[1]}em`, left: `${food[0]}em`, width: '1em', height: '1em', backgroundColor: 'red'}} />
        </div>
    );
}

export default SnakeGame;