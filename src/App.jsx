import { BrowserRouter } from 'react-router-dom';
import { Footer } from './modules/Footer.jsx';
import { Header } from './modules/Header.jsx';
import { Main } from './modules/Main.jsx';

function App() {

  return (
    <BrowserRouter>
      <Header />

      <Main />

      <Footer />
    </BrowserRouter>
  )
}

export default App;
