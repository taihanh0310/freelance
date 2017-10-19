const {Translate, I18n} = ReactReduxI18n;

const customStyles = {
	content : {
    	top                   : '50%',
    	left                  : '50%',
    	right                 : 'auto',
    	bottom                : 'auto',
    	marginRight           : '-50%',
    	transform             : 'translate(-50%, -50%)'
  	},
  	overlay: {
  		backgroundColor: 'rgba(0, 0, 0, 0.5)'
  	}
};

class Modal extends React.Component{
	render(){
		return (
			<ReactModal
				  isOpen={this.props.modal}
        	className="Modal__Bootstrap modal-dialog modal-lg screen-model-popup"
				  onRequestClose={this.props.onRequestClose}
	    		closeTimeoutMS={150}
	    		contentLabel="">
        		<div className="modal-content">
              {
                this.props.children
              }
        		</div>
			</ReactModal>
		);
	};
};

module.exports = Modal;