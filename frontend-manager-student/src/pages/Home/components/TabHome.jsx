import BookCard from 'components/BookCard';
import CategoryCard from 'components/CategoryCard';
import Grid from 'components/Grid';
import Loading from 'components/Loading';
import NewsCard from 'components/NewsCard';
import Section, { SectionBody, SectionTitle } from 'components/Section';
import React from 'react';
import { Link } from 'react-router-dom';
import SlickSlider from 'react-slick';
import { mockDataEvents } from 'utils/dummy';

const TabHome = () => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          infinite: true,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Section>
        <SectionTitle subTitle={'Xem thêm'} left>
          Sự kiện & bảng tin
        </SectionTitle>
        <Grid col={2} gap={20}>
          <SectionBody>
            <Grid col={1} mdCol={2} smCol={1} gap={20}>
              <Link to="/category">
                <NewsCard
                  date={mockDataEvents[0].date}
                  name={mockDataEvents[0].name}
                  thumbnail={mockDataEvents[0].thumbnail}
                  desc={mockDataEvents[0].desc}
                />
              </Link>
            </Grid>
          </SectionBody>
          <SectionBody>
            <Grid col={1} mdCol={2} smCol={1} gap={20}>
              {mockDataEvents.map((item, index) => (
                <Link to="/category" key={index}>
                  <NewsCard
                    date={item.date}
                    horizontal
                    name={item.name}
                    thumbnail={item.thumbnail}
                    thumbnailSize={'sm'}
                    desc={'Xem thêm'}
                  />
                </Link>
              ))}
            </Grid>
          </SectionBody>
        </Grid>
      </Section>

      <Section>
        <SectionTitle subTitle={'Tất cả danh mục'} left>
          Danh mục nổi bật
        </SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {[
              {
                name: 'Nghệ thuật & nhiếp ảnh',
                icon: 'bx bx-images',
              },
              {
                name: 'Ẩm thực',
                icon: 'bx bx-restaurant',
              },
              {
                name: 'Tình cảm & lãng mạn',
                icon: 'bx bx-book-heart',
              },
              {
                name: 'Sức khỏe',
                icon: 'bx bx-plus-medical',
              },
            ].map((item, index) => (
              <Link to="/category" key={index}>
                <CategoryCard name={item.name} icon={item.icon} />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle subTitle={'Xem thêm'} route="/book/all">
          Tài liệu nổi bật
        </SectionTitle>
        <SectionBody>
          {/* <SlickSlider {...settings}>
            {mockDataBook.map((item, index) => (
              <BookCard key={index} img01={item.image01} name={item.title} slug={item.slug} author={item.author} />
            ))}
          </SlickSlider> */}
          <Loading />
        </SectionBody>
      </Section>
    </>
  );
};

export default TabHome;
