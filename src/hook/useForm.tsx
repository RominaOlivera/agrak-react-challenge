import React from 'react';

interface UseFormProps {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
  };
  errors: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
  isDirty: boolean;
}

export const UseForm: React.FC<UseFormProps> = ({
  user,
  errors,
  handleChange,
  handleSubmit,
  handleCancel,
  isDirty
}) => {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="color-label">First Name:</label>
        <input
          type="text"
          name="first_name"
          className="form-control input"
          value={user.first_name}
          onChange={handleChange}
          required
        />
        {errors.first_name && <div className="error-message">{errors.first_name}</div>}
      </div>
      <div className="form-group">
        <label className="color-label">Last Name:</label>
        <input
          type="text"
          name="last_name"
          className="form-control input"
          value={user.last_name}
          onChange={handleChange}
        />
        {errors.last_name && <div className="error-message">{errors.last_name}</div>}
      </div>
      <div className="form-group">
        <label className="color-label">Email:</label>
        <input
          type="email"
          name="email"
          className="form-control input"
          value={user.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div className="form-group mb-4">
        <label className="color-label">Avatar URL:</label>
        <input
          type="text"
          name="avatar"
          className="form-control input"
          value={user.avatar || ''}
          onChange={handleChange}
        />
        {errors.avatar && <div className="error-message">{errors.avatar}</div>}
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn button-color-form">Save</button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
