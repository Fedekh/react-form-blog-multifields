import Header from './components/Header';
import Footer from './components/Footer';
import './css/App.css';
import Form from './components/Form';
import Lista from './components/Lista';

function App() {

  return (
    <>

      <Header />

      <main className="mx-auto my-8 max-w-2xl">
        <h1 className='my-4 text-2xl text-red-700'>Registrati al form: </h1>

        <Form />

      </main>


      <Footer />
    </>
  );
}

export default App;
