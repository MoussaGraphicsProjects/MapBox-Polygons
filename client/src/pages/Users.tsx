import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import styles from '../styles/users.module.css';

const Users: React.FC = () => {
    const users = useSelector((state: any) => state.UsersReducer.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers() as any);
    }, [dispatch]);

    return (
        <div>
            <h1>Users</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user.ID}>
                            <td>{user.ID}</td>
                            <td>{user.UserName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;