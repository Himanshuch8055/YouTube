import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Explore from './pages/Explore/Explore';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import History from './pages/History/History';
import Yourvideos from './pages/Yourvideos/Yourvideos';
import Likedvideos from './pages/Likedvideos/Likedvideos';
import Trending from './pages/Trending/Trending';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/history" element={<History />} />
          <Route path="/your-videos" element={<Yourvideos />} />
          <Route path="/liked-videos" element={<Likedvideos />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
