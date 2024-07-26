import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { fetchUsers, updateUser, User } from '../api/src/userApi';
import avatar from '../assets/avatar.png';
import Modal from './modal';
import useFormValidation from '../hook/useFormValidation';
import { UseForm } from '../hook/useForm';

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { errors, validateField, validateForm } = useFormValidation(user || { id: '', first_name: '', last_name: '', email: '', avatar: '' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const users = await fetchUsers();
        const foundUser = users.find(u => u.id === id);
        setUser(foundUser || null);
      }
    };
    fetchUser();
  }, [id]);

  const mutation = useMutation(
    (updatedUser: User) => {
      if (!id) throw new Error('User ID is missing');
      return updateUser(id, updatedUser);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        navigate('/');
      },
      onError: (error) => {
        setError((error as Error).message);
      }
    }
  );

  const formatName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const formatEmail = (email: string): string => {
    const [username, domain] = email.split('@');
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() + (domain ? '@' + domain.toLowerCase() : '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, [name]: value };
      validateField(name, value);
      setIsDirty(true);
      return updatedUser;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && user) {
      setShowConfirmModal(true);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelModal(true);
    } else {
      navigate('/');
    }
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    navigate('/');
  };

  const cancelCancel = () => {
    setShowCancelModal(false);
  };

  const confirmSave = () => {
    setShowConfirmModal(false);
    if (user) {
      const formattedUser = {
        ...user,
        first_name: formatName(user.first_name),
        last_name: formatName(user.last_name),
        email: formatEmail(user.email),
      };
      mutation.mutate(formattedUser);
    }
  };

  const cancelSave = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="container d-flex justify-content-center form-container">
      <div className="card">
        <div className="header text-center mt-5">
          <img
            src={user?.avatar || avatar}
            alt="User Avatar"
            className="rounded-circle avatar-form"
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title text-center text-form">Update User</h2>
          {user && (
            <UseForm
              user={user}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              isDirty={isDirty}
            />
          )}
        </div>
      </div>
      <Modal
        show={showCancelModal}
        confirmAction={confirmCancel}
        cancelAction={cancelCancel}
        isLoading={mutation.isLoading}
        title="Confirm Cancellation"
        body="You have unsaved changes. Are you sure you want to cancel?"
      />
      <Modal
        show={showConfirmModal}
        confirmAction={confirmSave}
        cancelAction={cancelSave}
        isLoading={mutation.isLoading}
        title="Confirm Save"
        body="Are you sure you want to save the changes?"
      />
      {error && <div className="alert alert-danger mt-4">{error}</div>}
    </div>
  );
};

export default UpdateUser;
