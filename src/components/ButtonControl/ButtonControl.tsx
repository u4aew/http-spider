import { Button, Row, Col } from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
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
  paused,
}) => {
  return (
    <div>
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
