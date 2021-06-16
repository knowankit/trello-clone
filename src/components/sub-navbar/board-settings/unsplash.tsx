import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';
import { saveBoard, updateBoardDetail } from '@/src/slices/board';
import { useDispatch } from 'react-redux';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  Image
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
const Unsplash = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const unsplash = createApi({ accessKey: 'KrXomw6R-ONxYE9KGwBAPmmLRYT-NgSQVhgayIfQw8k' });
  useEffect(() => {
    console.log('api', process.env.UNSPLASH_API);
    async function fetchImages() {
      await findImages();
    }

    fetchImages();
  }, []);

  const findImages = async (value = 'nature') => {
    const images = await unsplash.search.getPhotos({
      query: value,
      page: currentPage,
      perPage: 10,
      orientation: 'landscape'
    });

    setImages(images.response.results);
  };

  // const loadMoreImages = async () => {
  //   const images = await unsplash.search.getPhotos({
  //     query: value,
  //     page: currentPage + 1,
  //     perPage: 10,
  //     orientation: 'landscape'
  //   });

  //   setCurrentPage(currentPage + 1);
  //   let imageClone = images;
  //   const sumAllImages = images.concat(images.response.results);
  //   setImages(sumAllImages);
  // };

  const handleImageClick = async (imageURL) => {
    const data = {
      type: 'backgroundImage',
      value: imageURL
    };
    await dispatch(updateBoardDetail(data));
    await dispatch(saveBoard());
  };

  return (
    <>
      <Box>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search Photos"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={() => findImages(value)}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box display="flex" flexWrap="wrap" marginTop="20px" justifyContent="center">
        {images.map((item, index) => {
          return (
            <Box
              key={index}
              role="button"
              cursor="pointer"
              backgroundImage={`url('${item.urls.small}')`}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              mr="10px"
              mb="10px"
              borderRadius="lg"
              height="150px"
              width="150px"
              src={item.urls.small}
              onClick={() => handleImageClick(item.urls.regular)}
            />
          );
        })}
      </Box>
      {/* <Button onClick={loadMoreImages}>Load more</Button> */}
    </>
  );
};

export default Unsplash;
