

import { Pencil, Trash2 } from 'lucide-react';
import '../styles/recent-statistics.css';

function RecentHealthStatistics({
  records,
  onEdit,
  onDelete,
}) {
  const sortedRecords = [...records].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <section className="recent-section">
      <h2 className="recent-title">Recent Health Statistics</h2>

      {sortedRecords.length === 0 ? (
        <div className="empty-records">
          <p>No health records yet.</p>
          <span>Click "+ Add data" to track your first day.</span>
        </div>
      ) : (
        <div className="records-list">
          {sortedRecords.map((record) => (
            <article className="health-record-card" key={record.id}>
              <div className="record-content">
                <h3>Date: {record.date}</h3>

                <p>Calories Intake = {record.caloriesIntake}</p>
                <p>Calories Burned = {record.caloriesBurned}</p>

                <p className="record-description">
                 Description: {record.description}
                </p>
              </div>

              <div className="record-actions">
                <button
                  type="button"
                  className="record-action edit-action"
                  onClick={() => onEdit(record)}
                  aria-label={`Edit record for ${record.date}`}
                  title="Edit record"
                >
                  <Pencil size={17} />
                </button>

                <button
                  type="button"
                  className="record-action delete-action"
                  onClick={() => onDelete(record.id)}
                  aria-label={`Delete record for ${record.date}`}
                  title="Delete record"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentHealthStatistics;
