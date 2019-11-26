//Justin Chang
//UID: 504732893
//github: jchang12345
var use_mipMap2=false;
var use_mipMap1=true;

window.Assignment_Three_Scene = window.classes.Assignment_Three_Scene =
class Assignment_Three_Scene extends Scene_Component
  { constructor( context, control_box )     // The scene begins by requesting the camera, shapes, and materials it will need.
      { super(   context, control_box );    // First, include a secondary Scene that provides movement controls:
        if( !context.globals.has_controls   ) 
          context.register_scene_component( new Movement_Controls( context, control_box.parentElement.insertCell() ) ); 

        context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,0,5 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );
        let c_transform = Mat4.translation([0,0,-10])
        context.globals.graphics_state.camera_transform = context.globals.graphics_state.camera_transform.times(c_transform)

        const r = context.width/context.height;
        context.globals.graphics_state.projection_transform = Mat4.perspective( Math.PI/4, r, .1, 1000 );

        const shapes = { torus:  new Torus( 15, 15 ),
                         torus2: new ( Torus.prototype.make_flat_shaded_version() )( 15, 15 ),

                         // Kitchen cutting scene materials
                         //cylinder: new Subdivision_Sphere(), // for the knife's handle.
                         //board: new Cube() //for the cutting board, and the knife
                      
                       beef:      new Shape_From_File( "assets/food/beef.obj" ) ,
                       carrot:      new Shape_From_File( "assets/food/carrot.obj" ) ,
                       onion:      new Shape_From_File( "assets/food/onion.obj" ) ,
                       potato:      new Shape_From_File( "assets/food/potato.obj" ) ,
                       blade:      new Shape_From_File( "assets/knife/blade.obj" ) ,
                       handle:      new Shape_From_File( "assets/knife/handle.obj" ) ,
                       //allfood: new Shape_From_File("assets/food/foods.obj"),
                       }
        this.submit_shapes( context, shapes );
                                     
                                     // Make some Material objects available to you:
        this.materials =
          { test:     context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ), { ambient:.2 } ),

                                // TODO:  Fill in as many additional material objects as needed in this key/value table.
                                //        (Requirement 1)
           



           beef:      context.get_instance(Phong_Shader).material(Color.of(0,0,0,1), {ambient:1,specularity:0.8,diffusivity:0.25,texture: context.get_instance("assets/food/meat.png",true)}) ,
           carrot:        context.get_instance(Phong_Shader).material(Color.of(.4,0,0,1), {ambient:0.3}) ,
           onion:        context.get_instance(Phong_Shader).material(Color.of(0,.4,0,1), {ambient:0.4}),
           potato:       context.get_instance(Phong_Shader).material(Color.of(0,0,0,1), {texture: context.get_instance("assets/food/potato.png",true),ambient:0.8,specularity:0.8,diffusivity:0.25}) ,
           //allfood:   context.get_instance(Phong_Shader).material(Color.of(0.3,0.3,0.3,1), {ambient:1}),
           blade:   context.get_instance(Phong_Shader).material(Color.of(0.9,0.9,0.9,1), {ambient:1, diffusivity:1}),
           handle:   context.get_instance(Phong_Shader).material(Color.of(0.4,0.9,0.9,1), {ambient:1})
          }


          //this.allfood=Mat4.identity();
         // this.allfood=this.allfood.times(Mat4.translation(Vec.of(2,0,0)));


          this.beef=Mat4.identity();
          this.beef=this.beef.times(Mat4.translation(Vec.of(5,0,0)));

          this.carrot=Mat4.identity();
          this.carrot=this.carrot.times(Mat4.translation(Vec.of(0,5,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));

          this.onion=Mat4.identity();
          this.onion=this.onion.times(Mat4.translation(Vec.of(0,0,0)))

          this.potato=Mat4.identity();
          this.potato = this.potato.times(Mat4.translation(Vec.of(-5,0,0))).times(Mat4.rotation(-Math.PI/2,Vec.of(0,1,0)));
          this.potato = this.potato.times(Mat4.rotation(-Math.PI/2,Vec.of(0,0,1)));

          this.blade=Mat4.identity(); 

          this.handle = Mat4.identity();
          this.handle = this.blade.times(Mat4.translation(Vec.of(0.014,-3.25,0.1)));

          this.knifematrix = Mat4.identity().times(Mat4.translation(Vec.of(2,0,0)));
          this.blade = this.blade.times(this.knifematrix)
          this.handle = this.handle.times(this.knifematrix)


        this.lights = [ new Light( Vec.of( 5,-10,5,1 ), Color.of( 0,1,1,1 ), 100000 ) ];
      }
    make_control_panel()            // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
      { this.key_triggered_button( "View solar system",  [ "0" ], () => this.attached = () => this.initial_camera_location );
        this.new_line();
        this.key_triggered_button( "Attach to planet 1", [ "1" ], () => this.attached = () => this.planet_1 );
        this.key_triggered_button( "Attach to planet 2", [ "2" ], () => this.attached = () => this.planet_2 ); this.new_line();
        this.key_triggered_button( "Attach to planet 3", [ "3" ], () => this.attached = () => this.planet_3 );
        this.key_triggered_button( "Attach to planet 4", [ "4" ], () => this.attached = () => this.planet_4 ); this.new_line();
        this.key_triggered_button( "Attach to planet 5", [ "5" ], () => this.attached = () => this.planet_5 );
        this.key_triggered_button( "Attach to moon",     [ "m" ], () => this.attached = () => this.moon     );
      }
    display( graphics_state )
      { graphics_state.lights = this.lights;        // Use the lights stored in this.lights.
        
        const t = graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;

        

        this.shapes.beef.draw(graphics_state,this.beef,this.materials.beef);
        this.shapes.carrot.draw(graphics_state,this.carrot,this.materials.carrot);
        this.shapes.onion.draw(graphics_state,this.onion,this.materials.onion);
        this.shapes.potato.draw(graphics_state,this.potato,this.materials.potato);
        this.shapes.blade.draw(graphics_state,this.blade,this.materials.blade);
        this.shapes.handle.draw(graphics_state,this.handle,this.materials.handle);

        //this.shapes.allfood.draw(graphics_state,this.allfood,this.materials.allfood);
        // TODO:  Fill in matrix operations and drawing code to draw the solar system scene (Requirements 2 and 3)

        //graphics_state.lights = [ new Light(Vec.of(0,0,0,1),sun_color, 10**radius) ];

        //let planet_1_matrix = Mat4.identity();
        //planet_1_matrix = planet_1_matrix.times(Mat4.rotation(0.85*t, Vec.of(0,1,0)) ).times(Mat4.translation([5,0,0]))
        //planet_1_matrix = planet_1_matrix.times(Mat4.rotation(0.5*t, Vec.of(0,1,0)))
 
        if (this.attached != undefined) {
          var desired = this.attached().times(Mat4.translation([0,0,5]))
          desired = Mat4.inverse(desired)
          desired = desired.map( (x,i) => Vec.from( graphics_state.camera_transform[i] ).mix( x, .1 ) )
          graphics_state.camera_transform = desired;
        }
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