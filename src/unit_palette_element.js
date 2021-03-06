import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";


class Unit_Palette_Element extends React.Component {
/*----------------------- initialization and asset loading -----------------------*/
	constructor( props ) {
		super( props );
		
		this.state = {
		};
		
	}

	componentDidMount() {
		this.ctx = this.canvas.getContext("2d");
		this.draw_canvas();
	}

	componentDidUpdate() {
		this.draw_canvas();
	}

/*----------------------- draw ops -----------------------*/
	fill_canvas_with_solid_color = () => {
		this.ctx.save();
	    this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.restore();
	}

	draw_headline_text = () => {
		this.ctx.save();
		this.ctx.font = '32px Helvetica, sans-serif';
		this.ctx.textAlign = 'center';
		this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
	    this.ctx.shadowOffsetY = 2;
	    this.ctx.shadowBlur = 3;
	    this.ctx.fillStyle = "#ffffff";
		this.ctx.textBaseline = 'middle';
		this.ctx.fillText("test", this.ctx.canvas.width / 2.0, this.ctx.canvas.height /2.0);
		this.ctx.restore();
	}
	
	draw_canvas = () => {
		let { consts } = this.props.asset_manager;

		this.fill_canvas_with_solid_color();					

		this.ctx.save();

			this.ctx.translate	(
									50,
									50
								);
			this.draw_image_for_unit_type( this.props.unit_name );

		this.ctx.restore();
	}
	
	draw_image_for_unit_type = (unit_name) => {
		let { static_vals: {assets, asset_list, assets_meta}, consts, get_asset_name_for_unit_at_zorder } = this.props.asset_manager;
		/*
			This assumes the canvas is pre-translated so our draw position is at the final point, so we don't have to do any calculation for that, here.
			
			This is the place where we do all 'spritesheet' handling, and also where we do all animation handling.
		*/
		let asset_name = get_asset_name_for_unit_at_zorder(unit_name, 0);
	
		let dim = assets_meta[ asset_name ] ? assets_meta[ asset_name ].dim : { w: 20, h: 20 };  //safe-access
		
		if( !assets_meta[ asset_name ].bounds ){
			this.ctx.drawImage	(
									assets[ asset_name ],
									-(dim.w/2),
									-(dim.h/2),
								);
		} else {
			this.ctx.drawImage	(
				/* file */			assets[ asset_name ],

									
				/* src xy */		assets_meta[ asset_name ].bounds.x,
									assets_meta[ asset_name ].bounds.y,
				/* src wh */		assets_meta[ asset_name ].bounds.w,
									assets_meta[ asset_name ].bounds.h,

									
				/* dst xy */		-Math.floor(assets_meta[ asset_name ].bounds.w/2),
									-Math.floor(assets_meta[ asset_name ].bounds.h/2),
				/* dst wh */		assets_meta[ asset_name ].bounds.w,
									assets_meta[ asset_name ].bounds.h,
								);
		}
	}
	
	handle_mouse_click = (e) => {
		this.props.handle_click();
	}
	

	render() {
		return <div className={`unit_cell${ this.props.selected_unit_type == this.props.unit_name ? ' active' : ''}`}>
			<canvas
				ref={(node) => {this.canvas = node;}}
				width="100"
				height="100"
			
				onClick={ this.handle_mouse_click }
			/>
		</div>;
	}
}

export default Unit_Palette_Element;