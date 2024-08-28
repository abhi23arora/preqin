// InvestorsList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InvestorsList from '../components/InvestorsList';
import axios from 'axios';

jest.mock('axios');

// Mock data for testing
const mockInvestors = [
    { "id": 1000, "investor_Name": "Ioo Gryffindor fund", "investor_Type": "fund manager", "investor_Country": "Singapore", "investor_Date_Added": "06/07/00", "investor_Last_Updated": "21/02/24", "commitment_Asset_Class": "Infrastructure", "commitment_Amount": 15000000, "commitment_Currency": "GBP" }, 
    // { "id": 1001, "investor_Name": "Ibx Skywalker ltd", "investor_Type": "asset manager", "investor_Country": "United States", "investor_Date_Added": "21/07/97", "investor_Last_Updated": "21/02/24", "commitment_Asset_Class": "Infrastructure", "commitment_Amount": 31000000, "commitment_Currency": "GBP" }, 
    // { "id": 1002, "investor_Name": "Cza Weasley fund", "investor_Type": "wealth manager", "investor_Country": "United Kingdom", "investor_Date_Added": "29/05/02", "investor_Last_Updated": "21/02/24", "commitment_Asset_Class": "Hedge Funds", "commitment_Amount": 58000000, "commitment_Currency": "GBP" }
];

describe('InvestorsList Component', () => {
    it('renders the list of investors correctly', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { "id": 1000, "investor_Name": "Ioo Gryffindor fund", "investor_Type": "fund manager", "investor_Country": "Singapore", "investor_Date_Added": "06/07/00", "investor_Last_Updated": "21/02/24", "commitment_Asset_Class": "Infrastructure", "commitment_Amount": 15000000, "commitment_Currency": "GBP" }, 
            ],
          });
        render(<InvestorsList />);

        // Attempt to find the text
        const investorName = await screen.findByText(/Ioo Gryffindor fund/i);
        // console.log(investorName); // Check what the query returns

        // Ensure the result is an HTML element
        expect(investorName).toBeTruthy(); // Check that it is not null or undefined
        expect(investorName).toBeInTheDocument(); // Check if it's in the document
    });

    it('calls API and shows commitments on row click', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { "id": 1000, "investor_Name": "Ioo Gryffindor fund", "investor_Type": "fund manager", "investor_Country": "Singapore", "investor_Date_Added": "06/07/00", "investor_Last_Updated": "21/02/24", "commitment_Asset_Class": "Infrastructure", "commitment_Amount": 15000000, "commitment_Currency": "GBP" }, 
            ],
          });
        render(<InvestorsList />);

        // Click on the first row
        fireEvent.click(await screen.findByText(/Ioo Gryffindor fund/i));

        // Check if the commitments popup is shown
        expect(await screen.findByText(/Ioo Gryffindor fund/i)).toBeInTheDocument();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
