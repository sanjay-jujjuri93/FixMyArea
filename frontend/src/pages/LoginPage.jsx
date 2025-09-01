import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Analytics from '../components/Analytics';

const BASE_URL = 'https://fixmyarea-backend-6enz.onrender.com';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [workersByVillage, setWorkersByVillage] = useState([]);
  const [complaintsByVillage, setComplaintsByVillage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };

      const complaintsRes = await axios.get(`${BASE_URL}/api/complaints`, config);
      setComplaints(complaintsRes.data);
      
      const workersRes = await axios.get(`${BASE_URL}/api/users/workers`, config);
      setWorkers(workersRes.data);

      const workersByVillageRes = await axios.get(`${BASE_URL}/api/users/workers-by-village`, config);
      setWorkersByVillage(workersByVillageRes.data);

      const complaintsByVillageRes = await axios.get(`${BASE_URL}/api/complaints/by-village`, config);
      setComplaintsByVillage(complaintsByVillageRes.data);

    } catch (err) {
      console.error(err);
      setError('Failed to load data. Make sure you are logged in as an Admin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  
  const handleAssign = async (complaintId, workerId) => {
    if (!workerId) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/api/complaints/${complaintId}/assign`,
        { workerId },
        { headers: { 'x-auth-token': token } }
      );
      fetchAllData();
      alert('Complaint assigned successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to assign complaint.');
    }
  };
  
  const handleRemoveWorker = async (workerId) => {
    const removalKey = prompt("Enter the secure removal key:");
    if (!removalKey) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/users/remove-worker/${workerId}`, {
        headers: { 'x-auth-token': token },
        data: { removalKey }
      });
      fetchAllData();
      alert('Worker removed successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Failed to remove worker.');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading dashboard...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 my-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Analytics + Workers by Village */}
        <div className="lg:col-span-1 space-y-6">
          <Analytics />

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Workers by Village ({workers.length})</h3>
            <ul className="space-y-4">
              {workersByVillage.length > 0 ? (
                workersByVillage.map((group) => (
                  <li key={group.village}>
                    <h4 className="font-bold text-lg text-gray-800">
                      {group.village} ({group.count})
                    </h4>
                    <ul className="pl-4 mt-2 space-y-1">
                      {group.workers.map(worker => (
                        <li 
                          key={worker._id} 
                          className="text-gray-600 flex justify-between items-center"
                        >
                          {worker.name} ({worker.phone})
                          <button
                            onClick={() => handleRemoveWorker(worker._id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No workers found in villages.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Right Column: Complaints by Village */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">All Complaints by Village</h3>
          {complaintsByVillage.length > 0 ? (
            <div className="space-y-6">
              {complaintsByVillage.map((group) => (
                <div key={group.village}>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{group.village}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {group.complaints.map(complaint => (
                      <div
                        key={complaint._id}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
                      >
                        <Link to={`/complaints/${complaint._id}`} className="block">
                          <h3 className="text-xl font-semibold hover:text-blue-600">{complaint.title}</h3>
                        </Link>
                        <p className={`mt-2 font-semibold ${
                          complaint.status === 'Open' ? 'text-red-600' :
                          complaint.status === 'In Progress' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          Status: {complaint.status}
                        </p>

                        {complaint.status === 'Open' && (
                          <div className="mt-4">
                            <select
                              onChange={(e) => handleAssign(complaint._id, e.target.value)}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="">Assign to...</option>
                              {workers.map(worker => (
                                <option key={worker._id} value={worker._id}>{worker.name}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No complaints found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;