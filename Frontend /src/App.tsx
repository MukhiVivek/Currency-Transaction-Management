import './App.css'
import BtmNav from './landing_page/BtmNav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TransitionPag from './landing_page/TransitionPag';
import TransactionCard from './landing_page/TransationHistory';
import Home from './landing_page/Home';
import Console from './landing_page/Console';
import Customer from './landing_page/Customer';

function App() {
  return (
      <Router>
        <div className="dark:bg-black dark:text-white h-ivh" >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transaction" element={<TransactionCard />} />
            <Route path="/transition" element={<TransitionPag />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/console" element={<Console />} />
          </Routes>
          <div className='dark:bg-black dark:text-white h-dvh'>
          </div>
          <div className='fixed bottom-0 w-full border-t border-black dark:border-white bg-white dark:bg-black dark:text-white'>
            <BtmNav />
          </div>
        </div>
      </Router>
)};

export default App;
