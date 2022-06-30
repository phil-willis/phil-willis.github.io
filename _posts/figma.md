---
title: 'figma'
excerpt: ''
coverImage: '/assets/covers/figma.jpg'
ogImage:
  url: '/assets/covers/figma.jpg'
---

# Overview of figma
- Figma is an online/desktop collaborative vector design editor & prototyping tool used mostly by web designers
- Left panel (layers & assets)
- right panel is dynamic based off of what you have selected



- Let's get some terms out of the way 
  - Wireframes
  - Lo-Fidelity
  - Hi Fidelity
  - Prototype
  - Layers
  - Components
  - Component Set
  - Auto-layout (frames and not rectangles)
  - Lorem ipsum
  - Raster/vector graphics
  - Typography



- Late commers
- Figma does did a fabulous job of helping to bridge the language that both designers and developers use to communicate


- Collaborative real-time
- Design/Prototype
- Version
- Feedbacks









- Component Sets uses `variants` which maps more closely to how they are used in code. For example a Button component:
  ```js
  <Button type="primary" size="large" icon="false" state="standard" />
  ```
- The variants options would be ["type","size","icon","state"]
- Variants are created with the `slash naming conventions` 
  ```
  Button / Small / Primary / Icon / Standard
  Button / Medium / Secondary / Icon / Disabled
  Button / large / Secondary / Icon / Hover
  Button / large / Secondary / No Icon / Pressed
  ```
- Making a Component Set, make sure you `slash label` your similar components and make a component out of all of them, then select all of them and in the right panel click the `combine as variant`. You should now see a purple dash line around your component set. Now in the right hand panel rename the properties







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