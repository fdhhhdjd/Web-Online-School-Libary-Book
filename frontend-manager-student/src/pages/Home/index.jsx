//! COMPONENTS
import Helmet from 'components/Helmet';
import Slider from 'components/Slider/Slider';
import TabHome from './components/TabHome';

const Home = () => {
  return (
    <Helmet title="Trang chủ">
      <Slider
        slides={[
          'https://itc.edu.vn/Data/Sites/1/Banner/z3808283905781_681dab358770e28d1496b2c7bf4a0a7e.jpg',
          'https://itc.edu.vn/Data/Sites/1/Banner/z3808283892948_c9a110004b96d1ed63fb14faf8fa5fc3.jpg',
          'https://itc.edu.vn/Data/Sites/1/Banner/z3808283894038_e794c65b8037e3c1d278c59c89b11f27.jpg',
          'https://itc.edu.vn/Data/Sites/1/Banner/z3808283892263_29e7b01f7b643b96efa2712b470cf52d.jpg',
        ]}
        autoPlay
        timeOut={3000}
      />

      <TabHome />
    </Helmet>
  );
};

export default Home;
