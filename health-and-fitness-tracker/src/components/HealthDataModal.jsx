
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import '../styles/modal.css';

const INITIAL_FORM = {
  date: '',
  caloriesIntake: '',
  caloriesBurned: '',
  description: '',
};

function HealthDataModal({
  isOpen,
  onClose,
  onSubmit,
  editingRecord,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const isEditMode = Boolean(editingRecord);

  useEffect(() => {
    if (!isOpen) return;

    if (editingRecord) {
      setFormData({
        date: editingRecord.date || '',
        caloriesIntake: String(editingRecord.caloriesIntake ?? ''),
        caloriesBurned: String(editingRecord.caloriesBurned ?? ''),
        description: editingRecord.description || '',
      });
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [isOpen, editingRecord]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const intake = Number(formData.caloriesIntake);
    const burned = Number(formData.caloriesBurned);

    if (
      !formData.date ||
      formData.caloriesIntake.trim() === '' ||
      formData.caloriesBurned.trim() === '' ||
      !formData.description.trim() ||
      !Number.isFinite(intake) ||
      !Number.isFinite(burned) ||
      intake < 0 ||
      burned < 0
    ) {
      return;
    }

    onSubmit({
      ...formData,
      caloriesIntake: intake,
      caloriesBurned: burned,
      description: formData.description.trim(),
    });
  }

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="health-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="health-modal-title"
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <h2 id="health-modal-title">
          {isEditMode
            ? "Let's see what you want to change!"
            : 'How Much Net Calories did you take Today?'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="caloriesIntake">Calorie Intake:</label>
            <input
              id="caloriesIntake"
              name="caloriesIntake"
              type="number"
              min="0"
              step="1"
              placeholder="Enter Today's Calorie Intake"
              value={formData.caloriesIntake}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="caloriesBurned">Calorie Burned:</label>
            <input
              id="caloriesBurned"
              name="caloriesBurned"
              type="number"
              min="0"
              step="1"
              placeholder="Enter Today's Calorie Burned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Short Description:</label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter a short description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className="submit-button"
            >
              Submit
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default HealthDataModal;
