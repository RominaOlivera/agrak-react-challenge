import React, { useState, useEffect } from 'react';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchUsers, User, deleteUser } from '../api/src/userApi';
import { useMutation } from 'react-query';
import UserCard from './userCard';
import Pagination from './pagination';
import Modal from './modal';


const Home: React.FC = () => {
  const queryClient = useQueryClient();

  const fetchUsersMock = async () => {

    return fetchUsers();
  };

  const { data, error, isLoading }: UseQueryResult<User[], unknown> = useQuery<User[]>('users', fetchUsersMock);

  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const mutation = useMutation((id: string) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
    onError: (error) => {
      alert(`Error: ${(error as Error).message}`);
    }
  });

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      mutation.mutate(selectedUserId);
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // PAGES
  const users: User[] = data ? [...data].sort((a, b) => a.first_name.localeCompare(b.first_name)) : [];
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  if (isLoading) return <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
    <span className="sr-only">Loading...</span>
  </div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="container mt-4">
      <div className="header-container d-flex justify-content-center align-items-center">
        <div className="w-100 text-center title-wrapper">
          <h1 className="title text-light">My user panel</h1>
        </div>
      </div>
      <div id="team" className="list-group">
        <div className='container d-flex justify-content-end mb-3'>
           <Link to="/create" className="btn button-color button-wrapper">
            <i className="bi bi-person-add"></i> CREATE
          </Link>
       </div>
      </div>
      <div id="team" className="list-group mb-5">
        {totalUsers > 0 ? (
          currentUsers.map(user => (
            <UserCard key={user.id} user={user} onDelete={handleDeleteClick} />
          ))
        ) : (
          <div className="no-users d-flex justify-content-center text-light">
            <h4>No users available.</h4>
          </div>
        )}
      </div>
      {totalPages > 1 && totalUsers > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
      <Modal
        show={showModal}
        confirmAction={confirmDelete}
        cancelAction={cancelDelete}
        isLoading={mutation.isLoading}
        confirmButtonClass="btn btn-danger"
        title="Confirm Deletion"
        body="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default Home;
