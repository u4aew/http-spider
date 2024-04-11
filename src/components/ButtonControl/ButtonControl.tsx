import { useEffect, useState } from "react";
import { Button, Row, Col, Typography } from 'antd';
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    StopOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface ButtonControlProps {
    onStart: () => void;
    onPause: () => void;
    onStop: () => void;
    recording: boolean;
    paused: boolean;
}

export const ButtonControl: React.FC<ButtonControlProps> = ({
                                                         onStart,
                                                         onPause,
                                                         onStop,
                                                         recording,
                                                         paused
                                                     }) => {


    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        //@ts-ignore
        let interval: any = null;
        if (recording && !paused) {
            interval = setInterval(() => {
                setSecondsElapsed((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!recording) {
            setSecondsElapsed(0); // Reset the timer when stopped
        }
        return () => interval && clearInterval(interval);
    }, [recording, paused]);

    // Format the elapsed time to display as HH:MM:SS
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    return (
        <div>
            <Text type="secondary">Time: {formatTime(secondsElapsed)}</Text>
            <Row gutter={16} justify="center" style={{ marginTop: 24 }}>
                <Col>
                    <Button
                        type="primary"
                        onClick={onStart}
                        disabled={recording}
                        icon={<PlayCircleOutlined />}
                        title="Start"
                    />
                </Col>
                <Col>
                    <Button
                        onClick={onPause}
                        disabled={!recording || paused}
                        icon={<PauseCircleOutlined />}
                        title="Pause"
                    />
                </Col>
                <Col>
                    <Button
                        type="primary"
                        danger
                        onClick={onStop}
                        disabled={!recording}
                        icon={<StopOutlined />}
                        title="Stop"
                    />
                </Col>
            </Row>
        </div>
    );
};
