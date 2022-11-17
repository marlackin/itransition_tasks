import {Layout} from './components/Layout.jsx'
import {Routes,Route} from 'react-router-dom'

import {MainPage} from './pages/MainPage.jsx'
import {LoginPage} from './pages/LoginPage.jsx'
import {RegisterPage} from './pages/RegisterPage.jsx'

function App() {
  return (
     <Layout>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/:id" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/delete" element={<MainPage/>} />
        <Route path="/block" element={<MainPage/>} />
      </Routes>
     </Layout>
  );
}

export default App;
