import { RoutesMain } from './routes';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { store } from './store';
import i18n from './i18n';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RoutesMain />
      </I18nextProvider>
    </Provider>
  );
}

export default App;
