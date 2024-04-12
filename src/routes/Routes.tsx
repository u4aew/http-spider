import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PagePopUp } from '../pages/PopUp';
import { PageSchema } from '../pages/Schema';

export const RoutesMain = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PagePopUp />} />
        <Route path="/schema" element={<PageSchema />} />
      </Routes>
    </Router>
  );
};
