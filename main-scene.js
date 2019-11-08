//UID:304973591

window.Assignment_Three_Scene = window.classes.Assignment_Three_Scene =
class Assignment_Three_Scene extends Scene_Component
  { constructor( context, control_box )     // The scene begins by requesting the camera, shapes, and materials it will need.
      { super(   context, control_box );    // First, include a secondary Scene that provides movement controls:
        if( !context.globals.has_controls   ) 
          context.register_scene_component( new Movement_Controls( context, control_box.parentElement.insertCell() ) ); 

        context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,10,20 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );
        this.initial_camera_location = Mat4.inverse( context.globals.graphics_state.camera_transform );

        const r = context.width/context.height;
        context.globals.graphics_state.projection_transform = Mat4.perspective( Math.PI/4, r, .1, 1000 );

        const shapes = { torus:  new Torus( 15, 15 ),
                         torus2: new ( Torus.prototype.make_flat_shaded_version() )( 15, 15 ),

                         // TODO:  Fill in as many additional shape instances as needed in this key/value table.
                         //        (Requirement 1)
                         sub_4: new Subdivision_Sphere(4),
                         sub_3: new Subdivision_Sphere(3),
                         sub_2: new ( Subdivision_Sphere.prototype.make_flat_shaded_version() )(2),
                         sub_1: new (Subdivision_Sphere.prototype.make_flat_shaded_version()) (1),
                         planet5: new (Grid_Sphere.prototype.make_flat_shaded_version())(10,10)   
                       }
        this.submit_shapes( context, shapes );
                                     
                                     // Make some Material objects available to you:
        this.materials =
          { test:     context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ), { ambient:.2 } ),
            ring:     context.get_instance( Ring_Shader  ).material(),

                                // TODO:  Fill in as many additional material objects as needed in this key/value table.
                                //        (Requirement 1)
            sun:      context.get_instance( Phong_Shader ).material( Color.of( 0,0,0,1 ), { ambient: 1 } ),
            planet1:  context.get_instance( Phong_Shader ).material( Color.of(102/256,100/256,122/256,1),{ diffusivity: 1 } ),
            planet2:  context.get_instance( Phong_Shader ).material( Color.of(41/256,92/256,55/256,1),{ specularity:1,diffusivity:0.25 } ),
            planet3:  context.get_instance( Phong_Shader ).material( Color.of(212/256,145/256,112/256,1),{ diffusivity: 1,specularity:1 } ),
            planet4:  context.get_instance( Phong_Shader ).material( Color.of(213/256,234/256,255/256,1),{ specularity:0.8 } )
          }

        this.lights = [ new Light( Vec.of( 5,-10,5,1 ), Color.of( 0, 1, 1, 1 ), 1000 ) ];
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

        

        // TODO:  Fill in matrix operations and drawing code to draw the solar system scene (Requirements 2 and 3)

        let radius = 2 + Math.sin( (2*Math.PI/10)*t ); //2 is the middle radius.
        let red = 0.5 + 0.5*Math.sin( (2*Math.PI/10)*t ); //0.5 is the middle shade.

        let sun_matrix = Mat4.identity().times(Mat4.scale([radius,radius,radius]));
        let sun_color = Color.of(red,0,1-red,1);
        graphics_state.lights = [ new Light(Vec.of(0,0,0,1),sun_color, 10**radius) ];
        this.shapes.sub_4.draw(graphics_state,sun_matrix,this.materials.sun.override({color: sun_color}));

        let planet_1_matrix = Mat4.identity();
        planet_1_matrix = planet_1_matrix.times(Mat4.rotation(0.85*t, Vec.of(0,1,0)) ).times(Mat4.translation([5,0,0]))
        this.planet_1 = planet_1_matrix;
        planet_1_matrix = planet_1_matrix.times(Mat4.rotation(0.5*t, Vec.of(0,1,0)))
        this.shapes.sub_2.draw( graphics_state, planet_1_matrix, this.materials.planet1 )
        
        let planet_2_matrix = Mat4.identity();
        planet_2_matrix = planet_2_matrix.times(Mat4.rotation(0.70*t, Vec.of(0,1,0)) ).times(Mat4.translation([8,0,0]))
        this.planet_2 = planet_2_matrix;
        planet_2_matrix = planet_2_matrix.times(Mat4.rotation(0.5*t, Vec.of(0,1,0)))
        const discrete_time = Math.floor(t);
        this.shapes.sub_3.draw( graphics_state, planet_2_matrix, this.materials.planet2.override({gouraud:discrete_time%2}))

        let planet_3_matrix = Mat4.identity();
        //let planet_3_color = Color.of(212/256,145/256,112/256,1)
        planet_3_matrix = planet_3_matrix.times(Mat4.rotation(0.55*t, Vec.of(0,1,0))).times(Mat4.translation([11,0,0])).times(Mat4.rotation(0.7*t, Vec.of(0,1,0)))
        planet_3_matrix = planet_3_matrix.times(Mat4.rotation(0.3*t, Vec.of(0.3,0,0.4/t)))
        this.shapes.sub_4.draw(graphics_state, planet_3_matrix, this.materials.planet3)

        let ring_matrix = planet_3_matrix;
        ring_matrix = ring_matrix.times(Mat4.scale([1,1,0.05]));
        this.shapes.torus.draw( graphics_state, ring_matrix, this.materials.ring);
        this.planet_3 = planet_3_matrix;

        let planet_4_matrix = Mat4.identity();
        planet_4_matrix = planet_4_matrix.times(Mat4.rotation(0.40*t, Vec.of(0,1,0))).times(Mat4.translation([14,0,0]));
        this.planet_4 = planet_4_matrix;
        planet_4_matrix = planet_4_matrix.times(Mat4.rotation(0.3*t,Vec.of(0,1,0)))
        this.shapes.sub_4.draw(graphics_state,planet_4_matrix,this.materials.planet4)

        let planet_4_moon_matrix = planet_4_matrix;
        planet_4_moon_matrix = planet_4_moon_matrix.times(Mat4.rotation(0.3*t,Vec.of(0,1,0))).times(Mat4.translation([2.5,0,0]))
        this.moon = planet_4_moon_matrix;
        planet_4_moon_matrix = planet_4_moon_matrix.times(Mat4.rotation(0.7*t,Vec.of(0,1,0)))
        this.shapes.sub_1.draw(graphics_state,planet_4_moon_matrix,this.materials.test.override({color:Color.of(37/256,79/256,25/256,1),ambient:0}))

        let planet_5_matrix = Mat4.identity();
        planet_5_matrix = planet_5_matrix.times(Mat4.rotation(0.25*t, Vec.of(0,1,0))).times(Mat4.translation([17,0,0]))
        this.planet_5 = planet_5_matrix;
        this.shapes.planet5.draw(graphics_state,planet_5_matrix,this.materials.test.override({color:Color.of(102/256,100/256,122/256,1),ambient:0}))


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