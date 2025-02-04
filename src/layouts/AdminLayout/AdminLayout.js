import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateClubs, updateSelectedClub } from 'services/user/userSlice';
import { toast } from 'react-toastify';

import routes from 'routes';

import Footer from 'components/common/Footer';
import Header from 'components/admin/Header';
import AdminMenu from 'components/navigation/AdminMenu';
import Loading from 'components/common/Loading';

import { getClubs } from 'api/clubApi';
import { getToken, removeToken, setClubRole } from 'services/auth/tokenService';
import { decodeToken } from 'utils/auth';
import { logout } from 'api/authApi';

const AdminLayout = () => {
  const navigate = useNavigate();

  const { clubs, selectedClub } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);

  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  const fetchClubs = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error('No authentication');
        navigate(routes.auth.login);
      }
      const response = await getClubs();
      const clubs = response.data;
      if (clubs.length > 0) {
        dispatch(updateClubs(clubs));
        dispatch(updateSelectedClub(clubs[0]));
        setClubRole(clubs[0]?.userRole);
      } else {
        const portalRole = decodeToken(token).userRole;

        if (portalRole === 'AccountOwner') {
          navigate(routes.auth.setupClub);
        } else {
          navigate(routes.auth.findClubs);
        }
      }
    } catch (err) {
      console.log('[AdminLayout] Fetch Club error: ', err);
      if (err.status === 401) {
        console.log('token expired');
        logout();
        navigate(routes.auth.login);
      }
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    fetchClubs().then(() => {
      setLoading(false);
    });
  }, [fetchClubs]);

  useEffect(() => {
    if (isOpenedMenu) {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpenedMenu(false); // Close the menu if the click is outside
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpenedMenu]);

  const openMenu = () => {
    setIsOpenedMenu(true);
  };

  const closeMenu = () => {
    setIsOpenedMenu(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header openMenu={openMenu} club={selectedClub} />
      <Outlet />
      <div ref={menuRef}>
        <AdminMenu
          isOpened={isOpenedMenu}
          closeMenu={closeMenu}
          selectedClub={selectedClub}
          clubs={clubs}
        />
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
