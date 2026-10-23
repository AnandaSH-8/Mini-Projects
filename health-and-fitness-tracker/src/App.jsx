import { useState } from "react";
import "./styles/dashboard.css";
import HealthDataModal from "./components/HealthDataModal";
import useHealthRecords from "./hooks/useHealthRecords";
import RecentHealthStatistics from "./components/RecentHealthStatistics";
import WeeklyHealthTrends from "./components/WeeklyHealthTrends";
import OverallData from "./components/OverallData";

function App() {
  const { records, addRecord, updateRecord, deleteRecord } = useHealthRecords();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  function openAddModal() {
    setEditingRecord(null);
    setIsModalOpen(true);
  }

  function openEditModal(record) {
    setEditingRecord(record);
    setIsModalOpen(true);
  }

  function handleModalSubmit(formData) {
    if (editingRecord) {
      updateRecord(editingRecord.id, formData);
    } else {
      addRecord(formData);
    }

    setIsModalOpen(false);
    setEditingRecord(null);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingRecord(null);
  }

  function handleDeleteRecord(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this health record?",
    );

    if (confirmed) {
      deleteRecord(id);
    }
  }

  return (
    <main className="app-container">
      <h1 className="app-title">Health And Fitness Tracker</h1>

      <section className="dashboard-top">
        <div className="add-data-panel">
          <h2>Update Today&#39;s Data</h2>
          <button
            className="add-data-button"
            type="button"
            onClick={openAddModal}
          >
            + Add data
          </button>
        </div>

        {records.length > 0 ? (
          <WeeklyHealthTrends records={records} />
        ) : (
          <p>No Data available</p>
        )}
      </section>

      <section className="dashboard-bottom">
        <RecentHealthStatistics
          records={records}
          onEdit={openEditModal}
          onDelete={handleDeleteRecord}
        />

        <OverallData records={records} />
      </section>

      <HealthDataModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        editingRecord={editingRecord}
      />
    </main>
  );
}

export default App;
