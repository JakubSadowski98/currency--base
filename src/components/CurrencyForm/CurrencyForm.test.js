import { render, screen, cleanup } from '@testing-library/react'; // funkcja render, obiekt screen,
import userEvent from '@testing-library/user-event'; // obiekt userEvent zaimporowane z paczki React Testing Library
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => { // test - sprawdzenie, czy komponent renderuje się poprawnie
    render(<CurrencyForm action={() => {}} />); // renderowanie pojedynczego komponentu
  });                                           // przekazanie do komponentu parametru action jako pusta funkcja - w tym teście nie ma znaczenia treść tej funkcji
  it('should run action callback with proper data on form submit', () => {
    const testCases = [ // tablica z danymi do testowania
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for(const testObj of testCases) {
      // create fake function
      const action = jest.fn(); // utworzenie "atrapy funkcji" pozwala sprawdzić, co się z daną funkcją dzieje (np. ile wywołań, jakie parametry)
      // render component
      render(<CurrencyForm action={action} />); // renderowanie komponentu przekazując do niego jako action funkcję atrapę
      // find “convert” button
      const submitButton = screen.getByText('Convert'); // znalezienie elementu widoku (wyrenderowanego komponentu) - buttona
      // find field elems
      const amountField = screen.getByTestId('amount'); // znalezienie elementów (input i dwa selecty) po identyfikatorze data-testid
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');
      // set test values to fields
      userEvent.type(amountField, testObj.amount);         // wstawienie przykładowej wartości dla znalezionych elementów
      userEvent.selectOptions(fromField, testObj.from);    // inaczej: symulowanie wpisania w input wartości 100 oraz
      userEvent.selectOptions(toField, testObj.to);        // wybrania w pierwszym select opcji PLN, a w drugim USD
      // simulate user click on "convert" button
      userEvent.click(submitButton); // zasymulowanie dzoałania użytkownika - kliknięcie w button
      // check if action callback was called once and with proper argument
      expect(action).toHaveBeenCalledTimes(1);                                                                       // ! mimo wpisania w input stringu '100', oczekuje się, że funkcja włączy się z numberem 100 -
      expect(action).toHaveBeenCalledWith({ amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to }); // - wynika to z tego, iż komponent posiada taki feature (funkcję parseInt), który zwraca amount jako liczbę
      // unmount component
      cleanup(); // "wyczyszczenie ekranu" ze starej wersji wyrenderowanego komponentu (odmontowanie komponentu)
    }
  });
});