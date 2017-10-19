import LoadImage from 'common/load/image';

class Image extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<img className={`ui ${this.props.theme} image`} src={this.props.src}/>
			);
		else return null;
	};
};

Image.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadImage)(Image);