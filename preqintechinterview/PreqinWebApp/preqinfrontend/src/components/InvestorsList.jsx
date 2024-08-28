import React, { useState, useEffect } from 'react';
import CommitmentsBubble from './InvestorDetail';
import axios from 'axios';
import './InvestorsList.css';

const formatCommitment = (value) => {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(1) + 'B';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1) + 'M';
    } else {
        return value.toString();
    }
};

const InvestorsList = () => {
    const [investors, setInvestors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // in future we can make this as button TODO
    const [searchQuery, setSearchQuery] = useState('');
    const [commitments, setCommitments] = useState([]);
    const [showCommitments, setShowCommitments] = useState(false);

    const filteredInvestors = investors.filter(investor =>
        investor.investor_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvestors = filteredInvestors.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(investors.length / itemsPerPage);

    
    useEffect(() => {
        axios.get('http://localhost:5050/investor')
            .then(response => {
                setInvestors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the investors data!', error);
            });
    }, []);

    

    const handleRowClick = (id, name) => {
        fetch(`http://localhost:5050/investor/${id}`)
            .then(response => response.json())
            .then(data => {
                setCommitments(data);
                setShowCommitments(true);
            })
            .catch(error => console.error('Error fetching commitments:', error));
    };

    const closeCommitmentsView = () => {
        setShowCommitments(false);
    };

    return (
        <div className="investors-container">
            {showCommitments && (
                <div className="overlay" onClick={closeCommitmentsView}></div>
            )}
            <div className="header">
                <h1>Investors</h1>
                <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-box"
                />
            </div>
            <table className="investors-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Date Added</th>
                        <th>Address</th>
                        <th>Total Commitment</th>
                    </tr>
                </thead>
                <tbody>
                    {currentInvestors.map((investor) => (
                         <tr key={investor.id} onClick={() => handleRowClick(investor.id, investor.investor_Name)} className="clickable-row">
                            <td>{investor.id}</td>
                            <td>{investor.investor_Name}</td>
                            <td>{investor.investor_Type}</td>
                            <td>{investor.investor_Date_Added}</td>
                            <td>{investor.investor_Country}</td>
                            <td className="commitment">£ {formatCommitment(investor.commitment_Amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
        {showCommitments && (
                <CommitmentsBubble 
                    commitments={commitments}
                    closeBubble={() => setShowCommitments(false)}
                />
            )}
        </div>

    );
};

export default InvestorsList;
