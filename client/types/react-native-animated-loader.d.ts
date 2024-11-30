declare module "react-native-animated-loader" {
  import React from "react";
  import { ViewStyle } from "react-native";

  export interface AnimatedLoaderProps {
    visible: boolean;
    overlayColor?: string;
    source: object; // Update with the correct type if known
    animationStyle?: ViewStyle;
    speed?: number;
  }

  const AnimatedLoader: React.FC<AnimatedLoaderProps>;
  export default AnimatedLoader;
}
