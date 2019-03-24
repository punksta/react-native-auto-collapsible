// @flow
import * as React from "react";
import { Animated } from "react-native";
import type { LayoutEvent } from "react-native/Libraries/Types/CoreEventTypes";
import type { CompositeAnimation } from "react-native/Libraries/Animated/src/AnimatedImplementation";

type AnimationCreator = (
  animatedValue: Animated.Value,
  newHeight: number
) => CompositeAnimation;

type Props = {
  children?: React.Node,
  /**
   *   provide custom animation
   */
  resizeAnimation?: AnimationCreator
};

type State = {
  contentHeightReceived: boolean
};

export default class AutoCollapsible extends React.Component<Props, State> {
  static defaultProps: Props = {
    resizeAnimation: (animatedValue, newHeight) =>
      Animated.spring(animatedValue, {
        toValue: newHeight,
        duration: 200
      })
  };

  contentHeight: Animated.Value = new Animated.Value(0);

  state: State = {
    contentHeightReceived: false
  };

  onLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutEvent) =>
    this.setState(state => {
      if (!state.contentHeightReceived) {
        this.contentHeight.setValue(height);
        return {
          contentHeightReceived: true
        };
      } else {
        // $FlowFixMe defaultProps
        const animation: AnimationCreator = this.props.resizeAnimation;
        animation(this.contentHeight, height).start();
      }
    });

  render() {
    return (
      <Animated.View
        style={
          !this.state.contentHeightReceived
            ? {}
            : {
                height: this.contentHeight,
                overflow: "hidden"
              }
        }
      >
        <Animated.View
          style={
            !this.state.contentHeightReceived
              ? {}
              : {
                  left: 0,
                  width: "100%",
                  position: "absolute"
                }
          }
          onLayout={this.onLayout}
        >
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

export const AutoCollapsibleHOC = (wrapperProps?: Props) => <T>(
  BaseComponent: React.ComponentType<T>
): React.ComponentType<T> => {
  return (props: T) => (
    <AutoCollapsible {...wrapperProps}>
      <BaseComponent {...props} />
    </AutoCollapsible>
  );
};
