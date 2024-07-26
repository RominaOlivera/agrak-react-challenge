import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import { User } from '../api/src/userApi';

interface UserCardProps {
  user: User;
  onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => (
  <div key={user.id} className="list-group-item list-group-item-action flex-column align-items-start container">
    <div className="d-flex w-100 justify-content-between align-items-center">
      <img
        src={user.avatar || avatar}
        alt={user.first_name}
        className="rounded-circle avatar"
        onError={(e) => (e.currentTarget.src = avatar)}
      />
      <div className="user-details ml-3">
        <h5 className="mb-1">{user.first_name} {user.last_name}</h5>
        <p className="mb-1 text-muted">{user.email}</p>
      </div>
      <div className="ml-auto action-icons">
        <Link to={`/update/${user.id}`} className="p-2">
          <i className="bi bi-pencil"></i>
        </Link>
        <button onClick={() => onDelete(user.id)} className="btn btn-link p-2">
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  </div>
);

export default UserCard;
