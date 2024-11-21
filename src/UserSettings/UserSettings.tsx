import { useState, useEffect } from 'react';
import axiosInstance from "../Config/axiosInstance";
import ManageOrgs from '../Components/ManageOrgs';


export default function UserSettings() {
    return (
        <div>
            <h1>User Settings</h1>

            <ManageOrgs />
        </div>
    );
}
