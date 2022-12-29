---
title: 'html'
excerpt: ''
coverImage: '/assets/covers/html.jpg'
ogImage:
  url: '/assets/covers/html.jpg'
---






- Progressive Enhancement



# ARIA
- Accessible Rich Internet Applications (ARIA)
    - ARIA is only used when HTML, CSS, and JavaScript can’t provide the solution for complex patterns and interactions.
    - Use HTML elements as they were designed to be used. 
    - Use CSS to enhance or complement the content provided by HTML
    - JavaScript lends behavior. It helps make standards-based HTML and CSS come alive. 

- Things to always consider
    1. Solve the problem with progressive enhancement (HTML, CSS, JS, ARIA).
    1. Use HTML elements as they were designed to be used to reinforce the meaning of the visual information on your webpage.
    1. Ensure link text is meaningful in and out of context.
    1. Links take users to a destination. Buttons perform changes in the UI. 
    1. Provide a text alternative for images.
    1. Provide keyboard accessibility for all interactive elements.
    1. Consider the focus path/tabbing order of interactive content.
    1. Accessible design systems help us improve and maintain accessibility in our digital properties.


We can start the process by:
- Identifying the core functionality.
- Using the most primitive code to provide this functionality.
- Enhancing that experience.


<header>
<nav>
<main>
<footer>

<section>
<article>
<aside>  -> complementary
<a href="">

- *AVOID* Ambiguous Structure (“<DIV> Soup”)
- Clear document structure benefits everyone
- To create a meaningful heading structure (h1, h2, h3, …h6) & heading level should match importance. 

## Buttons & links
- Add ARIA-LABEL to the button. Note this replaces the button text. This is one of the best use cases for ARIA.
    ```html
    <button aria="Add shoe to cart">Add to cart</button>
    ```
- Buttons perform changes in the UI, links redirect to a different site. So navigation elements should be a <a> and not a button
## Images
- Images, always use `alt-text`. If you don't it basically become a placeholder with no meaning for a visually impaired person.
    - `alt-text` provides the textual equivalent for anyone that can't see the image
    - Q: Purely Decorative (no need to alt-text) or Informative(add alt-text)?
## SVG
    - Add a <title> attribute nested within the <svg> element
    - These attributes hide the SVG and prevent focus from going inside the SVG.
        - Add aria-hidden=“true”
        - Add focusable=“false”
## Keyabor

## Focus indicator 
- Focus indicator helps indicate the current interactive control a customer is on or interacting with.
- One totally inaccessible focus indicator is the use of CSS outline:none to remove the visual focus indicator. 
    - For example: a {outline: none;}
- Think of Keyboard Focus Order

## Design System
- "A design system is a collection of reusable functional elements–components and patterns–guided by clear standards that product teams use to create a consistent experience across a range of products."








