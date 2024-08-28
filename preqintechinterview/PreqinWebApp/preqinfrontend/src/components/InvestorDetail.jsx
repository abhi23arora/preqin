import React, {useState} from 'react';

const formatCommitment = (value) => {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(1) + 'B';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1) + 'M';
    } else {
        return value.toString();
    }
};

const CommitmentsBubble = ({ commitments, closeBubble }) => {
    const groupCommitments = (commitments) => {
        return commitments.reduce((groups, commitment) => {
            
            const { commitment_Asset_Class } = commitment;
            if (!groups[commitment_Asset_Class]) {
                groups[commitment_Asset_Class] = [];
            }
            groups[commitment_Asset_Class].push(commitment);
            return groups;
        }, {});
    };
    
    const investorName = commitments[0].investor_Name;
    const groupedCommitments= groupCommitments(commitments);
    const totalCommitment= commitments.reduce((sum, c) => sum + c.commitment_Amount, 0)

    const assetClasses = Object.keys(groupedCommitments);
    const [filteredCommitments, setFilteredCommitments] = useState(groupedCommitments);
    const [selectedGroup, setSelectedGroup] = useState('All');

    const handleGroupClick = (group) => {
        debugger;
        setSelectedGroup(group);
        setFilteredCommitments(group === 'All' ? groupedCommitments : groupedCommitments[group]);
    };
    return (
        <div className="commitments-bubble">
            <div className="commitments-header">
                <h2>{investorName}'s Portfolio</h2>
                <button onClick={closeBubble}>Close</button>
            </div>
            <div className="commitments-buttons">
                <button
                    onClick={() => handleGroupClick('All')}
                    className={selectedGroup === 'All' ? 'active' : ''}>
                    All £{formatCommitment(totalCommitment)}
                </button>
                {assetClasses.map(assetClass => (
                    <button key={assetClass}
                        onClick={() => handleGroupClick(assetClass)}
                        className={selectedGroup === assetClass ? 'active' : ''}>
                        {assetClass} £{formatCommitment(groupedCommitments[assetClass].reduce((sum, c) => sum + c.commitment_Amount, 0))}

                    </button>
                ))}
            </div>
            <table className="commitments-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Asset Class</th>
                        <th>Currency</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(filteredCommitments).flat().map(commitment => (
                        <tr key={commitment.id}>
                            <td>{commitment.id}</td>
                            <td>{commitment.commitment_Asset_Class}</td>
                            <td>{commitment.commitment_Currency}</td>
                            <td>£ {formatCommitment(commitment.commitment_Amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommitmentsBubble;