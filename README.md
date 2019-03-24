# react-native-auto-collapsible
React-native view which automatically collapses or expands when content changes height.

<img src="https://raw.githubusercontent.com/punksta/react-native-auto-collapsible/master/example.gif" height="400" />

## purpose
Useful for lists of items with dynamic contents to avoid jumping on view height change

https://snack.expo.io/Sy0l5vruE - demo


## usage
1) install `npm install react-native-auto-collapsible --save` / `yarn add react-native-auto-collapsible`
2) use

```javascript
import AutoCollapsible from "react-native-auto-collapsible"

const render = (props) => (
    <AutoCollapsible>
        <MyComp {...props}/>
    </AutoCollapsible>
)
```

or as HOC
```javascript
import {AutoCollapsibleHOC} from  "react-native-auto-collapsible"

const CollapsibleMyComp = AutoCollapsibleHOC({})(MyComp);
```

## Props
- resizeAnimation - sets custom animation
```javascript
resizeAnimation = (animatedValue, newHeight) =>
      Animated.spring(animatedValue, {
        toValue: newHeight,
        duration: 200
      })
```



