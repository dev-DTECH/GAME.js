# GAME.js

## designed by [DTECH]()

> This is a game engine made in Javascript

### **Classes**

1. ```javascript
   GAME.object(type, size, NoOfImages);
   ```

    |Parameters  |Describtion  |
    |---------|---------|
    |type     |A string variable that defines shape of the object it can be "square","circle" or a link of an image|
    |size     |Length of the side in case of square,radius in case of circle.         |
    |NoOfImage|(Optional)Total of numer of image of the object|

    |Variables  |Describtion  |
    |---------|---------|
    |x|X coordinate of the object.|
    |y|Y coordinate of the object.|
    |vx|Velocity of object along x-axis.|
    |vy|Velocity of object along y-axis.|
    |ax|Accelaration of object along x-axis.|
    |ay|Accelaration of object along y-axis.|
    |size|Length of the side in case of square,radius in case of circle.|
    |colour|Colour square or circle.|
    |update|Boolean which defines weather the object is to be updated|
    
1. ```javascript
   GAME.controller();
   ```
       > [!NOTE]
    > Documentation of this class with be given after an update.

### **Functions**

1. ```javascript
    GAME.renderer(canvas,res);
    ```

    |Parameters  |Describtion  |
    |---------|---------|
    |canvas     |It takes HTML5 canvas element|
    |res |It is the percentage of the window that the canvas will cover|
    
