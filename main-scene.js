//Justin Chang
//UID: 504732893
//github: jchang12345
var use_mipMap2=false;
var use_mipMap1=true;




window.Cooking_Mama = window.classes.Cooking_Mama =
class Cooking_Mama extends Scene_Component
  { constructor( context, control_box )     // The scene begins by requesting the camera, shapes, and materials it will need.
      { super(   context, control_box );    // First, include a secondary Scene that provides movement controls:
        if( !context.globals.has_controls   ) 
          context.register_scene_component( new Movement_Controls( context, control_box.parentElement.insertCell() ) ); 

        context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,0,5 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );
        let c_transform = Mat4.translation([0,0,-10])
        context.globals.graphics_state.camera_transform = context.globals.graphics_state.camera_transform.times(c_transform)

        const r = context.width/context.height;
        context.globals.graphics_state.projection_transform = Mat4.perspective( Math.PI/4, r, .1, 1000 );
        const shapes = { 
                         // Kitchen cutting scene materials
                         //cylinder: new Subdivision_Sphere(), // for the knife's handle.
                         //board: new Cube() //for the cutting board, and the knife
                      
                       beef:      new Shape_From_File( "assets/food/beef.obj" ) ,
                       carrot:      new Shape_From_File( "assets/food/carrot.obj" ) ,
                       onion:      new Shape_From_File( "assets/food/onion.obj" ) ,
                       potato:      new Shape_From_File( "assets/food/potato.obj" ) ,





                       cube: new Cube_1(),
                       //allfood: new Shape_From_File("assets/food/foods.obj"),
                       }
        this.submit_shapes( context, shapes );
                              
                                     // Make some Material objects available to you:
        this.materials =
          { test:     context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ), { ambient:.2 } ),

                                // TODO:  Fill in as many additional material objects as needed in this key/value table.
                                //        (Requirement 1)
           



          beef:      context.get_instance(Phong_Shader).material(Color.of(0,0,.4,1), {ambient:0.8,specularity:0.8,diffusivity:0.25}) ,
           carrot:        context.get_instance(Phong_Shader).material(Color.of(.4,0,0,1), {ambient:0.3}) ,
           onion:        context.get_instance(Phong_Shader).material(Color.of(0,.4,0,1), {ambient:0.4}),
           potato:       context.get_instance(Phong_Shader).material(Color.of(0,.4,0,1), {ambient:0.3}) ,
           allfood:   context.get_instance(Phong_Shader).material(Color.of(0.3,0.3,0.3,1), {ambient:1}),

            phong: context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ) ),
            cuttingboard:      context.get_instance(Phong_Shader ).material( Color.of(0,0,0,1), {
             ambient: 1,
             texture: context.get_instance( "assets/cuttingboard.ico", use_mipMap2 )}
           ), 
            phong: context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ) ),
            scene1mama:      context.get_instance(Phong_Shader ).material( Color.of(0,0,0,1), {
             ambient: 1,
             texture: context.get_instance( "assets/scene1background.ico", use_mipMap2 )}
           ), 
            phong: context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ) ),
            scene3back:      context.get_instance(Phong_Shader ).material( Color.of(0,0,0,1), {
             ambient: 1,
             texture: context.get_instance( "assets/scene3background.ico", use_mipMap2 )}
           ), 
          };



//          this.scene6location=Mat4.identity();
 //         this.scene6location=this.scene6location.times(Mat4.translation(Vec.of(-1000,-1000,0)));
/*ALLLL SCENE  and OBJECT LOCATIONS HERE*/
          //this is scene 1 location. we put it close to x=-100
          this.scene1location=Mat4.identity();
          this.scene1location=this.scene1location.times(Mat4.translation(Vec.of(-100,0,0)));
          
          this.scene1backimage=this.scene1location;
          this.scene1backimage=this.scene1backimage.times(Mat4.scale(Vec.of(12,10,3)));
          //SCENE 1 OBJECTS BELOW



          //END SCENE1

                    //this is scene 2 location. we put it at x=100 y=100
          this.scene2location=Mat4.identity();
          this.scene2location=this.scene2location.times(Mat4.translation(Vec.of(100,100,0)));
                    //SCENE 2 OBJECTS BELOW



          //END SCENE2

          //this is scene 3 location. we put it close to origin for now
          this.scene3location=Mat4.identity();
          this.scene3location=this.scene3location.times(Mat4.translation(Vec.of(0,0,0)));

          //SCENE 3 OBJECTS BELOW

          this.beef=Mat4.identity();
          this.beef=this.beef.times(Mat4.translation(Vec.of(5,0,0)));

          this.carrot=Mat4.identity();
          this.carrot=this.carrot.times(Mat4.translation(Vec.of(5,5,0))).times(Mat4.rotation(Math.PI/2,Vec.of(0,1,0)));

          this.onion=Mat4.identity();
          this.onion=this.onion.times(Mat4.translation(Vec.of(0,0,0)))

          this.potato=Mat4.identity();
          this.potato =this.potato.times(Mat4.translation(Vec.of(-5,0,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));


          this.cuttingboard=Mat4.identity();
          this.cuttingboard=this.cuttingboard.times(Mat4.translation(Vec.of(0,0,-3)));
          this.cuttingboard=this.cuttingboard.times(Mat4.scale(Vec.of(8,3,1.5)));


          this.scene3backimage=this.scene3location;
          this.scene3backimage=this.scene3backimage.times(Mat4.translation(Vec.of(0,0,-13)));
          this.scene3backimage=this.scene3backimage.times(Mat4.scale(Vec.of(30,21,6))); //behind everything else


          //END SCENE3

          //scene 4 location somewhere in x=100

          this.scene4location=Mat4.identity();
          this.scene4location=this.scene4location.times(Mat4.translation(Vec.of(100,0,0)));
//SCENE 4 OBJECTS BELOW



          //END SCENE4

                    //scene 5 location somewhere in x=100

          this.scene5location=Mat4.identity();
          this.scene5location=this.scene5location.times(Mat4.translation(Vec.of(-100,-100,0)));
//SCENE 5 OBJECTS BELOW



          //END SCENE5

          //game mechanics
          this.restartflag=false;
          this.finished=false;
          this.startgame=false; //starts off at start scene until button push 1 to begin game, transition this to true to indicate we started
          this.scene2=false; //food drop scene flag
          this.scene3=false; //cutting scene flag
          this.scene4=false; // mixing scene flag
          this.scene5=false;
          this.score=0; //cumulative score 
          this.time=0; //global timer

          this.rank=0; //rank 0:F rank 1:D rank 2: C rank 3: B rank 4: A rank 5: S , so 6 ranks total




          //scene timers:
          this.scene2time=0;
          this.scene3time=0;
          this.scene4time=0;

          //prev scene states necessary
          this.prevscene=0; //this is a value from scene 1->4

          //finished scene mechanics
          this.finishedscene2=false;
          this.finishedscene3=false;
          this.finishedscene4=false;
          this.finishedscene5=false;



        this.lights = [ new Light( Vec.of( 5,-10,5,1 ), Color.of( 0,1,1,1 ), 100000 ) ];
      }
      startTime(t) //for each scene this is the timer. score should be adjusted at the end based on how well each task was performed
      {
        if(!this.scene2 &&!this.scene3 &&!this.scene4)
        {
          this.time=60-Math.trunc(t);//truncate to int
          this.prevscene=1;
        }

        if(this.scene2)
        {
                 if(this.prevscene!=2)
          {
            this.time=Math.trunc(t);
            this.prevscene=2;
          } 
          this.scene2time=60-Math.trunc(t-this.time); //should do something like turn it red when times up!
          if(this.scene2time<=0)
          {
            this.scene2time=0;
          }
        }

                if(this.scene3)
        {
                  if(this.prevscene!=3)
          {
            this.time=Math.trunc(t);
            this.prevscene=3;
          }
          this.scene3time=60-Math.trunc(t-this.time);
                    if(this.scene3time<=0)
          {
            this.scene3time=0;
          }
        }
                if(this.scene4)
        {
                 if(this.prevscene!=4)
          {
            this.time=Math.trunc(t);
            this.prevscene=4;
          }
          this.scene4time=60-Math.trunc(t-this.time);
                    if(this.scene4time<=0)
          {
            this.scene4time=0;
          }

        }

      }
       calculatescore()
        {
          //TODO: score calculations
        }
    make_control_panel()            // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
      { 
        this.key_triggered_button( "Start Game/Restart",     [ "1" ], () => 
          {
            this.restart();
            this.restartflag=true; //starts the game for first time.
            this.attached=()=>this.scene1location;
            this.scene1=true;
            if(this.scene1)
            {
              this.disableOtherScenes(1);  
            }
          }  );
        this.key_triggered_button( "(Scene 2) Food Drop Scene", [ "2" ], ()=> 
          {
            //this.scene2=!this.scene2;
            this.scene2=!this.scene2;
            this.attached = () => this.scene2location;
           // this.time=Math.trunc(t);//truncate to int

            if(this.scene2)
            {
              this.disableOtherScenes(2);
            }
          });


        this.key_triggered_button( "(Scene 3) Food Cutting Scene",  [ "3" ], () => 
          {
            //this.scene3=!this.scene3;
            this.scene3=!this.scene3;
           // this.time=Math.trunc(t);//truncate to int
            this.attached = () => this.scene3location;

            if(this.scene3) //and if conditions are met to transition flag 
            {
              this.disableOtherScenes(3);
            }
                        //this.disableOtherScenes(3);

          } );
        this.new_line();
        this.key_triggered_button( "(Score 4) Food Mixing Scene", [ "4" ], () => 
          {
            //this.scene4=!this.scene4;
              this.scene4=!this.scene4;
                          this.attached = () => this.scene4location;

            //  this.time=Math.trunc(t);//truncate to int

            if(this.scene4)
            {
              this.disableOtherScenes(4);
            }

          } ); this.new_line();
        this.key_triggered_button( "(Scene 5) Finished Product Scene", [ "5" ], () => 
          {
         //   this.scene5=!this.scene5;
                        this.scene5=!this.scene5;
                                    this.attached = () => this.scene5location;

            if(this.scene5)
            {
              this.disableOtherScenes(5);
            }

          } );

        this.new_line();

        this.key_triggered_button( "Move Left", [ "l" ], ()=> 
          {

            //MOVES THE KNIFE TO THE LEFT, or ROTATE CCW, or move basket to the left

         
          }); 
        this.key_triggered_button( "Move Right", [ "k" ], ()=> 
          {
            //MOVES THE KNIFE TO THE RIGHT, or ROTATE CW, or move basket to the right
          });
        this.key_triggered_button( "Perform Cut", [ "i" ], ()=> 
          {
            //KNIFE SCENE ONLY, performs a cut. 
          });

      }
      drawscene1(graphics_state)
      { //food dropping scene!

        this.shapes.cube.draw(graphics_state,this.scene1backimage,this.materials.scene1mama);

        //needs to do object collision detection

        //shadow

        //score accumulation logic
      }
      drawscene2(graphics_state)
      { //food dropping scene!

        this.shapes.cube.draw(graphics_state,this.scene2location,this.materials.test);

        //needs to do object collision detection

        //shadow

        //score accumulation logic
      }

      drawscene3(graphics_state)
      {
        //food cutting scene!
        this.shapes.beef.draw(graphics_state,this.beef,this.materials.beef); //camera this.attach can only stick onto like this.beef...
        this.shapes.carrot.draw(graphics_state,this.carrot,this.materials.carrot);
        this.shapes.onion.draw(graphics_state,this.onion,this.materials.onion);
        this.shapes.potato.draw(graphics_state,this.potato,this.materials.potato);

        //draw board

        this.shapes.cube.draw(graphics_state,this.cuttingboard,this.materials.cuttingboard);

        this.shapes.cube.draw(graphics_state,this.scene3backimage,this.materials.scene3back);


        //needs to do object collision detection and splitting object 

        //score accumulation logic

      }

      drawscene4(graphics_state)
      {
        //food mixing scene!
        this.shapes.cube.draw(graphics_state,this.scene4location,this.materials.test);

        //needs to give instruction and score accumulation
      }

      drawscene5(graphics_state)
      {
        //food final presentation scene!
        this.shapes.cube.draw(graphics_state,this.scene5location,this.materials.test);

      }


      disableOtherScenes(sceneN)
      {//disables everything execept scene that is passed in.
        if(sceneN==1)  //honestly should just use a control matrix lol too late
        {
          this.scene1=true;
          this.scene2=false;
          this.scene3=false;
          this.scene4=false;
          this.scene5=false;
        }
                if(sceneN==2)
        {
          this.scene1=false;
          this.scene2=true;
          this.scene3=false;
          this.scene4=false;
          this.scene5=false;
        }
                if(sceneN==3)
        {
          this.scene1=false;
          this.scene2=false;
          this.scene3=true;
          this.scene4=false;
          this.scene5=false;
        }
                if(sceneN==4)
        {
          this.scene1=false;
          this.scene2=false;
          this.scene3=false;
          this.scene4=true;
          this.scene5=false;
        }
                if(sceneN==5)
        {
          this.scene1=false;
          this.scene2=false;
          this.scene3=false;
          this.scene4=false;
          this.scene5=true;
        }
      }
      
//displays UI for score
      UI(graphics_state)
      {
            var score = document.getElementById("score");
            var time=document.getElementById("timer");
            var timeImg=document.getElementById("timeIMG");
            var deadclk=document.getElementById("deadtimeIMG");
            

            //this is dependent on which scene
            if(this.scene1)
            {
               //time.innerHTML=this.time;
               time.innerHTML=0;
            }
            if(this.scene2)
            {
               time.innerHTML=this.scene2time;
               timeImg.innerHTML = '<img src="assets/timer.ico"> </img>'.repeat(this.scene2time/12+1);//so 5 times
              deadclk.innerHTML = '<img src="assets/deadclock.ico"> </img>'.repeat(Math.max(0,1-this.scene2time));//so 1 times

            }
            if(this.scene3)
            {
               time.innerHTML=this.scene3time;

                timeImg.innerHTML = '<img src="assets/timer.ico"> </img>'.repeat(this.scene3time/12+1);//so 5 times
                deadclk.innerHTML = '<img src="assets/deadclock.ico"> </img>'.repeat(Math.max(0,1-this.scene3time));//so 1 times

            }
            if(this.scene4)
            {
               time.innerHTML=this.scene4time;
               timeImg.innerHTML = '<img src="assets/timer.ico"> </img>'.repeat(this.scene4time/12+1);//so 5 times
               deadclk.innerHTML = '<img src="assets/deadclock.ico"> </img>'.repeat(Math.max(0,1-this.scene4time));//so 1 times

            }


            score.innerHTML = this.score;
            //score.innerHTML = this.score;
            var finished = document.getElementById("gg");
            var sc1=document.getElementById("sc1");
            var sc2=document.getElementById("sc2");
            var sc3=document.getElementById("sc3");
            var sc3board=document.getElementById("sc3board");
            
            var sc4=document.getElementById("sc4");
            
            var sc5=document.getElementById("sc5");
            
            if(this.finished)
            {
                  
                  gg.innerHTML = "Game Over. Press [1] to restart";
            }
            else if(!this.finished)
            {
                  gg.innerHTML = "";
            }
            if(this.scene1)
            {
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              sc1.innerHTML="Default Reset Scene: To play, press 2 to advance to next scene, and at the end of each scene, proceed by pressing the number corresponding to next scenes. To advance to next scenes, you must finish each scene before the game will allow you to advance!";
              this.drawscene1(graphics_state);
              this.disableOtherScenes(1);
            }
            else if(!this.scene1)
            {
              sc1.innerHTML=""
            }

            else if(!this.scene2)
            {
              sc2.innerHTML="";
            }
            if(this.scene2)
            {
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              sc2.innerHTML="Food Dropping Scene Tutorial:";
              this.drawscene2(graphics_state);
              this.disableOtherScenes(2);
            }

            else if(!this.scene2)
            {
              sc2.innerHTML="";
            }
            
            if(this.scene3)
            {
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              sc3.innerHTML="Food Cutting Scene Tutorial:";
              //sc3board.innerHTML="<img src='/assets/cuttingboard.jpg' width='400' height='150'>";
              this.drawscene3(graphics_state);
              this.disableOtherScenes(3);
            }
            else if(!this.scene3)
            {
              sc3.innerHTML="";
              sc3board.innerHTML="";

            }
            
            if(this.scene4)
            {
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              sc4.innerHTML="Food Mixing Scene Tutorial:";
              this.drawscene4(graphics_state);
              this.disableOtherScenes(4);
            }

            else if(!this.scene4)
            {
              sc4.innerHTML="";
            }

          if(this.scene5)
            {
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              sc5.innerHTML="Finished Product!";
              this.drawscene5(graphics_state);             
              this.disableOtherScenes(5);
            }
            else if(!this.scene5)
            {
              sc5.innerHTML="";
            }
            
      }


//game restarting 
      restart()
      {
            if(this.startgame)
          {
                if(this.finished)
                {
                      this.score = 0;
                      this.time=0;
                      this.finished=false;
                    
  //                    this.sound.gameOver.currentTime = 0;
//                      this.sound.bgm.currentTime = 0;
                }
          }
          else
          {
              var element = document.getElementById("startS");
              element. parentNode.removeChild(element);
              this.startgame = true;
              this.finished = false;
          }
            
      }


      

    display( graphics_state )
      { graphics_state.lights = this.lights;        // Use the lights stored in this.lights.
        
        const t = graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;

        

        
        //this.shapes.allfood.draw(graphics_state,this.allfood,this.materials.allfood);
        // TODO:  Fill in matrix operations and drawing code to draw the solar system scene (Requirements 2 and 3)

        //graphics_state.lights = [ new Light(Vec.of(0,0,0,1),sun_color, 10**radius) ];

        //let planet_1_matrix = Mat4.identity();
        //planet_1_matrix = planet_1_matrix.times(Mat4.rotation(0.85*t, Vec.of(0,1,0)) ).times(Mat4.translation([5,0,0]))
        //planet_1_matrix = planet_1_matrix.times(Mat4.rotation(0.5*t, Vec.of(0,1,0)))
 
       
        this.UI(graphics_state);
         ///start counting time

        this.startTime(t);



        if (this.attached != undefined) {
          var desired = this.attached().times(Mat4.translation([1,1,15]))
          desired = Mat4.inverse(desired)
          desired = desired.map( (x,i) => Vec.from( graphics_state.camera_transform[i] ).mix( x, .3 ) )
          graphics_state.camera_transform = desired;
        }



   

      }

      //idk how to get this mother fucker to work.. or some form of help/text dialogue box...
     show_explanation( document_element )
    { document_element.innerHTML += `<p>This demo detects when some flying objects collide with one another, coloring them red when they do.  For a simpler demo that shows physics-based movement without objects that hit one another, see the demo called Inertia_Demo.
                                     </p><p>Detecting intersections between pairs of stretched out, rotated volumes can be difficult, but is made easier by being in the right coordinate space.  The collision algorithm treats every shape like an ellipsoid roughly conforming to the drawn shape, and with the same transformation matrix applied.  Here these collision volumes are drawn in translucent purple alongside the real shape so that you can see them.
                                     </p><p>This particular collision method is extremely short to code, as you can observe in the method \"check_if_colliding\" in the class called Body below.  It has problems, though.  Making every collision body a stretched sphere is a hack and doesn't handle the nuances of the actual shape being drawn, such as a cube's corners that stick out.  Looping through a list of discrete sphere points to see if the volumes intersect is *really* a hack (there are perfectly good analytic expressions that can test if two ellipsoids intersect without discretizing them into points, although they involve solving a high order polynomial).   On the other hand, for non-convex shapes a real collision method cannot be exact either, and is usually going to have to loop through a list of discrete tetrahedrons defining the shape anyway.
                                     </p><p>This scene extends class Simulation, which carefully manages stepping simulation time for any scenes that subclass it.  It totally decouples the whole simulation from the frame rate, following the suggestions in the blog post <a href=\"https://gafferongames.com/post/fix_your_timestep/\" target=\"blank\">\"Fix Your Timestep\"</a> by Glenn Fielder.  Buttons allow you to speed up and slow down time to show that the simulation's answers do not change.</p>`;
    }
show_explanation( document_element )
    { document_element.innerHTML += `<p>This demo detects when some flying objects collide with one another, coloring them red when they do.  For a simpler demo that shows physics-based movement without objects that hit one another, see the demo called Inertia_Demo.
                                     </p><p>Detecting intersections between pairs of stretched out, rotated volumes can be difficult, but is made easier by being in the right coordinate space.  The collision algorithm treats every shape like an ellipsoid roughly conforming to the drawn shape, and with the same transformation matrix applied.  Here these collision volumes are drawn in translucent purple alongside the real shape so that you can see them.
                                     </p><p>This particular collision method is extremely short to code, as you can observe in the method \"check_if_colliding\" in the class called Body below.  It has problems, though.  Making every collision body a stretched sphere is a hack and doesn't handle the nuances of the actual shape being drawn, such as a cube's corners that stick out.  Looping through a list of discrete sphere points to see if the volumes intersect is *really* a hack (there are perfectly good analytic expressions that can test if two ellipsoids intersect without discretizing them into points, although they involve solving a high order polynomial).   On the other hand, for non-convex shapes a real collision method cannot be exact either, and is usually going to have to loop through a list of discrete tetrahedrons defining the shape anyway.
                                     </p><p>This scene extends class Simulation, which carefully manages stepping simulation time for any scenes that subclass it.  It totally decouples the whole simulation from the frame rate, following the suggestions in the blog post <a href=\"https://gafferongames.com/post/fix_your_timestep/\" target=\"blank\">\"Fix Your Timestep\"</a> by Glenn Fielder.  Buttons allow you to speed up and slow down time to show that the simulation's answers do not change.</p>`;
    }




  }


// Extra credit begins here (See TODO comments below):

window.Ring_Shader = window.classes.Ring_Shader =
class Ring_Shader extends Shader              // Subclasses of Shader each store and manage a complete GPU program.
{ material() { return { shader: this } }      // Materials here are minimal, without any settings.
  map_attribute_name_to_buffer_name( name )       // The shader will pull single entries out of the vertex arrays, by their data fields'
    {                                             // names.  Map those names onto the arrays we'll pull them from.  This determines
                                                  // which kinds of Shapes this Shader is compatible with.  Thanks to this function, 
                                                  // Vertex buffers in the GPU can get their pointers matched up with pointers to 
                                                  // attribute names in the GPU.  Shapes and Shaders can still be compatible even
                                                  // if some vertex data feilds are unused. 
      return { object_space_pos: "positions" }[ name ];      // Use a simple lookup table.
    }
    // Define how to synchronize our JavaScript's variables to the GPU's:
  update_GPU( g_state, model_transform, material, gpu = this.g_addrs, gl = this.gl )
      { const proj_camera = g_state.projection_transform.times( g_state.camera_transform );
                                                                                        // Send our matrices to the shader programs:
        gl.uniformMatrix4fv( gpu.model_transform_loc,             false, Mat.flatten_2D_to_1D( model_transform.transposed() ) );
        gl.uniformMatrix4fv( gpu.projection_camera_transform_loc, false, Mat.flatten_2D_to_1D(     proj_camera.transposed() ) );
      }
  shared_glsl_code()            // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
    { return `precision mediump float;
              varying vec4 position;
              varying vec4 center;
      `;
    }
  vertex_glsl_code()           // ********* VERTEX SHADER *********
    { return `
        attribute vec3 object_space_pos;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_transform;

        void main()
        { 
            gl_Position = projection_camera_transform * model_transform * vec4( object_space_pos, 1);
            center = vec4(0,0,object_space_pos.z,1);
            position = vec4(object_space_pos,1);

        }`;           // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
    }
  fragment_glsl_code()           // ********* FRAGMENT SHADER *********
    { return `
        void main()
        { 
            gl_FragColor = vec4(0.8281,0.5664,0.4375,sin(distance(center, position)*25.5));
        }`;           // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
    }
}

window.Grid_Sphere = window.classes.Grid_Sphere =
class Grid_Sphere extends Shape           // With lattitude / longitude divisions; this means singularities are at 
  { constructor( rows, columns, texture_range )             // the mesh's top and bottom.  Subdivision_Sphere is a better alternative.
      { super( "positions", "normals", "texture_coords" );
        

                      // TODO:  Complete the specification of a sphere with lattitude and longitude lines
                      //        (Extra Credit Part III)

        const circle_points = Array( rows ).fill( Vec.of( 0,0,1 ) )
                                           .map( (p,i,a) => Mat4.rotation( i/(a.length-1) * Math.PI, Vec.of( 1,0,0 ) )
                                                    .times( p.to4(1) ).to3() );

        Surface_Of_Revolution.insert_transformed_copy_into( this, [ rows, columns, circle_points ] );     
      } }