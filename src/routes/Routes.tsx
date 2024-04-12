import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { RecordPage } from '../pages/Record';
import { PageSchema } from '../pages/Schema';

export const RoutesMain = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecordPage />} />
        <Route path="/schema" element={<PageSchema />} />
      </Routes>
    </Router>
  );
};
