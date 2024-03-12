## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

A component that extends from `Component` will re-render every time the component receives new props or state, regardless of whether the new props or state are different from the previous values. 
A component that extends from `PureComponent` will re-render just if the new props or state is different from the previous one. 
We need to be very carefully with that, because if the prop of the `PureComponent` is an object and you just change a value of it, without creating a new object reference, the component will not render again, and we could get an unwanted result.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

This is because of the context propagation. If we have 3 components `A > B > C` and we have a `shouldComponentUpdate` implementation on component `B`, that could affect component `C` if `B` is not re-rendered properly.

## 3. Describe 3 ways to pass information from a component to its PARENT.

1. Using Context API to share values between components on different three levels.
2. We can pass a function from `A` to `B` like `setValue` and call that function with the new values from component `B`.
3. Using third-party libraries like Redux for state management. We can share a single state on the whole app.

## 4. Give 2 ways to prevent components from re-rendering

1. We can use memoization to prevent re-rendering. It works like pure components but for functional components.
2. We can use pure components implementing `shouldComponentUpdate` with the desire logic to return true/false.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

In react, we should always return 1 single element. If we have multiple elements, we can wrap it into a `Fragment` like this:
```
<>
  <Node 1 />
  <Node 2 />
  <Node 3 />
</>
```
This works to maintain a semantic HTML and not add containers that we don't need.

This could break the app sometimes because Fragment does not add an actually DOM element, just a virtual DOM element. 
I have experienced errors using the AntDesign library since it internally deals with array nodes and the fragment does not exist on the DOM structure.


## 6. Give 3 examples of the HOC pattern.

1. HOC for authorization to protect components from unauthorized access and redirect the user to `401` pages.
2. HOC to show a loading spinner with the same look and feel on the whole app. We can pass a `isLoading` prop and render the spinner or the children.
3. HOC to reuse the context api pattern like i did it [here](https://github.com/JoaquinBeceiro/bills-tracker/blob/master/src/context/index.js).

## 7. What's the difference in handling exceptions in promises, callbacks and async…await?

In Promises, we have the method `catch` to handle exceptions. If we use callbacks or async/await, we need to use the `try/catch` structure. 
Personally I prefer using async/await to have cleaner code and avoid callback hell.

## 8. How many arguments does setState take and why is it async.

The setState takes 2 arguments, the state and an optional callback and its async because of performance. Behind the scenes, react could take a lot of states changes in 1 single render.


## 9. List the steps needed to migrate a Class to Function Component.

1. Replace the `class` by `function` 
2. Remove any class `extend`
3. We can use hooks like `useEffect` to replace any `componentDidMount` or `componentWillUnmount` implementation or others life cycle methods
4. Remove any constructor

## 10. List a few ways styles can be used with components.

If this refers to CSS styles, we can use inline styles, CSS modules and 3rd party libraries like Styled components, Material UI and Tailwind.

## 11. How to render an HTML string coming from the server

We can use `dangerouslySetInnerHTML` like I did it [here](https://github.com/JoaquinBeceiro/auto-complete/blob/89df1b6c282267c98f14bc6af1ab31fabb26feab/src/components/autoComplete/index.tsx#L91)