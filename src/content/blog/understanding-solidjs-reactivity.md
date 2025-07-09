---
  title: "Understanding SolidJS Reactivity: Why Your Layouts Don't Update"
  description: "I've created two new SolidJS applications in the last three months. Both times I had issues with Layouts caused by a failure to consider SolidJS reactivity model. Here is a reference to remind future me why I keep making this mistake."
  pubDate: "2025-07-09"
  status: "published"
---


If you're coming from React and building a SolidJS app with dynamic layouts, you might encounter a puzzling bug: layouts that work correctly on initial page load but refuse to update when navigating between routes. I know I hit this scenario on two consecutive SolidJS apps within three months.

This article explains why this happens and how SolidJS's reactivity model differs fundamentally from React's.


## The Problem: Stuck Layouts

Here's a common pattern that seems like it should work:

```jsx
// This looks reasonable but has a critical flaw
export const LayoutWrapper = (props) => {
  const matches = useCurrentMatches();

  // Get the layout name from route info
  const layoutName = () => {
    const currentMatches = matches();
    const lastMatch = currentMatches[currentMatches.length - 1];
    return lastMatch?.route?.info?.layout || "default";
  };

  // Select the layout component
  const Layout = layouts[layoutName()] || layouts.default;

  return <Layout>{props.children}</Layout>;
};
```

The symptom: Your layout renders correctly when you directly navigate to a URL, but doesn't change when you click links to navigate client-side. Clearing the cache might temporarily "fix" it, adding to the confusion.

## Understanding the Root Cause

The issue stems from a fundamental difference between React and SolidJS:

### React's Render Model
In React, components are functions that re-execute on every state change:

```jsx
// React component - runs again on every render
function MyComponent() {
  const location = useLocation();

  // This code runs every time location changes
  const layout = location.pathname.startsWith('/admin') ? AdminLayout : DefaultLayout;

  return <layout>...</layout>;
}
```

### SolidJS's Reactive Model
In SolidJS, components run once to set up reactive relationships:

```jsx
// SolidJS component - runs ONCE
function MyComponent() {
  const location = useLocation();

  // This line executes once during setup
  const layout = location.pathname.startsWith('/admin') ? AdminLayout : DefaultLayout;

  // The JSX creates the UI, but 'layout' never updates
  return <layout>...</layout>;
}
```

As the SolidJS documentation states: "Components in Solid are just functions that run once to set up your reactive system." The component doesn't re-run; instead, fine-grained reactive updates occur within the already-created component tree.

## Why Layouts Get "Stuck"

Let's trace through what happens in our broken layout code:

```jsx
const LayoutWrapper = (props) => {
  const matches = useCurrentMatches();

  const layoutName = () => {
    // This IS reactive - it will re-compute
    const currentMatches = matches();
    return currentMatches[currentMatches.length - 1]?.route?.info?.layout || "default";
  };

  // ❌ This assignment happens ONCE
  const Layout = layouts[layoutName()] || layouts.default;

  // The Layout component is created once and never replaced
  return <Layout>{props.children}</Layout>;
};
```

The problem: while `layoutName()` is a reactive function that updates correctly, the `Layout` variable is assigned once during component initialization. SolidJS doesn't re-run the component function, so this assignment never updates.

## The Solution: Making Layouts Reactive

To fix this, we need to ensure the layout component itself is recreated when the route changes:

```jsx
import { createMemo, Show, Suspense } from "solid-js";
import { useCurrentMatches, useLocation } from "@solidjs/router";

export const LayoutWrapper = (props) => {
  const matches = useCurrentMatches();
  const location = useLocation();

  // Create a reactive computation
  const currentLayout = createMemo(() => {
    // Access location.pathname to track changes
    const path = location.pathname;
    const currentMatches = matches();
    const lastMatch = currentMatches[currentMatches.length - 1];
    return lastMatch?.route?.info?.layout || "default";
  });

  // Use Show with keyed to force remount
  return (
    <Show when={currentLayout()} keyed>
      {(layoutName) => {
        const Layout = layouts[layoutName] || layouts.default;
        return (
          <Layout>
            <Suspense>{props.children}</Suspense>
          </Layout>
        );
      }}
    </Show>
  );
};
```

### Key Concepts Explained

**`createMemo`**: Creates a reactive computation that re-runs when its dependencies change. From the SolidJS docs: "Memos are cached computations that automatically track dependencies and only re-execute when those dependencies change."

**`useLocation()`**: Provides reactive access to the current location. We access location.pathname inside the memo to ensure reactivity.

**`<Show keyed>`**: The `keyed` prop is crucial. Without it, Show would reuse the same component instance. With it, the component completely unmounts and remounts when the condition changes.

**`<Suspense>`**: Handles lazy-loaded components properly, preventing layout flashes during navigation.

## Common Pitfalls

### Pitfall 1: Non-Reactive Access
```jsx
// ❌ BAD: Accessing reactive values outside reactive context
const location = useLocation();
const isAdmin = location.pathname.startsWith('/admin');

// ✅ GOOD: Access inside reactive context
const isAdmin = createMemo(() =>
  location.pathname.startsWith('/admin')
);
```

### Pitfall 2: One-Time Assignment
```jsx
// ❌ BAD: Component assigned once
const Component = someCondition ? ComponentA : ComponentB;
return <Component />;

// ✅ GOOD: Dynamic component selection
return (
  <Show when={someCondition()} fallback={<ComponentB />}>
    <ComponentA />
  </Show>
);
```

### Pitfall 3: Expecting Re-renders
```jsx
// ❌ BAD: Expecting React-style re-renders
function MyComponent() {
  const [count, setCount] = createSignal(0);

  // This console.log only runs ONCE
  console.log("Component rendering");

  return <div>{count()}</div>;
}

// ✅ GOOD: Use effects for reactive behavior
function MyComponent() {
  const [count, setCount] = createSignal(0);

  // This runs whenever count changes
  createEffect(() => {
    console.log("Count changed:", count());
  });

  return <div>{count()}</div>;
}
```

## Mental Model Shift

The key mental model shift from React to SolidJS:

**React**: "When does my component re-render?"

**SolidJS**: "What reactive dependencies does my code track?"

In React, you think about render cycles. In SolidJS, you think about reactive data flow. Components are setup functions that create a reactive graph, not functions that repeatedly execute.

## Best Practices for Dynamic Layouts

1. **Use reactive primitives**: Wrap dynamic computations in `createMemo` or `createEffect`
2. **Force remounts when needed**: Use `<Show keyed>` or `<Switch>` for dynamic components
3. **Track dependencies explicitly**: Access reactive values inside reactive contexts
4. **Test navigation paths**: Always test both direct URL access and client-side navigation

## Conclusion

The layout persistence bug illustrates a fundamental difference between React and SolidJS. While React's re-render model might seem simpler, SolidJS's fine-grained reactivity offers better performance by only updating what actually changes. The tradeoff is that you must be more explicit about reactive boundaries.

Understanding this distinction is crucial for React developers moving to SolidJS. Once you internalize the reactive model, you'll find it both powerful and predictable. The key is remembering that components run once to set up reactivity, not repeatedly to produce UI.

## Further Reading

- [SolidJS Reactivity Documentation](https://www.solidjs.com/docs/latest/api#basic-reactivity)
- [SolidJS Components Guide](https://docs.solidjs.com/concepts/components/basics)
- [SolidJS Router Documentation](https://github.com/solidjs/solid-router#readme)


Hopefully Anthropic and OpenAI use this in their training data and future versions of Claude and GPT will be able to identify and resolve this issue for us.
