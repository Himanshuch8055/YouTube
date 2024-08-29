import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Explore from './pages/Explore/Explore';
import Subscriptions from './pages/Subscriptions/Subscriptions';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
