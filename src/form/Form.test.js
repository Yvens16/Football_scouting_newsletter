import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
import { FirebaseContext } from '../utils/external_apis/firebase';

jest.mock('../utils/external_apis/airtable');
jest.mock('airtable');
let nameInput;
let telInput;
let mailInput;

describe('renders form inputs', () => {
  beforeEach(() => {
    // const firebase = {
    //   functions: jest.fn(() => ({
    //     httpsCallable: jest.fn(),
    //   })),
    // };
    const firebase = {};
    const values = {
      returnValueOne: 'valueOne',
      returnValueTwo: 'valueTwo',
    };
    const data = {
      values,
    };
    const cloudFunction = jest.fn(() => Promise.resolve({
      data,
    }));
    const httpsCallable = jest.fn(() => cloudFunction);
    firebase.functions = jest.fn(() => ({
      httpsCallable,
    }));
    render(<FirebaseContext.Provider value={firebase}><Form /></FirebaseContext.Provider>);
    nameInput = screen.getByPlaceholderText(/Prénom/);
    telInput = screen.getByPlaceholderText(/Numéro/);
    mailInput = screen.getByPlaceholderText(/Email/);
  });

  it('Should renders the register inputs', () => {
    expect(nameInput).toBeInTheDocument();
    expect(telInput).toBeInTheDocument();
    expect(mailInput).toBeInTheDocument();
  });

  it('Shoudl render the pages in order', () => {
    let nextBtn = screen.getByText(/Inscris-toi/);
    userEvent.click(nextBtn);
    const radioBtn = screen.getByTestId('radio');
    expect(radioBtn).toBeInTheDocument();
    nextBtn = screen.getByText(/Inscris-toi/);
    userEvent.click(nextBtn);
    const validatedText = screen.getByTestId('validated');
    expect(validatedText).toBeInTheDocument();
  });
  it('Should fill in the form', () => {
    const name = 'Steve';
    const tel = '06 78 65 45 67';
    const mail = 'steveRoger@gmail.com';
    userEvent.type(nameInput, name);
    userEvent.type(telInput, tel);
    userEvent.type(mailInput, mail);
    expect(nameInput.value).toEqual(name);
    expect(telInput.value).toEqual(tel);
    expect(mailInput.value).toEqual(mail);
  });
  it('Should select the freeAdvice option', () => {
    const nextBtn = screen.getByText(/Inscris-toi/);
    userEvent.click(nextBtn);
    const freeAdviceRadioBtn = screen.getByTestId('radio');
    const detectionRegion = screen.getByTestId('detectionRegion');
    expect(freeAdviceRadioBtn.checked).toBeFalsy();
    userEvent.click(freeAdviceRadioBtn);
    expect(freeAdviceRadioBtn.checked).toBeTruthy();
    expect(detectionRegion.checked).toBeFalsy();
  });
  it('Should show error message for email', async () => {
    userEvent.type(mailInput, 'steve.com');
    mailInput.blur();
    expect(screen.getByTestId('mailErrorMsg')).toBeInTheDocument();

    userEvent.type(mailInput, 'steve@gmail.com');
    mailInput.blur();
    await waitFor(() => {
      expect(screen.queryByTestId('mailErrorMsg')).not.toBeInTheDocument();
    });
  });
  it('Should show error message for phone number', async () => {
    userEvent.type(telInput, 'steve.com');
    telInput.blur();
    expect(screen.getByTestId('phoneErrorMsg')).toBeInTheDocument();

    userEvent.type(telInput, '0627265454');
    telInput.blur();
    await waitFor(() => {
      expect(screen.queryByTestId('phoneErrorMsg')).not.toBeInTheDocument();
    });
  });
});
