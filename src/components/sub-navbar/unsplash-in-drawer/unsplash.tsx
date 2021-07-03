import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';
import { updateBoardDetail } from '@/src/slices/board';
import { useDispatch } from 'react-redux';
import { Box, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

const Unsplash = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const unsplash = createApi({ accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API });

  useEffect(() => {
    async function fetchImages() {
      await findImages();
    }

    fetchImages();
  }, []);

  const findImages = async (value = 'nature') => {
    setIsLoading(true);
    const images = await unsplash.search.getPhotos({
      query: value,
      page: currentPage,
      perPage: 10,
      orientation: 'landscape'
    });

    setImages(images.response.results);
    setIsLoading(false);
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    const imagesSet = await unsplash.search.getPhotos({
      query: value || 'nature',
      page: currentPage + 1,
      perPage: 10,
      orientation: 'landscape'
    });

    setCurrentPage(currentPage + 1);

    const response = imagesSet.response.results;
    const sumAllImages = images.concat(response);
    setImages(sumAllImages);

    setIsLoading(false);
  };

  const handleImageClick = async (imageURL) => {
    const data = {
      type: 'backgroundImage',
      value: imageURL
    };

    await dispatch(updateBoardDetail(data));
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
      <Box display="flex" justifyContent="center" mt="20px">
        <Button
          onClick={loadMoreImages}
          size="xs"
          isLoading={isLoading}
          loadingText="Loading Images...">
          Load more
        </Button>
      </Box>
    </>
  );
};

export default Unsplash;
