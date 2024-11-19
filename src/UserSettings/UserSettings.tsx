import React from 'react';

export default function UserSettings() {
    return (
        <div>
            <h1>User Settings</h1>

            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>

                <button>Save</button>
            </form>
        </div>
    );
}