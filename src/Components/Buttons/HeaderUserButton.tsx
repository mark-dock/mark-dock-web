import axiosInstance from '../../Config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HeaderUserButton() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{ user_id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axiosInstance.get(`/user/info`);
      const data = await response.data;
      setUserInfo(data);
    };
    fetchUserInfo();
  }, []);

  const openUserSettings = () => {
    navigate('/usersettings');
  }

  return (
    <div className="flex items-center justify-between space-x-8">
      <button
        onClick={openUserSettings}
        className="flex items-center hover:bg-scheme-250 rounded-lg p-2 transition-colors duration-200">
        <span className="text-right mr-3">
          <p className="font-medium text-scheme-500">{userInfo?.name}</p>
          <p className="text-sm text-scheme-400">{userInfo?.email}</p>
        </span>
        <img src="/images/avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
      </button>
    </div>
  );
}
