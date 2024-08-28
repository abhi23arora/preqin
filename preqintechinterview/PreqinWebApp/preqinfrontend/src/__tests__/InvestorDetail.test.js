// CommitmentsView.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommitmentsBubble from '../components/InvestorDetail';

// Mock data for testing
const mockCommitments = [
    {"id":1000,"investor_Name":"Ioo Gryffindor fund","investor_Type":"fund manager","investor_Country":"Singapore","investor_Date_Added":"06/07/00","investor_Last_Updated":"21/02/24","commitment_Asset_Class":"Infrastructure","commitment_Amount":15000000,"commitment_Currency":"GBP"},
    {"id":1009,"investor_Name":"Ioo Gryffindor fund","investor_Type":"fund manager","investor_Country":"Singapore","investor_Date_Added":"06/07/00","investor_Last_Updated":"21/02/24","commitment_Asset_Class":"Hedge Funds","commitment_Amount":31000000,"commitment_Currency":"GBP"}
];

describe('CommitmentsView Component', () => {
  it('renders commitments correctly', () => {
    render(<CommitmentsBubble commitments={mockCommitments} />);

    // Check if the commitments are rendered
    expect(screen.getByText('Infrastructure')).toBeInTheDocument();
  });

  it('filters commitments by group when a group button is clicked', () => {
    render(<CommitmentsBubble commitments={mockCommitments} />);

    // Click on the 'Hedge Funds' group button
    fireEvent.click(screen.getByText('Hedge Funds'));

    // Check if the filtered data is shown
    expect(screen.getAllByText('Hedge Funds')).toHaveLength(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
