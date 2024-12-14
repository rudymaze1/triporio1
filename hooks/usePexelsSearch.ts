import { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

const PEXELS_API_KEY = '3satdTolRWX49eBnFnbE5Y1PKAGNK1Aym9J4tpN5mBPJnkzzM6yNtED9'; // Replace with your actual Pexels API key, store in env variable



const usePexelsSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pexelsImages, setPexelsImages] = useState<PexelsPhoto[]>([]);
  const [loading2, setLoading2] = useState(false);
  const [isImageSearchModalVisible, setImageSearchModalVisible] = useState(false);

  const searchImages = async (query: string) => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search`,
        {
          params: {
            query,
            per_page: 20, // Set the number of results per page
            orientation:'landscape',
          },
          headers: {
            Authorization: `3satdTolRWX49eBnFnbE5Y1PKAGNK1Aym9J4tpN5mBPJnkzzM6yNtED9`, 
          },
        }
      );
      return response.data.photos; // Return the images from the API response
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Error', 'Please enter a search query.');
      return;
    }

    setLoading2(true); // Set loading to true before fetching images

    try {
      const images = await searchImages(searchQuery); // Fetch the images based on the search query
      setPexelsImages(images); // Update the state with the images
      setImageSearchModalVisible(true); // Show the modal after successful search
    } catch (error) {
      console.error('Error fetching images:', error);
      Alert.alert('Error', 'Failed to fetch images.');
    } finally {
      setLoading2(false); // Set loading to false once the request is done
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    pexelsImages,
    handleSearch,
    loading2,
    isImageSearchModalVisible,
    setImageSearchModalVisible,
  };
};

export default usePexelsSearch;