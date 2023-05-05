import BookCard from 'components/BookCard';
import CategoryCard from 'components/CategoryCard';
import Grid from 'components/Grid';
import Loading from 'components/Loading';
import NewsCard from 'components/NewsCard';
import Section, { SectionBody, SectionTitle } from 'components/Section';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SlickSlider from 'react-slick';
import { Get_All_Book_Student_Initial } from 'redux/student/book_slice/book_thunk';
import { Get_All_Category_Initial } from 'redux/student/category_slice/category_thunk';
import { mockDataEvents } from 'utils/dummy';

const TabHome = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
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

  // redux
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.all_categories?.element?.result);
  const bookList = useSelector((state) => state.book.all_books_list?.element?.result);

  useEffect(() => {
    Promise.all([dispatch(Get_All_Book_Student_Initial()), dispatch(Get_All_Category_Initial())]);
  }, []);

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
        <SectionTitle route={'/book/all'} subTitle={'Tất cả danh mục'} left>
          Danh mục nổi bật
        </SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {categoryList?.slice(0, 4)?.map((item, index) => (
              <Link to="/book/all" key={index}>
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
          <SlickSlider {...settings}>
            {bookList?.map((item, index) => (
              <BookCard key={index} img01={item.image_uri} name={item.name} slug={item.book_id} author={item.author} />
            ))}
          </SlickSlider>
        </SectionBody>
      </Section>
    </>
  );
};

export default TabHome;
