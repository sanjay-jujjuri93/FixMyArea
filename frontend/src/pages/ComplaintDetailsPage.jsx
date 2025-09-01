import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const complaintRes = await axios.get(`https://fixmyarea-backend-6enz.onrender.com/api/complaints/${id}`);
        setComplaint(complaintRes.data);

        const updatesRes = await axios.get(`https://fixmyarea-backend-6enz.onrender.com/api/complaints/worker-updates/${id}`);
        setUpdates(updatesRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load complaint details.');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaintDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading complaint details...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;
  if (!complaint) return <div className="text-center mt-8 text-gray-600">Complaint not found.</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{complaint.title}</h2>
        <p className="text-gray-600 mb-2">Category: {complaint.category}</p>
        <p className="text-gray-600 mb-2">Status: <span className={`font-semibold ${
          complaint.status === 'Open' ? 'text-red-600' :
          complaint.status === 'In Progress' ? 'text-yellow-600' :
          'text-green-600'
        }`}>{complaint.status}</span></p>
        <p className="text-gray-600 mb-4">Reported by: {complaint.createdBy.name}</p>
        
        <div className="my-6">
          <img src={complaint.photoURL} alt={complaint.title} className="w-full h-auto rounded-lg shadow-md" />
        </div>

        <p className="text-gray-800 leading-relaxed">{complaint.description}</p>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Update Timeline</h3>
          <ul className="space-y-4">
            {updates.length > 0 ? (
              updates.map(update => (
                <li key={update._id} className="bg-gray-100 p-4 rounded-lg shadow-inner">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800">{update.workerId.name}</span>
                    <span className="text-sm text-gray-500">{new Date(update.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700">{update.updateText}</p>
                  {update.photoURL && (
                    <div className="mt-4">
                      <img src={update.photoURL} alt="Proof of work" className="w-48 h-auto rounded-md shadow" />
                      <p className="text-xs text-gray-500 mt-2">Proof of work</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Status changed to: {update.status}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No updates yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ComplaintDetailsPage;