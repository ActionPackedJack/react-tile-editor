import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import Canvas_View from "./canvas_view.js";
import Asset_Manager from "./asset_manager.js";
import Tile_Palette_Element from "./tile_palette_element.js";
import Unit_Palette_Element from "./unit_palette_element.js";

import "./editor_view.scss";

class Editor_View extends React.Component {
/*----------------------- initialization and asset loading -----------------------*/
	constructor( props ) {
		super( props );
		
		this.state = {
			assets_loaded: false,
			selected_tile_type: '',
		};
		
		this._Asset_Manager = new Asset_Manager();
	}


	componentDidMount() {
		this._Asset_Manager.launch_app( 
			() => { this.setState({assets_loaded: true}); }
		);
	}


	render() {
		return <div className="master_node">
			<Canvas_View
				ref={(node) => {this.canvas_view = node;}}
				assets_loaded={this.state.assets_loaded}
				asset_manager={this._Asset_Manager}
				selected_tile_type={this.state.selected_tile_type}
			/>
			<div className="tile_palette">
			{
				this.state.assets_loaded
				&&
				this._Asset_Manager.yield_tile_name_list().map( (value, index) => {
					return	<Tile_Palette_Element
								asset_manager={this._Asset_Manager}
								tile_name={value}
								key={value}
								selected_tile_type={this.state.selected_tile_type}
								handle_click={ () => this.setState({selected_tile_type: value}) }
							/>
				})
			}
			</div>
			<div className="unit_palette">
			{
				this.state.assets_loaded
				&&
				this._Asset_Manager.yield_unit_name_list().map( (value, index) => {
					return	<Unit_Palette_Element
								asset_manager={this._Asset_Manager}
								unit_name={value}
								key={value}
								selected_unit_type={this.state.selected_unit_type}
								handle_click={ () => this.setState({selected_unit_type: value}) }
							/>
				})
			}
			</div>
		</div>;
	}

}

export default Editor_View;