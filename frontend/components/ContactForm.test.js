import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(
        <ContactForm/>
        
    );
    
});

test('renders the contact form header', () => {
    render(<ContactForm/>);
   
    const headerElement = screen.queryByText(/contact form/i);
   
   expect(headerElement).toBeInTheDocument();
   expect(headerElement).toBeTruthy();
   expect(headerElement).toHaveTextContent(/contact form/i); 

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //arrange
    render(<ContactForm />);

    //act
    const nameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(nameInput, 'Rick');
    //assert
    const errorMessages= await screen.findAllByTestId('error');
    
    expect(errorMessages).toHaveLength(1);
 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
 render(<ContactForm/>);

const submitButton = screen.getByRole('button');
        userEvent.click(submitButton);

await waitFor(() =>{
    const threeErrors = screen.queryAllByTestId(/error/i);
    expect(threeErrors).toHaveLength(3);
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, 'Ricky');
    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, 'medina');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const emailError = await screen.findAllByTestId('error');

    expect(emailError).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
render(<ContactForm/>);
 const validEmail = screen.getByLabelText(/email/i);
    userEvent.type(validEmail,'rick@email');

    const errorMessage= await screen.findByText(/email must be a valid email address/i);
    expect (errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const lastNameError = await screen.findByText(/lastName is a required field/i);
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText(/First name*/i);
    userEvent.type(firstNameInput, 'Ricky');

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, 'medina');

    const validEmail = screen.getByLabelText(/email/i);
    userEvent.type(validEmail,'rick@email.com');

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(()=>{
        const firstNameDisplay = screen.queryByText('Ricky');
        const lastNameDisplay = screen.queryByText('medina');
        const emailDisplay = screen.queryByText('rick@email.com');
        const messageDisplay = screen.queryByTestId("messageDisplay");

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();

});
});

test('renders all fields text when all fields are submitted.', async () => {
    render (<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first Name*/i);
    userEvent.type(firstNameInput, 'Ricky');

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, 'medina');

    const validEmail = screen.getByLabelText(/email/i);
    userEvent.type(validEmail,'rick@email.com');
    
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, "abracadabra");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(()=>{
        const firstNameDisplay = screen.queryByText('Ricky');
        const lastNameDisplay = screen.queryByText('medina');
        const emailDisplay = screen.queryByText('rick@email.com');
        const messageDisplay = screen.queryByText("abracadabra");

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();

});
});

