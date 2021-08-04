---
title: 'figma'
excerpt: 'a little bit of design'
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

# Overview of figma

# Tips

## One sided borders

- So currently you cannot add a border (stroke) to just one side of a rectangle
- There is a hack for it, using the `inner shadow` effect
  1. Create a rectangle and select it
  2. In the right-side panel add an `Effect`
  3. Change the `Drop shadow` to `inner shadow`
  4. Change the width by clicking the `sun icon` change the `blur` to `0`
  5. Change the x/y values depending on what side you want your border to show
    ![one-side-border.](/assets/blog/figma/one-side-border-x-y.png)
    ![one-side-border.](/assets/blog/figma/one-side-border.png)



# Figma Variants

## Creating a component set from components
- [Figma Variants](https://www.youtube.com/watch?v=y29Xwt9dET0&t=351s)
1. Have a Component Set with the `slash naming convention`
  e.g. 
    `Button / Large / Primary / No Icon / Pressed`
    `Button / Medium / Primary / No Icon / Pressed`
    `Button / Small / Secondary / Icon / Hover`
  - Components sets can only be create from components, [cmd][option][k]
2. Merge as Variant
  - Select all the Component Set
  - In the right property sidebar there will be an option to `Combine as Variants`
3. (optional) you can publish your component to a team library









# Workflows
1. Color palette
2. Typography
  - fonts and text sizes
3. 