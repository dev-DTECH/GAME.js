# GAME.js

## designed by [DTECH](https://github.com/dev-DTECH)
    
> This is a game engine made in Javascript
---
> :warning: The documentation of this engine will be available from release 1.
---
<!-- ### **Classes**

1. ```javascript
   GAME.object(type, size, NoOfImages)
   ```

    |Parameters  |Describtion  |
    |---------|---------|
    |type     |A string variable that defines shape of the object it can be "square","circle" or a link of an image.|
    |size     |Length of the side in case of square,radius in case of circle.         |
    |NoOfImage|(Optional)Total of numer of image of the object.|

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
    |update|Boolean which defines weather the object is to be updated.|
    
1. ```javascript
   GAME.controller(keys)
   ```
   Parameters|Description
   -|-
   keys|It is a array of keycode of the keys that you want to implement in your game.
---
### **Functions**

1. ```javascript
    GAME.renderer(canvas,res);
    ```

    |Parameters  |Describtion  |
    |---------|---------|
    |canvas     |It takes HTML5 canvas element.|
    |res |It is the percentage of the window that the canvas will cover.|
1. ```javascript
    GAME.clear()
    ```
---
### **Objects**

1. ```javascript
    GAME.editor
    ```
    #### **Functions**
    1. ```javascript
        GAME.editor.open(ar)
        ```
        Parameters|Description
        -|-
        ar|It is a array that contains all the name of the `GAME.object`(s) that you want to edit.
    2. ```javascript
        GAME.editor.addpoint(x,y)
        ```
        Parameters|Description
        -|-
        x|X coordinate of the point to be added with respect to th e center of the `GAME.object`.
        y|Y coordinate of the point to be added with respect to th e center of the `GAME.object`.
    3. ```javascript
        GAME.editor.deletePoint(n)
        ```
        Parameters|Desciption
        -|-
        n|It is the index of element of the array `GAME.object.points[]` that is to be deleted.
    1. ```javascript
        GAME.edit(ob, ObjectName)
        ```
        Parameters|Describtion
        -|-
        ob|`GAME.object` that you want to edit.
        ObjectName|Name of the `GAME.object` that you want to edit.
    1. ```javascript
        GAME.editor.close()
        ```
    #### **Objects**
    1. ```javascript
        GAME.editor.object
        ```
    1. ```javascript
        GAME.editor.editing -->
        ```