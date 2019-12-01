//Justin Chang
//UID: 504732893
//github: jchang12345
var use_mipMap2=false;
var use_mipMap1=true;


var knifeXloc=5;
var knifeYloc=0;
var knifeZloc=3;

var potXloc=100;
var potYloc=99;
var potZloc=0;


var beef_color_def=0;



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

                       blade:      new Shape_From_File( "assets/knife/blade.obj" ) ,
                       handle:      new Shape_From_File( "assets/knife/handle.obj" ) ,

                       pot:      new Shape_From_File( "assets/knife/pot.obj" ) ,


                       cube: new Cube_1(),
                       //allfood: new Shape_From_File("assets/food/foods.obj"),
                       }
        this.submit_shapes( context, shapes );



                              
                                     // Make some Material objects available to you:
        this.materials =
          { test:     context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ), { ambient:.2 } ),

                                // TODO:  Fill in as many additional material objects as needed in this key/value table.
                                //        (Requirement 1)
           
            blade:   context.get_instance(Phong_Shader).material(Color.of(0.9,0.9,0.9,1), {ambient:1, diffusivity:1}),
           handle:   context.get_instance(Phong_Shader).material(Color.of(0.4,0.9,0.9,1), {ambient:1}),

          pot:   context.get_instance(Phong_Shader).material(Color.of(89/256,60/256,31/256,1), {ambient:1}),


         beef:      context.get_instance(Phong_Shader).material(Color.of(0,0,0,1), {ambient:1,specularity:0.8,diffusivity:0.25,texture: context.get_instance("assets/food/meat.png",true)}) ,
           
          h_beef:      context.get_instance(Phong_Shader).material(Color.of(0.5,0,0,1), {ambient:0.8,specularity:0.8,diffusivity:0.25}) ,


           carrot:        context.get_instance(Phong_Shader_Shadow).material(Color.of(215/255,114/255,44/255,1), {ambient:0.3}) ,
           onion:        context.get_instance(Phong_Shader_Shadow).material(Color.of(1,0.9,.9,1), {ambient:0.4}),
           potato:       context.get_instance(Phong_Shader).material(Color.of(0,0,0,1), {texture: context.get_instance("assets/food/potato.png",true),ambient:0.8,specularity:0.8,diffusivity:0.25}) ,
           allfood:   context.get_instance(Phong_Shader).material(Color.of(0.3,0.3,0.3,1), {ambient:1}),

            phong: context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ) ),
            cuttingboard:      context.get_instance(Phong_Shader ).material( Color.of(0,0,0,1), {
             ambient: 1,
             texture: context.get_instance( "assets/cuttingboard.ico", use_mipMap2 )}
           ), 
            phong: context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ) ),
            scene1mama:      context.get_instance(Phong_Shader ).material( Color.of(0,0,0,1), {
             ambient: 1,
             //texture: context.get_instance( "assets/scene1background.ico",true ),ambient:1
             }
           ), 
            phong: context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ) ),
            scene3back:      context.get_instance(Phong_Shader ).material( Color.of(0,0,0,1), {
             ambient: 1,
             texture: context.get_instance( "assets/scene3background.ico", use_mipMap2 )}
           ),

           phong: context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ) ),
            scene2back:      context.get_instance(Phong_Shader ).material( Color.of(0,0,0,1), {
             ambient: 1,
             texture: context.get_instance( "assets/scene2background.ico", use_mipMap2 )}
           ),  


                        shadow: context.get_instance( Shadow_Shader ).material()

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
          var rot=Mat4.rotation(Math.PI/2,Vec.of(0,1,0));

                    //this is scene 2 location. we put it at x=100 y=100
          this.scene2location=Mat4.identity();
          this.scene2location=this.scene2location.times(Mat4.translation(Vec.of(100,100,0)));






                    //SCENE 2 OBJECTS BELOW
          this.s2beef1=Mat4.identity();
          this.s2beef1=this.s2beef1.times(Mat4.translation(Vec.of(101,111,0)));

          this.s2carrot1=Mat4.identity();
          this.s2carrot1=this.s2carrot1.times(Mat4.translation(Vec.of(98,108,0))).times(Mat4.rotation(Math.PI/4,Vec.of(0,1,0))).times(rot);

          this.s2onion1=Mat4.identity();
          this.s2onion1=this.s2onion1.times(Mat4.translation(Vec.of(103,107,0)))

          this.s2potato1=Mat4.identity();
          this.s2potato1 =this.s2potato1.times(Mat4.translation(Vec.of(95,109,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));

          this.s2potato1_2=Mat4.identity();
          this.s2potato1_2 =this.s2potato1_2.times(Mat4.translation(Vec.of(105,101,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));


                    //SCENE 2 OBJECTS BELOW
          this.s2beef2=Mat4.identity();
          this.s2beef2=this.s2beef2.times(Mat4.translation(Vec.of(95,113,0)));

          this.s2carrot2=Mat4.identity();
          this.s2carrot2=this.s2carrot2.times(Mat4.translation(Vec.of(103,108,0))).times(Mat4.rotation(Math.PI/2,Vec.of(0,1,0)));

          this.s2onion2=Mat4.identity();
          this.s2onion2=this.s2onion2.times(Mat4.translation(Vec.of(101,110,0)))

          this.s2potato2=Mat4.identity();
          this.s2potato2 =this.s2potato2.times(Mat4.translation(Vec.of(95,109,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));

                    //SCENE 2 OBJECTS BELOW
          this.s2beef3=Mat4.identity();
          this.s2beef3=this.s2beef3.times(Mat4.translation(Vec.of(105,109,0)));

          this.s2carrot3=Mat4.identity();
          this.s2carrot3=this.s2carrot3.times(Mat4.translation(Vec.of(98,108,0))).times(Mat4.rotation(Math.PI/2,Vec.of(0,1,0)));

          this.s2onion3=Mat4.identity();
          this.s2onion3=this.s2onion3.times(Mat4.translation(Vec.of(101,110,0)))

          this.s2potato3=Mat4.identity();
          this.s2potato3 =this.s2potato3.times(Mat4.translation(Vec.of(95,109,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));




          this.scene2backimage=this.scene2location;
          this.scene2backimage=this.scene2backimage.times(Mat4.translation(Vec.of(0,0,-13)));
          this.scene2backimage=this.scene2backimage.times(Mat4.scale(Vec.of(30,21,6))); //behind everything else


                  this.reset_scene2_pos=false;
                  this.spawnfood1=false;
                  this.spawnfood2=false;
                  this.spawnfood3=false;

          //END SCENE2

          //this is scene 3 location. we put it close to origin for now
          this.scene3location=Mat4.identity();
          this.scene3location=this.scene3location.times(Mat4.translation(Vec.of(0,0,0)));

          //SCENE 3 OBJECTS BELOW

          this.beef=Mat4.identity();
          this.beef=this.beef.times(Mat4.translation(Vec.of(5,0,0)));

          this.carrot=Mat4.identity();
                      var rot=(Mat4.rotation(Math.PI/2,Vec.of(0,1,0)));
          this.carrot=this.carrot.times(Mat4.translation(Vec.of(5,5,0))).times(Mat4.rotation(Math.PI/2,Vec.of(0,1,0)));

          this.onion=Mat4.identity();
          this.onion=this.onion.times(Mat4.translation(Vec.of(0,0,0)))

          this.potato=Mat4.identity();
          this.potato =this.potato.times(Mat4.translation(Vec.of(-5,0,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));


         // this.pot2=Mat4.identity();
         // this.pot2=this.pot2.times(Mat4.translation(Vec.of(0,0,5)));
         // this.pot2=this.pot2.times(Mat4.scale(1.1,1.1,1));
          //this.pot2=this.pot2.times(Mat4.rotation(Math.PI,Vec.of(0,0,1)));



          this.cuttingboard=Mat4.identity();
          this.cuttingboard=this.cuttingboard.times(Mat4.translation(Vec.of(0,0,-3)));
          this.cuttingboard=this.cuttingboard.times(Mat4.scale(Vec.of(8,3,1.5)));


          this.scene3backimage=this.scene3location;
          this.scene3backimage=this.scene3backimage.times(Mat4.translation(Vec.of(0,0,-13)));
          this.scene3backimage=this.scene3backimage.times(Mat4.scale(Vec.of(30,21,6))); //behind everything else


          //END SCENE3

          //scene 4 location somewhere in x=100

          this.scene4location=Mat4.identity();
          this.scene4location=this.scene4location.times(Mat4.translation(Vec.of(0,-100,0)));
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
          this.scene2time=15;
          this.scene3time=30;
          this.scene4time=30;

          //cut timer
          this.scene3cuttime=0;

          //prev scene states necessary
          this.prevscene=0; //this is a value from scene 1->4

          //finished scene mechanics
          this.finishedscene2=false;
          this.finishedscene3=false;
          this.finishedscene4=false;
          this.finishedscene5=false;

          this.firstgame=true;



        this.lights = [ new Light( Vec.of( 5,100,5,1 ), Color.of( 248/256,222/256,126/256,1 ), 100000 ) ];
      }
      startTime(t) //for each scene this is the timer. score should be adjusted at the end based on how well each task was performed
      {
        if(!this.scene2 &&!this.scene3 &&!this.scene4&&!this.scene5)
        {
          this.time=30-Math.trunc(t);//truncate to int
          this.prevscene=1;
        }

        if(this.scene2)
        {
                 if(this.prevscene!=2)
          {
            this.time=Math.trunc(t);
            this.prevscene=2;
          } 
          this.scene2time=15-Math.trunc(t-this.time); //should do something like turn it red when times up!
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
          this.scene3time=30-Math.trunc(t-this.time);
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
          this.scene4time=30-Math.trunc(t-this.time);
                    if(this.scene4time<=0)
          {
            this.scene4time=0;
          }

        }
        if(this.scene5)
        {
          this.prevscene=5;

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
           
            if(this.prevscene==5 ||this.firstgame)
            {
              this.firstgame=false;
              this.restart();
              this.restartflag=true; //starts the game for first time.
              this.attached=()=>this.scene1location;
              this.scene1=true;
              this.score=0;
              if(this.scene1)
              {
                this.disableOtherScenes(1);  
              }
           }
          }  );
        this.key_triggered_button( "(Scene 2) Food Drop Scene", [ "2" ], ()=> 
          {
            //this.scene2=!this.scene2;
            if(this.prevscene!=1)
            {

            }
            else if(this.prevscene==1)
            {
              this.scene2=!this.scene2;
              this.attached = () => this.scene2location;
             // this.time=Math.trunc(t);//truncate to int

              if(this.scene2)
              {
                this.disableOtherScenes(2);

              }
            }
          });


        this.key_triggered_button( "(Scene 3) Food Cutting Scene",  [ "3" ], () => 
          {
            //this.scene3=!this.scene3;
                         // this.finishedscene2=true;
            if(this.prevscene==2)
            {
              this.scene3=!this.scene3;
             // this.time=Math.trunc(t);//truncate to int
              this.attached = () => this.scene3location;

              if(this.scene3) //and if conditions are met to transition flag 
              {
                this.disableOtherScenes(3);
              }
            }
                        //this.disableOtherScenes(3);

          } );
        this.new_line();
        this.key_triggered_button( "(Score 4) Food Mixing Scene", [ "4" ], () => 
          {
            //this.scene4=!this.scene4;
            if(this.prevscene==3)
            {
              this.scene4=!this.scene4;
              this.attached = () => this.scene4location;
            

            //  this.time=Math.trunc(t);//truncate to int

              if(this.scene4)
              {
                this.disableOtherScenes(4);
              }
           }

          } ); this.new_line();
        this.key_triggered_button( "(Scene 5) Finished Product Scene", [ "5" ], () => 
          {
         //   this.scene5=!this.scene5;
            if(this.prevscene==4)
            {
              this.scene5=true;
              this.attached = () => this.scene5location;

              if(this.scene5)
              {
                this.disableOtherScenes(5);
              }
            }
            

          } );

        this.new_line();

        this.key_triggered_button( "Move Left", [ "g" ], ()=> 
          {

            //MOVES THE KNIFE TO THE LEFT, or ROTATE CCW, or move basket to the left
            if(knifeXloc>0 &&this.scene3 &&this.scene3time!=0)
            {
              knifeXloc=knifeXloc-1;
            }

            if(potXloc>90 &&this.scene2 &&this.scene2time!=0)
            {
              potXloc=potXloc-1;
            }
          }); 
        this.key_triggered_button( "Move Right", [ "j" ], ()=> 
          {
            //MOVES THE KNIFE TO THE RIGHT, or ROTATE CW, or move basket to the right
            if(knifeXloc<9 &&this.scene3&&this.scene3time!=0)
            {
              knifeXloc=knifeXloc+1;
            }
            if(potXloc<109 &&this.scene2&&this.scene2time!=0)
            {
              potXloc=potXloc+1;
            }
          });
        this.key_triggered_button( "Perform Cut", [ "h" ], ()=> 
          {
            //KNIFE SCENE ONLY, performs a cut. 
            if(knifeZloc>0 &&this.scene3&&this.scene3time!=0)
            {

            knifeZloc=knifeZloc-3;
            }            //timer.start();
            //setTimeout(timer.stop(),1000);
            //knifeZloc=knifeZloc+3;
          });
        this.key_triggered_button("Pull cut back", ["y"],()=>
        {
          if(knifeZloc<6 &&this.scene3 &&this.scene3time!=0)
          {
            knifeZloc=knifeZloc+3;        
          } 
        }
        );

      }
      check_collision(graphics_state,t)
      {


//IF SCENE 3
        if(this.scene3)
        {
          if(knifeZloc>0)
          {
            this.stop3cuttime=t;
            //draw scene normally
            this.shapes.beef.draw(graphics_state,this.beef,this.materials.beef); //camera this.attach can only stick onto like this.beef...
          }
          else if(knifeZloc==0)
          {
            //collision so indicate it
            beef_color_def=1;
            //count 3 seconds
            //this.scene3cuttime=this.stop3cuttime;
            
              //wait 3 second
              if(this.scene3cuttime<this.stop3cuttime+1)
              {
                this.scene3cuttime=t;
                this.shapes.beef.draw(graphics_state,this.beef,this.materials.h_beef);//;({color: Color.of( .5,0,0, 1 ));
                //also can animate or change something aside from changing score.
              }
            else
            {
            this.score=this.score+500; //base score increase
            this.scene3cuttime=t;
            knifeZloc=knifeZloc+3; //pull it back up for them
            beef_color_def=0.3;

            }
          }
        }
        if(this.scene2)
        {
            //strategy: if any of the food falling is above 99 in y, then check if their x range is aligned with the x of pot.
            //upper and lower bnds for every single obj in this scene are this when checking obj collision
            var upperboundY=99.5;
            var lowerboundY=97.5;

            var boundX=1.5;
            //var rightboundX=1;
            console.log(this.s2beef3[0][3]);
            console.log(potXloc);
            if(this.s2beef1[1][3]>lowerboundY&&this.s2beef1[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2beef1[0][3])<boundX)
               {
                  this.score=this.score+600;
                   this.s2beef1=this.s2beef1.times(Mat4.translation(Vec.of(-1000,-1000,0)));

               }
            }
             if(this.s2beef2[1][3]>lowerboundY&&this.s2beef2[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2beef2[0][3])<boundX)
               {
                  this.score=this.score+500;

                  //remove right away.
                  this.s2beef2=this.s2beef2.times(Mat4.translation(Vec.of(-1000,-1000,0)));
               }
            }
            if(this.s2beef3[1][3]>lowerboundY&&this.s2beef3[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2beef3[0][3])<boundX)
               {
                  this.score=this.score+400;
                                    this.s2beef3=this.s2beef3.times(Mat4.translation(Vec.of(-1000,-1000,0)));

               }
            }
            if(this.s2potato1[1][3]>lowerboundY&&this.s2potato1[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2potato1[0][3])<boundX)
               {
                  this.score=this.score+500;
                                    this.s2potato1=this.s2potato1.times(Mat4.translation(Vec.of(-1000,-1000,0)));

               }
            }
                        if(this.s2potato1_2[1][3]>lowerboundY&&this.s2potato1_2[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2potato1_2[0][3])<boundX)
               {
                  this.score=this.score+1500;
                                    this.s2potato1_2=this.s2potato1_2.times(Mat4.translation(Vec.of(-1000,-1000,0)));

               }
            }
            if(this.s2potato2[1][3]>lowerboundY&&this.s2potato2[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2potato2[0][3])<boundX)
               {
                                    this.score=this.score+500;
                                                      this.s2potato2=this.s2potato2.times(Mat4.translation(Vec.of(-1000,-1000,0)));

;
               }
            }
            if(this.s2potato3[1][3]>lowerboundY&&this.s2potato3[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2potato3[0][3])<boundX)
               {
                                    this.score=this.score+600;
                                                      this.s2potato3=this.s2potato3.times(Mat4.translation(Vec.of(-1000,-1000,0)));

;
               }
            }
            if(this.s2onion1[1][3]>lowerboundY&&this.s2onion1[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2onion1[0][3])<boundX)
               {
                                    this.score=this.score+500;
                                     this.s2onion1=this.s2onion1.times(Mat4.translation(Vec.of(-1000,-1000,0)));

;
               }
            }
            if(this.s2onion2[1][3]>lowerboundY&&this.s2onion2[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2onion2[0][3])<boundX)
               {
                                    this.score=this.score+600;
                                                      this.s2onion2=this.s2onion2.times(Mat4.translation(Vec.of(-1000,-1000,0)));

;
               }
            }
            if(this.s2onion3[1][3]>lowerboundY&&this.s2onion3[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2onion3[0][3])<boundX)
               {
                                    this.score=this.score+400;
                                                      this.s2onion3=this.s2onion3.times(Mat4.translation(Vec.of(-1000,-1000,0)));

;
               }
            }
            if(this.s2carrot1[1][3]>lowerboundY&&this.s2carrot1[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2carrot1[0][3])<boundX)
               {
                                    this.score=this.score+400;
                                                      this.s2carrot1=this.s2carrot1.times(Mat4.translation(Vec.of(-1000,-1000,0)));

;
               }
            }
            if(this.s2carrot2[1][3]>lowerboundY&&this.s2carrot2[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2carrot2[0][3])<boundX)
               {
                                    this.score=this.score+500;
                                    this.s2carrot2=this.s2carrot2.times(Mat4.translation(Vec.of(-1000,-1000,0)));

;
               }
            }
            if(this.s2carrot3[1][3]>lowerboundY&&this.s2carrot3[1][3]<upperboundY)
            {
               if(Math.abs(potXloc-this.s2carrot3[0][3])<boundX)
               {
                                    this.score=this.score+500;
                                    this.s2carrot3=this.s2carrot3.times(Mat4.translation(Vec.of(-1000,-1000,0)));

;
               }
            }

        }



      }
      
      
      drawscene1(graphics_state)
      { //empty background img scene.

        
      }
      rotate_drop(graphics_state,t)
      {
           






             //spawn_food(graphics_state,t);

             //if(this.reset_scene2_pos)
             //{
              //this.reset_scene2_pos=false;
              //need to reset t
              //t=t-4;
             //}
             if(this.scene2)
             {
               //if(this.scene2time%6!=0) //every 4 seconds, spawn food
               {
                 //reset it
                  //this.s2beef1=this.s2beef1.times(Mat4.translation(Vec.of(0,0.1,0)));

                //  this.reset_position_of_food();

                //WAVE 1
                if(this.scene2time==15)
                {
                  this.spawnfood1=true;
                }
                if(this.spawnfood1)
                {
                  this.spawn_food1(t);
                }
                
                //WAVE 2
                if(this.scene2time==11)
                {
                 this.spawnfood2=true;
                }
                if(this.spawnfood2)
                {
                                   this.spawn_food2(t);
                }
                //WAVE 3
                if(this.scene2time==6)
                {
                  this.spawnfood3=true;
                }
                if(this.spawnfood3)
                {
                                    this.spawn_food3(t);
                }
               }
             }
      }
      spawn_food1(t)
      {
                     //object=object.times(fall).times(rotate).times(rotatey);
            var topTrans = (Mat4.translation(Vec.of(-10,20,0))); //translate by this to be at top


            var rotateM;

             let maxAngle = (-1)*.2*Math.PI;
             let angle = maxAngle/2 + (maxAngle/2) * Math.sin(0.0008*t);
             rotateM = Mat4.rotation(0.01*angle, Vec.of(0,0,1));
             let rotateyM = Mat4.rotation(angle, Vec.of(0,1,0));
             let fallM = Mat4.translation([0,-0.02*t-(0.68*Math.pow(0.02*t,2)),0.1]);
             //let ifall = Mat4.translation([0,+0.1*(t-2)+(0.68*Math.pow(0.1*(t-2),2)),-0.1]);
             this.s2beef1=this.s2beef1/*.times(ifall)*/.times(fallM).times(rotateM).times(rotateyM);

             this.s2onion1=this.s2onion1.times(fallM).times(rotateM).times(rotateyM);

             this.s2carrot1=this.s2carrot1.times(fallM).times(rotateM).times(rotateyM);
             this.s2potato1=this.s2potato1.times(fallM).times(rotateM).times(rotateyM);
                          this.s2potato1_2=this.s2potato1_2.times(fallM).times(rotateM).times(rotateyM);


      }
            spawn_food2(t)
      {
                     //object=object.times(fall).times(rotate).times(rotatey);
            var topTrans = (Mat4.translation(Vec.of(-10,20,0))); //translate by this to be at top


            var rotateM;

             let maxAngle = (-1)*.2*Math.PI;
             let angle = maxAngle/2 + (maxAngle/2) * Math.sin(0.0008*t);
             rotateM = Mat4.rotation(0.01*angle, Vec.of(0,0,1));
             let rotateyM = Mat4.rotation(angle, Vec.of(0,1,0));
             let fallM = Mat4.translation([0,-0.02*t-(0.68*Math.pow(0.02*t,2)),0.1]);
             //let ifall = Mat4.translation([0,+0.1*(t-2)+(0.68*Math.pow(0.1*(t-2),2)),-0.1]);
             this.s2beef2=this.s2beef2/*.times(ifall)*/.times(fallM).times(rotateM).times(rotateyM);

             this.s2onion2=this.s2onion2.times(fallM).times(rotateM).times(rotateyM);

             this.s2carrot2=this.s2carrot2.times(fallM).times(rotateM).times(rotateyM);
             this.s2potato2=this.s2potato2.times(fallM).times(rotateM).times(rotateyM);


      }
            spawn_food3(t)
      {
                     //object=object.times(fall).times(rotate).times(rotatey);
            var topTrans = (Mat4.translation(Vec.of(-10,20,0))); //translate by this to be at top


            var rotateM;

             let maxAngle = (-1)*.2*Math.PI;
             let angle = maxAngle/2 + (maxAngle/2) * Math.sin(0.0008*t);
             rotateM = Mat4.rotation(0.01*angle, Vec.of(0,0,1));
             let rotateyM = Mat4.rotation(angle, Vec.of(0,1,0));
             let fallM = Mat4.translation([0,-0.02*t-(0.68*Math.pow(0.02*t,2)),0.1]);
             //let ifall = Mat4.translation([0,+0.1*(t-2)+(0.68*Math.pow(0.1*(t-2),2)),-0.1]);
             this.s2beef3=this.s2beef3/*.times(ifall)*/.times(fallM).times(rotateM).times(rotateyM);

             this.s2onion3=this.s2onion3.times(fallM).times(rotateM).times(rotateyM);

             this.s2carrot3=this.s2carrot3.times(fallM).times(rotateM).times(rotateyM);
             this.s2potato3=this.s2potato3.times(fallM).times(rotateM).times(rotateyM);

      }
      reset_position_of_food()
      {
        this.spawnfood1=false;
        this.spawnfood2=false;
        this.spawnfood3=false;
            var rot=Mat4.rotation(Math.PI/2,Vec.of(0,1,0));
 this.s2beef1=Mat4.identity();
          this.s2beef1=this.s2beef1.times(Mat4.translation(Vec.of(101,111,0)));

          this.s2carrot1=Mat4.identity();
          this.s2carrot1=this.s2carrot1.times(Mat4.translation(Vec.of(98,108,0))).times(Mat4.rotation(Math.PI/4,Vec.of(0,1,0))).times(rot);

          this.s2onion1=Mat4.identity();
          this.s2onion1=this.s2onion1.times(Mat4.translation(Vec.of(103,107,0)))

          this.s2potato1=Mat4.identity();
          this.s2potato1 =this.s2potato1.times(Mat4.translation(Vec.of(95,109,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));

          this.s2potato1_2=Mat4.identity();
          this.s2potato1_2 =this.s2potato1_2.times(Mat4.translation(Vec.of(105,101,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));


                    //SCENE 2 OBJECTS BELOW
          this.s2beef2=Mat4.identity();
          this.s2beef2=this.s2beef2.times(Mat4.translation(Vec.of(95,111,0)));

          this.s2carrot2=Mat4.identity();
          this.s2carrot2=this.s2carrot2.times(Mat4.translation(Vec.of(103,108,0))).times(Mat4.rotation(Math.PI/2,Vec.of(0,1,0)));

          this.s2onion2=Mat4.identity();
          this.s2onion2=this.s2onion2.times(Mat4.translation(Vec.of(101,110,0)))

          this.s2potato2=Mat4.identity();
          this.s2potato2 =this.s2potato2.times(Mat4.translation(Vec.of(95,109,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));

                    //SCENE 2 OBJECTS BELOW
          this.s2beef3=Mat4.identity();
          this.s2beef3=this.s2beef3.times(Mat4.translation(Vec.of(105,109,0)));

          this.s2carrot3=Mat4.identity();
          this.s2carrot3=this.s2carrot3.times(Mat4.translation(Vec.of(98,108,0))).times(Mat4.rotation(Math.PI/2,Vec.of(0,1,0)));

          this.s2onion3=Mat4.identity();
          this.s2onion3=this.s2onion3.times(Mat4.translation(Vec.of(101,110,0)))

          this.s2potato3=Mat4.identity();
          this.s2potato3 =this.s2potato3.times(Mat4.translation(Vec.of(95,109,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));



      }
      drawscene2(graphics_state,t)
      { //food dropping scene!


        //          this.scene2location=this.scene2location.times(Mat4.translation(Vec.of(100,100,0)));

        //this.shapes.cube.draw(graphics_state,this.scene2location,this.materials.test);

        //dropping 3 beef, 3 carrots, 3 onions, and 3potatos
//this.shapes.beef.draw(graphics_state,this.beef,this.materials.beef); 

        //this.shapes.beef.draw(graphics_state,this.beefsc2,this.materials.beef);

        // TODO: Make Animations

            this.rotate_drop(graphics_state,(t-this.time));
            
            
            //translation happens in here.

          this.pot=Mat4.identity();            
          this.pot=this.pot.times(Mat4.translation(Vec.of(potXloc,potYloc,potZloc)));

          this.pot=this.pot.times(Mat4.scale(Vec.of(1.4,1.7,1))); //this will kill the obj file.
          this.pot=this.pot.times(Mat4.rotation(Math.PI,Vec.of(0,0,1)));
          this.shapes.pot.draw(graphics_state,this.pot,this.materials.pot);

             //topTrans = topTrans.times(fall).times(rotate).times(rotatey);
            this.shapes.beef.draw(graphics_state,this.s2beef1,this.materials.beef);

            this.shapes.carrot.draw(graphics_state,this.s2carrot1,this.materials.carrot);
            this.shapes.onion.draw(graphics_state,this.s2onion1,this.materials.onion);
            this.shapes.potato.draw(graphics_state,this.s2potato1,this.materials.potato);
                        this.shapes.potato.draw(graphics_state,this.s2potato1_2,this.materials.potato);

            this.shapes.beef.draw(graphics_state,this.s2beef2,this.materials.beef);

            this.shapes.carrot.draw(graphics_state,this.s2carrot2,this.materials.carrot);
            this.shapes.onion.draw(graphics_state,this.s2onion2,this.materials.onion);
            this.shapes.potato.draw(graphics_state,this.s2potato2,this.materials.potato);

                        this.shapes.beef.draw(graphics_state,this.s2beef3,this.materials.beef);

            this.shapes.carrot.draw(graphics_state,this.s2carrot3,this.materials.carrot);
            this.shapes.onion.draw(graphics_state,this.s2onion3,this.materials.onion);
            this.shapes.potato.draw(graphics_state,this.s2potato3,this.materials.potato);

            this.shapes.cube.draw(graphics_state,this.scene2backimage,this.materials.scene2back);


        //needs to do object collision detection

        this.check_collision(graphics_state,t);
        //shadow ->rip this is way too weird/not enough time to go over it rn...

        //score accumulation logic: the more u collect, the more score u get.

      }

      drawscene3(graphics_state,t)
      {
        //food cutting scene!
        //this.shapes.carrot.draw(graphics_state,this.carrot,this.materials.shadow);
        this.shapes.carrot.draw(graphics_state,this.carrot,this.materials.carrot);

        this.shapes.onion.draw(graphics_state,this.onion,this.materials.onion);
                //this.shapes.onion.draw(graphics_state,this.onion,this.materials.shadow);
        this.shapes.potato.draw(graphics_state,this.potato,this.materials.potato);



        //NEEDS TO UPDATE POSITIONS else it wont know i am moving....

          this.blade=Mat4.identity(); 

          this.handle = Mat4.identity();
          this.handle = this.blade.times(Mat4.translation(Vec.of(0.014,-3.25,0.1)));

          this.knifematrix = Mat4.identity().times(Mat4.translation(Vec.of(knifeXloc,knifeYloc,knifeZloc)));
          this.blade = this.blade.times(this.knifematrix)
          this.handle = this.handle.times(this.knifematrix)

//draw knife
        this.shapes.blade.draw(graphics_state,this.blade,this.materials.blade);
        this.shapes.handle.draw(graphics_state,this.handle,this.materials.handle);

        //draw board

        this.shapes.cube.draw(graphics_state,this.cuttingboard,this.materials.cuttingboard);

        this.shapes.cube.draw(graphics_state,this.scene3backimage,this.materials.scene3back);

        //this.shapes.pot.draw(graphics_state,this.pot2,this.materials.pot); //mightt be some viewport mapping issue...


        //needs to do object collision detection and splitting object 
        this.check_collision(graphics_state,t);


        //split the damage done by the split and display new chopped up objects

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
      UI(graphics_state, t)
      {
            var score = document.getElementById("score");
            var time=document.getElementById("timer");
            var timeImg=document.getElementById("timeIMG");
            var deadclk=document.getElementById("deadtimeIMG");
            var ss=document.getElementById("ss");

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
/*
            if(this.finishedscene2)
            {
              this.reset_position_of_food();
            }
*/

            score.innerHTML = this.score;
            //score.innerHTML = this.score;
            var finished = document.getElementById("gg");
            var sc1=document.getElementById("sc1");
            var sc1bg=document.getElementById("sc1bg");
            var sc2=document.getElementById("sc2");
            var sc2bg=document.getElementById("sc2bg");
            var sc3=document.getElementById("sc3");
            var sc3board=document.getElementById("sc3board");
            
            var sc4=document.getElementById("sc4");
            
            var sc5=document.getElementById("sc5");
            var sc5bg=document.getElementById("sc5bg");

            var tc=document.getElementById("timercontainer");
            
            
            if(this.finished)
            {
                  
                  gg.innerHTML = "Game Over, Press [1][3] to restart";
            }
            else if(!this.finished)
            {
                  gg.innerHTML = "";
            }
            if(this.scene1)
            {
              
              sc1.style.display='block';
              sc1bg.style.display='block';
              tc.style.display='none';
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              this.drawscene1(graphics_state);
              this.disableOtherScenes(1);
            }
            else if(!this.scene1)
            {
              sc1.style.display='none';
              sc1bg.style.display='none';
            }

            
            if(this.scene2)
            {
                  sc2.style.display='block';
                 // sc2bg.style.display='block';
                  tc.style.display='block';
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              this.drawscene2(graphics_state,t);
              this.disableOtherScenes(2);
            }

            else if(!this.scene2)
            {
              sc2.style.display='none';
              //this.finishedscene2=true;
              //this.reset_position_of_food();
            }
            
            if(this.scene3)
            {
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              sc3.style.display='block';
              tc.style.display='block';
              //sc3board.innerHTML="<img src='/assets/cuttingboard.jpg' width='400' height='150'>";
              this.drawscene3(graphics_state,t);
              this.disableOtherScenes(3);
            }
            else if(!this.scene3)
            {
              sc3.style.display='none';
              sc3board.innerHTML="";

            }
            
            if(this.scene4)
            {
                  sc4.style.display='block';
                  tc.style.display='block';
              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              this.drawscene4(graphics_state);
              this.disableOtherScenes(4);
            }

            else if(!this.scene4)
            {
              sc4.style.display='none';
            }

          if(this.scene5)
            {
                  ss.innerHTML = this.score;
                  sc5.style.display='block';
                  sc5bg.style.display='block';
                  tc.style.display='none';
                  
                  this.finished=true; //ONLY WAY TO DO A CLEAN RESTART IS IF THIS.finished=true

              //TODO:
              //set some tiemr so we know to display the "tutorial" for this scene
              this.drawscene5(graphics_state);             
              this.disableOtherScenes(5);
            }
            else if(!this.scene5)
            {
              sc5bg.style.display='none';
              sc5.style.display='none';
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

                      //also reset position of the foods to have them REFALL!

                    this.reset_position_of_food();
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
 
       
        this.UI(graphics_state,t);
         ///start counting time

        this.startTime(t);



        if (this.attached != undefined) {
          var desired = this.attached().times(Mat4.translation([0,0.1,15]))
          desired = Mat4.inverse(desired)
          desired = desired.map( (x,i) => Vec.from( graphics_state.camera_transform[i] ).mix( x, .3 ) )
          graphics_state.camera_transform = desired;
        }



   

      }

      //idk how to get this mother fucker to work.. or some form of help/text dialogue box...
     show_explanation( document_element )
    { document_element.innerHTML += `<p>This demo detects when some flying objects collide with one another, coloring them red when they do.  For a simpler demo that shows physics-based movement without objects that hit one another, see the demo called Inertia_Demo.
                                     </p><p>This scene extends class Simulation, which carefully manages stepping simulation time for any scenes that subclass it.  It totally decouples the whole simulation from the frame rate, following the suggestions in the blog post <a href=\"https://gafferongames.com/post/fix_your_timestep/\" target=\"blank\">\"Fix Your Timestep\"</a> by Glenn Fielder.  Buttons allow you to speed up and slow down time to show that the simulation's answers do not change.</p>`;
    }
show_explanation( document_element )
    { document_element.innerHTML += `<p>This demo detects when some flying objects collide with one another, coloring them red when they do.  For a simpler demo that shows physics-based movement without objects that hit one another, see the demo called Inertia_Demo.
                                     </p><p>This scene extends class Simulation, which carefully manages stepping simulation time for any scenes that subclass it.  It totally decouples the whole simulation from the frame rate, following the suggestions in the blog post <a href=\"https://gafferongames.com/post/fix_your_timestep/\" target=\"blank\">\"Fix Your Timestep\"</a> by Glenn Fielder.  Buttons allow you to speed up and slow down time to show that the simulation's answers do not change.</p>`;
    }




  }



class Shadow_Shader extends Shader
{ material()     // Define an internal class "Material" that stores the standard settings found in Phong lighting.
  { return new class Material       // Possible properties: ambient, diffusivity, specularity, smoothness, gouraud, texture.
      { constructor( shader )
          { Object.assign( this, { shader } );  // Assign defaults.
          }
      }( this);
  }
  map_attribute_name_to_buffer_name( name )                  // We'll pull single entries out per vertex by field name.  Map
    {                                                        // those names onto the vertex array names we'll pull them from.
      return { object_space_pos: "positions", normal: "normals", tex_coord: "texture_coords" }[ name ]; }   // Use a simple lookup table.
  shared_glsl_code()            // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
    { return `precision mediump float;
        `;
    }
  vertex_glsl_code()           // ********* VERTEX SHADER *********
    { return `
        attribute vec3 object_space_pos;
        uniform mat4 camera_transform, camera_model_transform, projection_camera_model_transform;
        uniform mat3 inverse_transpose_modelview;
        void main() { gl_Position = projection_camera_model_transform * vec4(object_space_pos, 1.0); }`;
    }
  fragment_glsl_code()           // ********* FRAGMENT SHADER ********* 
    {                            // A fragment is a pixel that's overlapped by the current triangle.
      return `
        void main() { gl_FragColor = vec4(gl_FragCoord.z,gl_FragCoord.z,gl_FragCoord.z,1); }
      `;

    }
    // Define how to synchronize our JavaScript's variables to the GPU's:
  update_GPU( g_state, model_transform, material, gpu = this.g_addrs, gl = this.gl )
    {                              // First, send the matrices to the GPU, additionally cache-ing some products of them we know we'll need:
      this.update_matrices( g_state, model_transform, gpu, gl );
    }
  update_matrices( g_state, model_transform, gpu, gl )                                    // Helper function for sending matrices to GPU.
    {                                                   // (PCM will mean Projection * Camera * Model)
      let [ P, C, M ]    = [ Mat4.orthographic( -40, 40, -40, 40, -10, 20 ), g_state.camera_transform, model_transform ],
            CM     =      C.times(  M ),
            PCM    =      P.times( CM ),
            inv_CM = Mat4.inverse( CM ).sub_block([0,0], [3,3]);
      gl.uniformMatrix4fv( gpu.camera_transform_loc,                  false, Mat.flatten_2D_to_1D(     C .transposed() ) );
      gl.uniformMatrix4fv( gpu.camera_model_transform_loc,            false, Mat.flatten_2D_to_1D(     CM.transposed() ) );
      gl.uniformMatrix4fv( gpu.projection_camera_model_transform_loc, false, Mat.flatten_2D_to_1D(    PCM.transposed() ) );
      gl.uniformMatrix3fv( gpu.inverse_transpose_modelview_loc,       false, Mat.flatten_2D_to_1D( inv_CM              ) );       
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

//from phong_shader in dependencies.js but tweaked so we can override some shadow effex

class Phong_Shader_Shadow extends Phong_Shader          // THE DEFAULT SHADER: This uses the Phong Reflection Model, with optional Gouraud shading. 
                                           // Wikipedia has good defintions for these concepts.  Subclasses of class Shader each store 
                                           // and manage a complete GPU program.  This particular one is a big "master shader" meant to 
                                           // handle all sorts of lighting situations in a configurable way. 
                                           // Phong Shading is the act of determining brightness of pixels via vector math.  It compares
                                           // the normal vector at that pixel to the vectors toward the camera and light sources.
          // *** How Shaders Work:
                                           // The "vertex_glsl_code" string below is code that is sent to the graphics card at runtime, 
                                           // where on each run it gets compiled and linked there.  Thereafter, all of your calls to draw 
                                           // shapes will launch the vertex shader program once per vertex in the shape (three times per 
                                           // triangle), sending results on to the next phase.  The purpose of this vertex shader program 
                                           // is to calculate the final resting place of vertices in screen coordinates; each vertex 
                                           // starts out in local object coordinates and then undergoes a matrix transform to get there.
                                           //
                                           // Likewise, the "fragment_glsl_code" string is used as the Fragment Shader program, which gets 
                                           // sent to the graphics card at runtime.  The fragment shader runs once all the vertices in a 
                                           // triangle / element finish their vertex shader programs, and thus have finished finding out 
                                           // where they land on the screen.  The fragment shader fills in (shades) every pixel (fragment) 
                                           // overlapping where the triangle landed.  It retrieves different values (such as vectors) that 
                                           // are stored at three extreme points of the triangle, and then interpolates the values weighted 
                                           // by the pixel's proximity to each extreme point, using them in formulas to determine color.
                                           // The fragment colors may or may not become final pixel colors; there could already be other 
                                           // triangles' fragments occupying the same pixels.  The Z-Buffer test is applied to see if the 
                                           // new triangle is closer to the camera, and even if so, blending settings may interpolate some 
                                           // of the old color into the result.  Finally, an image is displayed onscreen.
{ material( color, properties )     // Define an internal class "Material" that stores the standard settings found in Phong lighting.
  { return new class Material       // Possible properties: ambient, diffusivity, specularity, smoothness, gouraud, texture.
      { constructor( shader, color = Color.of( 0,0,0,1 ), ambient = 0, diffusivity = 1, specularity = 1, smoothness = 40 )
          { Object.assign( this, { shader, color, ambient, diffusivity, specularity, smoothness } );  // Assign defaults.
            Object.assign( this, properties );                                                        // Optionally override defaults.
          }
        override( properties )                      // Easily make temporary overridden versions of a base material, such as
          { const copied = new this.constructor();  // of a different color or diffusivity.  Use "opacity" to override only that.
            Object.assign( copied, this );
            Object.assign( copied, properties );
            copied.color = copied.color.copy();
            if( properties[ "opacity" ] != undefined ) copied.color[3] = properties[ "opacity" ];
            return copied;
          }
      }( this, color );
  }
  map_attribute_name_to_buffer_name( name )                  // We'll pull single entries out per vertex by field name.  Map
    {                                                        // those names onto the vertex array names we'll pull them from.
      return { object_space_pos: "positions", normal: "normals", tex_coord: "texture_coords" }[ name ]; }   // Use a simple lookup table.
  shared_glsl_code()            // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
    { return `precision mediump float;
        const int N_LIGHTS = 2;             // We're limited to only so many inputs in hardware.  Lights are costly (lots of sub-values).
        uniform float ambient, diffusivity, specularity, smoothness, animation_time, attenuation_factor[N_LIGHTS];
        uniform bool GOURAUD, COLOR_NORMALS, USE_TEXTURE;               // Flags for alternate shading methods
        uniform vec4 lightPosition[N_LIGHTS], lightColor[N_LIGHTS], shapeColor;
        varying vec3 N, E;                    // Specifier "varying" means a variable's final value will be passed from the vertex shader 
        varying vec2 f_tex_coord;             // on to the next phase (fragment shader), then interpolated per-fragment, weighted by the 
        varying vec4 VERTEX_COLOR;            // pixel fragment's proximity to each of the 3 vertices (barycentric interpolation).
        varying vec3 L[N_LIGHTS], H[N_LIGHTS];
        varying float dist[N_LIGHTS];

        varying vec4 shadowPosition;
        
        vec3 phong_model_lights( vec3 N )
          { vec3 result = vec3(0.0);
            for(int i = 0; i < N_LIGHTS; i++)
              {
                float attenuation_multiplier = 1.0 / (1.0 + attenuation_factor[i] * (dist[i] * dist[i]));
                float diffuse  =      max( dot(N, L[i]), 0.0 );
                float specular = pow( max( dot(N, H[i]), 0.0 ), smoothness );
                result += attenuation_multiplier * ( shapeColor.xyz * diffusivity * diffuse + lightColor[i].xyz * specularity * specular );
              }
            return result;
          }
        `;
    }
  vertex_glsl_code()           // ********* //http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-16-shadow-mapping/ VERTEX SHADER *********
    { return `
        attribute vec3 object_space_pos, normal;
        attribute vec2 tex_coord;
        uniform mat4 camera_transform, camera_model_transform, projection_camera_model_transform;
        uniform mat3 inverse_transpose_modelview;

        const mat4 biasMatrix=mat4( 0.5, 0.0, 0.0, 0.0,
0.0, 0.5, 0.0, 0.0,
0.0, 0.0, 0.5, 0.0,
0.5, 0.5, 0.5, 1.0
);
        uniform mat4 depthMVP;
        void main()
        { gl_Position = projection_camera_model_transform * vec4(object_space_pos, 1.0);     // The vertex's final resting place (in NDCS).
          N = normalize( inverse_transpose_modelview * normal );                             // The final normal vector in screen space.
          f_tex_coord = tex_coord;                                         // Directly use original texture coords and interpolate between.
         

          shadowPosition = biasMatrix * depthMVP * vec4(object_space_pos, 1.0);



          if( COLOR_NORMALS )                                     // Bypass all lighting code if we're lighting up vertices some other way.
          { VERTEX_COLOR = vec4( N[0] > 0.0 ? N[0] : sin( animation_time * 3.0   ) * -N[0],             // In "normals" mode, 
                                 N[1] > 0.0 ? N[1] : sin( animation_time * 15.0  ) * -N[1],             // rgb color = xyz quantity.
                                 N[2] > 0.0 ? N[2] : sin( animation_time * 45.0  ) * -N[2] , 1.0 );     // Flash if it's negative.
            return;
          }
                                                  // The rest of this shader calculates some quantities that the Fragment shader will need:
          vec3 screen_space_pos = ( camera_model_transform * vec4(object_space_pos, 1.0) ).xyz;
          E = normalize( -screen_space_pos );
          for( int i = 0; i < N_LIGHTS; i++ )
          {            // Light positions use homogeneous coords.  Use w = 0 for a directional light source -- a vector instead of a point.
            L[i] = normalize( ( camera_transform * lightPosition[i] ).xyz - lightPosition[i].w * screen_space_pos );
            H[i] = normalize( L[i] + E );
            
            // Is it a point light source?  Calculate the distance to it from the object.  Otherwise use some arbitrary distance.
            dist[i]  = lightPosition[i].w > 0.0 ? distance((camera_transform * lightPosition[i]).xyz, screen_space_pos)
                                                : distance( attenuation_factor[i] * -lightPosition[i].xyz, object_space_pos.xyz );
          }
          if( GOURAUD )                   // Gouraud shading mode?  If so, finalize the whole color calculation here in the vertex shader, 
          {                               // one per vertex, before we even break it down to pixels in the fragment shader.   As opposed 
                                          // to Smooth "Phong" Shading, where we *do* wait to calculate final color until the next shader.
            VERTEX_COLOR      = vec4( shapeColor.xyz * ambient, shapeColor.w);
            VERTEX_COLOR.xyz += phong_model_lights( N );
          }
        }`;
    }
  fragment_glsl_code()           // ********* FRAGMENT SHADER ********* 
    {                            // A fragment is a pixel that's overlapped by the current triangle.
                                 // Fragments affect the final image or get discarded due to depth.
      return `
        uniform sampler2D texture;
        void main()
        { if( GOURAUD || COLOR_NORMALS )    // Do smooth "Phong" shading unless options like "Gouraud mode" are wanted instead.
          { gl_FragColor = VERTEX_COLOR;    // Otherwise, we already have final colors to smear (interpolate) across vertices.            
            return;
          }                                 // If we get this far, calculate Smooth "Phong" Shading as opposed to Gouraud Shading.
                                            // Phong shading is not to be confused with the Phong Reflection Model.
          
          vec3 fragmentDepth = shadowPosition.xyz;
          fragmentDepth.y = -fragmentDepth.y;
          float shadowAcneRemover = 0.01;
          fragmentDepth.z -= shadowAcneRemover;
          float texelSize = 1.0 / 256.0;
  
          float amountInLight = 0.0;    
          for (int x = -1; x <= 1; x++) {
            for (int y = -1; y <= 1; y++) {
              float texelDepth = texture2D(texture, fragmentDepth.xy + vec2(x, y) * texelSize).z;
              if (fragmentDepth.z < texelDepth) {
                amountInLight += 1.0;
              }
            }
          }
          amountInLight /= 9.0;
          gl_FragColor = vec4( shapeColor.xyz * ambient, shapeColor.w );
          gl_FragColor.xyz += amountInLight * phong_model_lights( N );

          //vec4 tex_color = texture2D( texture, f_tex_coord );                         // Sample the texture image in the correct place.
                                                                                      // Compute an initial (ambient) color:
          //if( USE_TEXTURE ) gl_FragColor = vec4( ( tex_color.xyz + shapeColor.xyz ) * ambient, shapeColor.w * tex_color.w ); 
          //else gl_FragColor = vec4( shapeColor.xyz * ambient, shapeColor.w );
          //gl_FragColor.xyz += phong_model_lights( N );                     // Compute the final color with contributions from lights.
        }`;
    }
    // Define how to synchronize our JavaScript's variables to the GPU's:
  update_GPU( g_state, model_transform, material, gpu = this.g_addrs, gl = this.gl )
    {                              // First, send the matrices to the GPU, additionally cache-ing some products of them we know we'll need:
      this.update_matrices( g_state, model_transform, gpu, gl );
      gl.uniform1f ( gpu.animation_time_loc, g_state.animation_time / 1000 );

      if( g_state.gouraud === undefined ) { g_state.gouraud = g_state.color_normals = false; }    // Keep the flags seen by the shader 
      gl.uniform1i( gpu.GOURAUD_loc,        g_state.gouraud || material.gouraud );                // program up-to-date and make sure 
      gl.uniform1i( gpu.COLOR_NORMALS_loc,  g_state.color_normals );                              // they are declared.

      gl.uniform4fv( gpu.shapeColor_loc,     material.color       );    // Send the desired shape-wide material qualities 
      gl.uniform1f ( gpu.ambient_loc,        material.ambient     );    // to the graphics card, where they will tweak the
      gl.uniform1f ( gpu.diffusivity_loc,    material.diffusivity );    // Phong lighting formula.
      gl.uniform1f ( gpu.specularity_loc,    material.specularity );
      gl.uniform1f ( gpu.smoothness_loc,     material.smoothness  );

      if( material.texture )                           // NOTE: To signal not to draw a texture, omit the texture parameter from Materials.
      { gpu.shader_attributes["tex_coord"].enabled = true;
        gl.uniform1f ( gpu.USE_TEXTURE_loc, 1 );
        gl.bindTexture( gl.TEXTURE_2D, material.texture.id );
      }
      else  { gl.uniform1f ( gpu.USE_TEXTURE_loc, 0 );   gpu.shader_attributes["tex_coord"].enabled = false; }

      if( !g_state.lights.length )  return;
      var lightPositions_flattened = [], lightColors_flattened = [], lightAttenuations_flattened = [];
      for( var i = 0; i < 4 * g_state.lights.length; i++ )
        { lightPositions_flattened                  .push( g_state.lights[ Math.floor(i/4) ].position[i%4] );
          lightColors_flattened                     .push( g_state.lights[ Math.floor(i/4) ].color[i%4] );
          lightAttenuations_flattened[ Math.floor(i/4) ] = g_state.lights[ Math.floor(i/4) ].attenuation;
        }
      gl.uniform4fv( gpu.lightPosition_loc,       lightPositions_flattened );
      gl.uniform4fv( gpu.lightColor_loc,          lightColors_flattened );
      gl.uniform1fv( gpu.attenuation_factor_loc,  lightAttenuations_flattened );
    }
  update_matrices( g_state, model_transform, gpu, gl )                                    // Helper function for sending matrices to GPU.
    {                                                   // (PCM will mean Projection * Camera * Model)
      let [ P, C, M ]    = [ g_state.projection_transform, g_state.camera_transform, model_transform ],
            CM     =      C.times(  M ),
            PCM    =      P.times( CM ),
            inv_CM = Mat4.inverse( CM ).sub_block([0,0], [3,3]);
      let [ LP, LC, LM ]    = [ Mat4.orthographic( -40, 40, -40, 40, -10, 20 ), Mat4.look_at( Vec.of( 0,5,1,0 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) ), model_transform ],
            LCM     =      LC.times(  LM ),
            LPCM    =      LP.times( LCM );
                                                                  // Send the current matrices to the shader.  Go ahead and pre-compute
                                                                  // the products we'll need of the of the three special matrices and just
                                                                  // cache and send those.  They will be the same throughout this draw
                                                                  // call, and thus across each instance of the vertex shader.
                                                                  // Transpose them since the GPU expects matrices as column-major arrays.                                  
      gl.uniformMatrix4fv( gpu.camera_transform_loc,                  false, Mat.flatten_2D_to_1D(     C .transposed() ) );
      gl.uniformMatrix4fv( gpu.camera_model_transform_loc,            false, Mat.flatten_2D_to_1D(     CM.transposed() ) );
      gl.uniformMatrix4fv( gpu.projection_camera_model_transform_loc, false, Mat.flatten_2D_to_1D(    PCM.transposed() ) );
      gl.uniformMatrix3fv( gpu.inverse_transpose_modelview_loc,       false, Mat.flatten_2D_to_1D( inv_CM              ) );       
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