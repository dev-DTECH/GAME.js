res =document.getElementById("res");
Canvas =document.getElementById("display");

Canvas.width=window.innerWidth*(res.value/100);
Canvas.height=window.innerHeight*(res.value/100);



// if(window.innerHeight>window.innerWidth){
//     Canvas.width=window.innerWidth*(res.value/100);
//     Canvas.height=window.innerWidth*(res.value/100);
// }
// else{
//     Canvas.width=window.innerHeight*(res.value/100);
//     Canvas.height=window.innerHeight*(res.value/100);
// }

function resize()
{
            Canvas.width=window.innerWidth*(res.value/100);
        Canvas.height=window.innerHeight*(res.value/100);

    // if(window.innerHeight>window.innerWidth){
    //     Canvas.width=window.innerWidth*(res.value/100);
    //     Canvas.height=window.innerWidth*(res.value/100);
    // }
    // else{
    //     Canvas.width=window.innerHeight*(res.value/100);
    //     Canvas.height=window.innerHeight*(res.value/100);
    // }



// camera.aspect = Canvas.width / Canvas.height;
// // After making changes to aspect
// camera.updateProjectionMatrix();
// renderer.setSize(Canvas.width, Canvas.height);
}


window.addEventListener('resize', resize, false);