# react-native-auto-collapsible
React-native view which automatically collapses or expands when content changes.

## purpose
Useful for lists of items with dynamic contents to avoid jumping on view height change

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


