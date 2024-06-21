import React, { useState } from 'react';
import { listUsers } from '../../data/Data';
import UserItem from '../userItem/UserItem';
import { Button } from 'react-bootstrap';

const Users = () => {
  const [users, setUser] = useState(listUsers);

  const deleteUser = (id) => {
    setUser(prevUser => prevUser.filter(user => user.id !== id));
  };
  const updateUser = (id, updateUser) => {
    setUser(prevUsers =>
      prevUsers.map(user => user.id === id ? { ...user, ...updateUser } : user)
    );
  };

  return (
    <div>
      <Button>AGREGAR USUARIO</Button>

      {users.length > 0 ? (
        users.map((user, index) => (
          <UserItem
            key={index}
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            password={user.password}
            role={user.role}
            onDeleteUser={deleteUser}
            onUpdateUser={updateUser}
          />
        ))
      ) : (
        <p>USUARIO NO ENCONTRADO</p>
      )}
    </div>
  )
}

export default Users