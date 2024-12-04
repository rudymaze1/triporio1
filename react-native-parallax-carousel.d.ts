declare module 'react-native-parallax-carousel' {
    import { ComponentType } from 'react';
    import { ViewStyle, ImageStyle, TextStyle } from 'react-native';
  
    interface ParallaxCarouselProps {
      data: any[];
      renderItem: (props: { item: any }) => JSX.Element;
      parallaxFactor?: number;
      itemWidth: number;
      sliderWidth: number;
      loop?: boolean;
      // Add more props as needed based on the documentation or your usage
    }
  
    const ParallaxCarousel: ComponentType<ParallaxCarouselProps>;
  
    export default ParallaxCarousel;
  }
  