import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Image } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const BubbleEffect = () => {
  const bubbles = useRef([]);

 
  const createBubbles = () => {
    const items = [];
    for (let i = 0; i < 7; i++) {
      items.push(
        <Animatable.View
          key={i}
          ref={(ref) => (bubbles.current[i] = ref)}
          animation={{
            from: { translateY: 700, opacity: 1 }, 
            to: { translateY: 0, opacity: 0 }, 
          }}
          easing="ease-out"
          duration={4000}
          iterationCount="infinite"
          delay={i * 230} 
          style={styles.bubbleContainer}
        >
          <Image source={require('./assets/bongbong.png')} style={styles.bubble} />
        </Animatable.View>
      );
    }
    return items;
  };

  useEffect(() => {
    return () => {
      bubbles.current.forEach((bubble, index) => {
        Animated.parallel([
          Animated.timing(bubble, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
          bubble.fadeOut(1500),
        ]).start(() => {
          bubble.setNativeProps({ style: { display: 'none' } });
          bubbles.current.splice(index, 1);
        });
      });
    };
  }, []);

  return (
    <View style={styles.container}>
      {createBubbles().map((bubble, index) => (
        <React.Fragment key={index}>
          {React.cloneElement(bubble, {
            onAnimationEnd: () => {
              // Xử lý khi hiệu ứng kết thúc
              bubbles.current.splice(index, 1);
            },
          })}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  // bubbleContainer: {
  //   position: 'absolute',
  // },
  bubble: {
    width: 100,
    height: 170,
  },
 
});

export default BubbleEffect;