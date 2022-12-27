---
title: 'CSS'
excerpt: ''
coverImage: '/assets/covers/css.jpg'
ogImage:
  url: '/assets/covers/css.jpg'
---


# CSS



# Classnames
- The order of classes in the `attribute` is irrelevant. All the classes in the class attribute are applied equally to the element.
- What order do the style rules appear in your `.css` file. Whatever classes that come later in the file wins





# CSS Animations
- `Animation` is the change from one CSS style to another over time
- Every animation has at least 2 states, `start` and `finish`
- When the animation moves from start to finish state CSS will calculate the values in between, inbetweening or `tween` in computer science
- Example of an animation is having an element fade in from 0-1 over a duration of 60 seconds. When the animation happens CSS will calculate the opacity value for every frame rendered over 60 seconds. It will do it in a linear fashion opacity/time
- CSS also provides some timing functions `ease-in`, `ease-out` or you can define your own with bezier curves 
- The easiest way to animate something is to use the `transition` property. Below example will animate to a solid green when hovered:
  ```css
  .box {
    width: 200px;
    height: 200px;
    background-color: green;
  }
  #rad-box {
    opacity: 0.4;
    transition: opacity 200ms;
  }

  #rad-box:hover {
    opacity: 1;
  }
  ```
- `@keyframes` allows you to animate independent steps along the way

  ```css
  /* Define your animation*/
  @keyframes someAwesomeAnimation {
    from {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(-45deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  .rotate-box{
    animation: someAwesomeAnimation 5s; /* Use the animation you've defined above */
    animation-iteration-count: infinite; /* Will animate forever */
  }
  ```
