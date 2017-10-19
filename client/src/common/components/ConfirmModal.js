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

class ConfirmModal extends React.Component{
	render(){
		return (
			<ReactModal
				isOpen={this.props.modal}
        		className="Modal__Bootstrap modal-dialog modal-sm"
				onRequestClose={this.props.onRequestClose}
	    		closeTimeoutMS={150}
	    		contentLabel="">
        		<div className="modal-content">
        			<div className="modal-body">
        				<p>{this.props.message}</p>
        			</div>
        			<div className="modal-footer">
        				<button type="button" className="btn btn-primary" onClick={this.props.onAccept}><Translate value="application.button.yes"/></button>
          				<button type="button" className="btn btn-secondary" onClick={this.props.onRequestClose}><Translate value="application.button.no"/></button>
        			</div>
        		</div>
			</ReactModal>
		);
	};
};

module.exports = ConfirmModal;