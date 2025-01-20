import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'services/auth/tokenService';
import routes from 'routes';

// import HomepageBanner from 'components/client/Homepage/HomepageBanner';
// import HomepageAbout from 'components/client/Homepage/HomepageAbout';
// import HomepagePricing from 'components/client/Homepage/HomepagePricing';
// import HomepageVideo from 'components/client/Homepage/HomepageVideo';
// import HomepageReady from 'components/client/Homepage/HomepageReady';

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate(routes.auth.login);
    } else {
      navigate(routes.admin.dashboard);
    }
  }, [navigate]);

  return null;
  // return (
  //   <>
  //     <HomepageBanner />
  //     <HomepageAbout />
  //     <HomepagePricing />
  //     <HomepageVideo />
  //     <HomepageReady />
  //   </>
  // );
};

export default Homepage;
